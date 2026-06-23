const steps = [
  {
    number: '01',
    title: 'Configure seu negócio',
    text: 'Cadastre serviços, profissionais e horário de funcionamento em poucos minutos.',
  },
  {
    number: '02',
    title: 'Compartilhe seu link',
    text: 'Envie a página de agendamento pro WhatsApp, Instagram ou onde seu cliente já está.',
  },
  {
    number: '03',
    title: 'Deixe o Horinha lembrar',
    text: 'O cliente agenda sozinho e recebe um lembrete automático antes do horário.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-espresso py-20 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-hand text-2xl text-gold-light">
            do zero ao primeiro agendamento
          </span>
          <h2 className="mt-1 text-3xl font-semibold text-cream sm:text-4xl">
            Três passos, sem complicação.
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-3">
          <div className="absolute left-0 right-0 top-7 hidden h-px border-t-2 border-dashed border-cream/20 sm:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-espresso font-display text-xl text-gold-light">
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-cream">{step.title}</h3>
              <p className="mt-2 text-cream/70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
