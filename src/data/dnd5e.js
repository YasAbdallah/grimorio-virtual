// Dados e regras de D&D 5ª edição (Player's Handbook 2014), em português.

export const ATRIBUTOS_5E = [
  { id: 'forca', nome: 'Força', abrev: 'FOR' },
  { id: 'destreza', nome: 'Destreza', abrev: 'DES' },
  { id: 'constituicao', nome: 'Constituição', abrev: 'CON' },
  { id: 'inteligencia', nome: 'Inteligência', abrev: 'INT' },
  { id: 'sabedoria', nome: 'Sabedoria', abrev: 'SAB' },
  { id: 'carisma', nome: 'Carisma', abrev: 'CAR' },
]

export const ARRAY_PADRAO = [15, 14, 13, 12, 10, 8]

export const CUSTO_COMPRA = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 }
export const PONTOS_COMPRA = 27

export const RACAS = [
  {
    id: 'anao',
    nome: 'Anão',
    velocidade: 25,
    bonus: { constituicao: 2 },
    subracas: [
      { id: 'anao-colina', nome: 'Anão da Colina', bonus: { sabedoria: 1 } },
      { id: 'anao-montanha', nome: 'Anão da Montanha', bonus: { forca: 2 } },
    ],
  },
  {
    id: 'elfo',
    nome: 'Elfo',
    velocidade: 30,
    bonus: { destreza: 2 },
    subracas: [
      { id: 'elfo-alto', nome: 'Alto Elfo', bonus: { inteligencia: 1 } },
      { id: 'elfo-floresta', nome: 'Elfo da Floresta', bonus: { sabedoria: 1 }, velocidade: 35 },
      { id: 'drow', nome: 'Drow', bonus: { carisma: 1 } },
    ],
  },
  {
    id: 'halfling',
    nome: 'Halfling',
    velocidade: 25,
    bonus: { destreza: 2 },
    subracas: [
      { id: 'halfling-pes-leves', nome: 'Pés Leves', bonus: { carisma: 1 } },
      { id: 'halfling-robusto', nome: 'Robusto', bonus: { constituicao: 1 } },
    ],
  },
  {
    id: 'humano',
    nome: 'Humano',
    velocidade: 30,
    bonus: { forca: 1, destreza: 1, constituicao: 1, inteligencia: 1, sabedoria: 1, carisma: 1 },
  },
  {
    id: 'draconato',
    nome: 'Draconato',
    velocidade: 30,
    bonus: { forca: 2, carisma: 1 },
  },
  {
    id: 'gnomo',
    nome: 'Gnomo',
    velocidade: 30,
    bonus: { inteligencia: 2 },
    subracas: [
      { id: 'gnomo-rochas', nome: 'Gnomo das Rochas', bonus: { constituicao: 1 } },
      { id: 'gnomo-floresta', nome: 'Gnomo da Floresta', bonus: { destreza: 1 } },
    ],
  },
  {
    id: 'meio-elfo',
    nome: 'Meio-elfo',
    velocidade: 30,
    bonus: { carisma: 2 },
    bonusExtra: 1, // +1 em um atributo à escolha (exceto Carisma)
  },
  {
    id: 'meio-orc',
    nome: 'Meio-orc',
    velocidade: 30,
    bonus: { forca: 2, constituicao: 1 },
  },
  {
    id: 'tiefling',
    nome: 'Tiefling',
    velocidade: 30,
    bonus: { inteligencia: 1, carisma: 2 },
  },
]

export const CLASSES = [
  {
    id: 'barbaro',
    nome: 'Bárbaro',
    dadoVida: 12,
    salvaguardas: ['forca', 'constituicao'],
    pericias: {
      qtd: 2,
      lista: ['adestrar-animais', 'atletismo', 'intimidacao', 'natureza', 'percepcao', 'sobrevivencia'],
    },
    equipamento: ['Machado grande', '2 machadinhas', '4 azagaias', 'Pacote de explorador'],
  },
  {
    id: 'bardo',
    nome: 'Bardo',
    dadoVida: 8,
    salvaguardas: ['destreza', 'carisma'],
    pericias: { qtd: 3, lista: 'qualquer' },
    equipamento: ['Rapieira', 'Pacote de diplomata', 'Lute (instrumento musical)', 'Armadura de couro'],
  },
  {
    id: 'clerigo',
    nome: 'Clérigo',
    dadoVida: 8,
    salvaguardas: ['sabedoria', 'carisma'],
    pericias: { qtd: 2, lista: ['historia', 'intuicao', 'medicina', 'persuasao', 'religiao'] },
    equipamento: ['Maça', 'Cota de malha', 'Escudo', 'Símbolo sagrado', 'Pacote de sacerdote'],
  },
  {
    id: 'druida',
    nome: 'Druida',
    dadoVida: 8,
    salvaguardas: ['inteligencia', 'sabedoria'],
    pericias: {
      qtd: 2,
      lista: ['adestrar-animais', 'arcanismo', 'intuicao', 'medicina', 'natureza', 'percepcao', 'religiao', 'sobrevivencia'],
    },
    equipamento: ['Bastão', 'Armadura de couro', 'Pacote de explorador', 'Foco druídico'],
  },
  {
    id: 'guerreiro',
    nome: 'Guerreiro',
    dadoVida: 10,
    salvaguardas: ['forca', 'constituicao'],
    pericias: {
      qtd: 2,
      lista: ['acrobacia', 'adestrar-animais', 'atletismo', 'historia', 'intuicao', 'intimidacao', 'percepcao', 'sobrevivencia'],
    },
    equipamento: ['Cota de malha', 'Arma marcial + escudo', '2 armas marciais', 'Machado grande', 'Pacote de masmorra'],
  },
  {
    id: 'monge',
    nome: 'Monge',
    dadoVida: 8,
    salvaguardas: ['forca', 'destreza'],
    pericias: { qtd: 2, lista: ['acrobacia', 'atletismo', 'furtividade', 'historia', 'intuicao', 'religiao'] },
    equipamento: ['Espada curta', '10 dardos', 'Pacote de explorador'],
  },
  {
    id: 'paladino',
    nome: 'Paladino',
    dadoVida: 10,
    salvaguardas: ['sabedoria', 'carisma'],
    pericias: { qtd: 2, lista: ['atletismo', 'intimidacao', 'intuicao', 'medicina', 'persuasao', 'religiao'] },
    equipamento: ['Arma marcial + escudo', 'Cota de malha', '5 azagaias', 'Símbolo sagrado', 'Pacote de sacerdote'],
  },
  {
    id: 'patrulheiro',
    nome: 'Patrulheiro',
    dadoVida: 10,
    salvaguardas: ['forca', 'destreza'],
    pericias: {
      qtd: 3,
      lista: ['adestrar-animais', 'atletismo', 'furtividade', 'natureza', 'percepcao', 'sobrevivencia'],
    },
    equipamento: ['Brunea', '2 espadas curtas', 'Arco longo + 20 flechas', 'Pacote de explorador'],
  },
  {
    id: 'ladino',
    nome: 'Ladino',
    dadoVida: 8,
    salvaguardas: ['destreza', 'inteligencia'],
    pericias: {
      qtd: 4,
      lista: ['acrobacia', 'atletismo', 'atuacao', 'enganacao', 'furtividade', 'intimidacao', 'intuicao', 'investigacao', 'percepcao', 'persuasao', 'prestidigitacao'],
    },
    equipamento: ['Rapieira', 'Arco curto + 20 flechas', '2 adagas', 'Ferramentas de ladrão', 'Pacote de assaltante'],
  },
  {
    id: 'feiticeiro',
    nome: 'Feiticeiro',
    dadoVida: 6,
    salvaguardas: ['constituicao', 'carisma'],
    pericias: { qtd: 2, lista: ['arcanismo', 'enganacao', 'intimidacao', 'intuicao', 'persuasao', 'religiao'] },
    equipamento: ['Besta leve + 20 virotes', '2 adagas', 'Foco arcano', 'Pacote de aventureiro'],
  },
  {
    id: 'bruxo',
    nome: 'Bruxo',
    dadoVida: 8,
    salvaguardas: ['sabedoria', 'carisma'],
    pericias: { qtd: 2, lista: ['arcanismo', 'enganacao', 'historia', 'intimidacao', 'investigacao', 'natureza', 'religiao'] },
    equipamento: ['Besta leve + 20 virotes', '2 adagas', 'Foco arcano', 'Pacote de erudito'],
  },
  {
    id: 'mago',
    nome: 'Mago',
    dadoVida: 6,
    salvaguardas: ['inteligencia', 'sabedoria'],
    pericias: { qtd: 2, lista: ['arcanismo', 'historia', 'intuicao', 'investigacao', 'medicina', 'religiao'] },
    equipamento: ['Besta leve + 20 virotes', '2 adagas', 'Grimório', 'Foco arcano', 'Pacote de erudito'],
  },
]

export const PERICIAS_5E = [
  { id: 'acrobacia', nome: 'Acrobacia', atributo: 'destreza' },
  { id: 'adestrar-animais', nome: 'Adestrar Animais', atributo: 'sabedoria' },
  { id: 'arcanismo', nome: 'Arcanismo', atributo: 'inteligencia' },
  { id: 'atletismo', nome: 'Atletismo', atributo: 'forca' },
  { id: 'atuacao', nome: 'Atuação', atributo: 'carisma' },
  { id: 'enganacao', nome: 'Enganação', atributo: 'carisma' },
  { id: 'furtividade', nome: 'Furtividade', atributo: 'destreza' },
  { id: 'historia', nome: 'História', atributo: 'inteligencia' },
  { id: 'intimidacao', nome: 'Intimidação', atributo: 'carisma' },
  { id: 'intuicao', nome: 'Intuição', atributo: 'sabedoria' },
  { id: 'investigacao', nome: 'Investigação', atributo: 'inteligencia' },
  { id: 'medicina', nome: 'Medicina', atributo: 'sabedoria' },
  { id: 'natureza', nome: 'Natureza', atributo: 'inteligencia' },
  { id: 'percepcao', nome: 'Percepção', atributo: 'sabedoria' },
  { id: 'persuasao', nome: 'Persuasão', atributo: 'carisma' },
  { id: 'religiao', nome: 'Religião', atributo: 'inteligencia' },
  { id: 'prestidigitacao', nome: 'Prestidigitação', atributo: 'destreza' },
  { id: 'sobrevivencia', nome: 'Sobrevivência', atributo: 'sabedoria' },
]

export const ANTECEDENTES = [
  { id: 'acolito', nome: 'Acólito', pericias: ['intuicao', 'religiao'] },
  { id: 'artesao-guilda', nome: 'Artesão de Guilda', pericias: ['intuicao', 'persuasao'] },
  { id: 'charlatao', nome: 'Charlatão', pericias: ['enganacao', 'prestidigitacao'] },
  { id: 'criminoso', nome: 'Criminoso', pericias: ['enganacao', 'furtividade'] },
  { id: 'eremita', nome: 'Eremita', pericias: ['medicina', 'religiao'] },
  { id: 'heroi-do-povo', nome: 'Herói do Povo', pericias: ['adestrar-animais', 'sobrevivencia'] },
  { id: 'nobre', nome: 'Nobre', pericias: ['historia', 'persuasao'] },
  { id: 'orfao', nome: 'Órfão', pericias: ['prestidigitacao', 'furtividade'] },
  { id: 'sabio', nome: 'Sábio', pericias: ['arcanismo', 'historia'] },
  { id: 'soldado', nome: 'Soldado', pericias: ['atletismo', 'intimidacao'] },
]

export const ARMADURAS = [
  { id: 'nenhuma', nome: 'Sem armadura', base: 10, cap: null },
  // Armaduras leves: CA = base + mod. Destreza (sem limite)
  { id: 'acolchoada', nome: 'Acolchoada (leve)', base: 11, cap: null },
  { id: 'couro', nome: 'Couro (leve)', base: 11, cap: null },
  { id: 'couro-batido', nome: 'Couro batido (leve)', base: 12, cap: null },
  // Armaduras médias: CA = base + mod. Destreza (máx. +2)
  { id: 'peles', nome: 'Peles (média)', base: 12, cap: 2 },
  { id: 'camisa-malha', nome: 'Camisa de malha (média)', base: 13, cap: 2 },
  { id: 'cota-escamas', nome: 'Cota de escamas (média)', base: 14, cap: 2 },
  { id: 'brunea', nome: 'Brunea (média)', base: 14, cap: 2 },
  { id: 'peitoral', nome: 'Peitoral (média)', base: 14, cap: 2 },
  { id: 'meia-armadura', nome: 'Meia-armadura (média)', base: 15, cap: 2 },
  // Armaduras pesadas: CA fixa (Destreza não se aplica)
  { id: 'cota-malha', nome: 'Cota de malha (pesada)', base: 16, cap: 0 },
  { id: 'cota-talas', nome: 'Cota de talas (pesada)', base: 17, cap: 0 },
  { id: 'placas', nome: 'Armadura de placas (pesada)', base: 18, cap: 0 },
]

// ---------- Regras / cálculos ----------

export function bonusProficiencia(nivel) {
  const n = Number(nivel) || 1
  if (n >= 17) return 6
  if (n >= 13) return 5
  if (n >= 9) return 4
  if (n >= 5) return 3
  return 2
}

export function classeDe(ficha) {
  return CLASSES.find((c) => c.id === ficha.classe) ?? null
}

export function racaDe(ficha) {
  return RACAS.find((r) => r.id === ficha.raca) ?? null
}

export function antecedenteDe(ficha) {
  return ANTECEDENTES.find((a) => a.id === ficha.antecedente) ?? null
}

// Soma dos bônus de atributo da raça (raça + subraça + bônus à escolha)
export function bonusRaca(ficha) {
  const zerado = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }
  const raca = racaDe(ficha)
  if (!raca) return zerado

  const bonus = { ...zerado, ...raca.bonus }
  const subraca = raca.subracas?.find((s) => s.id === ficha.subraca)
  if (subraca) {
    for (const [attr, valor] of Object.entries(subraca.bonus)) bonus[attr] += valor
  }
  if (raca.bonusExtra && ficha.attrExtra in bonus) {
    bonus[ficha.attrExtra] += raca.bonusExtra
  }
  return bonus
}

// Valor base do atributo, conforme o método de geração
export function valorBase(ficha, attrId) {
  if (ficha.metodo === 'padrao' || ficha.metodo === 'rolagem') {
    const indice = ficha.atribuicao?.[attrId]
    return indice == null ? null : (ficha.valoresBase?.[indice] ?? null)
  }
  // compra de pontos e livre usam o valor digitado/definido diretamente
  const valor = Number(ficha.atributos?.[attrId])
  return Number.isNaN(valor) ? null : valor
}

export function valorFinal(ficha, attrId) {
  const base = valorBase(ficha, attrId)
  if (base == null) return null
  return base + (bonusRaca(ficha)[attrId] || 0)
}

export function modDe(valor) {
  if (valor == null) return null
  return Math.floor((valor - 10) / 2)
}

export function sinal(n) {
  if (n == null) return '—'
  return n >= 0 ? `+${n}` : `${n}`
}

export function totalCustoCompra(ficha) {
  return ATRIBUTOS_5E.reduce((soma, { id }) => {
    const base = valorBase(ficha, id)
    return soma + (base == null ? 0 : (CUSTO_COMPRA[base] ?? 0))
  }, 0)
}

// HP no nível 1: valor máximo do dado + mod. CON; níveis seguintes: média + 1 + mod. CON
export function calcularHP(ficha) {
  const classe = classeDe(ficha)
  if (!classe) return null
  const conMod = modDe(valorFinal(ficha, 'constituicao'))
  if (conMod == null) return null
  const nivel = Number(ficha.nivel) || 1
  const hp = classe.dadoVida + conMod + (nivel - 1) * (Math.floor(classe.dadoVida / 2) + 1 + conMod)
  return Math.max(1, hp)
}

// CA conforme armadura equipada, escudo e mod. Destreza
export function calcularCA(ficha) {
  const armadura = ARMADURAS.find((a) => a.id === ficha.armadura) ?? ARMADURAS[0]
  const dexMod = modDe(valorFinal(ficha, 'destreza')) ?? 0
  const dexAplicado = armadura.cap == null ? dexMod : Math.min(dexMod, armadura.cap)
  return armadura.base + Math.max(0, dexAplicado) + (ficha.escudo ? 2 : 0)
}

// Velocidade da raça (subraça pode sobrescrever, ex.: Elfo da Floresta)
export function velocidade(ficha) {
  const raca = racaDe(ficha)
  if (!raca) return null
  const subraca = raca.subracas?.find((s) => s.id === ficha.subraca)
  return subraca?.velocidade ?? raca.velocidade
}
