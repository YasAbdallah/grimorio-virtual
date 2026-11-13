import {
  ARMADURAS,
  bonusProficiencia,
  calcularCA,
  calcularHP,
  sinal,
  modDe,
  valorFinal,
} from '../data/dnd5e'
import { slotPadraoDe } from '../data/equipamentos'
import Stepper from './Stepper'

const ESTADOS = [
  { nome: 'Envenenado', icone: '🧪' },
  { nome: 'Atordoado', icone: '💫' },
  { nome: 'Exausto', icone: '😵' },
  { nome: 'Enfurecido', icone: '😤' },
  { nome: 'Enfeitiçado', icone: '🌀' },
  { nome: 'Invisível', icone: '👤' },
  { nome: 'Bênção', icone: '✨' },
  { nome: 'Amaldiçoado', icone: '💀' },
]

function CampoMoeda({ label, simbolo, valor, onChange }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded border border-gold/25 bg-ink/60 px-2 py-2">
      <span className="font-display text-[11px] font-semibold tracking-wide text-gold-bright">
        {simbolo} {label}
      </span>
      <Stepper
        value={valor}
        onChange={onChange}
        min={0}
        variante="dark"
        tamanho="xs"
        ariaLabel={`Moedas de ${label}`}
      />
    </div>
  )
}

// Garante que a armadura/escudo escolhida apareça como item equipado
function equiparItem(setFicha, nomeItem) {
  setFicha((atual) => {
    const slot = slotPadraoDe(nomeItem)
    const existente = atual.itens.find((i) => i.nome === nomeItem)
    let itens
    if (existente) {
      itens = atual.itens.map((i) =>
        i.id === existente.id ? { ...i, local: 'equipado', slot } : i,
      )
    } else {
      itens = [
        ...atual.itens,
        { id: crypto.randomUUID(), nome: nomeItem, qtd: 1, local: 'equipado', slot },
      ]
    }
    // Ocupante anterior do espaço volta para a mochila
    itens = itens.map((i) =>
      i.id !== existente?.id && i.local === 'equipado' && i.slot === slot
        ? { ...i, local: 'mochila', slot: null }
        : i,
    )
    return { ...atual, itens }
  })
}

export default function StatusPanel({ ficha, setFicha }) {
  const pvMax = Number(ficha.pvMax) || 0
  const pvAtual = Math.min(Number(ficha.pvAtual) || 0, pvMax || Infinity)
  const pct = pvMax > 0 ? Math.max(0, Math.min(100, (pvAtual / pvMax) * 100)) : 0

  const hpCalculado = calcularHP(ficha)
  const caCalculada = calcularCA(ficha)
  const dexMod = modDe(valorFinal(ficha, 'destreza'))

  function aplicarPV() {
    if (hpCalculado == null) return
    setFicha((atual) => ({ ...atual, pvMax: hpCalculado, pvAtual: hpCalculado }))
  }

  function aplicarCA() {
    setFicha((atual) => ({ ...atual, defesa: caCalculada }))
  }

  function alternarEstado(nome) {
    setFicha((atual) => ({
      ...atual,
      estados: atual.estados.includes(nome)
        ? atual.estados.filter((e) => e !== nome)
        : [...atual.estados, nome],
    }))
  }

  function atualizarMoeda(moeda, valor) {
    setFicha((atual) => ({
      ...atual,
      dinheiro: { ...atual.dinheiro, [moeda]: Math.max(0, Number(valor) || 0) },
    }))
  }

  return (
    <section className="rounded-xl border border-gold/60 bg-night p-6 shadow-xl">
      <h2 className="font-display text-xl text-gold">Status</h2>

      {/* Proficiência */}
      <p className="mt-3 font-display text-sm tracking-wide text-parchment/90">
        Bônus de proficiência:{' '}
        <span className="font-bold text-gold-bright">{sinal(bonusProficiencia(ficha.nivel))}</span>
      </p>

      {/* Pontos de vida */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between font-display text-sm tracking-wide text-parchment/90">
          <span>Pontos de vida</span>
          <span className="text-gold-bright">
            {ficha.pvAtual || 0} / {ficha.pvMax || 0}
          </span>
        </div>
        <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full border border-gold/40 bg-ink">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              pct > 50 ? 'bg-forest' : pct > 20 ? 'bg-gold' : 'bg-ember'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex justify-center">
          <Stepper
            value={ficha.pvAtual || 0}
            onChange={(novoValor) => setFicha((atual) => ({ ...atual, pvAtual: novoValor }))}
            min={0}
            max={pvMax}
            variante="dark"
            ariaLabel="Pontos de vida atuais"
          />
        </div>
        <p className="mt-1 text-center text-xs text-parchment/50">
          Limitado ao PV máximo{pvMax === 0 ? ' (defina um PV máximo primeiro)' : ''}
        </p>
        <button
          onClick={aplicarPV}
          disabled={hpCalculado == null}
          className="mt-2 w-full rounded border border-forest/60 px-3 py-1.5 font-display text-xs tracking-wide text-parchment transition-colors hover:bg-forest/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Aplicar PV calculado{hpCalculado != null ? ` (${hpCalculado})` : ''}
        </button>
      </div>

      {/* Classe de armadura */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between font-display text-sm tracking-wide text-parchment/90">
          <span>Classe de armadura</span>
          <span className="text-gold-bright">{ficha.defesa || '—'}</span>
        </div>
        <select
          value={ficha.armadura}
          onChange={(e) => {
            const armadura = ARMADURAS.find((a) => a.id === e.target.value)
            setFicha((atual) => ({ ...atual, armadura: e.target.value }))
            if (armadura && armadura.id !== 'nenhuma') equiparItem(setFicha, armadura.nome)
          }}
          className="mt-2 w-full rounded border border-gold/30 bg-ink/70 px-3 py-1.5 text-sm text-parchment focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none"
        >
          {ARMADURAS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome} — base {a.base}
              {a.cap === null ? ' + Des' : a.cap > 0 ? ` + Des (máx. ${sinal(a.cap)})` : ''}
            </option>
          ))}
        </select>
        <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-parchment/80">
          <input
            type="checkbox"
            checked={ficha.escudo}
            onChange={(e) => {
              setFicha((atual) => ({ ...atual, escudo: e.target.checked }))
              if (e.target.checked) equiparItem(setFicha, 'Escudo')
            }}
            className="accent-gold"
          />
          🛡️ Escudo (+2 na CA)
        </label>
        <p className="mt-1 text-xs text-parchment/50">
          CA calculada: base + Des {sinal(dexMod)} {ficha.escudo ? '+ escudo' : ''}
        </p>
        <button
          onClick={aplicarCA}
          className="mt-2 w-full rounded border border-forest/60 px-3 py-1.5 font-display text-xs tracking-wide text-parchment transition-colors hover:bg-forest/25"
        >
          Aplicar CA calculada ({caCalculada})
        </button>
      </div>

      {/* Dinheiro */}
      <div className="mt-6">
        <h3 className="font-display text-sm font-bold tracking-wide text-parchment/90 uppercase">
          Bolsa de moedas
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <CampoMoeda
            label="Ouro"
            simbolo="🪙"
            valor={ficha.dinheiro.ouro}
            onChange={(novoValor) => atualizarMoeda('ouro', novoValor)}
          />
          <CampoMoeda
            label="Prata"
            simbolo="🥈"
            valor={ficha.dinheiro.prata}
            onChange={(novoValor) => atualizarMoeda('prata', novoValor)}
          />
          <CampoMoeda
            label="Cobre"
            simbolo="🥉"
            valor={ficha.dinheiro.cobre}
            onChange={(novoValor) => atualizarMoeda('cobre', novoValor)}
          />
        </div>
      </div>

      {/* Estados ativos */}
      <div className="mt-6">
        <h3 className="font-display text-sm font-bold tracking-wide text-parchment/90 uppercase">
          Condições ativas
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {ESTADOS.map(({ nome, icone }) => {
            const ativo = ficha.estados.includes(nome)
            return (
              <button
                key={nome}
                onClick={() => alternarEstado(nome)}
                aria-pressed={ativo}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  ativo
                    ? 'border-ember bg-ember/25 font-semibold text-parchment'
                    : 'border-parchment/30 text-parchment/60 hover:border-gold hover:text-parchment'
                }`}
              >
                {icone} {nome}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
