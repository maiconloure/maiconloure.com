# Design: Migração Next.js → SolidStart + Cloudflare Pages

**Data:** 2026-06-21  
**Status:** Aprovado

---

## Contexto

O projeto `maiconloure.com` é um portfólio pessoal atualmente em Next.js (App Router) com integração Notion para conteúdo dinâmico. A migração cobre:

1. Substituição completa do framework: Next.js → SolidStart
2. Remoção total da integração com Notion
3. Remoção de dependências Vercel (`@vercel/analytics`, `@vercel/speed-insights`)
4. Adição de suporte a deploy via Cloudflare Pages (wrangler)
5. Pipeline CI/CD via GitHub Actions — acionado em PR para `main`

---

## Decisões de Arquitetura

### Framework: SolidStart com preset `cloudflare-pages`

SolidStart é o meta-framework oficial do SolidJS. O preset `cloudflare-pages` gera output compatível com `wrangler pages deploy` nativamente, sem adaptador extra. Preserva capacidade de SSR futura.

- Build output: `.output/public`
- Config: `app.config.ts` (substitui `next.config.js`)
- Roteamento: baseado em arquivo em `src/routes/`

### Roteamento

| Rota | Arquivo |
|---|---|
| `/` | `src/routes/index.tsx` |
| `/about` | `src/routes/about.tsx` |
| `/blog` | `src/routes/blog.tsx` |
| `/projects` | `src/routes/projects.tsx` |
| Layout global | `src/app.tsx` |

### Tema (dark mode)

Substituição de `next-themes` por contexto SolidJS puro:
- `createSignal` para o estado do tema
- `createEffect` para persistência em `localStorage` e aplicação da classe `dark` no `<html>`
- Tailwind dark mode strategy: `class` (sem mudança)
- Componente `Switch` portado de React → SolidJS (mesma lógica, sintaxe adaptada)

### Fontes

Substituição de `next/font/google` por pacotes `@fontsource/*`:
- `@fontsource/inter`
- `@fontsource/rubik`
- `@fontsource/kanit`
- `@fontsource/work-sans`
- `@fontsource/space-grotesk`

Importados diretamente no entry point, sem configuração especial.

### Imagens e Links

- `next/image` → `<img>` padrão (sem otimização automática por enquanto)
- `next/link` → `<A>` de `@solidjs/router`

### Analytics

`@vercel/analytics` e `@vercel/speed-insights` são removidos sem substituto imediato. Cloudflare Web Analytics pode ser adicionado futuramente via script tag no `app.tsx`.

---

## Conteúdo das Páginas

### Páginas com conteúdo preservado
- `/` (home): mantém o layout e conteúdo atual
- `/projects`: mantém o layout e conteúdo atual

### Páginas placeholder (temporário)
- `/about`: layout com header funcionando, corpo com mensagem "Coming soon"
- `/blog`: layout com header funcionando, corpo com mensagem "Coming soon"

---

## Infraestrutura

### `wrangler.toml`

```toml
name = "maiconloure-com"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".output/public"
```

### `.github/workflows/deploy.yml`

**Trigger:** `pull_request` com `types: [closed]` e condição `github.event.pull_request.merged == true` e `base.ref == 'main'`

**Steps:**
1. Checkout do código
2. Setup Node.js (versão do `.nvmrc` ou `20`)
3. `npm ci`
4. `npm run build`
5. `wrangler pages deploy .output/public --project-name=maiconloure-com`

**Secrets necessários no repositório GitHub:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## Dependências

### Removidas
- `next`
- `react`, `react-dom`
- `@types/react`, `@types/react-dom`
- `next-themes`
- `@notionhq/client`
- `notion-to-md`
- `encoding`
- `@vercel/analytics`
- `@vercel/speed-insights`
- `eslint-config-next`
- `@rocketseat/eslint-config`

### Adicionadas
- `@solidjs/start`
- `solid-js`
- `vinxi`
- `@fontsource/inter`
- `@fontsource/rubik`
- `@fontsource/kanit`
- `@fontsource/work-sans`
- `@fontsource/space-grotesk`
- `wrangler` (devDependency)
- `vite-plugin-solid` (devDependency)

### Mantidas
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `typescript`
- `react-icons` → substituído por `solid-icons` (equivalente SolidJS)
- `react-markdown` → removido (sem conteúdo Markdown por enquanto)

### Scripts `package.json`

```json
{
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start",
    "lint": "eslint ."
  }
}
```

---

## Critérios de Sucesso

1. `npm run build` completa sem erros
2. Todas as 4 rotas renderizam corretamente
3. Theme toggle (dark/light) funciona com persistência
4. Header com navegação funcional em todas as páginas
5. Pipeline GitHub Actions executa deploy ao fazer merge de PR para `main`
6. Zero dependências Vercel ou Notion no projeto final
