// CME Financeiro — Google Sheets Sync
// Requer que a planilha esteja compartilhada como "qualquer pessoa com o link pode visualizar"

const CME_SHEET_ID = '17FJHEUkhskfcucHtSztWssQdLpLsDLxY41l8XI_3NwQ';

const MONTH_NAMES = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const MONTH_IDX   = {jan:1,fev:2,mar:3,abr:4,mai:5,jun:6,jul:7,ago:8,set:9,out:10,nov:11,dez:12};

// ── CSV parsing ──────────────────────────────────────────────────────────────
function parseCSVText(text) {
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i+1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQ = false; }
      else { field += c; }
    } else {
      if (c === '"') { inQ = true; }
      else if (c === ',') { row.push(field.trim()); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i+1] === '\n') i++;
        row.push(field.trim()); field = '';
        if (row.some(v => v !== '')) rows.push(row);
        row = [];
      } else { field += c; }
    }
  }
  if (field || row.length) { row.push(field.trim()); if (row.some(v => v !== '')) rows.push(row); }
  return rows;
}

// Parse sheet CSV: skip non-data rows (those where col[0] is not a positive integer)
function parseSheet(text, colNames) {
  const allRows = parseCSVText(text);
  const results = [];
  for (const row of allRows) {
    const id = (row[0] || '').replace(/"/g,'').trim();
    if (!/^\d+$/.test(id)) continue; // skip header / description rows
    const obj = {};
    colNames.forEach((name, i) => {
      obj[name] = (row[i] || '').replace(/^"|"$/g,'').trim();
    });
    results.push(obj);
  }
  return results;
}

// ── Sheet column definitions ─────────────────────────────────────────────────
const SHEET_COLS = {
  ENTRADAS:    ['id','data','loja','nicho','tipo','desc','bruto','taxas','per'],
  COMISSOES:   ['id','dataRef','loja','nicho','desc','valor','prazo','dataPv','camp','dataR','vReceb','status'],
  SAIDAS:      ['id','data','cat','nicho','desc','forn','valor','rec','canal'],
  ASSINATURAS: ['id','plat','cat','plano','st','m','a','renov','pgto'],
  METAS:       ['id','tipo','cat','per','unid','meta','real','prazo'],
};

// ── Fetch one sheet tab ──────────────────────────────────────────────────────
async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${CME_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const resp = await fetch(url, { cache: 'no-store' });
  if (!resp.ok) throw new Error(`Falha ao buscar aba "${sheetName}" (${resp.status})`);
  const text = await resp.text();
  if (text.includes('accounts.google.com')) throw new Error('Planilha não está pública. Veja instruções abaixo.');
  return parseSheet(text, SHEET_COLS[sheetName]);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function parseDateField(str) {
  // "2026-05-10" → {year, monthIdx}
  if (!str || str.length < 7) return null;
  const [y, m] = str.split('-');
  const yi = parseInt(y), mi = parseInt(m);
  if (!yi || !mi) return null;
  return { year: yi, monthIdx: mi };
}

function parsePeriodStr(str) {
  // "Mai/2026" → {year, monthIdx}
  if (!str) return null;
  const parts = str.split('/');
  if (parts.length !== 2) return null;
  const mi = MONTH_IDX[parts[0].toLowerCase().trim()];
  const yi = parseInt(parts[1]);
  if (!mi || !yi) return null;
  return { year: yi, monthIdx: mi };
}

function fmtDate(isoStr) {
  // "2026-05-10" → "10/05"
  if (!isoStr) return '';
  const p = isoStr.split('-');
  return p.length === 3 ? `${p[2]}/${p[1]}` : isoStr;
}

function num(s) { return parseFloat((s||'').replace(',','.')) || 0; }

// ── Get available periods from all data ──────────────────────────────────────
function getAvailablePeriods(raw) {
  const seen = new Set();
  const periods = [];
  [...(raw.entradas||[]), ...(raw.saidas||[])].forEach(r => {
    const d = parseDateField(r.data || r.dataRef);
    if (d) {
      const key = `${d.year}-${d.monthIdx}`;
      if (!seen.has(key)) {
        seen.add(key);
        periods.push({ year: d.year, monthIdx: d.monthIdx,
          label: `${MONTH_NAMES[d.monthIdx]}/${d.year}` });
      }
    }
  });
  return periods.sort((a, b) => (b.year * 12 + b.monthIdx) - (a.year * 12 + a.monthIdx));
}

// ── Build receitaSaidas (últimos 12 meses) from raw ──────────────────────────
function buildReceitaSaidas(entradas, saidas) {
  const now = new Date();
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), mi: d.getMonth() + 1, label: MONTH_NAMES[d.getMonth() + 1] });
  }
  return months.map(({ year, mi, label }) => {
    const e = entradas.filter(r => { const d = parseDateField(r.data); return d && d.year===year && d.monthIdx===mi; });
    const s = saidas.filter(r => { const d = parseDateField(r.data); return d && d.year===year && d.monthIdx===mi; });
    return {
      m: label,
      e: Math.round(e.reduce((sum,r) => sum + num(r.bruto) - num(r.taxas), 0)),
      s: Math.round(s.reduce((sum,r) => sum + num(r.valor), 0)),
    };
  });
}

// ── Build CME_DATA from raw + period ─────────────────────────────────────────
function buildCMEData(raw, period) {
  const { entradas=[], comissoes=[], saidas=[], metas=[] } = raw;
  const mock = window.CME_DATA_MOCK || window.CME_DATA;

  // Filter by period
  const inPeriod = (r, dateField) => {
    if (!period) return true;
    const d = parseDateField(r[dateField]);
    return d && d.year === period.year && d.monthIdx === period.monthIdx;
  };

  const fEntradas = entradas.filter(r => inPeriod(r, 'data'));
  const fSaidas   = saidas.filter(r => inPeriod(r, 'data'));
  const fPendentes = comissoes.filter(r => r.status !== 'Recebido');
  const fMetas    = metas.filter(r => {
    if (!period) return true;
    const p = parsePeriodStr(r.per);
    return p && p.year === period.year && p.monthIdx === period.monthIdx;
  });

  // KPIs
  const totEntradas = fEntradas.reduce((s,r) => s + num(r.bruto), 0);
  const totTaxas    = fEntradas.reduce((s,r) => s + num(r.taxas), 0);
  const totSaidas   = fSaidas.reduce((s,r) => s + num(r.valor), 0);
  const totPend     = fPendentes.reduce((s,r) => s + num(r.valor), 0);
  const totAtras    = fPendentes.filter(r=>r.status==='Atrasado').reduce((s,r)=>s+num(r.valor),0);

  // Entradas table
  const entradasTbl = fEntradas.map(r => ({
    date: fmtDate(r.data), desc: r.desc, store: r.loja,
    nicho: (r.nicho||'').toLowerCase().replace('geral cme','geral'),
    tipo: r.tipo,
    bruto: num(r.bruto), taxas: num(r.taxas), liquido: num(r.bruto) - num(r.taxas),
  }));

  // Saídas por categoria
  const catMap = {};
  fSaidas.forEach(r => { const c = r.cat||'Outros'; catMap[c] = (catMap[c]||0)+num(r.valor); });
  const CAT_COLORS = {
    'Tráfego Pago':'#1E3A6E','Assinaturas':'#D95F80','Equipamentos':'#C97B3F',
    'Produtos para Teste':'#4BAB8A','Salários/Pró-labore':'#F2C12E',
    'Impostos/DAS':'#5C5C88','Serviços Terceiros':'#8A9E6E',
    'Marketing':'#E07060','Outros':'#9A9AB0',
  };
  const saidasCat = Object.entries(catMap).map(([name,value]) =>
    ({ name, value, color: CAT_COLORS[name]||'#9A9AB0' }));

  // Pendentes table
  const pendentesTbl = fPendentes.map(r => ({
    dataRef: fmtDate(r.dataRef), desc: r.desc, store: r.loja,
    nicho: (r.nicho||'').toLowerCase().replace('geral cme','geral'),
    estimado: num(r.valor), prazoDias: parseInt(r.prazo)||0,
    dataPrev: fmtDate(r.dataPv),
    status: r.status === 'Atrasado' ? 'late' : 'pend',
  }));

  // Metas
  const metasTbl = fMetas.map(r => ({
    title: r.tipo, target: num(r.meta), current: num(r.real), unit: r.unid,
    nicho: (r.cat||'geral').toLowerCase().replace('geral cme','geral'),
    prazo: r.prazo || '', status: num(r.real)>=num(r.meta)?'atingida':(num(r.real)/num(r.meta)>=0.7?'andamento':'abaixo'),
  }));

  // Period label
  const mLabel = period ? MONTH_NAMES[period.monthIdx] : (mock.period?.month||'Maio');
  const yLabel = period ? period.year : (mock.period?.year||2026);
  const mIdx   = period ? period.monthIdx : (mock.period?.monthIdx||5);

  // Historical chart (use real data if available, else keep mock)
  const receitaSaidas = (entradas.length > 0 || saidas.length > 0)
    ? buildReceitaSaidas(entradas, saidas)
    : mock.receitaSaidas;

  return {
    period: { month: mLabel, year: yLabel, monthIdx: mIdx },
    kpi: {
      entradas:  { value: totEntradas - totTaxas, deltaPct: 0 },
      saidas:    { value: totSaidas, deltaPct: 0 },
      resultado: { value: (totEntradas - totTaxas) - totSaidas, deltaPct: 0 },
      pendentes: { value: totPend, count: fPendentes.length },
      seguidores: mock.kpi?.seguidores || { value: 0, deltaPct: 0 },
    },
    receitaSaidas,
    saidasCat: saidasCat.length > 0 ? saidasCat : mock.saidasCat,
    entradas:  entradasTbl.length  > 0 ? entradasTbl  : mock.entradas,
    pendentes: pendentesTbl.length > 0 ? pendentesTbl : mock.pendentes,
    metas:     metasTbl.length     > 0 ? metasTbl     : mock.metas,
    distribuicao: mock.distribuicao,
    stores: mock.stores,
    _totAtrasado: totAtras,
    _totPendente: totPend - totAtras,
  };
}

// ── Build CME_DATA2 from raw + period ────────────────────────────────────────
function buildCMEData2(raw, period) {
  const { saidas=[], assinaturas=[], metas=[] } = raw;
  const mock2 = window.CME_DATA2_MOCK || window.CME_DATA2;

  const inPeriod = (r) => {
    if (!period) return true;
    const d = parseDateField(r.data);
    return d && d.year === period.year && d.monthIdx === period.monthIdx;
  };

  const fSaidas = saidas.filter(inPeriod);

  const saidasTbl = fSaidas.map(r => ({
    date: fmtDate(r.data), cat: r.cat||'Outros', desc: r.desc,
    fornecedor: r.forn||'—',
    nicho: (r.nicho||'geral').toLowerCase().replace('geral cme','geral'),
    valor: num(r.valor), recorrente: r.rec === 'Sim',
    canal: r.canal||'',
  }));

  // Assinaturas (not period-filtered — always shown)
  const STATUS_MAP = { 'Ativa':'ativa','Em teste':'teste','Inativa':'cancelada','Cancelada':'cancelada' };
  const assinaturasTbl = assinaturas.map(r => ({
    nome: r.plat, cat: r.cat, plano: r.plano,
    mensal: num(r.m), anual: num(r.a),
    renova: r.renov||'—',
    status: STATUS_MAP[r.st]||'ativa',
    forma: r.pgto||'Cartão',
  }));

  // Metas (period-filtered)
  const fMetas = metas.filter(r => {
    if (!period) return true;
    const p = parsePeriodStr(r.per);
    return p && p.year === period.year && p.monthIdx === period.monthIdx;
  });
  const metasFullTbl = fMetas.map(r => {
    const tgt = num(r.meta), cur = num(r.real);
    const pct = tgt > 0 ? cur/tgt : 0;
    return {
      title: r.tipo, tipo: r.unid||'R$', target: tgt, current: cur, unit: r.unid||'R$',
      nicho: (r.cat||'geral').toLowerCase().replace('geral cme','geral'),
      prazo: r.prazo||'', status: pct>=1?'atingida':pct>=0.7?'andamento':'abaixo',
    };
  });

  return {
    ...mock2,
    saidas:    saidasTbl.length     > 0 ? saidasTbl     : mock2.saidas,
    assinaturas: assinaturasTbl.length > 0 ? assinaturasTbl : mock2.assinaturas,
    metasFull: metasFullTbl.length  > 0 ? metasFullTbl  : mock2.metasFull,
    saidaCatColor: mock2.saidaCatColor,
  };
}

// ── Public API ───────────────────────────────────────────────────────────────
window.CME_SHEET_ID          = CME_SHEET_ID;
window.MONTH_NAMES           = MONTH_NAMES;
window.fetchSheetData        = async function () {
  const [entradas, comissoes, saidas, assinaturas, metas] = await Promise.all([
    fetchSheet('ENTRADAS'),
    fetchSheet('COMISSOES'),
    fetchSheet('SAIDAS'),
    fetchSheet('ASSINATURAS'),
    fetchSheet('METAS'),
  ]);
  window.CME_RAW = { entradas, comissoes, saidas, assinaturas, metas };
  return window.CME_RAW;
};
window.buildCMEData          = buildCMEData;
window.buildCMEData2         = buildCMEData2;
window.getAvailablePeriods   = getAvailablePeriods;
