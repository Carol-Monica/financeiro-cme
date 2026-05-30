// Example data for CME Financeiro dashboard — May 2026
// All numbers in BRL. Realistic for a small Brazilian affiliate operation.

window.CME_DATA = {
  period: { month: 'Maio', year: 2026, monthIdx: 5 },

  kpi: {
    entradas:  { value: 18430.50, deltaPct: +12.4 },
    saidas:    { value: 4280.00,  deltaPct: -3.1 },
    resultado: { value: 14150.50, deltaPct: +18.7 },
    pendentes: { value: 7890.00,  count: 14 },
  },

  // Receita × Saídas — last 12 months (Jun/25 → Mai/26)
  receitaSaidas: [
    { m: 'Jun', e: 9200,  s: 2100 },
    { m: 'Jul', e: 11400, s: 2380 },
    { m: 'Ago', e: 10100, s: 2640 },
    { m: 'Set', e: 12800, s: 2900 },
    { m: 'Out', e: 14200, s: 3100 },
    { m: 'Nov', e: 21800, s: 4900 }, // black friday
    { m: 'Dez', e: 24600, s: 5320 },
    { m: 'Jan', e: 13900, s: 3540 },
    { m: 'Fev', e: 14700, s: 3680 },
    { m: 'Mar', e: 15800, s: 3900 },
    { m: 'Abr', e: 16400, s: 4420 },
    { m: 'Mai', e: 18430, s: 4280 },
  ],

  // Saídas por categoria (este mês)
  saidasCat: [
    { name: 'Tráfego Pago',   value: 1850, color: '#1E3A6E' }, // ele
    { name: 'Assinaturas',    value: 720,  color: '#D95F80' }, // rose
    { name: 'Equipamentos',   value: 680,  color: '#C97B3F' }, // home
    { name: 'Produtos teste', value: 540,  color: '#4BAB8A' }, // kids
    { name: 'Serviços',       value: 290,  color: '#8A9E6E' }, // book
    { name: 'Impostos',       value: 200,  color: '#5C5C88' }, // neutral
  ],

  // Últimas entradas
  entradas: [
    { date: '24/05', desc: 'Comissão semanal — campanha Mãe Mês', store: 'Amazon',        nicho: 'baby',   tipo: 'Comissão',  bruto: 1840.20, taxas: 92.01, liquido: 1748.19 },
    { date: '22/05', desc: 'Bônus performance Q2',                 store: 'Mercado Livre', nicho: 'geral',  tipo: 'Bônus',     bruto: 950.00,  taxas: 0,     liquido: 950.00 },
    { date: '19/05', desc: 'Patrocínio post carrossel',            store: 'Direto',        nicho: 'geral',  tipo: 'Patrocínio',bruto: 1500.00, taxas: 150,   liquido: 1350.00 },
    { date: '17/05', desc: 'Comissão livros volta às aulas',       store: 'Shopee',        nicho: 'book',   tipo: 'Comissão',  bruto: 612.40,  taxas: 30.62, liquido: 581.78 },
    { date: '14/05', desc: 'Reels patrocinado mochilas',           store: 'Direto',        nicho: 'baby',   tipo: 'Conteúdo',  bruto: 2200.00, taxas: 220,   liquido: 1980.00 },
    { date: '12/05', desc: 'Comissão Dia das Mães',                store: 'Amazon',        nicho: 'geral',  tipo: 'Comissão',  bruto: 2840.18, taxas: 142.01,liquido: 2698.17 },
    { date: '09/05', desc: 'Comissão semanal',                     store: 'Shein',         nicho: 'geral',  tipo: 'Comissão',  bruto: 780.50,  taxas: 39.03, liquido: 741.47 },
    { date: '07/05', desc: 'Cupom CASA10 — eletros',               store: 'Mercado Livre', nicho: 'geral',  tipo: 'Comissão',  bruto: 1340.00, taxas: 67.00, liquido: 1273.00 },
  ],

  // A receber
  pendentes: [
    { dataRef: '15/05', desc: 'Campanha Black May',     store: 'Amazon',        nicho: 'baby',   estimado: 2400, prazoDias: 45, dataPrev: '29/06', status: 'pend' },
    { dataRef: '10/05', desc: 'Tráfego pago carrossel', store: 'Mercado Livre', nicho: 'geral',  estimado: 1620, prazoDias: 30, dataPrev: '09/06', status: 'pend' },
    { dataRef: '03/05', desc: 'Volta às aulas Shopee',  store: 'Shopee',        nicho: 'book',   estimado: 980,  prazoDias: 60, dataPrev: '02/07', status: 'pend' },
    { dataRef: '28/04', desc: 'Dia das Mães Beauty',    store: 'Shein',         nicho: 'geral',  estimado: 1490, prazoDias: 45, dataPrev: '12/06', status: 'pend' },
    { dataRef: '20/04', desc: 'Comissão atrasada',      store: 'Dafiti',        nicho: 'geral',  estimado: 1400, prazoDias: 30, dataPrev: '20/05', status: 'late' },
  ],

  // Metas
  metas: [
    { title: 'Faturamento Maio',        target: 20000, current: 18430.50, unit: 'R$',  nicho: 'geral' },
    { title: 'Comissões Baby (Q2)',     target: 6000,  current: 4920,     unit: 'R$',  nicho: 'baby' },
    { title: 'Novos seguidores TikTok', target: 5000,  current: 3840,     unit: '',    nicho: 'geral' },
    { title: 'Posts publicados',        target: 60,    current: 47,       unit: '',    nicho: 'geral' },
  ],

  // Distribuição financeira (% do faturamento)
  distribuicao: [
    { name: 'Pró-labore Carol & Mônica', pct: 40, swatch: '#F2C12E' },
    { name: 'Reinvestimento (tráfego)',  pct: 25, swatch: '#1E3A6E' },
    { name: 'Reserva de emergência',     pct: 15, swatch: '#2D6A4F' },
    { name: 'Equipamentos e teste',      pct: 12, swatch: '#C97B3F' },
    { name: 'Impostos (DAS)',            pct:  8, swatch: '#D95F80' },
  ],

  stores: ['Amazon', 'Mercado Livre', 'Shopee', 'Shein', 'Dafiti', 'Magalu', 'Direto'],
};

window.CME_NICHO_LABEL = {
  baby: 'Baby', home: 'Home', kids: 'Kids',
  beauty: 'Beauty', book: 'Book', ele: 'Ele', geral: 'Geral CME',
};

window.CME_NICHO_COLOR = {
  baby:'#D97B8A', home:'#C97B3F', kids:'#4BAB8A',
  beauty:'#E07060', book:'#8A9E6E', ele:'#1E3A6E', geral:'#F2C12E',
};

window.fmtBRL = (n, opts = {}) => {
  const abs = Math.abs(n);
  const s = abs.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (n < 0 ? '-' : '') + (opts.noPrefix ? s : 'R$ ' + s);
};

window.fmtBRLshort = (n) => {
  if (n >= 1000) return 'R$ ' + (n/1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'k';
  return 'R$ ' + n.toLocaleString('pt-BR');
};
