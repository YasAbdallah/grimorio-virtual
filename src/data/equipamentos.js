// Catálogo de equipamento do D&D 5ª edição (PHB 2014) + espaços de equipamento.

// Espaços do corpo onde os itens podem ser equipados
export const SLOTS = [
  { id: 'cabeca', nome: 'Cabeça', fantasma: '🪖', pos: { top: '5%', left: '15%' } },
  { id: 'costas', nome: 'Costas', fantasma: '🎒', pos: { top: '14%', right: '7%' } },
  { id: 'torso', nome: 'Torso', fantasma: '🦺', pos: { top: '40%', left: '2%' } },
  { id: 'mao-secundaria', nome: 'Mão secundária', fantasma: '🛡️', pos: { top: '58%', left: '8%' } },
  { id: 'mao-principal', nome: 'Mão primária', fantasma: '🗡️', pos: { top: '50%', right: '5%' } },
  { id: 'cinto', nome: 'Cinto', fantasma: '👝', pos: { bottom: '12%', right: '13%' } },
]

export const SLOT_PADRAO = 'mao-principal'

export const TIPOS = [
  'Armas simples',
  'Armas marciais',
  'Armaduras',
  'Escudos',
  'Equipamento de aventura',
  'Ferramentas',
  'Munição',
  'Pacotes',
]

export const CATALOGO = [
  // Armas simples
  { nome: 'Clava', tipo: 'Armas simples', slot: 'mao-principal', icone: '🪵' },
  { nome: 'Adaga', tipo: 'Armas simples', slot: 'mao-principal', icone: '🗡️' },
  { nome: 'Machadinha', tipo: 'Armas simples', slot: 'mao-principal', icone: '🪓' },
  { nome: 'Maça', tipo: 'Armas simples', slot: 'mao-principal', icone: '🔨' },
  { nome: 'Martelo leve', tipo: 'Armas simples', slot: 'mao-principal', icone: '🔨' },
  { nome: 'Foice', tipo: 'Armas simples', slot: 'mao-principal', icone: '🌾' },
  { nome: 'Lança', tipo: 'Armas simples', slot: 'mao-principal', icone: '🗡️' },
  { nome: 'Bastão', tipo: 'Armas simples', slot: 'mao-principal', icone: '🪄' },
  { nome: 'Azagaia', tipo: 'Armas simples', slot: 'mao-principal', icone: '🎯' },
  { nome: 'Dardo', tipo: 'Armas simples', slot: 'mao-principal', icone: '🎯' },
  { nome: 'Funda', tipo: 'Armas simples', slot: 'mao-principal', icone: '🪀' },
  { nome: 'Besta leve', tipo: 'Armas simples', slot: 'mao-principal', icone: '🏹' },
  { nome: 'Arco curto', tipo: 'Armas simples', slot: 'mao-principal', icone: '🏹' },

  // Armas marciais
  { nome: 'Espada longa', tipo: 'Armas marciais', slot: 'mao-principal', icone: '⚔️' },
  { nome: 'Espada curta', tipo: 'Armas marciais', slot: 'mao-principal', icone: '🗡️' },
  { nome: 'Rapieira', tipo: 'Armas marciais', slot: 'mao-principal', icone: '⚔️' },
  { nome: 'Cimitarra', tipo: 'Armas marciais', slot: 'mao-principal', icone: '⚔️' },
  { nome: 'Espada grande', tipo: 'Armas marciais', slot: 'mao-principal', icone: '⚔️' },
  { nome: 'Machado grande', tipo: 'Armas marciais', slot: 'mao-principal', icone: '🪓' },
  { nome: 'Machado de batalha', tipo: 'Armas marciais', slot: 'mao-principal', icone: '🪓' },
  { nome: 'Martelo de guerra', tipo: 'Armas marciais', slot: 'mao-principal', icone: '🔨' },
  { nome: 'Picareta de guerra', tipo: 'Armas marciais', slot: 'mao-principal', icone: '⛏️' },
  { nome: 'Alabarda', tipo: 'Armas marciais', slot: 'mao-principal', icone: '⚔️' },
  { nome: 'Tridente', tipo: 'Armas marciais', slot: 'mao-principal', icone: '🔱' },
  { nome: 'Arco longo', tipo: 'Armas marciais', slot: 'mao-principal', icone: '🏹' },
  { nome: 'Besta pesada', tipo: 'Armas marciais', slot: 'mao-principal', icone: '🏹' },

  // Armaduras
  { nome: 'Acolchoada (leve)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Couro (leve)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Couro batido (leve)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Peles (média)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Camisa de malha (média)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Cota de escamas (média)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Brunea (média)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Peitoral (média)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Meia-armadura (média)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Cota de malha (pesada)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Cota de talas (pesada)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },
  { nome: 'Armadura de placas (pesada)', tipo: 'Armaduras', slot: 'torso', icone: '🦺' },

  // Escudos
  { nome: 'Escudo', tipo: 'Escudos', slot: 'mao-secundaria', icone: '🛡️' },

  // Equipamento de aventura
  { nome: 'Mochila', tipo: 'Equipamento de aventura', slot: 'costas', icone: '🎒' },
  { nome: 'Saco de dormir', tipo: 'Equipamento de aventura', slot: 'costas', icone: '🛏️' },
  { nome: 'Corda (15 m)', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🪢' },
  { nome: 'Tocha', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🔥' },
  { nome: 'Facho', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🔦' },
  { nome: 'Rações (1 dia)', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🍖' },
  { nome: 'Cantil', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🧴' },
  { nome: 'Pederneira e aço', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🪨' },
  { nome: 'Vasilha de aço', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🥣' },
  { nome: 'Óleo (frasco)', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🧪' },
  { nome: 'Frasco de tinta e pena', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🖋️' },
  { nome: 'Espelho de aço', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🪞' },
  { nome: 'Cordão com gancho', tipo: 'Equipamento de aventura', slot: 'cinto', icone: '🪝' },

  // Ferramentas
  { nome: 'Ferramentas de ladrão', tipo: 'Ferramentas', slot: 'cinto', icone: '🧰' },
  { nome: 'Kit de disfarces', tipo: 'Ferramentas', slot: 'cinto', icone: '🎭' },
  { nome: 'Kit de falsificação', tipo: 'Ferramentas', slot: 'cinto', icone: '📜' },
  { nome: 'Kit de herbalismo', tipo: 'Ferramentas', slot: 'cinto', icone: '🌿' },
  { nome: 'Ferramentas de ferreiro', tipo: 'Ferramentas', slot: 'cinto', icone: '⚒️' },
  { nome: 'Laúde', tipo: 'Ferramentas', slot: 'costas', icone: '🪕' },

  // Munição
  { nome: 'Flechas (20)', tipo: 'Munição', slot: 'cinto', icone: '🏹' },
  { nome: 'Virotes (20)', tipo: 'Munição', slot: 'cinto', icone: '🏹' },
  { nome: 'Pedras de funda (20)', tipo: 'Munição', slot: 'cinto', icone: '🪨' },

  // Pacotes
  { nome: 'Pacote de diplomata', tipo: 'Pacotes', slot: 'costas', icone: '💼' },
  { nome: 'Pacote de erudito', tipo: 'Pacotes', slot: 'costas', icone: '🎒' },
  { nome: 'Pacote de sacerdote', tipo: 'Pacotes', slot: 'costas', icone: '🎒' },
  { nome: 'Pacote de explorador', tipo: 'Pacotes', slot: 'costas', icone: '🎒' },
  { nome: 'Pacote de assaltante', tipo: 'Pacotes', slot: 'costas', icone: '🎒' },
  { nome: 'Pacote de masmorra', tipo: 'Pacotes', slot: 'costas', icone: '🎒' },
  { nome: 'Pacote de aventureiro', tipo: 'Pacotes', slot: 'costas', icone: '🎒' },
]

export function catalogoDe(nome) {
  const texto = String(nome).toLowerCase()
  return (
    CATALOGO.find((item) => item.nome.toLowerCase() === texto) ??
    // Equivalência parcial: "Cota de malha" → "Cota de malha (pesada)", etc.
    CATALOGO.find((item) => item.nome.toLowerCase().startsWith(texto)) ??
    null
  )
}

// Ícone para itens fora do catálogo (equipamento inicial descritivo, itens personalizados…)
const PALAVRAS_ICONE = [
  [/adaga|dardo|foice/, '🗡️'],
  [/espada|rapieira|cimitarra|alabarda/, '⚔️'],
  [/arco|besta|flecha|virote/, '🏹'],
  [/machado/, '🪓'],
  [/martelo|maça/, '🔨'],
  [/lança|azagaia|tridente|azagaias|dardos/, '🔱'],
  [/bastão|clava/, '🪵'],
  [/escudo/, '🛡️'],
  [/couro|malha|armadura|brunea|peitoral|placas|peles|acolchoada/, '🦺'],
  [/pacote|mochila/, '🎒'],
  [/grimório|grimorio|livro/, '📕'],
  [/símbolo|simbolo|amuleto/, '🧿'],
  [/foco/, '🔮'],
  [/tocha|facho|lanterna/, '🔥'],
  [/corda/, '🪢'],
  [/ração|racoes|rações/, '🍖'],
  [/ferramentas|kit/, '🧰'],
]

export function iconeDe(nome) {
  const item = catalogoDe(nome)
  if (item) return item.icone
  const texto = String(nome).toLowerCase()
  for (const [padrao, icone] of PALAVRAS_ICONE) {
    if (padrao.test(texto)) return icone
  }
  return '📦'
}

// Espaço de equipamento padrão para um item (catálogo → slot; resto → mão primária)
export function slotPadraoDe(nome) {
  return catalogoDe(nome)?.slot ?? SLOT_PADRAO
}
