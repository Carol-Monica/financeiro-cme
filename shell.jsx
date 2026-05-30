// ResponsiveShell — wrapper único que serve desktop + PWA mobile.
// Desktop: sidebar lateral (reaproveita window.Sidebar).
// Mobile (container ≤760px): top app bar + bottom tab bar + FAB.
// Navegação: via window.NavContext (setPage). Quando não há provider,
// os cliques são inertes (modo canvas / telas isoladas).

window.NavContext = React.createContext(null);

const RS_TABS = [
  { id: 'dashboard', icon: 'dashboard', label: 'Início' },
  { id: 'entradas',  icon: 'inflow',    label: 'Entradas' },
  { id: 'saidas',    icon: 'outflow',   label: 'Saídas' },
  { id: 'metas',     icon: 'target',    label: 'Metas' },
  { id: 'relatorio', icon: 'chart',     label: 'Mais' },
];

function RsMobTop({ label }) {
  return (
    <div className="rs-mobtop">
      <img className="logo" src="assets/logo-app.png" alt="CME"/>
      <div className="txt">
        <div className="t">CME · <em>{label}</em></div>
        <div className="s">Carol &amp; Mônica · sincronizado</div>
      </div>
      <span className="period">
        <window.Icons.cal size={13}/> Maio
        <window.Icons.chev size={13}/>
      </span>
    </div>
  );
}

function RsTabbar({ active, onNav }) {
  const ids = RS_TABS.slice(0, 4).map(t => t.id);
  const activeTab = ids.includes(active) ? active : 'relatorio';
  return (
    <nav className="rs-tabbar">
      {RS_TABS.map(t => (
        <button key={t.id} className={'t ' + (activeTab === t.id ? 'is-active' : '')}
          onClick={() => onNav && onNav(t.id)}>
          {React.createElement(window.Icons[t.icon], { size: 18 })}
          {t.label}
        </button>
      ))}
    </nav>
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
