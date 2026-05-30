// CMEApp — protótipo navegável (router por estado).
// Clicar na sidebar (desktop) ou na tab bar (mobile) troca a página.
// A página ativa fica salva no localStorage para sobreviver a refresh.

function CMEApp() {
  const [page, setPage] = React.useState(() => {
    try { return localStorage.getItem('cme-page') || 'dashboard'; } catch { return 'dashboard'; }
  });

  const nav = React.useCallback((id) => {
    setPage(id);
    try { localStorage.setItem('cme-page', id); } catch {}
  }, []);

  const PAGES = {
    dashboard:   window.DashboardFem,
    entradas:    window.EntradasPage,
    pendentes:   window.AReceberPage,
    saidas:      window.SaidasPage,
    assinaturas: window.AssinaturasPage,
    metas:       window.MetasPage,
    relatorio:   window.RelatorioPage,
    trafego:     window.TrafegoPage,
    comissao:    window.ComissaoPage,
  };
  const Page = PAGES[page] || window.DashboardFem;

  return (
    <window.NavContext.Provider value={nav}>
      {/* key={page} → remonta ao navegar, resetando o scroll do main */}
      <div style={{ width: '100%', height: '100%' }} key={page}>
        <Page/>
      </div>
    </window.NavContext.Provider>
  );
}

window.CMEApp = CMEApp;
