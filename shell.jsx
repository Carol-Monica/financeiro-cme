// ResponsiveShell — wrapper único que serve desktop + PWA mobile.
// Desktop: sidebar lateral (reaproveita window.Sidebar).
// Mobile (container ≤760px): top app bar + bottom tab bar + FAB.

window.NavContext = React.createContext(null);

const RS_TABS = [
  { id: 'dashboard',   icon: 'dashboard', label: 'Início' },
  { id: 'entradas',    icon: 'inflow',    label: 'Entradas' },
  { id: 'saidas',      icon: 'outflow',   label: 'Saídas' },
  { id: 'metas',       icon: 'target',    label: 'Metas' },
  { id: '_mais',       icon: 'menu',      label: 'Mais' },
];

const RS_MAIS = [
  { id: 'pendentes',   icon: 'clock',    label: 'A Receber' },
  { id: 'assinaturas', icon: 'bell',     label: 'Assinaturas' },
  { id: 'relatorio',   icon: 'chart',    label: 'Relatório' },
  { id: 'trafego',     icon: 'refresh',  label: 'Tráfego Pago' },
  { id: 'comissao',    icon: 'trending', label: 'Comissão' },
];

const MAIS_IDS = RS_MAIS.map(t => t.id);

/* ── Top bar mobile ── */
function RsMobTop({ label }) {
  const ctx = React.useContext(window.CMEAppContext || React.createContext({}));
  const MN = window.MONTH_NAMES || ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const mLabel = ctx.period ? MN[ctx.period.monthIdx] : (window.CME_DATA?.period?.month || 'Maio');
  const [showPicker, setShowPicker] = React.useState(false);

  React.useEffect(() => {
    if (!showPicker) return;
    const close = () => setShowPicker(false);
    document.addEventListener('click', close, true);
    return () => document.removeEventListener('click', close, true);
  }, [showPicker]);

  return (
    <div className="rs-mobtop">
      <img className="logo" src="assets/logo-app.png" alt="CME"/>
      <div className="txt">
        <div className="t">CME · <em>{label}</em></div>
        <div className="s">Carol &amp; Mônica · {ctx.isSyncing ? 'sincronizando…' : 'sincronizado'}</div>
      </div>
      <div style={{display:'flex',gap:6,alignItems:'center',marginLeft:'auto'}}>
        {/* Período */}
        <div style={{position:'relative'}} onClick={e=>e.stopPropagation()}>
          <button className="period" onClick={()=>setShowPicker(v=>!v)}>
            <window.Icons.cal size={13}/> {mLabel}
            <window.Icons.chev size={13}/>
          </button>
          {showPicker && (
            <div className="period-dropdown" style={{right:0,left:'auto',minWidth:120}}>
              {(ctx.availablePeriods||[]).length === 0
                ? <div className="pd-empty">Sincronize primeiro</div>
                : (ctx.availablePeriods||[]).map(p => (
                    <button key={`${p.year}-${p.monthIdx}`}
                      className={'pd-item'+(ctx.period?.monthIdx===p.monthIdx&&ctx.period?.year===p.year?' is-active':'')}
                      onClick={()=>{ctx.setPeriod&&ctx.setPeriod(p);setShowPicker(false);}}>
                      {MN[p.monthIdx]}/{p.year}
                    </button>
                  ))
              }
            </div>
          )}
        </div>
        {/* Sincronizar */}
        <button className={'mob-sync'+(ctx.isSyncing?' is-syncing':'')}
          onClick={ctx.sync} disabled={ctx.isSyncing}
          title="Sincronizar com Google Sheets">
          <window.Icons.refresh size={15} className={ctx.isSyncing?'spin':''}/>
        </button>
      </div>
    </div>
  );
}

/* ── Tab bar mobile com drawer "Mais" ── */
function RsTabbar({ active, onNav }) {
  const [showMais, setShowMais] = React.useState(false);
  const mainIds = RS_TABS.slice(0,4).map(t=>t.id);
  const activeTab = mainIds.includes(active) ? active : (MAIS_IDS.includes(active) ? '_mais' : 'dashboard');

  const handleTab = (id) => {
    if (id === '_mais') { setShowMais(v=>!v); return; }
    setShowMais(false);
    onNav && onNav(id);
  };

  return (
    <>
      {/* Drawer "Mais" */}
      {showMais && (
        <div className="mais-drawer" onClick={()=>setShowMais(false)}>
          <div className="mais-list" onClick={e=>e.stopPropagation()}>
            {RS_MAIS.map(t => (
              <button key={t.id}
                className={'mais-item'+(active===t.id?' is-active':'')}
                onClick={()=>{onNav&&onNav(t.id);setShowMais(false);}}>
                {React.createElement(window.Icons[t.icon]||window.Icons.chart,{size:18})}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <nav className="rs-tabbar">
        {RS_TABS.map(t => (
          <button key={t.id}
            className={'t '+(activeTab===t.id||( t.id==='_mais'&&showMais)?'is-active':'')}
            onClick={()=>handleTab(t.id)}>
            {React.createElement(window.Icons[t.icon]||window.Icons.chart,{size:18})}
            {t.label}
          </button>
        ))}
      </nav>
    </>
  );
}

function ResponsiveShell({ active, mobLabel, eyebrow, title, sub, primaryAction, children }) {
  const nav = React.useContext(window.NavContext);
  return (
    <div className="page-cq">
      <div className="app-shell shell-fem rs-shell">
        <window.Sidebar active={active} onNav={nav || undefined}/>
        <main className="main">
          <RsMobTop label={mobLabel || 'Financeiro'}/>
          <window.Topbar eyebrow={eyebrow} title={title} sub={sub} primaryAction={primaryAction}/>
          {children}
        </main>
        <RsTabbar active={active} onNav={nav}/>
        <button className="rs-fab" onClick={() => nav && nav('entradas')}><window.Icons.plus size={24}/></button>
      </div>
    </div>
  );
}

window.ResponsiveShell = ResponsiveShell;
