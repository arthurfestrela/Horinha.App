# Horinha

> SaaS de agendamento + CRM para pequenos negócios de serviço (barbearias, salões, clínicas, personal trainers).

Substitui o WhatsApp + caderno por uma plataforma onde o cliente agenda sozinho, o dono recebe lembretes automáticos e tem visão simples do faturamento.

🔗 **Demo:** [horinha.app](https://horinha.app) *(em construção)*

---

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack técnica](#stack-técnica)
- [Arquitetura](#arquitetura)
- [Modelo de dados](#modelo-de-dados)
- [Como rodar localmente](#como-rodar-localmente)
- [Metodologia de desenvolvimento](#metodologia-de-desenvolvimento)
- [Equipe](#equipe)
- [Roadmap](#roadmap)
- [Licença](#licença)

---

## Sobre o projeto

Pequenos prestadores de serviço ainda gerenciam agendamentos por WhatsApp e caderno, o que causa perda de horários, falta de histórico de cliente e nenhum controle de faturamento. O **Horinha** resolve isso com:

- Página pública de agendamento, sem o cliente precisar criar conta
- Calendário central para o dono do negócio
- Lembretes automáticos para reduzir faltas (no-show)
- Relatório simples de faturamento por período

### Personas

| Persona | Necessidade |
|---|---|
| Dono do negócio | Reduzir faltas, ter controle financeiro simples |
| Cliente final | Agendar rápido, sem fricção |

---

## Funcionalidades

- [x] Cadastro e login do dono do estabelecimento (JWT)
- [x] Cadastro de estabelecimento (nome, serviços, preços, horário de funcionamento)
- [x] Cadastro de profissionais
- [x] Página pública de agendamento (`/agenda/:slug-do-estabelecimento`)
- [x] Lógica de disponibilidade de horários (sem conflito de agenda)
- [x] Calendário do dono (visão diária e semanal)
- [x] Histórico de cliente
- [x] Lembrete automático por e-mail
- [x] Relatório de faturamento por período
- [x] Planos Free e Pro

> Funcionalidades planejadas para versões futuras estão no [Roadmap](#roadmap).

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Vite |
| Estilização | TailwindCSS |
| Backend | Node.js + Express |
| Banco de dados | PostgreSQL + Prisma ORM |
| Autenticação | JWT + bcrypt |
| E-mail | Nodemailer + node-cron |
| Deploy frontend | Vercel |
| Deploy backend | Railway |
| Testes | Vitest + Supertest |

---

## Arquitetura

```
horinha/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/  # chamadas à API
│   └── package.json
│
├── backend/           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── jobs/       # cron de lembretes
│   │   └── prisma/     # schema e migrations
│   └── package.json
│
└── docs/              # ADRs e documentação do projeto
```

O frontend consome a API REST do backend. Rotas autenticadas usam JWT; a página pública de agendamento não exige login. Um cron job dispara e-mails de lembrete via Nodemailer.

---

## Modelo de dados

Entidades principais:

- **User** — dono do estabelecimento (id, nome, e-mail, senha hash, plano)
- **Establishment** — id, nome, slug, horário de funcionamento, userId
- **Professional** — id, nome, establishmentId
- **Service** — id, nome, duração, preço, establishmentId
- **Appointment** — id, data/hora, nome do cliente, e-mail do cliente, serviceId, professionalId, status

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env       # configure DATABASE_URL, JWT_SECRET, SMTP_*
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env       # configure VITE_API_URL
npm run dev
```

### Testes

```bash
# backend
cd backend && npm run test

# frontend
cd frontend && npm run test
```

---

## Metodologia de desenvolvimento

Projeto desenvolvido em dupla seguindo **Scrum enxuto**, com sprints semanais.

- **Papéis**: Scrum Master e Product Owner alternam a cada sprint entre os dois integrantes; ambos atuam como devs.
- **Cerimônias**: Sprint Planning, Daily Standup, Sprint Review e Retrospectiva.
- **Board**: [GitHub Projects](#) *(link do board)*
- **Convenção de branches**: `feature/nome-da-tarefa`, com PR obrigatório e review do parceiro antes do merge em `main`.

Documentação de decisões técnicas (ADRs) disponível em [`/docs`](./docs).

---

## Equipe

| Nome | Papel principal | GitHub |
|---|---|---|
| Dev A | Frontend | [@usuario](https://github.com/usuario) |
| Dev B | Backend | [@usuario](https://github.com/usuario) |

---

## Roadmap

Funcionalidades planejadas para versões futuras:

- [ ] Lembrete via WhatsApp (Twilio ou Z-API)
- [ ] Pagamento de sinal antecipado (Stripe ou Mercado Pago)
- [ ] Múltiplas unidades por estabelecimento
- [ ] Integração com Google Calendar
- [ ] Aplicativo mobile (React Native)

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
