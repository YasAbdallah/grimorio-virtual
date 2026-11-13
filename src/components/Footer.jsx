export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-night py-10">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-legend text-xl text-gold">Grimório Virtual</p>
        <p className="mt-2 text-sm text-parchment/60">
          Uma mesa de RPG de mesa de fantasia genérica — role os dados, escreva a história.
        </p>
        <p className="mt-4 text-xs text-parchment/40">
          © {new Date().getFullYear()} Grimório Virtual · Que os dados estejam a seu favor.
        </p>
      </div>
    </footer>
  )
}
