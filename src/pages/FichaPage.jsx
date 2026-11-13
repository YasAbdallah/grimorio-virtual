import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DiceRoller from '../components/DiceRoller'
import Inventario from '../components/Inventario'
import StatusPanel from '../components/StatusPanel'
import AtributosSection from '../components/AtributosSection'
import Retrato from '../components/Retrato'
import Stepper from '../components/Stepper'
import ExportPDFButton from '../components/ExportPDFButton'
import {
  ATRIBUTOS_5E,
  ANTECEDENTES,
  CLASSES,
  PERICIAS_5E,
  RACAS,
  antecedenteDe,
  bonusProficiencia,
  classeDe,
  modDe,
  valorFinal,
  velocidade,
} from '../data/dnd5e'

const CHAVE_FICHA = 'grimorio-ficha'

const fichaVazia = {
  nome: '',
  retrato: '',
  nivel: 1,
  alinhamento: '',
  // D&D 5e
  raca: '',
  subraca: '',
  attrExtra: '',
  classe: '',
  antecedente: '',
  metodo: 'livre',
  valoresBase: [],
  atribuicao: {},
  roladas: [],
  rodaSelecionadaId: null,
  armadura: 'nenhuma',
  escudo: false,
  // Status
  pvMax: '',
  pvAtual: '',
  defesa: '',
  deslocamento: '',
  atributos: { forca: '', destreza: '', constituicao: '', inteligencia: '', sabedoria: '', carisma: '' },
  pericias: [],
  itens: [],
  estados: [],
  dinheiro: { ouro: 0, prata: 0, cobre: 0 },
  anotacoes: '',
}

function carregarFicha() {
  try {
    const salvo = localStorage.getItem(CHAVE_FICHA)
    if (!salvo) return fichaVazia
    return { ...fichaVazia, ...JSON.parse(salvo) }
  } catch {
    return fichaVazia
  }
}

function sinalMod(n) {
  if (n == null) return '—'
  return n >= 0 ? `+${n}` : `${n}`
}

function Campo({ label, ...props }) {
  return (
    <label className="block">
      <span className="font-display text-xs font-semibold tracking-wide text-ink/80">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded border border-ink/30 bg-white/60 px-3 py-2 text-sm text-ink placeholder-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none"
      />
    </label>
  )
}

function CampoStepper({ label, ...props }) {
  return (
    <label className="block">
      <span className="font-display text-xs font-semibold tracking-wide text-ink/80">{label}</span>
      <div className="mt-1">
        <Stepper variante="light" {...props} />
      </div>
    </label>
  )
}

function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="font-display text-xs font-semibold tracking-wide text-ink/80">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded border border-ink/30 bg-white/60 px-3 py-2 text-sm text-ink focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none"
      >
        {children}
      </select>
    </label>
  )
}

export default function FichaPage() {
  const [ficha, setFicha] = useState(carregarFicha)
  const [salvo, setSalvo] = useState(false)

  useEffect(() => {
    localStorage.setItem(CHAVE_FICHA, JSON.stringify(ficha))
    setSalvo(true)
    const timer = setTimeout(() => setSalvo(false), 2000)
    return () => clearTimeout(timer)
  }, [ficha])

  function atualizar(campo, valor) {
    setFicha((atual) => ({ ...atual, [campo]: valor }))
  }

  function atualizarItens(valor) {
    setFicha((atual) => ({
      ...atual,
      itens: typeof valor === 'function' ? valor(atual.itens) : valor,
    }))
  }

  const raca = RACAS.find((r) => r.id === ficha.raca) ?? null
  const classe = classeDe(ficha)
  const antecedente = antecedenteDe(ficha)

  function mudarRaca(idRaca) {
    const novaRaca = RACAS.find((r) => r.id === idRaca) ?? null
    setFicha((atual) => ({
      ...atual,
      raca: idRaca,
      subraca: '',
      attrExtra: '',
      deslocamento: novaRaca ? novaRaca.velocidade : '',
    }))
  }

  function mudarClasse(idClasse) {
    setFicha((atual) => ({ ...atual, classe: idClasse, pericias: [] }))
  }

  function adicionarEquipamentoInicial() {
    if (!classe?.equipamento?.length) return
    setFicha((atual) => {
      const novos = classe.equipamento
        .filter((nome) => !atual.itens.some((i) => i.nome === nome))
        .map((nome) => ({ id: crypto.randomUUID(), nome, qtd: 1, local: 'mochila' }))
      return { ...atual, itens: [...atual.itens, ...novos] }
    })
  }

  // Perícias: proficiente se escolhida na classe ou concedida pelo antecedente
  const periciasClasse = classe?.pericias.lista === 'qualquer' ? PERICIAS_5E.map((p) => p.id) : (classe?.pericias.lista ?? [])
  const periciasAntecedente = antecedente?.pericias ?? []
  const escolhidas = ficha.pericias.filter((id) => periciasClasse.includes(id))
  const proficiente = new Set([...escolhidas, ...periciasAntecedente])

  function alternarPericia(id) {
    const permitida = periciasClasse.includes(id) && !periciasAntecedente.includes(id)
    if (!permitida) return
    setFicha((atual) => {
      const jaEscolhida = atual.pericias.includes(id)
      if (jaEscolhida) return { ...atual, pericias: atual.pericias.filter((p) => p !== id) }
      if (escolhidas.length >= (classe?.pericias.qtd ?? 0)) return atual
      return { ...atual, pericias: [...atual.pericias, id] }
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-[radial-gradient(ellipse_at_center,#2e2418_0%,#17120c_75%)] px-6 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-legend text-4xl text-gold-bright">Ficha de Personagem</h1>
              <p className="mt-2 text-parchment/70">
                Criação seguindo o D&D 5ª edição (PHB 2014). Tudo salvo automaticamente neste
                navegador.
              </p>
            </div>
            <span
              className={`font-display text-sm tracking-wide transition-opacity duration-500 ${
                salvo ? 'text-gold opacity-100' : 'opacity-0'
              }`}
            >
              ✦ Ficha salva
            </span>
            <ExportPDFButton ficha={ficha} />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
            {/* Coluna principal */}
            <div className="space-y-8">
              {/* Identidade */}
              <section className="parchment-bg rounded-xl border border-gold/60 p-6 shadow-xl">
                <h2 className="font-display text-xl font-bold text-ink">Identidade</h2>

                <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4 sm:flex-col sm:gap-2">
                    <Retrato
                      retrato={ficha.retrato}
                      aoDefinir={(valor) => atualizar('retrato', valor)}
                    />
                    <Campo
                      label="Nome do personagem"
                      value={ficha.nome}
                      onChange={(e) => atualizar('nome', e.target.value)}
                      placeholder="Aldric, o Andarilho"
                    />
                  </div>
                  <CampoStepper
                    label="Nível"
                    value={ficha.nivel}
                    onChange={(v) => atualizar('nivel', v)}
                    min={1}
                    max={20}
                    ariaLabel="Nível"
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Select
                    label="Raça"
                    value={ficha.raca}
                    onChange={(e) => mudarRaca(e.target.value)}
                  >
                    <option value="">— escolha uma raça —</option>
                    {RACAS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nome}
                      </option>
                    ))}
                  </Select>

                  {raca?.subracas ? (
                    <Select
                      label="Sub-raça"
                      value={ficha.subraca}
                      onChange={(e) => atualizar('subraca', e.target.value)}
                    >
                      <option value="">— escolha a sub-raça —</option>
                      {raca.subracas.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nome}
                        </option>
                      ))}
                    </Select>
                  ) : null}

                  {raca?.bonusExtra ? (
                    <Select
                      label="+1 em um atributo à escolha"
                      value={ficha.attrExtra}
                      onChange={(e) => atualizar('attrExtra', e.target.value)}
                    >
                      <option value="">— escolha o atributo —</option>
                      {ATRIBUTOS_5E.filter((a) => a.id !== 'carisma').map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.nome}
                        </option>
                      ))}
                    </Select>
                  ) : null}

                  <Select
                    label="Classe"
                    value={ficha.classe}
                    onChange={(e) => mudarClasse(e.target.value)}
                  >
                    <option value="">— escolha uma classe —</option>
                    {CLASSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome} (d{c.dadoVida} de vida)
                      </option>
                    ))}
                  </Select>

                  <Select
                    label="Antecedente"
                    value={ficha.antecedente}
                    onChange={(e) => atualizar('antecedente', e.target.value)}
                  >
                    <option value="">— escolha um antecedente —</option>
                    {ANTECEDENTES.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nome}
                      </option>
                    ))}
                  </Select>

                  <Campo
                    label="Alinhamento"
                    value={ficha.alinhamento}
                    onChange={(e) => atualizar('alinhamento', e.target.value)}
                    placeholder="Ex.: Neutro e bom"
                  />
                  {raca && (
                    <div className="rounded border border-ink/20 bg-white/40 px-3 py-2 text-sm text-ink/75">
                      <span className="font-display font-semibold">Deslocamento da raça:</span>{' '}
                      {velocidade(ficha)} pés
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/15 pt-6 sm:grid-cols-3">
                  <CampoStepper
                    label="Pontos de vida (máx.)"
                    value={ficha.pvMax || 0}
                    onChange={(v) => {
                      const novoMaximo = Number(v) || 0
                      setFicha((atual) => ({
                        ...atual,
                        pvMax: novoMaximo,
                        pvAtual: Math.min(Number(atual.pvAtual) || 0, novoMaximo),
                      }))
                    }}
                    min={0}
                    ariaLabel="Pontos de vida máximos"
                  />
                  <CampoStepper
                    label="Pontos de vida (atuais)"
                    value={ficha.pvAtual || 0}
                    onChange={(v) => atualizar('pvAtual', v)}
                    min={0}
                    max={Number(ficha.pvMax) || 0}
                    ariaLabel="Pontos de vida atuais"
                  />
                  <CampoStepper
                    label="Deslocamento (pés)"
                    value={ficha.deslocamento || 0}
                    onChange={(v) => atualizar('deslocamento', v)}
                    min={0}
                    ariaLabel="Deslocamento"
                  />
                </div>

                {classe?.equipamento?.length ? (
                  <button
                    onClick={adicionarEquipamentoInicial}
                    className="mt-5 rounded border border-ink/40 px-4 py-2 font-display text-sm tracking-wide text-ink transition-colors hover:bg-ink/10"
                  >
                    🎒 Adicionar equipamento inicial do {classe.nome}
                  </button>
                ) : null}
              </section>

              {/* Atributos com métodos de geração */}
              <AtributosSection ficha={ficha} setFicha={setFicha} />

              {/* Perícias */}
              <section className="parchment-bg rounded-xl border border-gold/60 p-6 shadow-xl">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-bold text-ink">Perícias</h2>
                  <span className="text-xs text-ink/60">
                    {classe
                      ? `Escolha ${classe.pericias.qtd} do ${classe.nome} (${escolhidas.length}/${classe.pericias.qtd}) · antecedente: ${antecedente ? antecedente.nome : 'nenhum'}`
                      : 'Escolha uma classe para liberar as perícias de proficiência'}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                  {PERICIAS_5E.map((pericia) => {
                    const prof = proficiente.has(pericia.id)
                    const doAntecedente = periciasAntecedente.includes(pericia.id)
                    const daClasse = periciasClasse.includes(pericia.id)
                    const bloqueada = !prof && (!daClasse || doAntecedente)
                    const mod = modDe(
                      valorFinal(ficha, pericia.atributo),
                    )
                    const total =
                      mod == null ? null : mod + (prof ? bonusProficiencia(ficha.nivel) : 0)
                    const abrev = ATRIBUTOS_5E.find((a) => a.id === pericia.atributo)?.abrev

                    return (
                      <label
                        key={pericia.id}
                        title={
                          doAntecedente
                            ? 'Concedida pelo antecedente'
                            : daClasse
                              ? 'Clique para escolher'
                              : 'Fora da lista desta classe'
                        }
                        className={`flex items-center gap-2 text-sm ${
                          bloqueada ? 'cursor-not-allowed text-ink/40' : 'cursor-pointer text-ink/85'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={prof}
                          disabled={bloqueada}
                          onChange={() => alternarPericia(pericia.id)}
                          className="accent-gold"
                        />
                        <span className={prof ? 'font-semibold' : ''}>{pericia.nome}</span>
                        <span className="text-xs text-ink/45">({abrev})</span>
                        {doAntecedente && (
                          <span className="rounded bg-mystic/15 px-1 text-[10px] font-semibold text-mystic">
                            antec.
                          </span>
                        )}
                        <span className="ml-auto text-xs font-bold text-ink/80">
                          {sinalMod(total)}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </section>

              {/* Inventário estilo jogo */}
              <Inventario itens={ficha.itens} setItens={atualizarItens} />
            </div>

            {/* Coluna lateral */}
            <aside className="space-y-8">
              <DiceRoller />

              <StatusPanel ficha={ficha} setFicha={setFicha} />

              <section className="rounded-xl border border-gold/60 bg-night p-6 shadow-xl">
                <h2 className="font-display text-xl text-gold">Anotações</h2>
                <textarea
                  rows="6"
                  value={ficha.anotacoes}
                  onChange={(e) => atualizar('anotacoes', e.target.value)}
                  placeholder="Missões em andamento, contatos conhecidos, segredos descobertos…"
                  className="mt-4 w-full rounded border border-gold/30 bg-ink/70 px-3 py-2 text-sm text-parchment placeholder-parchment/40 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
                />
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
