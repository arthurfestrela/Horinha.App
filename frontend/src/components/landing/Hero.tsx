import { CheckIcon, ClockIcon, ScissorsIcon } from '../icons'
import { StampBadge } from './StampBadge'

export function Hero() {
  return (
    <section id="topo" className="grain relative overflow-hidden bg-cream pt-16 pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <StampBadge>para barbearias, salões, clínicas e personal trainers</StampBadge>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] text-espresso sm:text-6xl">
            Sua agenda parou de ser um caderno.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-espresso/75">
            O Horinha troca o WhatsApp e o caderno por uma página de agendamento que o cliente usa
            sozinho — e te avisa antes de cada horário, pra ninguém esquecer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#comecar"
              className="rounded-full bg-leather px-7 py-3.5 text-lg font-medium text-cream shadow-stamp transition-colors hover:bg-leather-dark"
            >
              Criar minha agenda grátis
            </a>
            <a
              href="#como-funciona"
              className="rounded-full border-2 border-espresso/15 px-7 py-3.5 text-lg font-medium text-espresso transition-colors hover:border-leather hover:text-leather"
            >
              Ver como funciona
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-espresso/60">
            <li className="flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-olive" /> sem cartão de crédito
            </li>
            <li className="flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-olive" /> pronta em 5 minutos
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-leather/10" />
          <div className="rotate-2 rounded-2xl border-2 border-espresso/10 bg-parchment p-6 shadow-[0_25px_50px_-12px_rgba(42,27,18,0.25)]">
            <div className="flex items-center justify-between border-b-2 border-dashed border-leather/30 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-leather text-sm text-cream">
                  H
                </span>
                <span className="font-display font-semibold">Barbearia Vintage</span>
              </div>
              <span className="stamp px-2.5 py-0.5 text-xs text-olive">confirmado</span>
            </div>

            <dl className="mt-5 space-y-4 text-espresso/80">
              <div className="flex items-center gap-3">
                <ScissorsIcon className="h-5 w-5 text-leather" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-espresso/50">Serviço</dt>
                  <dd className="font-medium">Corte + barba</dd>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-leather" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-espresso/50">Horário</dt>
                  <dd className="font-medium">Hoje às 16h30</dd>
                </div>
              </div>
            </dl>

            <p className="mt-5 rounded-lg bg-leather/8 px-3 py-2 text-sm text-leather-dark">
              Lembrete enviado automaticamente 1h antes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
