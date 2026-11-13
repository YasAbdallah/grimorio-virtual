import { Link, useLocation, useNavigate } from 'react-router-dom'

const SECOES = [
  { id: 'mesa', nome: 'A Mesa' },
  { id: 'regras', nome: 'Campanha' },
  { id: 'sessoes', nome: 'Sessões' },
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  function irParaSecao(evento, id) {
    evento.preventDefault()
    if (location.pathname !== '/') {
      // Em outra página: volta para a landing já apontando para a seção
      navigate('/', { hash: `#${id}` })
    } else {
      // Na landing: rola suavemente até a seção
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gold/30 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-legend text-2xl text-gold-bright">
          Grimório Virtual
        </Link>

        <nav className="hidden items-center gap-8 font-display text-sm tracking-wide md:flex">
          {SECOES.map(({ id, nome }) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={(e) => irParaSecao(e, id)}
              className="text-parchment/80 transition-colors hover:text-gold-bright"
            >
              {nome}
            </a>
          ))}
          <Link to="/ficha" className="text-parchment/80 transition-colors hover:text-gold-bright">
            Ficha
          </Link>
        </nav>

        <Link
          to="/login"
          className="rounded border border-gold/60 px-4 py-2 font-display text-sm tracking-wide text-gold-bright transition-colors hover:bg-gold/15"
        >
          Entrar
        </Link>
      </div>
    </header>
  )
}
