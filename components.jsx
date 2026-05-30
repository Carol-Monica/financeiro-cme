// CME Financeiro — shared React components & SVG icons
// Loaded after data.js — uses window.CME_DATA, window.fmtBRL, etc.

const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   Icons — Lucide-style strokes, currentColor
   ============================================================ */
const Icon = ({ d, size = 18, fill = 'none', stroke = 'currentColor', sw = 1.75, viewBox = '0 0 24 24', children, className }) => (
  <svg className={className} width={size} height={size} viewBox={viewBox} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d ? <path d={d}/> : children}
  </svg>
);

const Icons = {
  dashboard: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></Icon>,
  inflow:    (p) => <Icon {...p}><path d="M12 5v14"/><path d="m6 13 6 6 6-6"/></Icon>,
  outflow:   (p) => <Icon {...p}><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></Icon>,
  clock:     (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  bell:      (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></Icon>,
  target:    (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></Icon>,
  chart:     (p) => <Icon {...p}><path d="M3 3v18h18"/><path d="M7 14l4-4 4 3 5-7"/></Icon>,
  megaphone: (p) => <Icon {...p}><path d="M3 11v2a2 2 0 0 0 2 2h2l9 4V5L7 9H5a2 2 0 0 0-2 2z"/><path d="M19 8a4 4 0 0 1 0 8"/></Icon>,
  trending:  (p) => <Icon {...p}><path d="m3 17 6-6 4 4 8-9"/><path d="M14 6h7v7"/></Icon>,
  cloud:     (p) => <Icon {...p}><path d="M17 19a4 4 0 0 0 0-8 6 6 0 0 0-11-2 4 4 0 0 0-1 8"/></Icon>,
  download:  (p) => <Icon {...p}><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></Icon>,
  search:    (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/></Icon>,
  filter:    (p) => <Icon {...p}><path d="M3 5h18l-7 8v6l-4-2v-4z"/></Icon>,
  plus:      (p) => <Icon {...p}><path d="M12 5v14"/><path d="M5 12h14"/></Icon>,
  refresh:   (p) => <Icon {...p}><path d="M21 12a9 9 0 0 1-15.5 6.5L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.5L21 8"/><path d="M3 22v-6h6"/><path d="M21 2v6h-6"/></Icon>,
  cal:       (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/></Icon>,
  chev:      (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>,
  more:      (p) => <Icon {...p}><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></Icon>,
  close:     (p) => <Icon {...p}><path d="M6 6l12 12"/><path d="M18 6L6 18"/></Icon>,
  home:      (p) => <Icon {...p}><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></Icon>,
  bag:       (p) => <Icon {...p}><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></Icon>,
  user:      (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Icon>,
  check:     (p) => <Icon {...p}><path d="m5 12 5 5 9-11"/></Icon>,
  wave:      (p) => <Icon {...p}><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/></Icon>,
};

window.Icon = Icon;
window.Icons = Icons;

/* ============================================================
   Sidebar
   ============================================================ */
const NAV = [
  { id: 'dashboard',  icon: 'dashboard', label: 'Dashboard' },
  { id: 'entradas',   icon: 'inflow',    label: 'Entradas',         count: 23 },
  { id: 'pendentes',  icon: 'clock',     label: 'A Receber',        count: 14 },
  { id: 'saidas',     icon: 'outflow',   label: 'Saídas',           count: 8 },
  { id: 'assinaturas',icon: 'bell',      label: 'Assinaturas',      count: 6 },
  { id: 'metas',      icon: 'target',    label: 'Metas',            count: 4 },
  { id: 'relatorio',  icon: 'chart',     label: 'Relatório' },
  { id: 'trafego',    icon: 'megaphone', label: 'Tráfego Pago' },
  { id: 'comissao',   icon: 'trending',  label: 'Comissão' },
];

function Sidebar({ active = 'dashboard', onNav }) {
  return (
    <aside className="sb">
      <div className="sb-brand">
        <img src="assets/logo-app.png" alt="CME" className="sb-brand-mark sb-brand-photo"/>
        <div style={{minWidth:0}}>
          <div className="sb-brand-name">CME <span style={{opacity:0.55, fontWeight:500}}>—</span> Financeiro</div>
          <div className="sb-brand-sub">Carol &amp; Mônica</div>
        </div>
      </div>

      <div>
        <div className="sb-section-label">Geral</div>
        <nav className="sb-nav">
          {NAV.slice(0,1).map(n => (
            <button key={n.id} className={'sb-item ' + (active === n.id ? 'is-active' : '')} onClick={() => onNav && onNav(n.id)}>
              {React.createElement(Icons[n.icon], { className: 'ic' })}
              <span className="label">{n.label}</span>
              {n.count !== undefined && <span className="count">{n.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="sb-section-label">Movimentos</div>
        <nav className="sb-nav">
          {NAV.slice(1,6).map(n => (
            <button key={n.id} className={'sb-item ' + (active === n.id ? 'is-active' : '')} onClick={() => onNav && onNav(n.id)}>
              {React.createElement(Icons[n.icon], { className: 'ic' })}
              <span className="label">{n.label}</span>
              {n.count !== undefined && <span className="count">{n.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="sb-section-label">Crescimento</div>
        <nav className="sb-nav">
          {NAV.slice(6).map(n => (
            <button key={n.id} className={'sb-item ' + (active === n.id ? 'is-active' : '')} onClick={() => onNav && onNav(n.id)}>
              {React.createElement(Icons[n.icon], { className: 'ic' })}
              <span className="label">{n.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sb-foot">
        <div className="sb-sync">
          <span className="dot"/>
          <span>Google Sheets · sincronizado</span>
        </div>
        <div className="sb-foot-row">
          <div className="sb-avatars">
            <div className="sb-avatar">C</div>
            <div className="sb-avatar b">M</div>
          </div>
          <div className="sb-foot-name">
            <b>Carol &amp; Mônica</b>
            Toledo · PR
          </div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;

/* ============================================================
   Topbar — conectado ao CMEAppContext (sync + período)
   ============================================================ */
function Topbar({ title, eyebrow, sub, primaryAction = null }) {
  const ctx = React.useContext(window.CMEAppContext || React.createContext({}));
  const data = window.CME_DATA;

  // Labels do período atual
  const MN = window.MONTH_NAMES || ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const mLabel = ctx.period ? MN[ctx.period.monthIdx] : (data?.period?.month || 'Maio');
  const yLabel = ctx.period ? ctx.period.year          : (data?.period?.year  || 2026);

  const [showMonth, setShowMonth] = React.useState(false);
  const [showYear,  setShowYear]  = React.useState(false);

  const periods  = ctx.availablePeriods || [];
  const years    = [...new Set(periods.map(p => p.year))].sort((a,b)=>b-a);

  // Fecha dropdowns ao clicar fora
  React.useEffect(() => {
    if (!showMonth && !showYear) return;
    const close = () => { setShowMonth(false); setShowYear(false); };
    document.addEventListener('click', close, true);
    return () => document.removeEventListener('click', close, true);
  }, [showMonth, showYear]);

  const selectPeriod = (p) => { ctx.setPeriod && ctx.setPeriod(p); setShowMonth(false); setShowYear(false); };
  const selectYear   = (y) => {
    const yp = periods.filter(p => p.year === y);
    if (yp.length > 0) selectPeriod(yp[0]);
  };

  return (
    <header className="topbar">
      <div className="topbar-greet">
        {eyebrow && <div className="topbar-eyebrow">{eyebrow}</div>}
        <h1 className="topbar-title" dangerouslySetInnerHTML={{ __html: title }}/>
        {sub && <div className="topbar-sub">{sub}</div>}
      </div>
      <div className="topbar-controls">

        {/* ── Seletor de Mês ── */}
        <div className="period-wrap" onClick={e => e.stopPropagation()}>
          <button className="period-pill" onClick={() => { setShowMonth(v=>!v); setShowYear(false); }}>
            <Icons.cal size={14}/>
            <span className="label">Mês</span>
            <span>{mLabel}</span>
            <Icons.chev size={14} className="chev"/>
          </button>
          {showMonth && (
            <div className="period-dropdown">
              {periods.length === 0
                ? <div className="pd-empty">Sincronize para ver períodos disponíveis</div>
                : periods.map(p => (
                    <button key={`${p.year}-${p.monthIdx}`}
                      className={'pd-item' + (ctx.period?.monthIdx===p.monthIdx && ctx.period?.year===p.year ? ' is-active' : '')}
                      onClick={() => selectPeriod(p)}>
                      {MN[p.monthIdx]}/{p.year}
                    </button>
                  ))
              }
            </div>
          )}
        </div>

        {/* ── Seletor de Ano ── */}
        <div className="period-wrap" onClick={e => e.stopPropagation()}>
          <button className="period-pill" onClick={() => { setShowYear(v=>!v); setShowMonth(false); }}>
            <span className="label">Ano</span>
            <span>{yLabel}</span>
            <Icons.chev size={14} className="chev"/>
          </button>
          {showYear && (
            <div className="period-dropdown">
              {years.length === 0
                ? <div className="pd-empty">Sincronize para ver anos disponíveis</div>
                : years.map(y => (
                    <button key={y}
                      className={'pd-item' + (ctx.period?.year===y ? ' is-active' : '')}
                      onClick={() => selectYear(y)}>
                      {y}
                    </button>
                  ))
              }
            </div>
          )}
        </div>

        {/* ── Botão Sincronizar ── */}
        <button
          className={'btn btn-ghost' + (ctx.isSyncing ? ' is-syncing' : '')}
          onClick={ctx.sync}
          disabled={ctx.isSyncing}
          title={ctx.syncError ? `Erro: ${ctx.syncError}` : (ctx.lastSync ? `Última sync: ${ctx.lastSync.toLocaleTimeString('pt-BR')}` : 'Clique para sincronizar com o Google Sheets')}>
          <Icons.refresh size={14} className={ctx.isSyncing ? 'spin' : ''}/>
          {ctx.isSyncing ? 'Sincronizando…' : 'Sincronizar'}
        </button>

        {primaryAction || <button className="btn btn-primary"><Icons.plus size={14}/>Nova Entrada</button>}
      </div>

      {/* Faixa de erro de sincronização */}
      {ctx.syncError && (
        <div className="sync-error-bar">
          ⚠️ {ctx.syncError}
          {ctx.syncError.includes('pública') && (
            <a href="https://support.google.com/docs/answer/183965" target="_blank" rel="noopener noreferrer">
              Como tornar pública →
            </a>
          )}
        </div>
      )}
    </header>
  );
}

window.Topbar = Topbar;

/* ============================================================
   Niche tag
   ============================================================ */
function NT({ n }) {
  return <span className={'nt ' + n}>{window.CME_NICHO_LABEL[n] || n}</span>;
}
window.NT = NT;

/* ============================================================
   Donut chart (SVG)
   ============================================================ */
function Donut({ data, size = 140, thickness = 22, centerLabel, centerSub }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg className="donut" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-1)" strokeWidth={thickness}/>
      {data.map((d, i) => {
        const len = (d.value / total) * circ;
        const seg = (
          <circle key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={thickness}
            strokeDasharray={`${len} ${circ - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
        offset += len;
        return seg;
      })}
      {centerLabel && (
        <text x={cx} y={cy - 2} textAnchor="middle" className="donut-center">{centerLabel}</text>
      )}
      {centerSub && (
        <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fill: 'var(--ink-muted)', fontWeight: 600 }}>{centerSub}</text>
      )}
    </svg>
  );
}
window.Donut = Donut;

/* ============================================================
   Line chart — Receita × Saídas
   ============================================================ */
function ReceitaSaidasChart({ data, width = 720, height = 240 }) {
  const padL = 44, padR = 16, padT = 14, padB = 30;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const maxY = Math.max(...data.map(d => d.e), ...data.map(d => d.s));
  const yMax = Math.ceil(maxY / 5000) * 5000;
  const x = (i) => padL + (i / (data.length - 1)) * w;
  const y = (v) => padT + h - (v / yMax) * h;
  const path = (key) => data.map((d, i) => (i === 0 ? 'M' : 'L') + x(i) + ',' + y(d[key])).join(' ');
  const areaE = path('e') + ` L ${x(data.length - 1)},${padT + h} L ${x(0)},${padT + h} Z`;

  // Y axis ticks
  const ticks = [0, yMax * 0.5, yMax];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="grad-e" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* gridlines */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} stroke="var(--hairline)"/>
          <text x={padL - 8} y={y(t) + 3} textAnchor="end" fontFamily="var(--font-ui)" fontSize="10" fill="var(--ink-muted)" fontWeight="600">
            {t === 0 ? 'R$ 0' : 'R$ ' + (t / 1000).toFixed(0) + 'k'}
          </text>
        </g>
      ))}
      {/* x labels */}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={height - 8} textAnchor="middle" fontFamily="var(--font-ui)" fontSize="10.5" fill="var(--ink-muted)" fontWeight="600" letterSpacing="0.06em">{d.m}</text>
      ))}
      {/* area + lines */}
      <path d={areaE} fill="url(#grad-e)"/>
      <path d={path('e')} fill="none" stroke="#2D6A4F" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
      <path d={path('s')} fill="none" stroke="#E07060" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="0"/>
      {/* points last */}
      {data.map((d, i) => {
        const last = i === data.length - 1;
        return (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.e)} r={last ? 5 : 2.5} fill={last ? '#fff' : '#2D6A4F'} stroke="#2D6A4F" strokeWidth={last ? 2.5 : 0}/>
          </g>
        );
      })}
      {/* current month value bubble */}
      {(() => {
        const i = data.length - 1;
        const cx = x(i), cy = y(data[i].e);
        return (
          <g transform={`translate(${cx - 76},${cy - 38})`}>
            <rect width="72" height="28" rx="8" fill="#1A1A2E"/>
            <text x="36" y="11" textAnchor="middle" fontFamily="var(--font-ui)" fontSize="8.5" fill="rgba(255,255,255,0.6)" letterSpacing="0.12em" fontWeight="700">MAI · 2026</text>
            <text x="36" y="23" textAnchor="middle" fontFamily="var(--font-ui)" fontSize="13" fill="#fff" fontWeight="700" letterSpacing="-0.005em">R$ {(data[i].e/1000).toFixed(1)}k</text>
          </g>
        );
      })()}
    </svg>
  );
}
window.ReceitaSaidasChart = ReceitaSaidasChart;

Object.assign(window, { Icon, Icons, Sidebar, Topbar, NT, Donut, ReceitaSaidasChart });
