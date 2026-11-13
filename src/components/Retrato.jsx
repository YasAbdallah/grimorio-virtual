import { useRef, useState } from 'react'

const LADO_MAXIMO = 512 // px — a imagem é reduzida para caber no localStorage

// Lê o arquivo, reduz para no máximo 512px e devolve um data URL JPEG
async function lerImagemReduzida(arquivo) {
  const url = URL.createObjectURL(arquivo)
  try {
    const img = new Image()
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = () => reject(new Error('imagem inválida'))
      img.src = url
    })

    const escala = Math.min(1, LADO_MAXIMO / Math.max(img.width, img.height))
    const largura = Math.max(1, Math.round(img.width * escala))
    const altura = Math.max(1, Math.round(img.height * escala))

    const canvas = document.createElement('canvas')
    canvas.width = largura
    canvas.height = altura
    canvas.getContext('2d').drawImage(img, 0, 0, largura, altura)
    return canvas.toDataURL('image/jpeg', 0.85)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export default function Retrato({ retrato, aoDefinir }) {
  const [erro, setErro] = useState(null)
  const inputRef = useRef(null)

  async function aoEscolher(evento) {
    const arquivo = evento.target.files?.[0]
    evento.target.value = '' // permite reenviar o mesmo arquivo depois
    if (!arquivo) return

    if (!arquivo.type.startsWith('image/')) {
      setErro('Escolha um arquivo de imagem (PNG, JPG, WebP…).')
      return
    }
    setErro(null)

    try {
      aoDefinir(await lerImagemReduzida(arquivo))
    } catch {
      setErro('Não foi possível carregar a imagem. Tente outro arquivo.')
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <label
        title={retrato ? 'Trocar retrato' : 'Adicionar retrato'}
        className={`group relative block h-28 w-28 cursor-pointer overflow-hidden rounded-full border-2 transition-colors ${
          retrato ? 'border-gold' : 'border-dashed border-ink/40 bg-white/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={aoEscolher}
        />
        {retrato ? (
          <img src={retrato} alt="Retrato do personagem" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-3xl text-ink/40">
            👤
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-ink/60 font-display text-xs font-semibold tracking-wide text-gold-bright opacity-0 transition-opacity group-hover:opacity-100">
          {retrato ? 'Trocar' : 'Adicionar'}
        </span>
      </label>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="font-display text-xs tracking-wide text-ink/70 underline-offset-2 hover:text-ink hover:underline"
        >
          {retrato ? 'Trocar retrato' : 'Adicionar retrato'}
        </button>
        {retrato && (
          <button
            type="button"
            onClick={() => aoDefinir('')}
            className="font-display text-xs tracking-wide text-ember hover:underline"
          >
            Remover
          </button>
        )}
      </div>

      {erro && <p className="text-center text-xs font-semibold text-ember">{erro}</p>}
    </div>
  )
}
