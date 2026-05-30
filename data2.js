// CME Financeiro — datasets for the internal pages (Maio 2026)
// Consistent with data.js (entradas R$ 18.430, saídas R$ 4.280)

window.CME_DATA2 = {
  /* ---------- SAÍDAS (despesas e investimentos) ---------- */
  saidas: [
    { date: '02/05', cat: 'Tráfego Pago',     desc: 'Meta Ads — campanha Dia das Mães', fornecedor: 'Meta',            nicho: 'geral',  valor: 850.00, recorrente: false },
    { date: '04/05', cat: 'Salários/Pró-labore', desc: 'Pró-labore Carol & Mônica',     fornecedor: '—',               nicho: 'geral',  valor: 1200.00, recorrente: true },
    { date: '06/05', cat: 'Assinaturas',      desc: 'Canva Pro · CapCut · ChatGPT',     fornecedor: 'Várias',          nicho: 'geral',  valor: 184.00, recorrente: true },
    { date: '08/05', cat: 'Tráfego Pago',     desc: 'Promover TikTok — Reels mochilas', fornecedor: 'TikTok',          nicho: 'baby',   valor: 420.00, recorrente: false },
    { date: '11/05', cat: 'Produtos para Teste', desc: 'Kit beleza p/ review',          fornecedor: 'Amazon',          nicho: 'geral',  valor: 320.00, recorrente: false },
    { date: '14/05', cat: 'Equipamentos',     desc: 'Ring light + tripé articulado',    fornecedor: 'Mercado Livre',   nicho: 'geral',  valor: 380.00, recorrente: false },
    { date: '17/05', cat: 'Serviços Terceiros', desc: 'Edição de vídeo (freelancer)',   fornecedor: 'Freela · João',   nicho: 'geral',  valor: 300.00, recorrente: false },
    { date: '20/05', cat: 'Marketing',        desc: 'Sorteio de seguidores — brindes',  fornecedor: '—',               nicho: 'geral',  valor: 250.00, recorrente: false },
    { date: '24/05', cat: 'Impostos/DAS',     desc: 'DAS Maio (MEI)',                   fornecedor: 'Receita Federal', nicho: 'geral',  valor: 76.00,  recorrente: true },
    { date: '27/05', cat: 'Tráfego Pago',     desc: 'Pinterest Ads — eletros casa',     fornecedor: 'Pinterest',       nicho: 'geral',  valor: 300.00, recorrente: false },
  ],

  saidaCatColor: {
    'Tráfego Pago': '#1E3A6E', 'Salários/Pró-labore': '#F2C12E', 'Assinaturas': '#D95F80',
    'Produtos para Teste': '#4BAB8A', 'Equipamentos': '#C97B3F', 'Serviços Terceiros': '#8A9E6E',
    'Marketing': '#E07060', 'Impostos/DAS': '#5C5C88', 'Outros': '#9a9aac',
  },

  /* ---------- ASSINATURAS (recorrentes) ---------- */
  assinaturas: [
    { nome: 'Canva Pro',     cat: 'Design',        plano: 'Anual',  mensal: 41.58,  anual: 499.00, renova: '12/2026', status: 'ativa', forma: 'Cartão' },
    { nome: 'Meta Verified', cat: 'Social',        plano: 'Mensal', mensal: 110.00, anual: 1320.00,renova: '05/06',   status: 'ativa', forma: 'Cartão' },
    { nome: 'CapCut Pro',    cat: 'Edição',        plano: 'Mensal', mensal: 49.90,  anual: 598.80, renova: '03/06',   status: 'ativa', forma: 'Cartão' },
    { nome: 'ChatGPT Plus',  cat: 'IA',            plano: 'Mensal', mensal: 100.00, anual: 1200.00,renova: '18/06',   status: 'ativa', forma: 'Cartão' },
    { nome: 'ManyChat Pro',  cat: 'Automação',     plano: 'Mensal', mensal: 75.00,  anual: 900.00, renova: '22/06',   status: 'ativa', forma: 'PIX' },
    { nome: 'mLabs',         cat: 'Agendamento',   plano: 'Anual',  mensal: 49.90,  anual: 598.80, renova: '09/2026', status: 'teste', forma: 'Cartão' },
    { nome: 'Google One',    cat: 'Armazenamento', plano: 'Mensal', mensal: 9.90,   anual: 118.80, renova: '14/06',   status: 'ativa', forma: 'Automático' },
    { nome: 'Linktree Pro',  cat: 'Bio / Link',    plano: 'Mensal', mensal: 24.00,  anual: 288.00, renova: '—',       status: 'cancelada', forma: 'Cartão' },
  ],

  /* ---------- METAS (versão completa da página) ---------- */
  metasFull: [
    { title: 'Faturamento Maio',        tipo: 'Receita',     target: 20000, current: 18430.50, unit: 'R$', nicho: 'geral',  prazo: '31/05', status: 'andamento' },
    { title: 'Comissões Baby (Q2)',     tipo: 'Receita',     target: 6000,  current: 4920,     unit: 'R$', nicho: 'baby',   prazo: '30/06', status: 'andamento' },
    { title: 'Resultado líquido Maio',  tipo: 'Lucro',       target: 13000, current: 14150.50, unit: 'R$', nicho: 'geral',  prazo: '31/05', status: 'atingida' },
    { title: 'Novos seguidores TikTok', tipo: 'Crescimento', target: 5000,  current: 3840,     unit: 'Nº', nicho: 'geral',  prazo: '31/05', status: 'andamento' },
    { title: 'Seguidores Instagram',    tipo: 'Crescimento', target: 2000,  current: 1247,     unit: 'Nº', nicho: 'baby',   prazo: '31/05', status: 'abaixo' },
    { title: 'Posts publicados',        tipo: 'Conteúdo',    target: 60,    current: 47,       unit: 'Qtd',nicho: 'geral',  prazo: '31/05', status: 'andamento' },
    { title: 'Taxa de conversão média', tipo: 'Performance', target: 6,     current: 7.2,      unit: '%',  nicho: 'geral',  prazo: '31/05', status: 'atingida' },
    { title: 'Reduzir % de taxas',      tipo: 'Eficiência',  target: 4,     current: 4.8,      unit: '%',  nicho: 'geral',  prazo: '30/06', status: 'abaixo' },
  ],

  /* ---------- TRÁFEGO PAGO (investimento por canal) ---------- */
  trafego: [
    { canal: 'Meta (Instagram e Facebook)', curto: 'Meta',      valor: 850.00, cliques: 1480, conv: 96, color: '#1E3A6E' },
    { canal: 'Promover (TikTok)',           curto: 'TikTok',    valor: 420.00, cliques: 980,  conv: 62, color: '#D95F80' },
    { canal: 'Pinterest Ads',               curto: 'Pinterest', valor: 300.00, cliques: 540,  conv: 38, color: '#E07060' },
    { canal: 'Turbinar (Instagram)',        curto: 'Turbinar',  valor: 180.00, cliques: 320,  conv: 22, color: '#4BAB8A' },
    { canal: 'Sorteios',                    curto: 'Sorteios',  valor: 100.00, cliques: 160,  conv: 14, color: '#C97B3F' },
  ],

  /* ---------- COMISSÃO (calendário diário de Maio) ---------- */
  // valor recebido em comissão por dia (R$). 0 = sem lançamento
  comissaoDia: [
    0, 420, 680, 0, 0, 540, 910, 1240, 380, 741, 0, 0, 1273, 620,
    1980, 0, 0, 581, 840, 2698, 460, 0, 950, 1748, 1120, 0, 0, 1340, 720, 880, 410,
  ],
  metaDiaria: 650,
  metaMensal: 20000,

  /* ---------- RELATÓRIO ---------- */
  receitaPorLoja: [
    { name: 'Amazon',        value: 5260, color: '#F2C12E' },
    { name: 'Mercado Livre', value: 3890, color: '#1E3A6E' },
    { name: 'Shein',         value: 2980, color: '#D95F80' },
    { name: 'Shopee',        value: 2340, color: '#E07060' },
    { name: 'Direto',        value: 2140, color: '#2D6A4F' },
    { name: 'Dafiti',        value: 1820, color: '#C97B3F' },
  ],
  receitaPorNicho: [
    { name: 'Geral CME', value: 8230, color: '#F2C12E' },
    { name: 'Baby',      value: 6850, color: '#D97B8A' },
    { name: 'Book',      value: 3350, color: '#8A9E6E' },
  ],
  // Resumo acumulado 2026 (Jan→Mai)
  resumo2026: { entradas: 79230, saidas: 19820, liquido: 59410, meses: 5, melhorMes: 'Dezembro', ticketMedio: 1124 },
};
