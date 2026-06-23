import { BellIcon, CalendarIcon, ChartIcon, LinkIcon, ScissorsIcon, UsersIcon } from '../icons'

const features = [
  {
    icon: LinkIcon,
    title: 'Página de agendamento própria',
    text: 'Um link só seu — horinha.app/agenda/sua-barbearia — pro cliente marcar sem precisar criar conta.',
  },
  {
    icon: CalendarIcon,
    title: 'Calendário sem choque de horário',
    text: 'O sistema bloqueia horários ocupados automaticamente. Sem dois clientes na mesma cadeira.',
  },
  {
    icon: BellIcon,
    title: 'Lembrete automático por e-mail',
    text: 'Avisamos o cliente antes do horário marcado, reduzindo as faltas de última hora.',
  },
  {
    icon: UsersIcon,
    title: 'Histórico de cada cliente',
    text: 'Quantas vezes veio, qual foi o último serviço — pra você atender como quem já conhece.',
  },
  {
    icon: ChartIcon,
    title: 'Faturamento por período',
    text: 'Veja o quanto entrou por semana ou mês, sem precisar somar nada no papel.',
  },
  {
    icon: ScissorsIcon,
    title: 'Vários profissionais, uma agenda',
    text: 'Cadastre cada profissional do time e deixe o cliente escolher com quem quer marcar.',
  },
]

export function Features() {
  return (
    <section id="funcionalidades" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-hand text-2xl text-leather">tudo o que você precisa</span>
          <h2 className="mt-1 text-3xl font-semibold sm:text-4xl">
            Feito pra quem corta, atende e cuida — não pra quem programa.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="stitched bg-parchment p-6">
              <feature.icon className="h-7 w-7 text-leather" />
              <h3 className="mt-4 font-display text-lg font-semibold text-espresso">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/70">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
