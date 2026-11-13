import { useCallback } from 'react'
import gerarPDFFicha from './gerarPDFFicha'

export default function ExportPDFButton({ ficha }) {
  const handleExportar = useCallback(() => {
    gerarPDFFicha(ficha)
  }, [ficha])

  return (
    <button
      onClick={handleExportar}
      className="rounded border-2 border-gold/80 bg-gold/10 px-5 py-2.5 font-display text-sm font-bold tracking-wide text-gold-bright transition-colors hover:bg-gold/20 hover:border-gold shadow-lg"
      title="Exportar ficha para PDF"
    >
      📄 Exportar PDF
    </button>
  )
}
