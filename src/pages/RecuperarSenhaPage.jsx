import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    // TODO: envio real de e-mail ainda não implementado
    setEnviado(true)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#2e2418_0%,#17120c_75%)] px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(176,74,47,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(90,74,138,0.22),transparent_45%)]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 block text-center font-legend text-2xl text-gold-bright">
          Grimório Virtual
        </Link>

        <div className="parchment-bg rounded-xl border border-gold/60 p-8 shadow-2xl">
          {enviado ? (
            <div className="text-center">
              <div className="text-4xl">📨</div>
              <h1 className="mt-4 font-display text-2xl font-bold text-ink">
                Instruções enviadas
              </h1>
              <p className="mt-3 leading-relaxed text-ink/75">
                Se existir uma conta para{' '}
                <strong className="text-ink">{email}</strong>, você receberá um pergaminho (e-mail)
                com as instruções para redefinir a senha.
              </p>
              <p className="mt-2 text-xs text-ink/50">
                Envio simulado — o serviço de e-mail será conectado junto com a autenticação.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-block rounded bg-ink px-8 py-3 font-display font-semibold tracking-wide text-gold-bright transition-colors hover:bg-night"
              >
                Voltar para o login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-center font-display text-2xl font-bold text-ink">
                Recuperar senha
              </h1>
              <p className="mt-2 text-center text-ink/70">
                Informe seu e-mail e enviaremos as instruções para redefinir sua senha.
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

                <button
                  type="submit"
                  className="w-full rounded bg-ink py-3 font-display font-semibold tracking-wide text-gold-bright transition-colors hover:bg-night"
                >
                  Enviar instruções
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-ink/70">
                Lembrou a senha?{' '}
                <Link to="/login" className="font-semibold text-ember hover:underline">
                  Entrar
                </Link>
              </p>
            </>
          )}
        </div>

        <p className="mt-6 text-center">
          <Link to="/" className="text-sm text-parchment/60 transition-colors hover:text-gold-bright">
            ← Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  )
}
