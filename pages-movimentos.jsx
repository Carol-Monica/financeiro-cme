// CME Financeiro — páginas de MOVIMENTOS
// A Receber · Saídas · Assinaturas · Metas
// Todas usam window.ResponsiveShell (desktop + PWA mobile via container queries)

const Dm = window.CME_DATA;
const D2 = window.CME_DATA2;
const fmtM = window.fmtBRL;

/* ============================================================
   A RECEBER — comissões pendentes
   ============================================================ */
function AReceberPage() {
  const tot   = Dm.pendentes.reduce((s, p) => s + p.estimado, 0);
  const late  = Dm.pendentes.filter(p => p.status === 'late').reduce((s, p) => s + p.estimado, 0);
  const prox  = Dm.pendentes.filter(p => p.status === 'pend' && p.prazoDias <= 30).reduce((s, p) => s + p.estimado, 0);

  return (
    <window.ResponsiveShell active="pendentes" mobLabel="A Receber"
      eyebrow="A Receber · Maio · 2026"
      title='Comissões <em>a receber</em>'
      sub={`${Dm.pendentes.length} pagamentos pendentes · R$ ${fmtM(tot, {noPrefix:true})} estimados`}
      primaryAction={<button className="btn btn-primary"><window.Icons.plus size={14}/>Registrar</button>}>

      <div className="kpi-row kpi-row-3">
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Total a receber</span>
            <div className="kpi-icon k-pend"><window.Icons.clock size={16}/></div></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtM(tot, {noPrefix:true})}</div>
          <div className="kpi-foot"><span>{Dm.pendentes.length} comissões abertas</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">A vencer em 30 dias</span></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtM(prox, {noPrefix:true})}</div>
          <div className="kpi-foot"><span className="kpi-delta up">no prazo</span><span>previstos p/ junho</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Atrasado</span></div>
          <div className="kpi-value" style={{color:'var(--nicho-beauty)'}}><span className="cur" style={{color:'var(--nicho-beauty)'}}>R$</span>{fmtM(late, {noPrefix:true})}</div>
          <div className="kpi-foot"><span className="kpi-delta down">1 cobrança</span><span>Dafiti · venceu 20/05</span></div>
        </div>
      </div>

      <div className="card" style={{padding:'8px 8px 4px'}}>
        <table className="tbl resp">
          <thead><tr>
            <th style={{paddingLeft:16}}>Data Ref.</th><th>Descrição / Campanha</th><th>Loja</th><th>Nicho</th>
            <th style={{textAlign:'right'}}>Estimado</th><th>Prazo</th><th>Previsão</th><th>Status</th>
            <th style={{width:32}}/>
          </tr></thead>
          <tbody>
            {Dm.pendentes.map((p, i) => (
              <tr key={i}>
                <td className="date" data-label="Data Ref." style={{paddingLeft:16}}>{p.dataRef}/26</td>
                <td className="desc" data-label="Campanha">{p.desc}</td>
                <td className="store" data-label="Loja">{p.store}</td>
                <td data-label="Nicho"><window.NT n={p.nicho}/></td>
                <td className="num" data-label="Estimado">{fmtM(p.estimado)}</td>
                <td data-label="Prazo"><span style={{fontSize:12.5, color:'var(--ink-muted)', fontWeight:600}}>{p.prazoDias} dias</span></td>
                <td data-label="Previsão"><span style={{fontSize:12.5, color:'var(--ink)', fontWeight:600}}>{p.dataPrev}</span></td>
                <td data-label="Status"><span className={'sp ' + (p.status === 'late' ? 'late' : 'pend')}>{p.status === 'late' ? 'Atrasado' : 'A receber'}</span></td>
                <td data-label=""><button className="row-act"><window.Icons.check size={16}/></button></td>
              </tr>
            ))}
            <tr style={{background:'var(--paper-warm)', fontWeight:700}}>
              <td className="tbl-total" style={{paddingLeft:16}}/>
              <td className="tbl-total" style={{textTransform:'uppercase', fontSize:11, letterSpacing:'0.14em', color:'var(--ink-muted)', fontWeight:700}}>Total estimado</td>
              <td/><td/>
              <td className="num" data-label="Total">{fmtM(tot)}</td>
              <td/><td/><td/><td/>
            </tr>
          </tbody>
        </table>
      </div>
    </window.ResponsiveShell>
  );
}
window.AReceberPage = AReceberPage;

/* ============================================================
   SAÍDAS — despesas e investimentos
   ============================================================ */
function SaidasPage() {
  const tot = D2.saidas.reduce((s, x) => s + x.valor, 0);
  const recorr = D2.saidas.filter(x => x.recorrente).reduce((s, x) => s + x.valor, 0);
  const byCat = {};
  D2.saidas.forEach(x => { byCat[x.cat] = (byCat[x.cat] || 0) + x.valor; });
  const catData = Object.entries(byCat).sort((a,b)=>b[1]-a[1])
    .map(([name, value]) => ({ name, value, color: D2.saidaCatColor[name] || '#9a9aac' }));
  const pctEntradas = (tot / Dm.kpi.entradas.value * 100);

  return (
    <window.ResponsiveShell active="saidas" mobLabel="Saídas"
      eyebrow="Saídas · Maio · 2026"
      title='Despesas e <em>investimentos</em>'
      sub={`${D2.saidas.length} lançamentos · R$ ${fmtM(tot, {noPrefix:true})} no mês`}
      primaryAction={<button className="btn btn-primary"><window.Icons.plus size={14}/>Nova Saída</button>}>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Total de saídas</span>
            <div className="kpi-icon k-out"><window.Icons.outflow size={16}/></div></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtM(tot, {noPrefix:true})}</div>
          <div className="kpi-foot"><span className="kpi-delta down">▼ 3,1%</span><span>vs abril</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Custos fixos</span></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtM(recorr, {noPrefix:true})}</div>
          <div className="kpi-foot"><span>recorrentes do mês</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Tráfego pago</span></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtM(byCat['Tráfego Pago'] || 0, {noPrefix:true})}</div>
          <div className="kpi-foot"><span>maior categoria</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">% das entradas</span></div>
          <div className="kpi-value">{pctEntradas.toFixed(1)}<span style={{fontSize:16, color:'var(--ink-muted)'}}>%</span></div>
          <div className="kpi-foot"><span className="kpi-delta up">saudável</span><span>meta ≤ 30%</span></div>
        </div>
      </div>

      <div className="col-32">
        <div className="card" style={{padding:'8px 8px 4px'}}>
          <table className="tbl resp">
            <thead><tr>
              <th style={{paddingLeft:16}}>Data</th><th>Categoria</th><th>Descrição</th><th>Fornecedor</th><th>Nicho</th>
              <th style={{textAlign:'right'}}>Valor</th><th style={{textAlign:'center'}}>Recorr.</th>
            </tr></thead>
            <tbody>
              {D2.saidas.map((x, i) => (
                <tr key={i}>
                  <td className="date" data-label="Data" style={{paddingLeft:16}}>{x.date}/26</td>
                  <td data-label="Categoria"><span className="cat-pill" style={{'--c': D2.saidaCatColor[x.cat]}}>{x.cat}</span></td>
                  <td className="desc" data-label="Descrição">{x.desc}</td>
                  <td className="store" data-label="Fornecedor">{x.fornecedor}</td>
                  <td data-label="Nicho"><window.NT n={x.nicho}/></td>
                  <td className="num" data-label="Valor" style={{color:'var(--nicho-beauty)'}}>−{fmtM(x.valor)}</td>
                  <td data-label="Recorrente" style={{textAlign:'center'}}>{x.recorrente
                    ? <span className="rec-dot" title="Recorrente"><window.Icons.refresh size={13}/></span>
                    : <span style={{color:'var(--ink-muted)'}}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><div>
            <h2 className="card-title">Por <em>categoria</em></h2>
            <div className="card-sub" style={{marginTop:4}}>Este mês</div>
          </div></div>
          <div className="donut-wrap" style={{marginTop:6}}>
            <window.Donut data={catData} size={140} thickness={20}
              centerLabel={'R$ ' + (tot/1000).toFixed(1) + 'k'} centerSub="saídas"/>
            <div className="legend">
              {catData.map((c, i) => (
                <div key={i} className="legend-row">
                  <span className="swatch" style={{background:c.color}}/>
                  <span className="name">{c.name}</span>
                  <span className="pct">{Math.round(c.value/tot*100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </window.ResponsiveShell>
  );
}
window.SaidasPage = SaidasPage;

/* ============================================================
   ASSINATURAS — recorrentes
   ============================================================ */
function AssinaturasPage() {
  const ativas = D2.assinaturas.filter(a => a.status === 'ativa');
  const totMensal = ativas.reduce((s, a) => s + a.mensal, 0);
  const totAnual  = totMensal * 12;
  const statusLabel = { ativa: 'Ativa', teste: 'Em teste', inativa: 'Inativa', cancelada: 'Cancelada' };
  const statusClass = { ativa: 'recv', teste: 'pend', inativa: 'flat', cancelada: 'late' };

  return (
    <window.ResponsiveShell active="assinaturas" mobLabel="Assinaturas"
      eyebrow="Assinaturas · Maio · 2026"
      title='Plataformas e <em>ferramentas</em>'
      sub={`${ativas.length} ativas · R$ ${fmtM(totMensal, {noPrefix:true})} por mês`}
      primaryAction={<button className="btn btn-primary"><window.Icons.plus size={14}/>Nova Assinatura</button>}>

      <div className="kpi-row kpi-row-3">
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Total mensal</span>
            <div className="kpi-icon k-pend"><window.Icons.bell size={16}/></div></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtM(totMensal, {noPrefix:true})}</div>
          <div className="kpi-foot"><span>{ativas.length} assinaturas ativas</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Anual estimado</span></div>
          <div className="kpi-value"><span className="cur">R$</span>{fmtM(totAnual, {noPrefix:true})}</div>
          <div className="kpi-foot"><span>projeção 12 meses</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Ativas</span></div>
          <div className="kpi-value">{ativas.length}<span style={{fontSize:15, color:'var(--ink-muted)', fontWeight:600}}> / {D2.assinaturas.length}</span></div>
          <div className="kpi-foot"><span>1 em teste · 1 cancelada</span></div>
        </div>
      </div>

      <div className="card" style={{padding:'8px 8px 4px'}}>
        <table className="tbl resp">
          <thead><tr>
            <th style={{paddingLeft:16}}>Plataforma</th><th>Categoria</th><th>Plano</th>
            <th style={{textAlign:'right'}}>Vlr. Mensal</th><th style={{textAlign:'right'}}>Vlr. Anual</th>
            <th>Renovação</th><th>Status</th>
          </tr></thead>
          <tbody>
            {D2.assinaturas.map((a, i) => (
              <tr key={i} style={a.status === 'cancelada' ? {opacity:0.55} : null}>
                <td data-label="Plataforma" style={{paddingLeft:16, fontWeight:600, color:'var(--ink)'}}>{a.nome}</td>
                <td className="store" data-label="Categoria">{a.cat}</td>
                <td data-label="Plano"><span style={{fontSize:11.5, color:'var(--ink-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em'}}>{a.plano}</span></td>
                <td className="num" data-label="Vlr. Mensal">{fmtM(a.mensal)}</td>
                <td className="num" data-label="Vlr. Anual" style={{color:'var(--ink-muted)', fontWeight:500}}>{fmtM(a.anual)}</td>
                <td data-label="Renovação"><span style={{fontSize:12.5, color:'var(--ink)', fontWeight:600}}>{a.renova}</span></td>
                <td data-label="Status"><span className={'sp ' + statusClass[a.status]}>{statusLabel[a.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </window.ResponsiveShell>
  );
}
window.AssinaturasPage = AssinaturasPage;

/* ============================================================
   METAS — acompanhamento
   ============================================================ */
function MetasPage() {
  const M = D2.metasFull;
  const atingidas = M.filter(m => m.status === 'atingida').length;
  const andamento = M.filter(m => m.status === 'andamento').length;
  const abaixo    = M.filter(m => m.status === 'abaixo').length;
  const fmtMeta = (v, u) => u === 'R$' ? fmtM(v) : u === '%' ? v + '%' : v.toLocaleString('pt-BR');

  return (
    <window.ResponsiveShell active="metas" mobLabel="Metas"
      eyebrow="Metas · Maio · 2026"
      title='Objetivos do <em>mês</em>'
      sub={`${M.length} metas · ${atingidas} atingidas · ${andamento} em andamento`}
      primaryAction={<button className="btn btn-primary"><window.Icons.plus size={14}/>Nova Meta</button>}>

      <div className="kpi-row kpi-row-3">
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Atingidas</span>
            <div className="kpi-icon k-in"><window.Icons.check size={16}/></div></div>
          <div className="kpi-value" style={{color:'var(--cme-green)'}}>{atingidas}</div>
          <div className="kpi-foot"><span>de {M.length} metas</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Em andamento</span>
            <div className="kpi-icon k-net"><window.Icons.clock size={16}/></div></div>
          <div className="kpi-value">{andamento}</div>
          <div className="kpi-foot"><span>dentro do prazo</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><span className="kpi-label">Abaixo da meta</span>
            <div className="kpi-icon k-pend"><window.Icons.outflow size={16}/></div></div>
          <div className="kpi-value" style={{color:'var(--nicho-beauty)'}}>{abaixo}</div>
          <div className="kpi-foot"><span>precisam de atenção</span></div>
        </div>
      </div>

      <div className="col2">
        {M.map((m, i) => {
          const pct = Math.min(100, Math.round(m.current / m.target * 100));
          const fill = m.status === 'atingida' ? 'var(--cme-green)'
                     : m.status === 'abaixo' ? 'var(--nicho-beauty)'
                     : (window.CME_NICHO_COLOR[m.nicho] || 'var(--cme-yellow)');
          return (
            <div key={i} className="card goal-card">
              <div className="goal-top">
                <div>
                  <div className="goal-tipo">{m.tipo}</div>
                  <div className="goal-title">{m.title}</div>
                </div>
                <window.NT n={m.nicho}/>
              </div>
              <div className="goal-bar"><div className="goal-bar-fill" style={{width: pct + '%', background: fill}}/></div>
              <div className="goal-foot">
                <span><b style={{color:'var(--ink)'}}>{fmtMeta(m.current, m.unit)}</b> <span style={{color:'var(--ink-muted)'}}>de {fmtMeta(m.target, m.unit)}</span></span>
                <span className="goal-pct" style={{color: fill}}>{pct}%</span>
              </div>
              <div className="goal-meta-line">
                <window.Icons.cal size={12}/> Prazo {m.prazo}
                <span className={'goal-chip ' + m.status}>{m.status === 'atingida' ? 'Atingida' : m.status === 'abaixo' ? 'Abaixo' : 'Em andamento'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </window.ResponsiveShell>
  );
}
window.MetasPage = MetasPage;
