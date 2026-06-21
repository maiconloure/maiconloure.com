# SolidStart + Cloudflare Pages Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o portfólio maiconloure.com de Next.js + React para SolidStart + SolidJS, removendo Notion e dependências Vercel, com deploy automático via Cloudflare Pages acionado por PR mergeado em `main`.

**Architecture:** SolidStart com preset `cloudflare-pages` (vinxi/vite internamente). Roteamento baseado em arquivo em `src/routes/`. Tema dark/light via contexto SolidJS puro com `createSignal` + `createEffect` + localStorage.

**Tech Stack:** SolidJS 1.x, SolidStart, Vinxi, Tailwind CSS, @fontsource/*, Wrangler 3, GitHub Actions

## Global Constraints

- Node.js >= 20
- Todos os commits devem ser assinados (`git commit -S`)
- Nenhuma dependência Vercel, Notion ou React no projeto final
- Tailwind dark mode strategy: `class` (não mudar)
- Deploy acionado apenas em PR merged para `main` (não em push direto)
- Build output dir: `.output/public`
- Wrangler project name: `maiconloure-com`

---

### Task 1: Criar branch e scaffoldar SolidStart

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `tailwind.config.ts`
- Modify: `.gitignore`
- Create: `app.config.ts`

**Interfaces:**
- Produces: projeto instalável com `npm ci`, buildável com `npm run build`

- [ ] **Step 1: Criar branch de feature**

```bash
git checkout -b feature/solidstart-cloudflare-pages
```

- [ ] **Step 2: Substituir `package.json`**

Substituir o conteúdo inteiro por:

```json
{
  "name": "maiconloure",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start",
    "lint": "eslint ."
  },
  "dependencies": {
    "@fontsource/inter": "^5.0.0",
    "@fontsource/kanit": "^5.0.0",
    "@fontsource/rubik": "^5.0.0",
    "@fontsource/space-grotesk": "^5.0.0",
    "@fontsource/work-sans": "^5.0.0",
    "@solidjs/router": "^0.15.0",
    "@solidjs/start": "^1.0.0",
    "solid-js": "^1.9.0",
    "vinxi": "^0.5.0"
  },
  "devDependencies": {
    "@types/node": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest",
    "vite-plugin-solid": "^2.10.0",
    "wrangler": "^3.0.0"
  }
}
```

- [ ] **Step 3: Substituir `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", ".output", ".vinxi"]
}
```

- [ ] **Step 4: Criar `app.config.ts`**

```ts
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "cloudflare-pages",
    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST"],
    },
  },
});
```

- [ ] **Step 5: Atualizar `tailwind.config.ts` — paths de conteúdo**

Substituir o array `content` por:

```ts
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './app.config.ts',
],
```

O arquivo final deve ficar:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app.config.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-rubik)',
        inter: 'var(--font-inter)',
        work: 'var(--font-work)',
        space: 'var(--font-space)',
        alt: 'var(--font-kanit)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 6: Atualizar `.gitignore`**

Remover as linhas específicas de Next.js/Vercel e adicionar entradas SolidStart. Substituir o conteúdo por:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# solidstart / vinxi
/.output/
/.vinxi/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# typescript
*.tsbuildinfo
```

- [ ] **Step 7: Instalar dependências**

```bash
npm install
```

Expected: instalação completa sem erros. Pode demorar 30-60s.

- [ ] **Step 8: Commit**

```bash
git add package.json tsconfig.json tailwind.config.ts app.config.ts .gitignore
git commit -S -m "chore: scaffold SolidStart with cloudflare-pages preset"
```

---

### Task 2: Sistema de tema e componente Switch

**Files:**
- Create: `src/context/theme.tsx`
- Modify: `src/components/Switch.tsx`

**Interfaces:**
- Produces:
  - `ThemeProvider: ParentComponent` — envolve a árvore com contexto de tema
  - `useTheme(): { theme: () => 'light' | 'dark', toggleTheme: () => void }` — hook de consumo
  - `Switch: Component` — botão toggle dark/light

- [ ] **Step 1: Criar `src/context/theme.tsx`**

```tsx
import { createContext, createEffect, createSignal, useContext, ParentComponent } from 'solid-js'
import { isServer } from 'solid-js/web'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: () => Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>()

export const ThemeProvider: ParentComponent = (props) => {
  const initial: Theme =
    !isServer && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'

  const [theme, setTheme] = createSignal<Theme>(initial)

  createEffect(() => {
    const t = theme()
    if (!isServer) {
      localStorage.setItem('theme', t)
      document.documentElement.classList.toggle('dark', t === 'dark')
    }
  })

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
```

- [ ] **Step 2: Substituir `src/components/Switch.tsx`**

```tsx
import { useTheme } from '@/context/theme'

export function Switch() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      class="relative w-12 h-7 lg:ml-4 transition-colors bg-slate-300 dark:bg-slate-500 inline-flex rounded-2xl p-1 cursor-pointer"
      onClick={toggleTheme}
    >
      <div
        class="block w-5 h-5 rounded-full bg-zinc-950 shadow-black transition-transform duration-100 will-change-transform"
        classList={{ 'translate-x-5': theme() === 'light', 'translate-x-0': theme() === 'dark' }}
      />
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/context/theme.tsx src/components/Switch.tsx
git commit -S -m "feat: add theme context and port Switch component to SolidJS"
```

---

### Task 3: Estilos globais e layout raiz

**Files:**
- Create: `src/app.css` (conteúdo migrado de `src/app/globals.css`)
- Create: `src/app.tsx`

**Interfaces:**
- Consumes: `ThemeProvider` de `@/context/theme`, `Switch` de `@/components/Switch`
- Produces: layout raiz com header, padrão SVG de fundo e `<FileRoutes />` dentro de `<Suspense>`

- [ ] **Step 1: Criar `src/app.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes static {
  0% { transform: translateX(-1000px); }
  33% { transform: translateY(-1000px); }
  66% { transform: translateX(1000px); }
  100% { transform: translateY(1000px); }
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #343541;
}

::-webkit-scrollbar-track {
  background-color: #343541;
  border-radius: 12px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.pattern {
  mask-image: linear-gradient(#000, rgba(0,0,0,0.1));
}
```

- [ ] **Step 2: Criar `src/app.tsx`**

```tsx
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { ThemeProvider } from "@/context/theme"
import { Switch } from "@/components/Switch"
import { A } from "@solidjs/router"

import "@fontsource/inter"
import "@fontsource/rubik"
import "@fontsource/kanit/500.css"
import "@fontsource/work-sans"
import "@fontsource/space-grotesk"

import "./app.css"

export default function App() {
  return (
    <Router
      root={(props) => (
        <ThemeProvider>
          <header class="w-auto flex items-center justify-between p-2 font-sans">
            <A href="/">
              <img
                class="rounded-full w-10 h-10 lg:w-16 lg:h-16 m-2"
                src="/profile.jpg"
                width={45}
                height={45}
                alt="profile icon"
              />
            </A>
            <nav class="flex gap-4 lg:text-xl text-zinc-800 dark:text-zinc-300 font-bold lg:mr-8">
              <A class="hover:text-black hover:dark:text-white" href="/about">
                About
              </A>
              <A class="hover:text-black hover:dark:text-white" href="/blog">
                Blog
              </A>
              <A class="hover:text-black hover:dark:text-white" href="/projects">
                Projects
              </A>
              <Switch />
            </nav>
          </header>

          <Suspense>{props.children}</Suspense>

          <div class="pattern fixed top-0 left-0 h-screen w-screen z-[-100] opacity-30">
            <svg
              width="100%"
              height="100%"
              class="stroke-zinc-400 dark:stroke-violet-700"
            >
              <defs>
                <pattern
                  id="puzzle"
                  x="0"
                  y="0"
                  width="192"
                  height="192"
                  pattern-units="userSpaceOnUse"
                >
                  <path d="M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#puzzle)" />
            </svg>
          </div>
        </ThemeProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app.css src/app.tsx
git commit -S -m "feat: add global styles and root layout in SolidStart"
```

---

### Task 4: Rotas — Home, About, Blog, Projects

**Files:**
- Create: `src/routes/index.tsx`
- Create: `src/routes/about.tsx`
- Create: `src/routes/blog.tsx`
- Create: `src/routes/projects.tsx`

**Interfaces:**
- Consumes: `<A>` de `@solidjs/router` (para links internos)
- Produces: 4 componentes de página exportados como `default`

- [ ] **Step 1: Criar `src/routes/index.tsx`**

```tsx
import { A } from "@solidjs/router"

export default function Home() {
  return (
    <main class="flex flex-col items-start justify-between p-14 lg:pt-22 lg:mx-[16%] lg:my-10 z-50 bg-zinc-100 dark:bg-zinc-900 shadow-lg rounded-md">
      <h1 class="text-5xl text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white font-[800]">
        Maicon Lourenço
      </h1>
      <h2 class="text-2xl text-zinc-500 font-semibold">Full Stack Developer</h2>
      <br />
      <article class="w-full font-light text-lg">
        <p class="hover:text-black dark:hover:text-white">
          I'm a software developer based in Brazil with 4 year of experience in web development.
        </p>
        <p class="hover:text-black dark:hover:text-white">
          Working at{" "}
          <a
            class="text-black dark:text-zinc-200"
            href="https://concentrix.com/"
            target="_blank"
            rel="noopener"
          >
            <b class="font-bold">Concentrix</b>
          </a>
        </p>
        <p>
          I'm eternally curious about how everything works and how to solve the most challenging
          problems to help the world.
        </p>
        <br />
        <p class="hover:text-black dark:hover:text-white">
          Currently I'm working mainly with web technologies, internal systems, and artificial
          intelligence mechanisms, with the following stacks:{" "}
          <b class="font-bold">PHP, Javascript, NodeJS, Python and Java</b>
        </p>
        <p class="hover:text-black dark:hover:text-white">
          I have experience with these technologies:{" "}
          <b class="font-bold">
            Git, HTML5, CSS3, Laravel, TypeScript, NestJS, ReactJS, NextJS, Flask, Django, MySQL,
            PostgreSQL, Redis, RabbitMQ, Docker.
          </b>
        </p>
        <br />
        <p class="hover:text-black dark:hover:text-white">
          Outside of programming, I like to build computers and game servers, do some automation,
          and build robots. I also have a great admiration for the nature and especially the marine
          life, and I like to do some deep diving in my free time.
        </p>
        <p class="hover:text-black dark:hover:text-white">
          Ah, I also love music, my favorites styles are: Rock, Pop, Electronic, Classic and
          Post-punk.
        </p>
        <p class="mt-1 hover:text-black dark:hover:text-white">
          Check more about me{" "}
          <A href="/about">
            <u class="font-bold">here.</u>
          </A>
        </p>
        <br />
        <p>
          <b class="font-bold">Find me on</b>
        </p>
        <p class="flex gap-4 font-bold text-black dark:text-white flex-wrap mt-2">
          <a class="hover:underline hover:text-indigo-500" href="mailto:maiconloure@gmail.com">
            maiconloure@gmail.com
          </a>
          <a
            class="hover:underline hover:text-indigo-500"
            href="https://github.com/maiconloure"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          <a
            class="hover:underline hover:text-indigo-500"
            href="https://www.linkedin.com/in/maiconlourenco/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
        </p>
      </article>
    </main>
  )
}
```

- [ ] **Step 2: Criar `src/routes/about.tsx`**

```tsx
export default function About() {
  return (
    <main class="flex flex-col items-center justify-center p-8 lg:pt-10 lg:mx-[12%] z-50">
      <p class="text-zinc-500 dark:text-zinc-400 text-lg">Coming soon.</p>
    </main>
  )
}
```

- [ ] **Step 3: Criar `src/routes/blog.tsx`**

```tsx
export default function Blog() {
  return (
    <main class="flex flex-col items-center justify-center p-8 lg:pt-10 lg:mx-[12%] z-50">
      <p class="text-zinc-500 dark:text-zinc-400 text-lg">Coming soon.</p>
    </main>
  )
}
```

- [ ] **Step 4: Criar `src/routes/projects.tsx`**

```tsx
export default function Projects() {
  return (
    <div class="flex gap-4 flex-wrap items-center justify-between p-8 lg:pt-10 lg:mx-[10%] z-50">
      <div class="bg-zinc-100 dark:bg-zinc-950 p-8 rounded-xl">
        <h1 class="text-4xl font-extrabold text-zinc-900 dark:text-zinc-300">Timeless</h1>
        <div class="text-zinc-500 font-normal text-lg mt-1 ml-2">Oct 18, 2020</div>
        <div class="rounded-[4px] text-sm bg-blue-300 px-2 py-1 w-fit text-blue-500 font-semibold mt-1 ml-2">
          COMPLETED
        </div>
        <p class="font-light mt-2 text-lg text-zinc-500">
          Application for time management and work organization adjusted and customized for users
          and teams.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/routes/
git commit -S -m "feat: add all routes ported to SolidJS"
```

---

### Task 5: Remover arquivos Next.js e verificar build

**Files:**
- Delete: `next.config.js`
- Delete: `next-env.d.ts`
- Delete: `src/app/` (diretório inteiro)

**Interfaces:**
- Consumes: projeto com todos os arquivos SolidStart já criados nas Tasks 1–4
- Produces: build limpo sem dependências Next.js, executável com `npm run build`

- [ ] **Step 1: Deletar arquivos Next.js**

```bash
rm next.config.js next-env.d.ts
rm -rf src/app/
```

- [ ] **Step 2: Verificar que os novos arquivos estão corretos**

```bash
find src/ -type f | sort
```

Expected output:
```
src/app.css
src/app.tsx
src/components/Switch.tsx
src/context/theme.tsx
src/routes/about.tsx
src/routes/blog.tsx
src/routes/index.tsx
src/routes/projects.tsx
```

- [ ] **Step 3: Rodar o build**

```bash
npm run build
```

Expected: build completa sem erros. Output em `.output/public/`.

Se houver erro de tipos, verificar se `jsxImportSource` está como `"solid-js"` no `tsconfig.json` e se todos os `className` foram substituídos por `class` (SolidJS usa `class`, não `className`).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -S -m "chore: remove Next.js files and verify SolidJS build"
```

---

### Task 6: Configuração Wrangler

**Files:**
- Create: `wrangler.toml`

**Interfaces:**
- Produces: configuração para `wrangler pages deploy .output/public --project-name=maiconloure-com`

- [ ] **Step 1: Criar `wrangler.toml`**

```toml
name = "maiconloure-com"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".output/public"
```

- [ ] **Step 2: Commit**

```bash
git add wrangler.toml
git commit -S -m "chore: add wrangler.toml for Cloudflare Pages"
```

---

### Task 7: Pipeline GitHub Actions

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` configurados no repositório GitHub
- Produces: deploy automático em `.output/public` ao fazer merge de PR para `main`

**Nota:** Os secrets precisam ser criados manualmente em `Settings → Secrets and variables → Actions` no repositório GitHub antes que o pipeline funcione.

- [ ] **Step 1: Criar `.github/workflows/deploy.yml`**

```bash
mkdir -p .github/workflows
```

Criar o arquivo:

```yaml
name: Deploy to Cloudflare Pages

on:
  pull_request:
    types: [closed]
    branches:
      - main

jobs:
  deploy:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy .output/public --project-name=maiconloure-com
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -S -m "ci: add GitHub Actions deploy pipeline for Cloudflare Pages"
```

---

### Task 8: Push e abertura do PR

**Interfaces:**
- Consumes: branch `feature/solidstart-cloudflare-pages` com todos os commits das Tasks 1–7
- Produces: PR aberto no GitHub com título e descrição adequados

- [ ] **Step 1: Verificar status final**

```bash
git log --oneline main..HEAD
```

Expected: lista dos commits das tasks 1–7 (7 commits).

- [ ] **Step 2: Push da branch**

```bash
git push -u origin feature/solidstart-cloudflare-pages
```

- [ ] **Step 3: Abrir PR via GitHub CLI**

```bash
gh pr create \
  --title "feat: migrate to SolidStart + Cloudflare Pages" \
  --body "$(cat <<'EOF'
## Summary

- Migrates the full project from Next.js + React to SolidStart + SolidJS
- Removes all Notion integration, Vercel analytics, and Next.js dependencies
- Adds Cloudflare Pages deploy via Wrangler with \`nodejs_compat\` flag
- Ports theme toggle (dark/light) to native SolidJS context without external library
- Replaces \`next/font\` with \`@fontsource\` packages
- About and Blog pages are temporary placeholders ("Coming soon")

## Deploy pipeline

GitHub Actions workflow triggers on **PR merged to \`main\`** (not on push).
Requires two repository secrets:
- \`CLOUDFLARE_API_TOKEN\`
- \`CLOUDFLARE_ACCOUNT_ID\`

## Test plan

- [ ] \`npm run build\` completes without errors
- [ ] All 4 routes render correctly in \`vinxi dev\`
- [ ] Theme toggle persists across page reloads
- [ ] Header navigation works on all pages
- [ ] No React, Next.js, Vercel, or Notion references remain in \`package.json\`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Self-Review

**Spec coverage check:**

| Requisito do spec | Task que implementa |
|---|---|
| Substituir Next.js por SolidStart | Tasks 1, 3, 5 |
| Remover Notion | Task 5 (deleção de `src/app/_services/`) |
| Remover `@vercel/*` | Task 1 (package.json) |
| Tema dark/light sem next-themes | Task 2 |
| Fontes via @fontsource | Tasks 1, 3 |
| 4 rotas funcionando | Task 4 |
| About e Blog como placeholders | Task 4 (Steps 2 e 3) |
| `wrangler.toml` | Task 6 |
| GitHub Actions — trigger em PR merged para main | Task 7 |
| Branch + commits assinados + PR | Tasks 1 e 8 |

**Sem placeholders detectados.** Todos os steps têm código completo.

**Consistência de tipos:** `useTheme()` retorna `{ theme: () => Theme, toggleTheme: () => void }` definido em Task 2 Step 1 e consumido corretamente em Task 2 Step 2 (`Switch.tsx`).
