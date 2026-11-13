import { useEffect, useRef, useState } from 'react'
import Stepper from './Stepper'

const FACES = [4, 6, 8, 10, 12, 20, 100]
const QTD_MAX_POR_LINHA = 99
const LINHAS_MAX = 8
const PERMANENCIA_MS = 5000

function rolarDado(faces) {
  return Math.floor(Math.random() * faces) + 1
}

const FORMAS = {
  4: 'polygon(50% 0%, 100% 100%, 0% 100%)',
  6: null,
  8: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  10: 'polygon(50% 0%, 100% 38%, 50% 100%, 0% 38%)',
  12: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  20: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  100: 'circle(50%)',
}

function novaLinha() {
  return { id: crypto.randomUUID(), faces: 20, qtd: 1 }
}

function novoDado(faces) {
  return {
    id: crypto.randomUUID(),
    faces,
    valor: rolarDado(faces),
    atraso: Math.random() * 0.15,
    duracao: 0.9 + Math.random() * 0.3,
    rotacao: Math.floor(Math.random() * 30) - 15,
    tamanho: 3.6 + Math.random() * 1.0,
    xJitter: Math.floor(Math.random() * 24) - 12,
    valorPiscante: rolarDado(faces),
  }
}

export default function DiceRoller() {
  const [linhas, setLinhas] = useState([novaLinha()])
  const [fase, setFase] = useState('parado')
  const [dados, setDados] = useState([])
  const [resultado, setResultado] = useState(null)
  const [historico, setHistorico] = useState([])

  const timers = useRef([])
  const intervalo = useRef(null)

  function limparTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (intervalo.current) clearInterval(intervalo.current)
  }

  useEffect(() => limparTimers, [])

  function adicionarLinha() {
    if (linhas.length >= LINHAS_MAX) return
    setLinhas([...linhas, novaLinha()])
  }

  function removerLinha(id) {
    setLinhas((atual) => atual.filter((l) => l.id !== id))
  }

  function mudarFaces(id, faces) {
    setLinhas((atual) => atual.map((l) => (l.id === id ? { ...l, faces } : l)))
  }

  function mudarQtd(id, novoValor) {
    setLinhas((atual) =>
      atual.map((l) => {
        const q = Math.max(1, Math.min(QTD_MAX_POR_LINHA, Number(novoValor) || 1))
        return l.id === id ? { ...l, qtd: q } : l
      }),
    )
  }

  function rolarTudo() {
    limparTimers()

    const dadosNovos = []
    linhas.forEach((linha) => {
      for (let i = 0; i < linha.qtd; i++) {
        dadosNovos.push(novoDado(linha.faces))
      }
    })

    setResultado(null)
    setDados(dadosNovos)
    setFase('rolando')

    intervalo.current = setInterval(() => {
      setDados((atual) =>
        atual.map((d) => ({ ...d, valorPiscante: rolarDado(d.faces) })),
      )
    }, 90)

    const tempoPouso = 1400 + dadosNovos.length * 60
    timers.current.push(
      setTimeout(() => {
        clearInterval(intervalo.current)
        intervalo.current = null

        // Valor final de cada dado
        const dadosFinais = dadosNovos.map((d) => ({ ...d, valor: rolarDado(d.faces) }))
        setDados(dadosFinais)
        setFase('revelado')

        // Agrupar por linha
        let indice = 0
        const linhasResultado = linhas.map((linha) => {
          const valores = dadosFinais.slice(indice, indice + linha.qtd)
          indice += linha.qtd
          const total = valores.reduce((soma, v) => soma + v.valor, 0)
          return {
            id: linha.id,
            faces: linha.faces,
            qtd: linha.qtd,
            valores: valores.map((v) => v.valor),
            total,
          }
        })

        const totalGeral = linhasResultado.reduce((soma, l) => soma + l.total, 0)
        const totalDados = linhasResultado.reduce((soma, l) => soma + l.qtd, 0)

        setResultado({ linhas: linhasResultado, totalGeral, totalDados })
        setHistorico((atual) => [
          `${linhas.map((l) => `${l.qtd}×d${l.faces}`).join(' + ')} → ${totalGeral}`,
          ...atual,
        ].slice(0, 6))

        timers.current.push(
          setTimeout(() => setFase('saindo'), PERMANENCIA_MS),
          setTimeout(() => {
            setDados([])
            setFase('parado')
          }, PERMANENCIA_MS + 450),
        )
      }, tempoPouso),
    )
  }

  function limpar() {
    limparTimers()
    setDados([])
    setFase('parado')
    setResultado(null)
    setHistorico([])
  }

  return (
    <div className="rounded-lg border border-gold/25 bg-ink/60 p-6">
      <h3 className="font-display text-xl text-gold">Rolagem de dados</h3>

      {/* Linhas de rolagem */}
      <div className="mt-4 space-y-3">
        {linhas.map((linha) => (
          <div
            key={linha.id}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-ink/20 bg-white/40 p-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-xs font-semibold text-ink/80 uppercase">dado</span>
              <select
                value={linha.faces}
                onChange={(e) => mudarFaces(linha.id, Number(e.target.value))}
                className="rounded border border-ink/30 bg-white/70 px-2 py-1 text-sm text-ink focus:border-gold focus:outline-none"
              >
                {FACES.map((f) => (
                  <option key={f} value={f}>d{f}</option>
                ))}
              </select>
              <span className="font-display text-xs font-semibold text-ink/60">×</span>
              <Stepper
                value={linha.qtd}
                onChange={(novoValor) => mudarQtd(linha.id, novoValor)}
                min={1}
                max={QTD_MAX_POR_LINHA}
                variante="light"
                tamanho="sm"
                ariaLabel={`Quantidade de d${linha.faces}`}
              />
            </div>
            {linhas.length > 1 && (
              <button
                onClick={() => removerLinha(linha.id)}
                className="rounded border border-ink/30 px-2 py-1 text-xs font-bold text-ink/60 hover:border-ember hover:text-ember transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          onClick={adicionarLinha}
          disabled={linhas.length >= LINHAS_MAX}
          className="w-full rounded border border-gold/40 px-4 py-2 font-display text-sm font-semibold tracking-wide text-gold-bright transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          + Adicionar outra rolagem
        </button>
      </div>

      {/* Botão de rolagem */}
      <div className="mt-4">
        <button
          onClick={rolarTudo}
          className="w-full rounded bg-ember px-6 py-3 font-display font-semibold tracking-wide text-parchment transition-colors hover:bg-ember/80"
        >
          {fase === 'rolando'
            ? 'Rolando dados…'
            : `Rolagem (${linhas.reduce((s, l) => s + l.qtd, 0)} dados)`}
        </button>
        <button
          onClick={limpar}
          className="mt-2 w-full rounded border border-parchment/40 px-3 py-1.5 font-display text-xs tracking-wide text-parchment/70 transition-colors hover:border-ember hover:text-parchment"
        >
          🧹 Limpar
        </button>
      </div>

      {/* Resultado */}
      <div className="mt-5" aria-live="polite">
        {fase === 'rolando' && (
          <p className="animate-pulse font-display text-sm tracking-wide text-gold-bright">
            Os dados estão girando…
          </p>
        )}

        {fase !== 'rolando' && resultado && (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex h-16 shrink-0 items-center justify-center rounded border-2 border-gold/60 bg-ink px-4 font-legend text-2xl text-gold-bright">
                {String(resultado.totalGeral)}
              </div>
              <div className="text-sm text-parchment/80">
                <p className="font-display tracking-wide">
                  {String(resultado.totalDados)} dado{'s'}
                  {resultado.linhas.map((l) => ` ${l.qtd}×d${l.faces}`).join(' + ')}
                  = {String(resultado.totalGeral)}
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              {resultado.linhas.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center gap-3 text-sm text-parchment/85"
                >
                  <span className="font-display font-bold">{String(l.qtd)}×d{String(l.faces)}</span>
                  <span className="flex-1 text-right">
                    {l.valores.map(String).join(' + ')}
                    {l.valores.length > 1 &&
                      ` = ` &&
                      String(l.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {fase !== 'rolando' && !resultado && (
          <p className="text-sm text-parchment/50 italic">
            Monte sua rolagem (ex.: 2×d4 + 3×d6) e role.
          </p>
        )}

        {historico.length > 0 && (
          <div className="mt-4 border-t border-parchment/15 pt-3">
            <p className="font-display text-xs tracking-wide text-parchment/60 uppercase">
              Últimas rolagens
            </p>
            <ul className="mt-1 space-y-1 text-xs text-parchment/70">
              {historico.map((linha, i) => (
                <li key={i}>{String(linha)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bandeja de resultado */}
      {dados.length > 0 && (
        <div
          className={`bandeja-dados ${fase === 'saindo' ? 'bandeja-saindo' : ''}`}
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-end justify-center gap-6 px-8 pt-10 pb-4">
            {dados.map((dado) => {
              const forma = FORMAS[dado.faces]
              const critico = fase === 'revelado' && dado.valor === dado.faces
              return (
                <div
                  key={dado.id}
                  className="dado-caindo"
                  style={{
                    animationDelay: `${dado.atraso}s`,
                    animationDuration: `${dado.duracao}s`,
                  }}
                >
                  <div
                    className={`dado-face ${critico ? 'dado-critico' : ''}`}
                    style={{
                      clipPath: forma.clip,
                      width: `${dado.tamanho}rem`,
                      height: `${dado.tamanho}rem`,
                      borderRadius: forma.clip ? 0 : '0.75rem',
                      transform: `translateX(${dado.xJitter}px) rotate(${dado.rotacao}deg)`,
                    }}
                    title={`d${String(dado.faces)}`}
                  >
                    <span style={dado.faces === 4 ? { transform: 'translateY(30%)' } : undefined}>
                      {fase === 'rolando' ? String(dado.valorPiscante ?? 0) : String(dado.valor)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="pb-4 text-center font-display text-sm tracking-wide text-gold-bright">
            {fase === 'rolando'
              ? `🎲 ${String(dados.length)} dados rolando…`
              : `${String(dados.length)} dados → ${String(resultado?.totalGeral ?? 0)}`}
          </p>
        </div>
      )}
    </div>
  )
}
