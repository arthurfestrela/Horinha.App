import { CheckIcon } from '../icons'

const plans = [
  {
    name: 'Free',
    price: 'R$ 0',
    period: '/sempre',
    description: 'Pra começar a tirar a agenda do caderno.',
    features: [
      'Página pública de agendamento',
      'Até 1 profissional',
      'Calendário do dono',
      'Histórico de cliente',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'R$ 39',
    period: '/mês',
    description: 'Pra quem já vive de agenda cheia.',
    features: [
      'Tudo do Free',
      'Profissionais ilimitados',
      'Lembrete automático por e-mail',
      'Relatório de faturamento',
    ],
    highlight: true,
  },
]

export function Pricing() {
  return (
    <section id="planos" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-hand text-2xl text-leather">sem letra miúda</span>
          <h2 className="mt-1 text-3xl font-semibold sm:text-4xl">
            Comece de graça, cresça quando precisar.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:max-w-2xl">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? 'relative rounded-2xl bg-espresso p-8 text-cream shadow-[0_25px_50px_-12px_rgba(42,27,18,0.35)]'
                  : 'relative rounded-2xl border-2 border-espresso/10 bg-parchment p-8 text-espresso'
              }
            >
              {plan.highlight && (
                <span className="stamp absolute -top-4 right-6 bg-espresso px-3 py-1 text-sm text-gold-light">
                  mais escolhido
                </span>
              )}

              <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
              <p className={plan.highlight ? 'mt-1 text-cream/70' : 'mt-1 text-espresso/70'}>
                {plan.description}
              </p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">{plan.price}</span>
                <span className={plan.highlight ? 'text-cream/60' : 'text-espresso/60'}>
                  {plan.period}
                </span>
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <CheckIcon
                      className={plan.highlight ? 'h-4 w-4 text-gold-light' : 'h-4 w-4 text-olive'}
                    />
                    <span className={plan.highlight ? 'text-cream/90' : 'text-espresso/80'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#comecar"
                className={
                  plan.highlight
                    ? 'mt-8 block rounded-full bg-gold px-6 py-3 text-center font-medium text-espresso transition-colors hover:bg-gold-light'
                    : 'mt-8 block rounded-full border-2 border-leather px-6 py-3 text-center font-medium text-leather transition-colors hover:bg-leather hover:text-cream'
                }
              >
                Começar com o {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
