import Stepper from './Stepper'
import {
  ATRIBUTOS_5E,
  ARRAY_PADRAO,
  CUSTO_COMPRA,
  PONTOS_COMPRA,
  bonusRaca,
  bonusProficiencia,
  classeDe,
  modDe,
  sinal,
  totalCustoCompra,
  valorBase,
  valorFinal,
} from '../data/dnd5e'

const METODOS = [
  { id: 'padrao', nome: 'Array padrão', dica: 'Distribua 15, 14, 13, 12, 10 e 8 entre os atributos.' },
  { id: 'compra', nome: 'Compra de pontos', dica: '27 pontos. Cada valor custa conforme a tabela do PHB.' },
  { id: 'rolagem', nome: 'Rolagem 4d6', dica: 'Role 4d6 e descarte o menor, seis vezes.' },
  { id: 'livre', nome: 'Livre', dica: 'Digite os valores manualmente.' },
]

function rolar4d6() {
  const rolagens = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
  rolagens.sort((a, b) => b - a)
  return rolagens[0] + rolagens[1] + rolagens[2]
}

function novaRolada() {
  return {
    id: crypto.randomUUID(),
    criadoEm: Date.now(),
    valores: Array.from({ length: 6 }, rolar4d6),
  }
}

function atualizar(ficha, setFicha, mudancas) {
  setFicha((atual) => ({ ...atual, ...mudancas(atual) }))
}

function atribuir(ficha, setFicha, attrId, indiceTexto) {
  const indice = indiceTexto === '' ? null : Number(indiceTexto)
  atualizar(ficha, setFicha, (atual) => ({ atribuicao: { ...atual.atribuicao, [attrId]: indice } }))
}

export default function AtributosSection({ ficha, setFicha }) {
  const racal = bonusRaca(ficha)
  const classe = classeDe(ficha)
  const metodo = METODOS.find((m) => m.id === ficha.metodo) ?? METODOS[0]

  // Roladas salvas (persiste no localStorage junto com a ficha)
  const roladas = ficha.roladas || []
  const roladaSelecionadaId = ficha.roladaSelecionadaId || null
  const roladaAtiva = roladas.find((r) => r.id === roladaSelecionadaId) ?? roladas[roladas.length - 1] ?? null
  const valoresParaAtribuir = roladaAtiva?.valores ?? []

  const indicesUsados = new Set(
    Object.values(ficha.atribuicao || {}).filter((i) => i != null),
  )

  function mudarMetodo(id) {
    atualizar(ficha, setFicha, (atual) => {
      const base = { ...atual, metodo: id }
      if (id === 'padrao') {
        return { ...base, valoresBase: [...ARRAY_PADRAO], atribuicao: {} }
      }
      if (id === 'rolagem') {
        // Mantém as roladas salvas, só limpa a atribuição
        return { ...base, atribuicao: {} }
      }
      if (id === 'compra') {
        return {
          ...base,
          atributos: { forca: 8, destreza: 8, constituicao: 8, inteligencia: 8, sabedoria: 8, carisma: 8 },
        }
      }
      return base
    })
  }

  function rolarNovamente() {
    const nova = novaRolada()
    atualizar(ficha, setFicha, (atual) => {
      const todas = [...(atual.roladas || []), nova]
      return {
        ...atual,
        roladas: todas,
        roladaSelecionadaId: nova.id,
        atribuicao: {},
      }
    })
  }

  function selecionarRolada(id) {
    atualizar(ficha, setFicha, (atual) => ({
      ...atual,
      roladaSelecionadaId: id,
      atribuicao: {},
    }))
  }

  function removerRolada(id) {
    atualizar(ficha, setFicha, (atual) => {
      const todas = (atual.roladas || []).filter((r) => r.id !== id)
      const selecionada = atual.roladaSelecionadaId === id ? (todas[todas.length - 1]?.id ?? null) : atual.roladaSelecionadaId
      return {
        ...atual,
        roladas: todas,
        roladaSelecionadaId: selecionada,
        atribuicao: {},
      }
    })
  }

  // Impede gastar mais pontos do que os 27 disponíveis
  function podeGastar(baseAtual, novo) {
    const custoAtual = CUSTO_COMPRA[baseAtual] ?? 0
    const custoNovo = CUSTO_COMPRA[novo] ?? 99
    return custoNovo - custoAtual <= PONTOS_COMPRA - totalCustoCompra(ficha)
  }

  const pontosRestantes = PONTOS_COMPRA - totalCustoCompra(ficha)

  return (
    <section className="parchment-bg rounded-xl border border-gold/60 p-6 shadow-xl">
      <h2 className="font-display text-xl font-bold text-ink">Atributos (D&D 5e)</h2>

      {/* Seletor de método */}
      <div className="mt-4 flex flex-wrap gap-2">
        {METODOS.map((m) => (
          <button
            key={m.id}
            onClick={() => mudarMetodo(m.id)}
            className={`rounded px-3 py-1.5 font-display text-sm tracking-wide transition-colors ${
              ficha.metodo === m.id
                ? 'bg-gold text-ink'
                : 'border border-ink/30 text-ink/70 hover:border-gold hover:text-ink'
            }`}
          >
            {m.nome}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink/60">{metodo.dica}</p>

      {/* Ferramentas por método */}
      {ficha.metodo === 'rolagem' && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={rolarNovamente}
              className="rounded border border-ink/40 px-3 py-1.5 font-display text-xs tracking-wide text-ink transition-colors hover:bg-ink/10"
            >
              🎲 Nova rolagem
            </button>
            <span className="text-xs text-ink/50">
              {roladas.length} salv{'a'}{roladas.length !== 1 ? 'as' : ''}
            </span>
          </div>

          {/* Lista de roladas salvas */}
          <div className="max-h-48 overflow-y-auto border border-ink/20 rounded-lg p-2 bg-white/10">
            {roladas.length === 0 ? (
              <p className="text-xs text-ink/50 italic text-center py-2">Nenhuma rolada ainda.</p>
            ) : (
              <div className="space-y-1">
                {roladas.map((r) => {
                  const ativa = r.id === roladaSelecionadaId
                  const todosAtribuidos = r.valores.every((_, i) =>
                    Object.values(ficha.atribuicao || {}).includes(i),
                  )
                  return (
                    <button
                      key={r.id}
                      onClick={() => selecionarRolada(r.id)}
                      className={`flex items-center justify-between gap-2 rounded border px-2 py-1.5 text-xs transition-colors ${
                        ativa
                          ? 'border-gold bg-gold/15 font-semibold text-ink'
                          : 'border-ink/20 bg-white/30 text-ink/70 hover:border-gold hover:bg-white/50'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1">
                          {r.valores.map((v) => (
                            <span
                              key={v}
                              className={`rounded border px-1 py-0.5 text-[10px] font-bold ${
                                v >= 15 ? 'border-forest/50 bg-forest/15 text-forest' : 'border-ink/30 bg-white/50 text-ink/70'
                              }`}
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-[10px] text-ink/50">Soma:</span>
                          <span className="text-[10px] font-bold text-ink">
                            {r.valores.reduce((a, b) => a + b, 0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {ativa && (
                          <span className="text-[10px] font-bold text-forest">✦ Em uso</span>
                        )}
                        {todosAtribuidos && (
                          <span className="text-[10px] font-bold text-gold">✓ Distribuída</span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removerRolada(r.id)
                          }}
                          className="rounded border border-ember/40 px-1 py-0.5 text-[10px] text-ember hover:bg-ember/20"
                          title="Remover rolada"
                        >
                          ✕
                        </button>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {roladaAtiva && (
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="font-display text-xs font-semibold text-ink/80">
                Valores da rolada selecionada:
              </span>
              {valoresParaAtribuir.map((valor, i) => {
                const dono = ATRIBUTOS_5E.find(
                  ({ id }) => ficha.atribuicao?.[id] === i,
                )
                return (
                  <span
                    key={i}
                    className={`rounded border px-2 py-1 text-xs font-bold ${
                      dono ? 'border-gold/60 bg-gold/20 text-ink' : 'border-ink/25 bg-white/50 text-ink/70'
                    }`}
                    title={dono ? `Atribuído a ${dono.nome}` : 'Disponível'}
                  >
                    {valor}
                    {dono ? ` → ${dono.abrev}` : ''}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      )}
      {ficha.metodo === 'compra' && (
        <p className="mt-3 font-display text-sm font-semibold text-ink">
          Pontos restantes:{' '}
          <span className={pontosRestantes === 0 ? 'text-forest' : 'text-ember'}>
            {pontosRestantes}
          </span>
          /{PONTOS_COMPRA}
        </p>
      )}

      {/* Linhas de atributos */}
      <div className="mt-5 space-y-3">
        {ATRIBUTOS_5E.map(({ id, nome, abrev }) => {
          const base = valorBase(ficha, id)
          const final = valorFinal(ficha, id)
          const bonus = racal[id] || 0
          const mod = modDe(final)

          return (
            <div
              key={id}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-ink/20 bg-white/40 px-4 py-3"
            >
              <div className="w-28 shrink-0">
                <p className="font-display text-sm font-semibold text-ink">{nome}</p>
                <p className="text-xs text-ink/50">{abrev}</p>
              </div>

              {/* Controle por método */}
              {(ficha.metodo === 'padrao' || ficha.metodo === 'rolagem') && (
                <select
                  value={ficha.atribuicao?.[id] ?? ''}
                  onChange={(e) => atribuir(ficha, setFicha, id, e.target.value)}
                  className="rounded border border-ink/30 bg-white/70 px-2 py-1.5 text-sm text-ink focus:border-gold focus:outline-none"
                  disabled={!roladaAtiva}
                >
                  <option value="">— atribuir valor —</option>
                  {valoresParaAtribuir.map((valor, i) =>
                    indicesUsados.has(i) && ficha.atribuicao?.[id] !== i ? null : (
                      <option key={i} value={i}>
                        {valor}
                      </option>
                    ),
                  )}
                </select>
              )}

              {ficha.metodo === 'compra' && (
                <div className="flex items-center gap-2">
                  <Stepper
                    value={base ?? 8}
                    onChange={(novoValor) =>
                      atualizar(ficha, setFicha, (atual) => ({
                        atributos: { ...atual.atributos, [id]: Number(novoValor) },
                      }))
                    }
                    min={8}
                    max={15}
                    variante="light"
                    tamanho="sm"
                    editavel={false}
                    podeMudar={(novo) => podeGastar(base ?? 8, novo)}
                    ariaLabel={`Base de ${nome}`}
                  />
                  <span className="text-xs text-ink/50">(custo {CUSTO_COMPRA[base] ?? '—'})</span>
                </div>
              )}

              {ficha.metodo === 'livre' && (
                <Stepper
                  value={ficha.atributos[id] ?? ''}
                  onChange={(novoValor) =>
                    atualizar(ficha, setFicha, (atual) => ({
                      atributos: { ...atual.atributos, [id]: novoValor },
                    }))
                  }
                  min={1}
                  max={30}
                  variante="light"
                  ariaLabel={`Valor de ${nome}`}
                />
              )}

              {/* Resultado */}
              <div className="ml-auto flex items-center gap-3">
                {bonus !== 0 && (
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
                      bonus > 0
                        ? 'border-forest/50 bg-forest/15 text-forest'
                        : 'border-ember/50 bg-ember/15 text-ember'
                    }`}
                    title="Bônus racial"
                  >
                    raça {sinal(bonus)}
                  </span>
                )}
                <span className="text-sm text-ink/60">
                  base {base ?? '—'} = <strong className="text-ink">{final ?? '—'}</strong>
                </span>
                <span className="rounded bg-ink px-2 py-1 font-display text-sm font-bold text-gold-bright">
                  mod. {sinal(mod)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Salvaguardas */}
      <div className="mt-6 border-t border-ink/15 pt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-sm font-bold tracking-wide text-ink/80 uppercase">
            Salvaguardas
          </h3>
          <span className="text-xs text-ink/60">
            Proficiência: {classe ? classe.nome : 'sem classe'} · Bônus{' '}
            {sinal(bonusProficiencia(ficha.nivel))}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {ATRIBUTOS_5E.map(({ id, abrev }) => {
            const proficiente = classe?.salvaguardas?.includes(id)
            const mod = modDe(valorFinal(ficha, id)) ?? 0
            const total = mod + (proficiente ? bonusProficiencia(ficha.nivel) : 0)
            return (
              <div
                key={id}
                className={`flex items-center justify-between rounded border px-3 py-2 text-sm ${
                  proficiente
                    ? 'border-gold/60 bg-gold/15 font-semibold text-ink'
                    : 'border-ink/20 bg-white/40 text-ink/70'
                }`}
              >
                <span>
                  {proficiente ? '✦ ' : ''}
                  {abrev}
                </span>
                <span className="font-bold">{sinal(total)}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
