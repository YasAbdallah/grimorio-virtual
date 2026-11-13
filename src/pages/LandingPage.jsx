import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const pilares = [
  {
    icone: '⚔️',
    titulo: 'Aventura sem limites',
    texto:
      'Espadas, magias e dragões: nossa mesa abraça a fantasia como um todo. Cada campanha pode trazer torres flutuantes, florestas encantadas ou ruínas esquecidas.',
  },
  {
    icone: '🎭',
    titulo: 'Interpretação em primeiro lugar',
    texto:
      'Mais do que números, jogamos histórias. Os momentos mais lembrados nascem das escolhas dos personagens — e das consequências delas.',
  },
  {
    icone: '🤝',
    titulo: 'Mesa acolhedora',
    texto:
      'Veteranos e iniciantes sentam no mesmo banco. Ninguém precisa conhecer todas as regras para entrar na aventura: a diversão vem junto.',
  },
]

const sessoes = [
  ['Quando', 'Quinta-feira, às 19h30'],
  ['Onde', 'Presencial e online (alternamos entre encontros)'],
  ['Sistema', 'Fantasia genérica, com adaptações da mesa'],
  ['Requisitos', 'Vontade de jogar e um personagem na cabeça'],
]

export default function LandingPage() {
  const location = useLocation()

  // Ao chegar na landing com hash (ex.: vindo da ficha), rola até a seção
  useEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 150) // aguarda a página montar antes de rolar
    return () => clearTimeout(timer)
  }, [location])

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#2e2418_0%,#17120c_75%)] px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(176,74,47,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(90,74,138,0.22),transparent_45%)]" />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 font-display text-sm tracking-[0.35em] text-gold/80 uppercase">
              Mesa de RPG de fantasia
            </p>
            <h1 className="ember-glow font-legend text-5xl leading-tight text-gold-bright sm:text-7xl">
              Grimório Virtual
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-parchment/85 sm:text-2xl">
              Uma mesa para todos os tipos de fantasia — heróis medievais, bruxos arcanos e
              criaturas das profundezas. Traga seus dados e venha escrever a próxima história
              conosco.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="w-full rounded bg-gold px-8 py-3 font-display font-semibold tracking-wide text-ink transition-colors hover:bg-gold-bright sm:w-auto"
              >
                Entrar na aventura
              </Link>
              <a
                href="#mesa"
                className="w-full rounded border border-parchment/40 px-8 py-3 font-display tracking-wide text-parchment transition-colors hover:border-gold hover:text-gold-bright sm:w-auto"
              >
                Conheça a mesa
              </a>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-gold/70">
            ▾
          </div>
        </section>

        {/* A Mesa */}
        <section id="mesa" className="parchment-bg py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center font-legend text-4xl text-ink">A Mesa</h2>
            <div className="mx-auto mt-3 h-px w-24 bg-gold" />
            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-ink/80">
              O <strong>Grimório Virtual</strong> nasceu de um grupo de amigos que não se limitou a
              um único cenário. Aqui a fantasia é genérica de propósito: uma campanha pode
              começar numa taverna de pedra e acabar em um plano celestial. O que nunca muda é a
              mesa cheia, os lanches e as risadas.
            </p>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {pilares.map((p) => (
                <article
                  key={p.titulo}
                  className="rounded-lg border border-gold/50 bg-white/40 p-8 text-center shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="text-4xl">{p.icone}</div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{p.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-ink/75">{p.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Campanha / regras da casa */}
        <section id="regras" className="bg-night py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center font-legend text-4xl text-gold-bright">A Campanha</h2>
            <div className="mx-auto mt-3 h-px w-24 bg-gold/60" />

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div className="rounded-lg border border-gold/25 bg-ink/60 p-8">
                <h3 className="font-display text-2xl text-gold">O mundo</h3>
                <p className="mt-4 leading-relaxed text-parchment/80">
                  Um continente sem nome oficial — chamamos de <em>as Terras Partidas</em> —
                  onde reinos esquecidos, guildas de aventureiros e magia selvagem se
                  misturam. O mestre adapta o cenário conforme a mesa avança, e as
                  escolhas dos jogadores moldam o mapa.
                </p>
                <p className="mt-4 leading-relaxed text-parchment/80">
                  Nada de lore gigante para decorar: o que importa é o que vocês fazem
                  acontecer na mesa.
                </p>
              </div>

              <div className="rounded-lg border border-gold/25 bg-ink/60 p-8">
                <h3 className="font-display text-2xl text-gold">Regras da casa</h3>
                <ul className="mt-4 space-y-3 text-parchment/80">
                  <li>✦ Respeite o turno narrativo de cada jogador.</li>
                  <li>✦ Fichas podem ser criadas em qualquer sistema de fantasia e ajustadas com o mestre.</li>
                  <li>✦ Falha crítica é história boa — ria de si mesmo antes dos outros.</li>
                  <li>✦ A sessão só termina quando o grupo disser "boa noite".</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sessões */}
        <section id="sessoes" className="parchment-bg py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-center font-legend text-4xl text-ink">Sessões</h2>
            <div className="mx-auto mt-3 h-px w-24 bg-gold" />

            <dl className="mt-12 divide-y divide-gold/40 rounded-lg border border-gold/50 bg-white/40">
              {sessoes.map(([chave, valor]) => (
                <div key={chave} className="flex flex-col gap-1 px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="font-display font-semibold tracking-wide text-ink">{chave}</dt>
                  <dd className="text-ink/75">{valor}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 text-center">
              <p className="text-lg text-ink/80">Quer jogar com a gente?</p>
              <Link
                to="/login"
                className="mt-4 inline-block rounded bg-ink px-8 py-3 font-display font-semibold tracking-wide text-gold-bright transition-colors hover:bg-night"
              >
                Faça seu acesso
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
