// CME Financeiro — páginas de CRESCIMENTO
// Relatório · Tráfego Pago · Comissão

const Dc = window.CME_DATA;
const Dc2 = window.CME_DATA2;
const fmtC = window.fmtBRL;
const { useState: useStateC } = React;

/* ============================================================
   RELATÓRIO — análise por período
   ============================================================ */
function HBars({ data, max }) {
  return (
    <div className="hbar-list">
      {data.map((d, i) => (
        <div key={i} className="hbar">
          <span className="hb-name">{d.name}</span>
          <span className="hb-track"><span className="hb-fill" style={{width: (d.value/max*100) + '%', background: d.color}}/></span>
          <span className="hb-val"><b>{fmtC(d.value)}</b><span>{Math.round(d.value/data.reduce((s,x)=>s+x.value,0)*100)}%</span></span>
        </div>
      ))}
    </div>
  );
}

function RelatorioPage() {
  const [per, setPer] = useStateC('Mensal');
  const maxLoja  = Math.max(...Dc2.receitaPorLoja.map(d => d.value));
  const maxNicho = Math.max(...Dc2.receitaPorNicho.map(d => d.value));
  const R = Dc2.resumo2026;

  return (
    <window.ResponsiveShell active="relatorio" mobLabel="Relatório"
      eyebrow="Relatório · 2026"
      title='Análise <em>financeira</em>'
      sub="Receita por loja, por nicho e resumo acumulado do ano"
      primaryAction={<button className="btn btn-ghost"><window.Icons.download size={14}/>Exportar</button>}>

      <div style={{display:'flex', marginBottom:18}}>
        <div className="seg">
          {['Mensal','1º Semestre','2º Semestre','Anual'].map(p => (
            <button key={p} className={per === p ? 'is-on' : ''} onClick={() => setPer(p)}>{p}</button>
          ))}
        </div>
      </div>

      <div className="col2">
        <div className="card">
          <div className="card-head"><div>
            <h2 className="card-title">Receita por <em>loja</em></h2>
            <div className="card-sub" style={{marginTop:4}}>Maio · 2026</div>
          </div></div>
          <div style={{marginTop:8}}><HBars data={Dc2.receitaPorLoja} max={maxLoja}/></div>
        </div>
        <div className="card">
          <div className="card-head"><div>
            <h2 className="card-title">Receita por <em>nicho</em></h2>
            <div className="card-sub" style={{marginTop:4}}>Maio · 2026</div>
          </div></div>
          <div style={{marginTop:8}}><HBars data={Dc2.receitaPorNicho} max={maxNicho}/></div>
        </div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <div className="card-head"><div>
          <h2 className="card-title">Resumo <em>2026</em></h2>
          <div className="card-sub" style={{marginTop:4}}>Acumulado de janeiro a maio · {R.meses} meses</div>
        </div>
          <span style={{fontSize:12.5, color:'var(--ink-muted)', display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', background:'var(--paper-warm)', borderRadius:999, border:'1px solid var(--hairline)'}}>
            🏆 Melhor mês: <b style={{color:'var(--ink)', marginLeft:2}}>{R.melhorMes}</b>
          </span>
        </div>
        <div className="resumo-grid" style={{marginTop:14}}>
          <div className="resumo-cell"><div className="lbl">Entradas</div><div className="num">{fmtC(R.entradas)}</div></div>
          <div className="resumo-cell"><div className="lbl">Saídas</div><div className="num" style={{color:'var(--nicho-beauty)'}}>−{fmtC(R.saidas)}</div></div>
          <div className="resumo-cell"><div className="lbl">Resultado líquido</div><div className="num" style={{color:'var(--cme-green)'}}>{fmtC(R.liquido)}</div></div>
        </div>
      </div>
    </window.ResponsiveShell>
  );
}
window.RelatorioPage = RelatorioPage;

/* ============================================================
   TRÁFEGO PAGO — investimento por canal
   ============================================================ */
function TrafegoPage() {
  const invest = Dc2.trafego.reduce((s, t) => s + t.valor, 0);
  const disp = Dc.kpi.entradas.value * 0.30;
  const saldo = disp - invest;
  const donutData = Dc2.trafego.map(t => ({ name: t.curto, value: t.valor, color: t.color }));

  return (
    <window.ResponsiveShell active="trafego" mobLabel="Tráfego"
      eyebrow="Tráfego Pago · Maio · 2026"
      title='Investimento em <em>divulgação</em>'
      sub={`R$ ${fmtC(invest, {noPrefix:true})} investidos · ${Dc2.trafego.length} canais ativos`}
      primaryAction={<button className="btn btn-primary"><window.Icons.plus size={14}/>Registrar Gasto</button>}>

      <div className="kpi-row kpi-row-3">
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Disponível (30% entradas)</span>
            <div className="kpi-icon k-net"><window.Icons.megaphone size={16}/></div></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtC(disp, {noPrefix:true})}</div>
          <div className="kpi-foot"><span>orçamento do mês</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Total investido</span></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtC(invest, {noPrefix:true})}</div>
          <div className="kpi-foot"><span>{Math.round(invest/disp*100)}% do orçamento</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Saldo de tráfego</span></div>
          <div className="kpi-value" style={{color:'var(--cme-green)'}}><span className="cur" style={{color:'var(--cme-green)'}}>R$</span>{fmtC(saldo, {noPrefix:true})}</div>
          <div className="kpi-foot"><span className="kpi-delta up">dentro do orçamento</span></div>
        </div>
      </div>

      <div className="col-32">
        <div className="card">
          <div className="card-head"><div>
            <h2 className="card-title">Investimento por <em>canal</em></h2>
            <div className="card-sub" style={{marginTop:4}}>Custo · cliques · conversões deste mês</div>
          </div></div>
          <div style={{marginTop:4}}>
            {Dc2.trafego.map((t, i) => (
              <div key={i} className="chan-row">
                <div>
                  <div className="chan-name"><span className="dot" style={{background:t.color}}/>{t.canal}</div>
                  <div className="chan-sub">{t.cliques.toLocaleString('pt-BR')} cliques · {t.conv} conversões · {Math.round(t.conv/t.cliques*100)}% taxa</div>
                </div>
                <div className="chan-val">{fmtC(t.valor)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div>
            <h2 className="card-title">Distribuição</h2>
            <div className="card-sub" style={{marginTop:4}}>Por canal</div>
          </div></div>
          <div className="donut-wrap" style={{marginTop:6, flexDirection:'column', alignItems:'stretch'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
              <window.Donut data={donutData} size={150} thickness={22}
                centerLabel={'R$ ' + (invest/1000).toFixed(1) + 'k'} centerSub="investido"/>
            </div>
            <div className="legend" style={{marginTop:14}}>
              {donutData.map((c, i) => (
                <div key={i} className="legend-row">
                  <span className="swatch" style={{background:c.color}}/>
                  <span className="name">{c.name}</span>
                  <span className="val">{fmtC(c.value)}</span>
                  <span className="pct">{Math.round(c.value/invest*100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </window.ResponsiveShell>
  );
}
window.TrafegoPage = TrafegoPage;

/* ============================================================
   COMISSÃO — vendas por dia (calendário + crescimento)
   ============================================================ */
function GrowthArea({ data, width = 680, height = 200 }) {
  // data = cumulative values
  const padL = 40, padR = 14, padT = 14, padB = 24;
  const w = width - padL - padR, h = height - padT - padB;
  const maxY = Math.ceil(Math.max(...data) / 5000) * 5000;
  const x = (i) => padL + (i / (data.length - 1)) * w;
  const y = (v) => padT + h - (v / maxY) * h;
  const line = data.map((v, i) => (i === 0 ? 'M' : 'L') + x(i) + ',' + y(v)).join(' ');
  const area = line + ` L ${x(data.length-1)},${padT+h} L ${x(0)},${padT+h} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{display:'block'}}>
      <defs><linearGradient id="grad-com" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#D95F80" stopOpacity="0.22"/><stop offset="100%" stopColor="#D95F80" stopOpacity="0"/>
      </linearGradient></defs>
      {[0, maxY*0.5, maxY].map((t, i) => (
        <g key={i}>
          <line x1={padL} x2={width-padR} y1={y(t)} y2={y(t)} stroke="var(--hairline)"/>
          <text x={padL-8} y={y(t)+3} textAnchor="end" fontFamily="var(--font-ui)" fontSize="10" fill="var(--ink-muted)" fontWeight="600">{t===0?'R$ 0':'R$ '+(t/1000).toFixed(0)+'k'}</text>
        </g>
      ))}
      <path d={area} fill="url(#grad-com)"/>
      <path d={line} fill="none" stroke="#D95F80" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={x(data.length-1)} cy={y(data[data.length-1])} r="5" fill="#fff" stroke="#D95F80" strokeWidth="2.5"/>
    </svg>
  );
}

function ComissaoPage() {
  const days = Dc2.comissaoDia;
  const total = days.reduce((s, v) => s + v, 0);
  const ativos = days.filter(v => v > 0).length;
  const media = total / ativos;
  const first = new Date(2026, 4, 1).getDay(); // 0=Dom
  const dow = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  days.forEach((v, idx) => cells.push({ day: idx + 1, v }));
  // cumulative
  let acc = 0; const cum = days.map(v => (acc += v));

  return (
    <window.ResponsiveShell active="comissao" mobLabel="Comissão"
      eyebrow="Comissão · Maio · 2026"
      title='Vendas e comissões <em>por dia</em>'
      sub={`R$ ${fmtC(total, {noPrefix:true})} no mês · ${ativos} dias com venda`}
      primaryAction={<button className="btn btn-primary"><window.Icons.plus size={14}/>Lançar venda</button>}>

      <div className="kpi-row kpi-row-3">
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Meta diária</span>
            <div className="kpi-icon k-net"><window.Icons.target size={16}/></div></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtC(Dc2.metaDiaria, {noPrefix:true})}</div>
          <div className="kpi-foot"><span className="edit-meta"><window.Icons.refresh size={11}/> clique para editar</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Meta mensal</span></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtC(Dc2.metaMensal, {noPrefix:true})}</div>
          <div className="kpi-foot"><span className="edit-meta"><window.Icons.refresh size={11}/> clique para editar</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Média diária real</span></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtC(media, {noPrefix:true})}</div>
          <div className="kpi-foot"><span className={'kpi-delta ' + (media >= Dc2.metaDiaria ? 'up' : 'down')}>{media >= Dc2.metaDiaria ? '▲ acima' : '▼ abaixo'} da meta</span></div>
        </div>
      </div>

      <div className="col-32">
        <div className="card">
          <div className="card-head"><div>
            <h2 className="card-title">Calendário de <em>comissões</em></h2>
            <div className="card-sub" style={{marginTop:4}}>Verde = bateu a meta diária · amarelo = abaixo</div>
          </div></div>
          <div className="cal-grid" style={{marginTop:10}}>
            {dow.map(d => <div key={d} className="cal-dow">{d}</div>)}
            {cells.map((c, i) => {
              if (!c) return <div key={i} className="cal-cell empty"/>;
              const cls = c.v === 0 ? '' : (c.v >= Dc2.metaDiaria ? 'hit' : 'miss');
              const today = c.day === 30 ? ' today' : '';
              return (
                <div key={i} className={'cal-cell ' + cls + today}>
                  <span className="d">{c.day}</span>
                  {c.v > 0 && <span className="v">{c.v >= 1000 ? (c.v/1000).toFixed(1).replace('.',',')+'k' : c.v}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div>
            <h2 className="card-title">Crescimento <em>diário</em></h2>
            <div className="card-sub" style={{marginTop:4}}>Comissão acumulada no mês</div>
          </div></div>
          <div style={{marginTop:10}}><GrowthArea data={cum}/></div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:6, padding:'0 4px'}}>
            <span style={{fontSize:11.5, color:'var(--ink-muted)', fontWeight:600}}>Acumulado até hoje</span>
            <span style={{fontFamily:'var(--font-ui)', fontWeight:700, fontSize:18, color:'var(--cme-rose)', fontVariantNumeric:'tabular-nums'}}>{fmtC(total)}</span>
          </div>
        </div>
      </div>
    </window.ResponsiveShell>
  );
}
window.ComissaoPage = ComissaoPage;
