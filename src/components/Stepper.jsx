// Controle numérico personalizado: botões − e + em volta do valor.
// Substitui as setas nativas dos inputs numéricos em toda a ficha.

const VARIANTES = {
  dark: {
    botao: 'border-gold/40 text-parchment/80 hover:border-gold hover:text-gold-bright hover:bg-gold/10',
    input: 'bg-ink/70 border-gold/30 text-parchment',
  },
  light: {
    botao: 'border-ink/25 text-ink/70 hover:border-gold hover:text-ink hover:bg-gold/15',
    input: 'bg-white/70 border-ink/30 text-ink',
  },
}

const TAMANHOS = {
  md: { botao: 'h-9 w-9 text-lg', input: 'h-9 w-16 text-base', gap: 'gap-1.5' },
  sm: { botao: 'h-7 w-7 text-sm', input: 'h-7 w-12 text-sm', gap: 'gap-1' },
  xs: { botao: 'h-6 w-6 text-xs', input: 'h-6 w-10 text-xs', gap: 'gap-0.5' },
}

export default function Stepper({
  value,
  onChange,
  min = 0,
  max = 99999,
  step = 1,
  variante = 'dark',
  tamanho = 'md',
  editavel = true,
  podeMudar = null, // (novoValor) => boolean, para regras extras
  ariaLabel = 'Valor',
}) {
  const cores = VARIANTES[variante]
  const dimensoes = TAMANHOS[tamanho]
  const atual = Number(value)

  function mudar(delta) {
    const base = Number.isNaN(atual) ? min : atual
    const novo = Math.max(min, Math.min(max, base + delta))
    if (podeMudar && !podeMudar(novo)) return
    onChange(String(novo))
  }

  function aoDigitar(evento) {
    onChange(evento.target.value)
  }

  function aoDesfocar() {
    if (!editavel) return
    const novo = Math.max(min, Math.min(max, Number(value) || min))
    onChange(String(novo))
  }

  const desabilitaMenos = !Number.isNaN(atual) && atual <= min
  const desabilitaMais = !Number.isNaN(atual) && atual >= max

  return (
    <div className={`inline-flex items-center ${dimensoes.gap}`}>
      <button
        type="button"
        onClick={() => mudar(-step)}
        disabled={desabilitaMenos}
        aria-label={`Diminuir ${ariaLabel}`}
        className={`flex items-center justify-center rounded border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${cores.botao} ${dimensoes.botao}`}
      >
        −
      </button>

      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={aoDigitar}
        onBlur={aoDesfocar}
        readOnly={!editavel}
        aria-label={ariaLabel}
        className={`text-center font-bold focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none ${cores.input} ${dimensoes.input} ${
          editavel ? '' : 'cursor-default'
        }`}
      />

      <button
        type="button"
        onClick={() => mudar(step)}
        disabled={desabilitaMais}
        aria-label={`Aumentar ${ariaLabel}`}
        className={`flex items-center justify-center rounded border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${cores.botao} ${dimensoes.botao}`}
      >
        +
      </button>
    </div>
  )
}
