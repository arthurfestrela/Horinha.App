const links = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '#planos' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-leather/15 bg-cream/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#topo" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-leather bg-leather font-display text-lg text-cream">
            H
          </span>
          <span className="font-display text-xl font-semibold text-espresso">Horinha</span>
        </a>

        <ul className="hidden items-center gap-8 font-medium text-espresso/80 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a className="transition-colors hover:text-leather" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden font-medium text-espresso/80 transition-colors hover:text-leather sm:inline"
          >
            Entrar
          </a>
          <a
            href="#comecar"
            className="rounded-full bg-leather px-5 py-2.5 font-medium text-cream shadow-stamp transition-colors hover:bg-leather-dark"
          >
            Criar minha agenda
          </a>
        </div>
      </nav>
    </header>
  )
}
