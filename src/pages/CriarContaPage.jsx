import { useState } from 'react'
import { Link } from 'react-router-dom'

function CampoTexto({ id, label, tipo = 'text', valor, aoMudar, placeholder, erro, ...resto }) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        onChange={aoMudar}
        placeholder={placeholder}
        {...resto}
        className={`mt-2 w-full rounded border bg-white/60 px-4 py-2.5 text-ink placeholder-ink/40 focus:ring-2 focus:outline-none ${
          erro
            ? 'border-ember focus:border-ember focus:ring-ember/40'
            : 'border-ink/30 focus:border-gold focus:ring-gold/40'
        }`}
      />
      {erro && <p className="mt-1 text-xs font-semibold text-ember">{erro}</p>}
    </div>
  )
}

export default function CriarContaPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [erros, setErros] = useState({})
  const [aviso, setAviso] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const novosErros = {}

    if (senha.length < 8) {
      novosErros.senha = 'A senha precisa ter no mínimo 8 caracteres.'
    }
    if (confirmacao !== senha) {
      novosErros.confirmacao = 'As senhas não coincidem.'
    }

    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    // TODO: cadastro real ainda não implementado
    setAviso(
      'Conta criada (simulada)! O cadastro no servidor será implementado em breve — por enquanto sua ficha fica salva neste navegador.',
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
          <h1 className="text-center font-display text-2xl font-bold text-ink">Criar conta</h1>
          <p className="mt-2 text-center text-ink/70">
            Forje sua identidade de aventureiro para entrar na mesa.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <CampoTexto
              id="nome"
              label="Nome de aventureiro"
              valor={nome}
              aoMudar={(e) => setNome(e.target.value)}
              placeholder="Aldric, o Andarilho"
              required
            />
            <CampoTexto
              id="email"
              label="E-mail"
              tipo="email"
              valor={email}
              aoMudar={(e) => setEmail(e.target.value)}
              placeholder="mago@terra.partida"
              required
            />
            <CampoTexto
              id="senha"
              label="Senha"
              tipo="password"
              valor={senha}
              aoMudar={(e) => setSenha(e.target.value)}
              placeholder="Mínimo de 8 caracteres"
              erro={erros.senha}
              required
            />
            <CampoTexto
              id="confirmacao"
              label="Confirmar senha"
              tipo="password"
              valor={confirmacao}
              aoMudar={(e) => setConfirmacao(e.target.value)}
              placeholder="Repita a senha"
              erro={erros.confirmacao}
              required
            />

            <button
              type="submit"
              className="w-full rounded bg-ink py-3 font-display font-semibold tracking-wide text-gold-bright transition-colors hover:bg-night"
            >
              Criar conta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/70">
            Já tem uma conta na mesa?{' '}
            <Link to="/login" className="font-semibold text-ember hover:underline">
              Entrar
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
