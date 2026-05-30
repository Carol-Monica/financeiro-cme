// Entradas (table-heavy page) + Nova Entrada modal + Mobile artboards

const Dx = window.CME_DATA;
const fmtX = window.fmtBRL;

/* ============================================================
   Entradas page
   ============================================================ */
function EntradasPage() {
  // Summary by store
  const byStore = {};
  Dx.entradas.forEach(e => { byStore[e.store] = (byStore[e.store] || 0) + e.liquido; });
  const topStores = Object.entries(byStore).sort((a,b)=>b[1]-a[1]).slice(0, 4);
  const totalLiquido = Dx.entradas.reduce((s,e)=>s+e.liquido, 0);
  const totalBruto   = Dx.entradas.reduce((s,e)=>s+e.bruto, 0);
  const totalTaxas   = Dx.entradas.reduce((s,e)=>s+e.taxas, 0);

  return (
    <window.ResponsiveShell active="entradas" mobLabel="Entradas"
      eyebrow="Entradas · Maio · 2026"
      title='Todas as <em>entradas</em> do mês'
      sub={`${Dx.entradas.length} lançamentos · R$ ${fmtX(totalLiquido, {noPrefix:true})} líquidos`}
      primaryAction={<button className="btn btn-primary"><window.Icons.plus size={14}/>Nova Entrada</button>}>

        {/* Summary strip */}
        <div className="kpi-row">
          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Valor bruto</span>
            </div>
            <div className="kpi-value"><span className="cur">R$</span>{fmtX(totalBruto,{noPrefix:true})}</div>
            <div className="kpi-foot"><span>antes das taxas das plataformas</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Taxas retidas</span>
            </div>
            <div className="kpi-value" style={{color:'var(--nicho-beauty)'}}><span className="cur" style={{color:'var(--nicho-beauty)'}}>− R$</span>{fmtX(totalTaxas,{noPrefix:true})}</div>
            <div className="kpi-foot"><span>{(totalTaxas/totalBruto*100).toFixed(1)}% das entradas brutas</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Líquido</span>
              <div className="kpi-icon k-in"><window.Icons.check size={16}/></div>
            </div>
            <div className="kpi-value"><span className="cur">R$</span>{fmtX(totalLiquido,{noPrefix:true})}</div>
            <div className="kpi-foot"><span className="kpi-delta up">▲ 12,4%</span><span>vs abril</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <span className="kpi-label">Ticket médio</span>
            </div>
            <div className="kpi-value"><span className="cur">R$</span>{fmtX(totalLiquido/Dx.entradas.length,{noPrefix:true})}</div>
            <div className="kpi-foot"><span>por lançamento</span></div>
          </div>
        </div>

        {/* Filter strip */}
        <div className="card" style={{padding:'14px 18px', marginBottom:14, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap'}}>
          <div style={{position:'relative', flex:'1 1 240px', minWidth:200, maxWidth:340}}>
            <span style={{position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--ink-muted)', display:'flex'}}>
              <window.Icons.search size={15}/>
            </span>
            <input
              placeholder="Buscar por descrição, loja, nicho…"
              style={{
                width:'100%', padding:'9px 12px 9px 34px', fontSize:13.5,
                border:'1px solid var(--hairline)', borderRadius:10,
                fontFamily:'var(--font-ui)', outline:'none', color:'var(--ink)',
                background:'var(--paper-warm)'
              }}/>
          </div>
          <div style={{display:'flex', gap:6, alignItems:'center', flexWrap:'wrap'}}>
            <span style={{fontSize:10.5, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink-muted)', fontWeight:600, marginRight:4}}>Nicho:</span>
            {['baby','geral','book'].map(n => (
              <span key={n} className={'chip ' + (n === 'geral' ? 'is-on' : '')} data-nicho={n}>{window.CME_NICHO_LABEL[n]}</span>
            ))}
          </div>
          <div className="spacer"/>
          <button className="btn btn-ghost"><window.Icons.filter size={14}/>Mais filtros</button>
          <button className="btn btn-ghost"><window.Icons.download size={14}/>Exportar</button>
        </div>

        {/* Main table */}
        <div className="card" style={{padding:'8px 8px 4px'}}>
          <table className="tbl resp">
            <thead>
              <tr>
                <th style={{width:70, paddingLeft:16}}>Data</th>
                <th>Descrição</th>
                <th>Loja</th>
                <th>Nicho</th>
                <th>Tipo</th>
                <th style={{textAlign:'right'}}>Bruto</th>
                <th style={{textAlign:'right'}}>Taxas</th>
                <th style={{textAlign:'right', paddingRight:16}}>Líquido</th>
                <th style={{width:32}}/>
              </tr>
            </thead>
            <tbody>
              {Dx.entradas.map((e, i) => (
                <tr key={i}>
                  <td className="date" data-label="Data" style={{paddingLeft:16}}>{e.date}/26</td>
                  <td className="desc" data-label="Descrição">{e.desc}</td>
                  <td className="store" data-label="Loja">{e.store}</td>
                  <td data-label="Nicho"><window.NT n={e.nicho}/></td>
                  <td data-label="Tipo"><span style={{fontSize:11.5, color:'var(--ink-muted)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase'}}>{e.tipo}</span></td>
                  <td className="num" data-label="Bruto">{fmtX(e.bruto)}</td>
                  <td className="num" data-label="Taxas" style={{color:'var(--ink-muted)', fontWeight:500}}>{e.taxas > 0 ? '−' + fmtX(e.taxas) : '—'}</td>
                  <td className="num pos" data-label="Líquido" style={{paddingRight:16}}>{fmtX(e.liquido)}</td>
                  <td data-label=""><button style={{background:'transparent', border:0, color:'var(--ink-muted)', cursor:'pointer', padding:4}}><window.Icons.more size={16}/></button></td>
                </tr>
              ))}
              <tr style={{background:'var(--paper-warm)', fontWeight:700}}>
                <td className="tbl-total" style={{paddingLeft:16}}/>
                <td className="tbl-total" style={{textTransform:'uppercase', fontSize:11, letterSpacing:'0.14em', color:'var(--ink-muted)', fontWeight:700}}>Total · {Dx.entradas.length} lançamentos</td>
                <td/><td/><td/>
                <td className="num" data-label="Bruto">{fmtX(totalBruto)}</td>
                <td className="num" data-label="Taxas" style={{color:'var(--nicho-beauty)'}}>−{fmtX(totalTaxas)}</td>
                <td className="num pos" data-label="Líquido" style={{paddingRight:16, fontSize:14}}>{fmtX(totalLiquido)}</td>
                <td/>
              </tr>
            </tbody>
          </table>
        </div>
      </window.ResponsiveShell>
  );
}

window.EntradasPage = EntradasPage;


/* ============================================================
   Mobile dashboard
   ============================================================ */
function MobileDashboard() {
  return (
    <div className="mob">
      <div className="mob-status">
        <span>9:41</span>
        <span className="icons">
          <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><path d="M0 8h2v3H0zM4 6h2v5H4zM8 3h2v8H8zM12 0h2v11h-2z"/></svg>
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 4a8 8 0 0 1 12 0M3 6.5a5 5 0 0 1 8 0"/><circle cx="7" cy="9" r="1" fill="currentColor"/></svg>
          <svg width="24" height="11" viewBox="0 0 24 11" fill="none" stroke="currentColor"><rect x="1" y="1" width="20" height="9" rx="2"/><rect x="3" y="3" width="16" height="5" rx="1" fill="currentColor"/><rect x="22" y="4" width="1.5" height="3" fill="currentColor"/></svg>
        </span>
      </div>

      <div className="mob-header">
        <div className="row">
          <div style={{display:'flex', alignItems:'center', gap:12, flex:1}}>
            <img src="assets/logo-app.png" alt="CME" style={{width:42, height:42, borderRadius:'50%', objectFit:'cover', border:'2px solid var(--cme-yellow)', flexShrink:0}}/>
            <div>
              <div className="greet">CME — Financeiro</div>
              <div className="name">Olá, <em>Carol</em> &amp; Mônica</div>
            </div>
          </div>
        </div>
        <div className="mob-period">
          <window.Icons.cal size={12}/> Maio · 2026
          <window.Icons.chev size={12}/>
        </div>
      </div>

      <div className="mob-body">
        {/* Net result hero card */}
        <div className="mob-net">
          <div className="lbl">Resultado líquido</div>
          <div className="val"><span className="cur">R$</span>{fmtX(Dx.kpi.resultado.value, {noPrefix:true})}</div>
          <div className="sub">
            <span>↑ Entradas <b>{fmtX(Dx.kpi.entradas.value)}</b></span>
            <span>↓ Saídas <b>{fmtX(Dx.kpi.saidas.value)}</b></span>
          </div>
        </div>

        {/* Pair: a receber + pendentes */}
        <div className="mob-pair">
          <div className="mob-kpi">
            <div className="ic" style={{background:'rgba(217,123,138,0.14)', color:'var(--nicho-baby)'}}><window.Icons.clock size={14}/></div>
            <div className="lbl">A receber</div>
            <div className="val"><span className="cur">R$</span>{fmtX(Dx.kpi.pendentes.value, {noPrefix:true})}</div>
            <div style={{fontSize:10.5, color:'var(--ink-muted)', fontWeight:600}}>14 pagamentos · 1 atrasado</div>
          </div>
          <div className="mob-kpi">
            <div className="ic" style={{background:'rgba(45,106,79,0.10)', color:'var(--cme-green)'}}><window.Icons.target size={14}/></div>
            <div className="lbl">Meta do mês</div>
            <div className="val">92%</div>
            <div style={{fontSize:10.5, color:'var(--ink-muted)', fontWeight:600}}>faltam R$ 1.569,50</div>
          </div>
        </div>

        {/* Últimas entradas */}
        <div className="mob-card">
          <div className="head">
            <h3>Últimas entradas</h3>
            <a href="#">Ver todas</a>
          </div>
          {Dx.entradas.slice(0, 4).map((e, i) => (
            <div key={i} className="mob-row">
              <div className="left">
                <div className="desc" style={{textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>{e.desc}</div>
                <div className="meta-line">
                  <span>{e.store}</span><span>·</span>
                  <window.NT n={e.nicho}/>
                </div>
              </div>
              <div className="val">+ {fmtX(e.liquido, {noPrefix:true})}</div>
            </div>
          ))}
        </div>

        {/* Metas */}
        <div className="mob-card">
          <div className="head">
            <h3>Metas do mês</h3>
            <a href="#">Ver todas</a>
          </div>
          {Dx.metas.slice(0,3).map((m, i) => {
            const pct = Math.min(100, Math.round(m.current/m.target*100));
            const fill = window.CME_NICHO_COLOR[m.nicho];
            return (
              <div key={i} style={{padding:'8px 0', borderTop: i === 0 ? 0 : '1px solid var(--hairline)'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
                  <div style={{fontSize:13, fontWeight:600, color:'var(--ink)'}}>{m.title}</div>
                  <div style={{fontSize:13, fontWeight:700, color:'var(--ink)', fontVariantNumeric:'tabular-nums'}}>{pct}%</div>
                </div>
                <div style={{height:6, borderRadius:999, background:'var(--surface-1)', overflow:'hidden'}}>
                  <div style={{height:'100%', width: pct + '%', background: fill, borderRadius:999}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="mob-fab"><window.Icons.plus size={22}/></button>

      <div className="mob-tab">
        <button className="t is-active"><window.Icons.dashboard size={18}/>Dashboard</button>
        <button className="t"><window.Icons.inflow size={18}/>Entradas</button>
        <button className="t"><window.Icons.clock size={18}/>A Receber</button>
        <button className="t"><window.Icons.target size={18}/>Metas</button>
      </div>
    </div>
  );
}

window.MobileDashboard = MobileDashboard;


/* ============================================================
   Modal artboard — Nova Entrada
   ============================================================ */
function NovaEntradaArtboard() {
  return (
    <div className="app-shell" style={{position:'relative'}}>
      <window.Sidebar active="entradas"/>
      <main className="main" style={{filter:'saturate(0.85)'}}>
        <window.Topbar
          eyebrow="Entradas · Maio · 2026"
          title='Todas as <em>entradas</em> do mês'
          sub="8 lançamentos · R$ 11.322,61 líquidos"
        />
        <div className="kpi-row" style={{opacity:0.6}}>
          {[1,2,3,4].map(i => (
            <div key={i} className="kpi" style={{height:120}}/>
          ))}
        </div>
        <div className="card" style={{height:380, opacity:0.5}}/>
      </main>

      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-head">
            <div className="icon"><window.Icons.inflow size={22}/></div>
            <div>
              <div className="eyebrow">Movimento · entrada</div>
              <h2>Nova Entrada</h2>
              <div className="sub">Comissão, bônus, patrocínio ou conteúdo pago. Registre como recebeu.</div>
            </div>
            <button className="close"><window.Icons.close size={14}/></button>
          </div>

          <div className="modal-body">
            <div className="field-row">
              <div className="field">
                <label>Data <span className="req">*</span></label>
                <div className="input-mock">
                  <span>24/05/2026</span>
                  <span style={{color:'var(--ink-muted)'}}><window.Icons.cal size={14}/></span>
                </div>
              </div>
              <div className="field">
                <label>Tipo</label>
                <div className="input-mock">
                  <span>Comissão</span>
                  <span style={{color:'var(--ink-muted)'}}><window.Icons.chev size={14}/></span>
                </div>
              </div>
            </div>

            <div className="field">
              <label>Descrição <span className="req">*</span></label>
              <div className="input-mock">
                <span>Comissão semanal — campanha Mãe Mês</span>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Loja / fonte <span className="req">*</span></label>
                <div className="input-mock">
                  <span>Amazon</span>
                  <span style={{color:'var(--ink-muted)'}}><window.Icons.chev size={14}/></span>
                </div>
              </div>
              <div className="field">
                <label>Período de vendas</label>
                <div className="input-mock">
                  <span style={{color:'var(--ink-muted)', fontWeight:400}}>17/05 → 23/05</span>
                </div>
              </div>
            </div>

            <div className="field">
              <label>Nicho <span className="req">*</span></label>
              <div className="chip-row" style={{marginTop:2}}>
                <span className="chip is-on" data-nicho="baby">Baby</span>
                <span className="chip" data-nicho="geral">Geral</span>
                <span className="chip" data-nicho="book">Book</span>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Valor bruto <span className="req">*</span></label>
                <div className="currency-wrap">
                  <div className="input-mock" style={{paddingLeft:38}}>
                    <span style={{position:'absolute', left:12, color:'var(--ink-muted)', fontWeight:700, fontSize:12}}>R$</span>
                    <span>1.840,20</span>
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Taxas plataforma</label>
                <div className="currency-wrap">
                  <div className="input-mock" style={{paddingLeft:38}}>
                    <span style={{position:'absolute', left:12, color:'var(--ink-muted)', fontWeight:700, fontSize:12}}>R$</span>
                    <span style={{color:'var(--ink-muted)'}}>92,01</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:10, padding:'12px 14px', background:'var(--paper-warm)', borderRadius:12, border:'1px solid var(--hairline)'}}>
              <div style={{width:6, height:32, background:'var(--cme-green)', borderRadius:999}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:10.5, letterSpacing:'0.14em', textTransform:'uppercase', fontWeight:700, color:'var(--ink-muted)'}}>Valor líquido a registrar</div>
                <div style={{fontFamily:'var(--font-ui)', fontWeight:700, fontSize:24, color:'var(--cme-green)', letterSpacing:'-0.005em', marginTop:2, fontVariantNumeric:'tabular-nums'}}>R$ 1.748,19</div>
              </div>
              <div style={{fontSize:11.5, color:'var(--ink-muted)', textAlign:'right', lineHeight:1.4}}>
                bruto − taxas<br/>
                <span style={{fontWeight:700, color:'var(--ink)'}}>R$ 1.840,20 − R$ 92,01</span>
              </div>
            </div>
          </div>

          <div className="modal-foot">
            <button className="btn btn-ghost">Cancelar</button>
            <button className="btn btn-primary"><window.Icons.check size={14}/>Salvar Entrada</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.NovaEntradaArtboard = NovaEntradaArtboard;
