export function Footer() {
  return (
    <footer className="bg-espresso py-12 text-cream/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold font-display text-base text-gold-light">
            H
          </span>
          <span className="font-display text-lg text-cream">Horinha</span>
        </div>

        <p className="text-sm">
          Feito por Arthur &amp; Adryano Oliveira · Substitui o WhatsApp e o caderno por uma agenda só.
        </p>

        <p className="text-sm">&copy; {new Date().getFullYear()} Horinha.</p>
      </div>
    </footer>
  )
}
