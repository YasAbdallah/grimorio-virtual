import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [aviso, setAviso] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    // TODO: autenticação real ainda não implementada
    setAviso(
      'Acesso simulado com sucesso! A autenticação ainda será implementada — em breve você entrará direto na mesa.',
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#2e2418_0%,#17120c_75%)] px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(176,74,47,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(90,74,138,0.22),transparent_45%)]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 block text-center font-legend text-2xl text-gold-bright">
          Grimório Virtual
        </Link>

        <div className="parchment-bg rounded-xl border border-gold/60 p-8 shadow-2xl">
          <h1 className="text-center font-display text-2xl font-bold text-ink">Entrar na mesa</h1>
          <p className="mt-2 text-center text-ink/70">
            Informe seu e-mail e senha para acessar o grimório.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="font-display text-sm font-semibold text-ink">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mago@terra.partida"
                className="mt-2 w-full rounded border border-ink/30 bg-white/60 px-4 py-2.5 text-ink placeholder-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="senha" className="font-display text-sm font-semibold text-ink">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded border border-ink/30 bg-white/60 px-4 py-2.5 text-ink placeholder-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/40 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-ink/75">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-gold" />
                Lembrar de mim
              </label>
              <Link to="/recuperar-senha" className="text-ember hover:underline">
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-ink py-3 font-display font-semibold tracking-wide text-gold-bright transition-colors hover:bg-night"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/70">
            Ainda não tem um personagem na mesa?{' '}
            <Link to="/criar-conta" className="font-semibold text-ember hover:underline">
              Crie sua conta
            </Link>
          </p>
        </div>

        {aviso && (
          <div
            role="status"
            className="mt-6 rounded border border-gold/50 bg-ink/80 px-5 py-4 text-center text-sm text-parchment"
          >
            ✨ {aviso}
          </div>
        )}

        <p className="mt-6 text-center">
          <Link to="/" className="text-sm text-parchment/60 transition-colors hover:text-gold-bright">
            ← Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  )
}
