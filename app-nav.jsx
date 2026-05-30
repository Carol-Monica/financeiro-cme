// CMEApp — router + contexto global de período e sincronização.
// CMEAppContext fornece: period, setPeriod, isSyncing, sync, availablePeriods, lastSync, syncError

window.CMEAppContext = React.createContext({
  period: null, setPeriod: () => {}, isSyncing: false, sync: () => {},
  availablePeriods: [], lastSync: null, syncError: null,
});

function CMEApp() {
  const [page, setPage] = React.useState(() => {
    try { return localStorage.getItem('cme-page') || 'dashboard'; } catch { return 'dashboard'; }
  });
  const [syncVersion, setSyncVersion]     = React.useState(0);
  const [isSyncing, setIsSyncing]         = React.useState(false);
  const [syncError, setSyncError]         = React.useState(null);
  const [availablePeriods, setAvailableP] = React.useState([]);
  const [period, setPeriodState]          = React.useState(null);
  const [lastSync, setLastSync]           = React.useState(null);

  // Salva cópia dos dados mock na primeira carga
  React.useEffect(() => {
    if (!window.CME_DATA_MOCK)  window.CME_DATA_MOCK  = JSON.parse(JSON.stringify(window.CME_DATA));
    if (!window.CME_DATA2_MOCK) window.CME_DATA2_MOCK = JSON.parse(JSON.stringify(window.CME_DATA2));
  }, []);

  const nav = React.useCallback((id) => {
    setPage(id);
    try { localStorage.setItem('cme-page', id); } catch {}
  }, []);

  const applyPeriod = React.useCallback((raw, p) => {
    if (!raw || !window.buildCMEData) return;
    window.CME_DATA  = window.buildCMEData(raw, p);
    window.CME_DATA2 = window.buildCMEData2(raw, p);
    setSyncVersion(v => v + 1);
  }, []);

  const setPeriod = React.useCallback((p) => {
    setPeriodState(p);
    if (window.CME_RAW) applyPeriod(window.CME_RAW, p);
  }, [applyPeriod]);

  const sync = React.useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncError(null);
    try {
      const raw = await window.fetchSheetData();
      const periods = window.getAvailablePeriods(raw);
      setAvailableP(periods);
      const current = period || (periods.length > 0 ? periods[0] : null);
      setPeriodState(current);
      applyPeriod(raw, current);
      setLastSync(new Date());
    } catch (e) {
      setSyncError(e.message);
      console.error('[CME Sync]', e);
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, period, applyPeriod]);

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

  const ctx = { period, setPeriod, isSyncing, sync, availablePeriods, lastSync, syncError };

  return (
    <window.CMEAppContext.Provider value={ctx}>
      <window.NavContext.Provider value={nav}>
        {/* key inclui syncVersion → remonta páginas quando dados mudam */}
        <div style={{ width: '100%', height: '100%' }} key={page + '-' + syncVersion}>
          <Page/>
        </div>
      </window.NavContext.Provider>
    </window.CMEAppContext.Provider>
  );
}

window.CMEApp = CMEApp;
