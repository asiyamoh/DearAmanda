# Dear Amanda

Dear Amanda is a desktop application that generates personalized compliments using AI.

It was built to help bridge the gap between someone who struggles with expressing emotions and someone whose love language is words of affirmation. 

The app uses carefully crafted prompts to produce meaningful, supportive messages, with a focus on human-centered design and emotional impact.

---

## Demo

> Coming soon. A live demo will be added once the application is publicly deployed.

---

## Tech Stack

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Router](https://tanstack.com/router)
- [Electron](https://www.electronjs.org/) *(desktop app)*

### Backend
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [PostgreSQL](https://www.postgresql.org/) *(via Supabase)*

### Other
- [OpenAI API](https://platform.openai.com/)
- [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query)

---

## Installation

This project requires running both the frontend and API in separate terminals.

### 1. Clone the repository

```bash
git clone https://github.com/asiyamoh/DearAmanda.git

cd dear-amanda
```

### 2. Frontend Setup (Root Folder)

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

Start the frontend:

```bash
npm run dev
```

### 3. API Setup (`api` Folder)

Open a second terminal:

```bash
cd api
npm install
```

Create a `.env` file in the `api` folder and add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

Generate the Prisma client and run migrations if needed:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the API:

```bash
npm run start:dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `DATABASE_URL` | Your PostgreSQL connection string |

---

## What I Learned

- Building and packaging a desktop application using Electron
- Integrating an AI service into a real-world use case
- Structuring a full-stack project with a separate frontend and API
- Using Prisma with Supabase for database management
- Writing prompts that balance emotional tone with consistency
- Managing environment variables and multi-service setups

---

## Challenges

- API cost management and prompt efficiency when working with OpenAI
- Learning Electron and configuring it alongside a modern frontend stack
- Designing an application focused on emotional value, not just technical output
- Coordinating frontend and backend communication during development

---

## Future Improvements

- [ ] User authentication
- [ ] Role-based access (admin vs standard users)
- [ ] Multi-user support
- [ ] Public deployment with a live demo
- [ ] Expanded prompt customization and tone control
