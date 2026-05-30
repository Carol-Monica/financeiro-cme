// Dashboard EDITORIAL FEMININO
// Estrutura 100% igual ao Dashboard original (mesmos blocos de texto, mesmos gráficos)
// + Paleta feminina aplicada via classe .shell-fem (CSS override no app.css)
// + 5º KPI: Novos seguidores no mês
// + Card extra: Tráfego × Conversão por Nicho

const Df = window.CME_DATA;
const fmtF = window.fmtBRL;

/* ------------------------------------------------------------
   Tráfego × Conversão por nicho — barras horizontais
   ------------------------------------------------------------ */
function TrafegoConversao() {
  const cats = [
    { c: 'Baby',  cliques: 3480 * 0.44, conv: 2560 * 0.45, color: '#D97B8A' },
    { c: 'Geral', cliques: 3480 * 0.38, conv: 2560 * 0.38, color: '#F2C12E' },
    { c: 'Book',  cliques: 3480 * 0.18, conv: 2560 * 0.17, color: '#8A9E6E' },
  ];
  const maxVal = Math.max(...cats.map(d => d.cliques));

  return (
    <div style={{width:'100%'}}>
      {/* Legenda */}
      <div style={{display:'flex',gap:16,marginBottom:14,fontSize:11.5,color:'var(--ink-muted)',fontWeight:600}}>
        <span style={{display:'flex',alignItems:'center',gap:5}}>
          <span style={{width:10,height:10,borderRadius:3,background:'var(--ink-muted)',display:'inline-block'}}/>
          Cliques
        </span>
        <span style={{display:'flex',alignItems:'center',gap:5}}>
          <span style={{width:10,height:10,borderRadius:3,background:'var(--ink-muted)',opacity:0.35,display:'inline-block'}}/>
          Conversões
        </span>
      </div>

      {/* Barras por nicho */}
      <div style={{display:'flex',flexDirection:'column',gap:18}}>
        {cats.map((d,i) => {
          const taxa = Math.round((d.conv / d.cliques) * 100);
          const pctCliques = (d.cliques / maxVal) * 100;
          const pctConv    = (d.conv    / maxVal) * 100;
          return (
            <div key={i}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:13,color:'var(--ink)'}}>{d.c}</span>
                <span style={{fontSize:11.5,color:'var(--ink-muted)',fontWeight:600}}>{taxa}% conversão</span>
              </div>
              {/* Barra cliques */}
              <div style={{marginBottom:5}}>
                <div style={{height:12,borderRadius:6,background:'var(--paper-warm)',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${pctCliques}%`,background:d.color,borderRadius:6,transition:'width .5s'}}/>
                </div>
                <div style={{fontSize:10.5,color:'var(--ink-muted)',marginTop:2}}>{Math.round(d.cliques).toLocaleString('pt-BR')} cliques</div>
              </div>
              {/* Barra conversões */}
              <div>
                <div style={{height:12,borderRadius:6,background:'var(--paper-warm)',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${pctConv}%`,background:d.color,opacity:0.45,borderRadius:6,transition:'width .5s'}}/>
                </div>
                <div style={{fontSize:10.5,color:'var(--ink-muted)',marginTop:2}}>{Math.round(d.conv).toLocaleString('pt-BR')} conversões</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Followers heart icon — pequena variação para o KPI
   ------------------------------------------------------------ */
const FollowersIcon = (p) => (
  <window.Icon {...p}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </window.Icon>
);

/* ------------------------------------------------------------
   Dashboard Feminino — mesma estrutura, paleta nova
   ------------------------------------------------------------ */
function DashboardFem() {
  // Novos seguidores no mês (acumulado, não diário)
  const followersMonth = 1247;
  const followersDelta = +18.4;

  return (
    <window.ResponsiveShell active="dashboard" mobLabel="Dashboard"
      eyebrow="Olá Carol e Mônica · Maio · 2026"
      title='Pequenos passos, constroem grandes <em>conquistas.</em>'
      sub="Resumo da semana · 3 metas no caminho · 14 comissões pendentes esperando confirmar">

        {/* KPI row — agora com 5 cards */}
        <div className="kpi-row kpi-row-5">
          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Entradas do mês</span>
              <div className="kpi-icon k-in"><window.Icons.inflow size={16}/></div>
            </div>
            <div className="kpi-value"><span className="cur">R$</span>{fmtF(Df.kpi.entradas.value, {noPrefix:true})}</div>
            <div className="kpi-foot">
              <span className="kpi-delta up">▲ {Df.kpi.entradas.deltaPct}%</span>
              <span>vs Abril (R$ 16.400)</span>
            </div>
          </div>

          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Saídas do mês</span>
              <div className="kpi-icon k-out"><window.Icons.outflow size={16}/></div>
            </div>
            <div className="kpi-value"><span className="cur">R$</span>{fmtF(Df.kpi.saidas.value, {noPrefix:true})}</div>
            <div className="kpi-foot">
              <span className="kpi-delta down">▼ {Math.abs(Df.kpi.saidas.deltaPct)}%</span>
              <span>23% das entradas</span>
            </div>
          </div>

          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Resultado líquido</span>
              <div className="kpi-icon k-net"><window.Icons.trending size={16}/></div>
            </div>
            <div className="kpi-value"><span className="cur">R$</span>{fmtF(Df.kpi.resultado.value, {noPrefix:true})}</div>
            <div className="kpi-foot">
              <span className="kpi-delta up">▲ {Df.kpi.resultado.deltaPct}%</span>
              <span>melhor mês desde Dez/25</span>
            </div>
          </div>

          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Comissões pendentes</span>
              <div className="kpi-icon k-pend"><window.Icons.clock size={16}/></div>
            </div>
            <div className="kpi-value"><span className="cur">R$</span>{fmtF(Df.kpi.pendentes.value, {noPrefix:true})}</div>
            <div className="kpi-foot">
              <span className="kpi-delta flat">{Df.kpi.pendentes.count} pagamentos</span>
              <span>1 atrasado — Dafiti</span>
            </div>
          </div>

          {/* 5º — Novos seguidores no mês (acumulado) */}
          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Novos seguidores</span>
              <div className="kpi-icon k-foll"><FollowersIcon size={16}/></div>
            </div>
            <div className="kpi-value">{followersMonth.toLocaleString('pt-BR')}</div>
            <div className="kpi-foot">
              <span className="kpi-delta up">▲ {followersDelta}%</span>
              <span>acumulado no mês</span>
            </div>
          </div>
        </div>

        {/* Chart row — Receita × Saídas + Donut categoria */}
        <div className="grid-2">
          <div className="card">
            <div className="card-head">
              <div>
                <h2 className="card-title">Receita <em>×</em> Saídas</h2>
                <div className="card-sub" style={{marginTop:4}}>Últimos 12 meses · Jun/25 → Mai/26</div>
              </div>
              <div style={{display:'flex', gap:14, alignItems:'center', fontSize:11.5, fontWeight:600, color:'var(--ink-muted)', letterSpacing:'0.06em'}}>
                <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
                  <span style={{width:18, height:2, background:'#2D6A4F', borderRadius:1}}/>ENTRADAS
                </span>
                <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
                  <span style={{width:18, height:2, background:'#E07060', borderRadius:1}}/>SAÍDAS
                </span>
              </div>
            </div>
            <window.ReceitaSaidasChart data={Df.receitaSaidas}/>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <h2 className="card-title">Saídas por <em>categoria</em></h2>
                <div className="card-sub" style={{marginTop:4}}>Este mês</div>
              </div>
            </div>
            <div className="donut-wrap" style={{marginTop:10}}>
              <window.Donut data={Df.saidasCat} size={150} thickness={22}
                centerLabel={'R$ ' + (Df.kpi.saidas.value/1000).toFixed(1) + 'k'}
                centerSub="saídas"/>
              <div className="legend">
                {Df.saidasCat.map((c, i) => (
                  <div key={i} className="legend-row">
                    <span className="swatch" style={{background:c.color}}/>
                    <span className="name">{c.name}</span>
                    <span className="val">{fmtF(c.value, {noPrefix:true})}</span>
                    <span className="pct">{Math.round(c.value / Df.kpi.saidas.value * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabela + Metas */}
        <div className="grid-2b">
          <div className="card">
            <div className="card-head">
              <div>
                <h2 className="card-title">Últimas <em>entradas</em></h2>
                <div className="card-sub" style={{marginTop:4}}>Maio · 2026</div>
              </div>
              <a href="#" className="card-link">Ver todas →</a>
            </div>
            <table className="tbl resp">
              <thead>
                <tr>
                  <th style={{width:60}}>Data</th>
                  <th>Descrição</th>
                  <th>Loja</th>
                  <th>Nicho</th>
                  <th style={{textAlign:'right'}}>Líquido</th>
                </tr>
              </thead>
              <tbody>
                {Df.entradas.slice(0, 6).map((e, i) => (
                  <tr key={i}>
                    <td className="date" data-label="Data">{e.date}</td>
                    <td className="desc" data-label="Descrição">{e.desc}</td>
                    <td className="store" data-label="Loja">{e.store}</td>
                    <td data-label="Nicho"><window.NT n={e.nicho}/></td>
                    <td className="num pos" data-label="Líquido">{fmtF(e.liquido)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <h2 className="card-title">Metas do <em>mês</em></h2>
                <div className="card-sub" style={{marginTop:4}}>4 ativas</div>
              </div>
              <a href="#" className="card-link">Ver todas →</a>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {Df.metas.map((m, i) => {
                const pct = Math.min(100, Math.round(m.current / m.target * 100));
                const onTrack = pct >= 70;
                const fill = window.CME_NICHO_COLOR[m.nicho] || 'var(--cme-green)';
                return (
                  <div key={i} className="meta">
                    <div className="meta-head">
                      <div className="meta-title">{m.title}</div>
                      <window.NT n={m.nicho}/>
                    </div>
                    <div className="meta-bar">
                      <div className="meta-bar-fill" style={{width: pct + '%', background: fill}}/>
                    </div>
                    <div className="meta-vals">
                      <span><b>{m.unit === 'R$' ? fmtF(m.current) : m.current.toLocaleString('pt-BR')}</b> de {m.unit === 'R$' ? fmtF(m.target) : m.target.toLocaleString('pt-BR')}</span>
                      <span style={{color: onTrack ? 'var(--cme-green)' : 'var(--nicho-beauty)', fontWeight:700}}>{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* NOVO — Tráfego × Conversão por nicho */}
        <div className="card" style={{marginTop:16}}>
          <div className="card-head">
            <div>
              <h2 className="card-title">Tráfego <em>×</em> Conversão por nicho</h2>
              <div className="card-sub" style={{marginTop:4}}>Onde o clique vira comissão · Maio · 2026</div>
            </div>
            <div style={{display:'flex', gap:24, alignItems:'flex-start'}}>
              <div style={{textAlign:'right'}}>
                <div className="card-sub" style={{margin:0}}>Cliques totais</div>
                <div style={{fontFamily:'var(--font-ui)', fontWeight:700, fontSize:18, color:'var(--ink)', fontVariantNumeric:'tabular-nums', marginTop:2}}>3.480</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="card-sub" style={{margin:0}}>Conversões</div>
                <div style={{fontFamily:'var(--font-ui)', fontWeight:700, fontSize:18, color:'var(--cme-rose)', fontVariantNumeric:'tabular-nums', marginTop:2}}>2.560</div>
              </div>
            </div>
          </div>
          <TrafegoConversao/>
        </div>

        {/* Distribuição financeira */}
        <div className="card" style={{marginTop:16}}>
          <div className="card-head">
            <div>
              <h2 className="card-title">Distribuição <em>financeira</em> recomendada</h2>
              <div className="card-sub" style={{marginTop:4}}>100% das entradas — sugestão Carol &amp; Mônica</div>
            </div>
            <span style={{fontSize:12.5, color:'var(--ink-muted)', display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', background:'var(--paper-warm)', borderRadius:999, border:'1px solid var(--hairline)'}}>
              💡 Mês <b style={{color:'var(--ink)', marginLeft:2}}>dentro do plano</b>
            </span>
          </div>
          <div className="dist">
            {Df.distribuicao.map((d, i) => (
              <div key={i} className="dist-row" style={{ '--swatch': d.swatch }}>
                <div className="dist-head">
                  <span className="lbl">{d.name}</span>
                  <span className="pct">{d.pct}%</span>
                </div>
                <div className="dist-bar"><div className="dist-bar-fill" style={{width: d.pct + '%'}}/></div>
              </div>
            ))}
          </div>
        </div>
      </window.ResponsiveShell>
  );
}

window.DashboardFem = DashboardFem;
