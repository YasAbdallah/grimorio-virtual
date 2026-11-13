import { useState } from 'react'
import Stepper from './Stepper'
import { CATALOGO, SLOTS, TIPOS, catalogoDe, slotPadraoDe } from '../data/equipamentos'

function ListaItens({ titulo, vazio, itens, destaque, aoEquipar, aoAlterarQtd, aoRemover }) {
  return (
    <div className="rounded-lg border border-ink/20 bg-white/40 p-4">
      <h3 className="font-display text-sm font-bold tracking-wide text-ink/80 uppercase">
        {titulo}
      </h3>

      {itens.length === 0 ? (
        <p className="mt-3 text-sm text-ink/50 italic">{vazio}</p>
      ) : (
        <ul className="mt-3 divide-y divide-ink/10">
          {itens.map((item) => (
            <li key={item.id} className="flex items-center gap-2 py-2">
              <span
                className={`min-w-0 flex-1 truncate text-sm text-ink ${
                  destaque ? 'font-semibold' : ''
                }`}
                title={item.nome}
              >
                {item.nome}
                {destaque && item.slot && (
                  <span className="ml-1 text-xs text-ink/45">
                    ({SLOTS.find((s) => s.id === item.slot)?.nome})
                  </span>
                )}
              </span>

              <Stepper
                value={item.qtd}
                onChange={(novoValor) => aoAlterarQtd(item.id, novoValor)}
                min={1}
                variante="light"
                tamanho="sm"
                ariaLabel={`Quantidade de ${item.nome}`}
              />

              <button
                onClick={() => aoEquipar(item.id)}
                className="rounded border border-gold/70 px-2 py-1 font-display text-xs tracking-wide text-ink transition-colors hover:bg-gold/25"
              >
                {destaque ? 'Guardar' : 'Equipar'}
              </button>

              <button
                onClick={() => aoRemover(item.id)}
                aria-label={`Remover ${item.nome}`}
                className="text-ink/40 transition-colors hover:text-ember"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Inventario({ itens, setItens }) {
  const [nomeCustom, setNomeCustom] = useState('')
  const [catalogoEscolhido, setCatalogoEscolhido] = useState('')
  const [qtd, setQtd] = useState(1)

  const equipados = itens.filter((i) => (i.local ?? 'mochila') === 'equipado')
  const mochila = itens.filter((i) => (i.local ?? 'mochila') === 'mochila')
  const totalMochila = mochila.reduce((soma, i) => soma + i.qtd, 0)

  const itemCatalogo = catalogoDe(catalogoEscolhido)
  const usandoCustom = nomeCustom.trim().length > 0

  // Equipa um item em um espaço; o ocupante anterior do espaço volta para a mochila
  function moverParaSlot(id, slot) {
    setItens((atual) => {
      let proximo = atual.map((i) => (i.id === id ? { ...i, local: 'equipado', slot } : i))
      proximo = proximo.map((i) =>
        i.id !== id && i.local === 'equipado' && i.slot === slot
          ? { ...i, local: 'mochila', slot: null }
          : i,
      )
      return proximo
    })
  }

  function desequipar(id) {
    setItens((atual) =>
      atual.map((i) => (i.id === id ? { ...i, local: 'mochila', slot: null } : i)),
    )
  }

  // Equipar/Guardar a partir das listas
  function alternarEquipamento(id) {
    const item = itens.find((i) => i.id === id)
    if (!item) return
    if ((item.local ?? 'mochila') === 'equipado') {
      desequipar(id)
    } else {
      moverParaSlot(id, item.slot ?? slotPadraoDe(item.nome))
    }
  }

  function adicionar(destino) {
    const nome = usandoCustom ? nomeCustom.trim() : itemCatalogo?.nome
    if (!nome) return
    const quantidade = Number(qtd) || 1

    setItens((atual) => {
      if (destino === 'equipado') {
        const slot = itemCatalogo?.slot ?? slotPadraoDe(nome)
        // Ocupante anterior do espaço volta para a mochila
        const proximo = atual.map((i) =>
          i.local === 'equipado' && i.slot === slot ? { ...i, local: 'mochila', slot: null } : i,
        )
        const mesmoEquipado = proximo.find((i) => i.nome === nome && i.local === 'equipado')
        if (mesmoEquipado) {
          return proximo.map((i) =>
            i.id === mesmoEquipado.id ? { ...i, qtd: i.qtd + quantidade } : i,
          )
        }
        return [
          ...proximo,
          { id: crypto.randomUUID(), nome, qtd: quantidade, local: 'equipado', slot },
        ]
      }

      const existente = atual.find((i) => i.nome === nome && (i.local ?? 'mochila') === 'mochila')
      if (existente) {
        return atual.map((i) => (i.id === existente.id ? { ...i, qtd: i.qtd + quantidade } : i))
      }
      return [...atual, { id: crypto.randomUUID(), nome, qtd: quantidade, local: 'mochila', slot: null }]
    })

    setNomeCustom('')
    setCatalogoEscolhido('')
    setQtd(1)
  }

  function alterarQtd(id, novoValor) {
    setItens(
      itens.map((i) => (i.id === id ? { ...i, qtd: Math.max(1, Number(novoValor) || 1) } : i)),
    )
  }

  function remover(id) {
    setItens(itens.filter((i) => i.id !== id))
  }

  return (
    <section className="parchment-bg rounded-xl border border-gold/60 p-6 shadow-xl">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl font-bold text-ink">Inventário</h2>
        <span className="text-xs text-ink/60">
          {totalMochila} itens na mochila · {equipados.length} equipados
        </span>
      </div>

      {/* Formulário de novo item */}
      <div className="mt-4 space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={nomeCustom}
            onChange={(e) => setNomeCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                adicionar('mochila')
              }
            }}
            placeholder="Item personalizado… ou escolha do catálogo abaixo"
            className="flex-1 rounded border border-ink/30 bg-white/60 px-3 py-2 text-sm text-ink placeholder-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={catalogoEscolhido}
            onChange={(e) => setCatalogoEscolhido(e.target.value)}
            className="flex-1 rounded border border-ink/30 bg-white/60 px-2 py-2 text-sm text-ink focus:border-gold focus:outline-none"
            aria-label="Catálogo de equipamento D&D 5e"
          >
            <option value="">— catálogo D&amp;D 5e —</option>
            {TIPOS.map((tipo) => (
              <optgroup key={tipo} label={tipo}>
                {CATALOGO.filter((i) => i.tipo === tipo).map((i) => (
                  <option key={i.nome} value={i.nome}>
                    {i.nome}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <Stepper
            value={qtd}
            onChange={setQtd}
            min={1}
            max={99}
            variante="light"
            tamanho="sm"
            ariaLabel="Quantidade do novo item"
          />

          <button
            onClick={() => adicionar('equipado')}
            disabled={!usandoCustom && !itemCatalogo}
            className="rounded bg-gold px-4 py-2 font-display text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-40"
          >
            Equipar
          </button>
          <button
            onClick={() => adicionar('mochila')}
            disabled={!usandoCustom && !itemCatalogo}
            className="rounded border border-ink/40 px-4 py-2 font-display text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-ink/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Guardar
          </button>
        </div>

        {itemCatalogo && !usandoCustom && (
          <p className="text-xs text-ink/50">
            {itemCatalogo.nome} · espaço:{' '}
            {SLOTS.find((s) => s.id === itemCatalogo.slot)?.nome ?? '—'}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <ListaItens
          titulo="⚔️ Equipado"
          vazio="Nada equipado — mãos vazias, coragem de sobe."
          itens={equipados}
          destaque
          aoEquipar={alternarEquipamento}
          aoAlterarQtd={alterarQtd}
          aoRemover={remover}
        />
        <ListaItens
          titulo="🎒 Na mochila"
          vazio="Mochila vazia. O mestre agradece… por enquanto."
          itens={mochila}
          aoEquipar={alternarEquipamento}
          aoAlterarQtd={alterarQtd}
          aoRemover={remover}
        />
      </div>
    </section>
  )
}
