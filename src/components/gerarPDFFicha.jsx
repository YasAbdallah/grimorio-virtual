import { jsPDF } from 'jspdf'
import { CLASSES, PERICIAS_5E, bonusProficiencia, sinal } from '../data/dnd5e'
import fundo1 from '../assets/ficha/pagina-1.jpg?inline'
import fundo2 from '../assets/ficha/pagina-2.jpg?inline'
import fundo3 from '../assets/ficha/pagina-3.jpg?inline'

// ============================================================
// Ficha de Personagem D&D 5E — usa as páginas oficiais (arte) como
// fundo e desenha os valores da ficha sobre as posições exatas.
// Unidades em pt; página Letter 612×792.
// ============================================================

const TINTA = [30, 26, 22]
const LARGURA = 612
const ALTURA = 792

function num(v) {
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

// Armas do catálogo: dano/tipo pela PHB 2014 e regra de bônus de ataque
// classe: 'corpo' (FOR), 'acuidade' (melhor de FOR/DES), 'distancia' (DES)
const ARMAS_5E = [
  [/espada grande/i, { dano: '2d6 (corte)', classe: 'corpo' }],
  [/machado grande/i, { dano: '1d12 (corte)', classe: 'corpo' }],
  [/alabarda/i, { dano: '1d10 (corte)', classe: 'corpo' }],
  [/arco longo/i, { dano: '1d8 (perfuração)', classe: 'distancia' }],
  [/besta pesada/i, { dano: '1d10 (perfuração)', classe: 'distancia' }],
  [/arco curto/i, { dano: '1d6 (perfuração)', classe: 'distancia' }],
  [/besta leve/i, { dano: '1d8 (perfuração)', classe: 'distancia' }],
  [/funda/i, { dano: '1d4 (contusão)', classe: 'distancia' }],
  [/espada longa/i, { dano: '1d8 (corte)', classe: 'corpo' }],
  [/rapieira/i, { dano: '1d8 (perfuração)', classe: 'acuidade' }],
  [/cimitarra/i, { dano: '1d6 (corte)', classe: 'acuidade' }],
  [/espada curta/i, { dano: '1d6 (perfuração)', classe: 'acuidade' }],
  [/machado de batalha/i, { dano: '1d8 (corte)', classe: 'corpo' }],
  [/martelo de guerra/i, { dano: '1d8 (contusão)', classe: 'corpo' }],
  [/picareta de guerra/i, { dano: '1d8 (perfuração)', classe: 'corpo' }],
  [/adaga/i, { dano: '1d4 (perfuração)', classe: 'acuidade' }],
  [/dardo/i, { dano: '1d4 (perfuração)', classe: 'distancia' }],
  [/machadinha/i, { dano: '1d6 (corte)', classe: 'corpo' }],
  [/maça/i, { dano: '1d6 (contusão)', classe: 'corpo' }],
  [/martelo leve/i, { dano: '1d4 (contusão)', classe: 'corpo' }],
  [/foice/i, { dano: '1d4 (corte)', classe: 'corpo' }],
  [/lança/i, { dano: '1d6 (perfuração)', classe: 'corpo' }],
  [/bastão/i, { dano: '1d6 (contusão)', classe: 'corpo' }],
  [/azagaia/i, { dano: '1d6 (perfuração)', classe: 'corpo' }],
  [/tridente/i, { dano: '1d6 (perfuração)', classe: 'corpo' }],
  [/clava/i, { dano: '1d4 (contusão)', classe: 'corpo' }],
]

function dadosArma(nome) {
  return ARMAS_5E.find(([re]) => re.test(nome))?.[1] || null
}

export default function gerarPDFFicha(ficha) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: [LARGURA, ALTURA] })

  doc.setProperties({
    title: `Grimório Virtual — Ficha de ${ficha.nome || 'Personagem'} (D&D 5E)`,
    subject: 'Ficha de Personagem D&D 5ª Edição (PHB 2014)',
  })

  function texto(x, y, conteudo, opts = {}) {
    const { tamanho = 8, cor = TINTA, estilo = 'bold', alinhar = 'left' } = opts
    if (conteudo === '' || conteudo == null) return
    doc.setFont('helvetica', estilo)
    doc.setFontSize(tamanho)
    doc.setTextColor(...cor)
    doc.text(String(conteudo), x, y, { align: alinhar })
  }

  function marca(x, y, r = 2.2) {
    doc.setFillColor(...TINTA)
    doc.setLineWidth(0.4)
    doc.circle(x, y, r, 'F')
  }

  // ---------- dados derivados ----------
  const nivel = num(ficha.nivel) || 1
  const prof = bonusProficiencia(nivel)
  const classeObj = CLASSES.find((c) => c.id === ficha.classe)
  const classeNome = classeObj?.nome || ficha.classe || ''
  const salvaguardasClasse = classeObj?.salvaguardas || []
  const dadoVida = classeObj?.dadoVida || 8
  const periciasProf = ficha.pericias || []
  const dinheiro = ficha.dinheiro || { ouro: 0, prata: 0, cobre: 0 }
  const itens = ficha.itens || []

  const modAtributo = (attrId) => {
    const v = num(ficha.atributos?.[attrId])
    return v == null ? 0 : Math.floor((v - 10) / 2)
  }

  const bonusArma = (classe) => {
    const mFor = modAtributo('forca')
    const mDes = modAtributo('destreza')
    if (classe === 'distancia') return prof + mDes
    if (classe === 'acuidade') return prof + Math.max(mFor, mDes)
    return prof + mFor
  }

  const textoRaca = [ficha.raca, ficha.subraca].filter(Boolean).join(' — ')

  // ============================================================
  // PÁGINA 1
  // ============================================================
  doc.addImage(fundo1, 'JPEG', 0, 0, LARGURA, ALTURA)

  // Faixa: nome do personagem
  texto(52, 86, ficha.nome || '', { tamanho: 11 })

  // Cabeçalho (linha + rótulo; valor abaixo do rótulo na 1ª fileira,
  // à direita do rótulo na 2ª fileira, onde é o único espaço do campo)
  texto(271, 84, classeNome ? `${classeNome} ${nivel}` : '', { tamanho: 8.5 })
  texto(383, 84, ficha.antecedente || '', { tamanho: 8.5 })
  texto(296, 100, textoRaca, { tamanho: textoRaca.length > 22 ? 6.5 : 7.5 })
  texto(426, 100, ficha.alinhamento || '', { tamanho: 7.5 })

  // Atributos: valor grande + modificador no oval
  const ATRIBUTOS = [
    { id: 'forca', nome: 'Força' },
    { id: 'destreza', nome: 'Destreza' },
    { id: 'constituicao', nome: 'Constituição' },
    { id: 'inteligencia', nome: 'Inteligência' },
    { id: 'sabedoria', nome: 'Sabedoria' },
    { id: 'carisma', nome: 'Carisma' },
  ]
  ATRIBUTOS.forEach((attr, i) => {
    const yRotulo = 143 + 71.5 * i
    const valor = num(ficha.atributos?.[attr.id])
    if (valor != null) texto(70, yRotulo + 21, String(valor), { tamanho: 15, alinhar: 'center' })
    texto(69, yRotulo + 47.5, sinal(modAtributo(attr.id)), { tamanho: 10, alinhar: 'center' })
  })

  // Testes de resistência (círculo de proficiência + total na linha)
  const ySaves = [206, 219.5, 233, 246.5, 260, 273.5]
  ATRIBUTOS.forEach((attr, i) => {
    const y1 = ySaves[i]
    if (salvaguardasClasse.includes(attr.id)) marca(105, y1 + 5.7)
    const total = salvaguardasClasse.includes(attr.id)
      ? modAtributo(attr.id) + prof
      : modAtributo(attr.id)
    texto(122, y1 + 8.5, sinal(total), { tamanho: 8, alinhar: 'center' })
  })

  // Perícias
  PERICIAS_5E.forEach((pericia, i) => {
    const y1 = 325 + 13.35 * i
    const ehProf = periciasProf.includes(pericia.id)
    if (ehProf) marca(105, y1 + 5.7)
    const total = ehProf ? modAtributo(pericia.atributo) + prof : modAtributo(pericia.atributo)
    texto(122, y1 + 8.5, sinal(total), { tamanho: 7, alinhar: 'center' })
  })

  // Sabedoria passiva e bônus de proficiência
  texto(44.5, 604, String(10 + modAtributo('sabedoria') + (periciasProf.includes('percepcao') ? prof : 0)), { tamanho: 9, alinhar: 'center' })
  texto(105, 184, sinal(prof), { tamanho: 11, alinhar: 'center' })

  // Combate: classe de armadura, iniciativa, deslocamento
  texto(248, 160, ficha.defesa != null && ficha.defesa !== '' ? String(ficha.defesa) : '', { tamanho: 13, alinhar: 'center' })
  texto(303, 161, sinal(modAtributo('destreza')), { tamanho: 12, alinhar: 'center' })
  texto(362, 161, ficha.deslocamento != null && ficha.deslocamento !== '' ? String(ficha.deslocamento) : '', { tamanho: 12, alinhar: 'center' })

  // Pontos de vida
  texto(376, 206, ficha.pvMax != null && ficha.pvMax !== '' ? String(ficha.pvMax) : '', { tamanho: 9, alinhar: 'right' })
  texto(306.5, 238, ficha.pvAtual != null && ficha.pvAtual !== '' ? String(ficha.pvAtual) : '', { tamanho: 14, alinhar: 'center' })

  // Dados de vida
  texto(266, 331, `d${dadoVida}`, { tamanho: 9, alinhar: 'center' })

  // Ataques e magias (3 linhas cinzas + extras abaixo)
  const regexArma = /espada|adaga|machado|maça|martelo|foice|lança|bastão|azagaia|dardo|funda|besta|arco|rapieira|cimitarra|alabarda|tridente|clava|picareta/i
  const armas = itens.filter((it) => regexArma.test(it.nome))
  armas.slice(0, 3).forEach((arma, i) => {
    const y1 = [394, 413, 432][i]
    const info = dadosArma(arma.nome)
    const qtd = num(arma.qtd)
    texto(226, y1 + 9.5, `${arma.nome}${qtd > 1 ? ` ×${qtd}` : ''}`, { tamanho: 6.5 })
    if (info) {
      texto(306, y1 + 9.5, sinal(bonusArma(info.classe)), { tamanho: 6.5, alinhar: 'center' })
      texto(352, y1 + 9.5, info.dano, { tamanho: 5.5, alinhar: 'center' })
    }
  })
  armas.slice(3).forEach((arma, i) => {
    const y = 470 + i * 10
    if (y > 555) return
    const info = dadosArma(arma.nome)
    const partes = [arma.nome]
    if (info) partes.push(`${sinal(bonusArma(info.classe))}, ${info.dano}`)
    texto(226, y, partes.join(' — '), { tamanho: 6, estilo: 'normal' })
  })

  // Moedas
  texto(239, 612, dinheiro.cobre != null ? String(num(dinheiro.cobre) ?? '') : '', { tamanho: 8, alinhar: 'center' })
  texto(239, 638, dinheiro.prata != null ? String(num(dinheiro.prata) ?? '') : '', { tamanho: 8, alinhar: 'center' })
  texto(239, 690, dinheiro.ouro != null ? String(num(dinheiro.ouro) ?? '') : '', { tamanho: 8, alinhar: 'center' })

  // Equipamento (área acima do rótulo EQUIPAMENTO)
  let yEquip = 664
  const itensOrdenados = [
    ...itens.filter((it) => (it.local ?? 'mochila') === 'equipado'),
    ...itens.filter((it) => (it.local ?? 'mochila') === 'mochila'),
  ]
  itensOrdenados.forEach((item) => {
    if (yEquip > 748) return
    const equipado = (item.local ?? 'mochila') === 'equipado'
    const qtd = num(item.qtd)
    const partes = [`• ${item.nome}${qtd > 1 ? ` ×${qtd}` : ''}`]
    const info = equipado ? dadosArma(item.nome) : null
    if (info) partes.push(info.dano)
    texto(266, yEquip, partes.join(' — '), { tamanho: 6.5, estilo: equipado ? 'bold' : 'normal' })
    yEquip += 10
  })

  // Características e habilidades (coluna direita)
  let yCarac = 408
  const linhasCarac = []
  if (ficha.raca) linhasCarac.push(`Raça — ${textoRaca}`)
  if (classeNome) linhasCarac.push(`Classe — ${classeNome} (nível ${nivel}, dado de vida d${dadoVida})`)
  if (ficha.antecedente) linhasCarac.push(`Antecedente — ${ficha.antecedente}`)
  ;(ficha.estados || []).forEach((estado) => linhasCarac.push(`• Condição: ${estado}`))
  linhasCarac.forEach((linha) => {
    if (yCarac > 745) return
    texto(450, yCarac, linha, { tamanho: 6.5, estilo: 'normal' })
    yCarac += 11
  })

  doc.addPage()

  // ============================================================
  // PÁGINA 2 — Aparência e história
  // ============================================================
  doc.addImage(fundo2, 'JPEG', 0, 0, LARGURA, ALTURA)

  texto(52, 86, ficha.nome || '', { tamanho: 11 })

  // Idade / altura / peso / olhos / pele / cabelos (linha à direita do rótulo)
  texto(294, 74, '', { tamanho: 7.5 })
  texto(412, 74, '', { tamanho: 7.5 })
  texto(501, 74, '', { tamanho: 7.5 })
  texto(297, 100, '', { tamanho: 7.5 })
  texto(402, 100, '', { tamanho: 7.5 })
  texto(512, 100, '', { tamanho: 7.5 })

  // Retrato dentro do quadro (NOME/SÍMBOLO da divindade)
  if (ficha.retrato) {
    try {
      const props = doc.getImageProperties(ficha.retrato)
      const proporcao = props.width / props.height
      let largura = 126
      let altura = largura / proporcao
      if (altura > 128) {
        altura = 128
        largura = altura * proporcao
      }
      doc.addImage(ficha.retrato, 'JPEG', 428 + (126 - largura) / 2, 162 + (128 - altura) / 2, largura, altura)
    } catch {
      /* retrato inválido — ignora */
    }
  }

  // História do personagem
  if (ficha.anotacoes) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...TINTA)
    const linhas = doc.splitTextToSize(String(ficha.anotacoes), 178)
    doc.text(linhas.slice(0, 26), 40, 392)
  }

  // Tesouro
  texto(250, 392, `PO ${dinheiro.ouro || 0}    PP ${dinheiro.prata || 0}    PC ${dinheiro.cobre || 0}`, { tamanho: 8 })

  doc.addPage()

  // ============================================================
  // PÁGINA 3 — Magias (folha de preenchimento)
  // ============================================================
  doc.addImage(fundo3, 'JPEG', 0, 0, LARGURA, ALTURA)

  // Faixa: classe de conjurador
  texto(52, 86, classeNome, { tamanho: 11 })

  const nomeArquivo = `grimorio-virtual-ficha-${(ficha.nome || 'personagem').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`
  doc.save(nomeArquivo)
}
