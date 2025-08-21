# Anime List Organizer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/next.js-15-black)
![React](https://img.shields.io/badge/react-19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/types-Typescript-3178c6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/node-%3E=18-green?logo=node.js)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

Organize e acompanhe animes de forma estruturada. API e front-end em Next.js (App Router) com persistência em MongoDB e fluxo de enriquecimento opcional via integração com modelo de linguagem (lookup AI).

**Status:** Em desenvolvimento  
**Stack:** Next.js · React 19 · TypeScript · MongoDB (Mongoose) · SASS Modules

---

## 📌 Objetivo

Centralizar o gerenciamento de animes: cadastro, detalhes, acompanhamento de progresso (temporadas/episódios), diferenciação entre filmes e séries, e preenchimento assistido de metadados.

## 🚀 Principais Recursos

- CRUD completo de animes
- Busca/lookup assistido (rota que consulta modelo externo para pré-preencher dados)
- Suporte a filmes e séries (flags e nomes de filmes relacionados)
- Campos de progresso: última temporada/episódio assistidos
- Listagem ordenada por criação (recente primeiro)
- API REST interna (rotas do App Router)

## 🧱 Arquitetura (alto nível)

```text
[Next.js App Router]
 |-- UI (pages + components)
 |-- API Routes (/api/anime/*)
   |-- MongoDB (Mongoose Model: Anime)
   |-- Lookup (fetch -> OpenAI - opcional)
```

Pontos de atenção:

- Conexão Mongo reutilizável (`singleton`) para evitar overhead em dev/hot-reload
- Sanitização/normalização básica de entrada nas rotas (arrays, booleanos, números)
- Separação leve entre camada de modelo (`models/anime.ts`) e handlers HTTP

## 🗂️ Estrutura de Pastas (essencial)

```text
src/
 app/
  api/
   anime/
    route.ts         # GET (lista) / POST (criação)
    [id]/route.ts    # GET / PUT / DELETE por ID
    lookup/route.ts  # POST para enriquecimento AI
  list/                # Páginas de listagem/detalhe
 components/            # UI reutilizável (cards, forms, tables)
 lib/
  db/mongo.ts          # Conexão MongoDB
  models/anime.ts      # Schema Mongoose
```

## 📦 Modelo (Schema Anime)

Campo | Tipo | Obrigatório | Observações
----- | ---- | ----------- | -----------
`name` | string | sim | Indexado
`synopsis` | string | não | Sinopse
`status` | string | não | Ex: watching, completed
`category` | string[] | não | Demografia (ex: shounen)
`genre` | string[] | não | Gêneros (ação, drama...)
`origin` | string[] | não | Fonte (manga, original...)
`namesOfOrigins` | string[] | não | Títulos originais
`isMovie` | boolean | não | Se é filme
`isSerieContentAnyMovie` | boolean | não | Série com filmes associados
`moviesNames` | string[] | não | Lista de filmes relacionados
`lastReleasedSeason` | number \| null | não | Última temporada lançada
`lastWatchedSeason` | number \| null | não | Progresso do usuário
`lastWatchedEpisode` | number \| null | não | Progresso do usuário
`createdAt` / `updatedAt` | Date | auto | Timestamps

## 🔐 Variáveis de Ambiente

Nome | Descrição | Obrigatório
-----|-----------|------------
`MONGODB_URI` | String de conexão MongoDB | Sim
`OPENAI_API_KEY` | Chave para rota de lookup (se usada) | Não (apenas se usar lookup)
`PORT` | Porta do servidor | Não (default: 3000)

Arquivo recomendado: `.env.local`

Exemplo:

```env
MONGODB_URI=mongodb+srv://user:pass@host/db
OPENAI_API_KEY=sk-...
PORT=3000
```

## ⚙️ Instalação & Execução

Pré-requisitos: Node 18+ e MongoDB (local ou Atlas).

```powershell
git clone https://github.com/GabrielFinotti/Anime-list-organizer.git
cd Anime-list-organizer
npm install
copy NUL .env.local  # ou use um editor para criar o arquivo e preencher variáveis
npm run dev
```

App: <http://localhost:3000>

Build produção:

```powershell
npm run build
npm start
```

## 🧪 Qualidade (Sugestões Futuras)

- Testes unitários (Vitest/Jest) para normalizadores e handlers
- Testes de integração com supertest / next test runner
- ESLint + Prettier (já há lint script)
- Configuração de CI (GitHub Actions) para lint + testes + build

## 🛣️ Endpoints da API

### Lista / Criação

`GET /api/anime`

- Retorna lista em ordem decrescente de criação

`POST /api/anime`

Body mínimo:

```json
{
 "name": "Naruto",
 "status": "watching",
 "genre": ["ação", "aventura"],
 "isMovie": false
}
```

Resposta 201: documento criado
Erros: 400 (name required), 500 (internal)

### Operações por ID

`GET /api/anime/:id` — 404 se não encontrado

`PUT /api/anime/:id` — atualiza campos básicos

Body exemplo:

```json
{
 "name": "Naruto Shippuden",
 "status": "completed",
 "lastWatchedSeason": 21,
 "lastWatchedEpisode": 500
}
```

`DELETE /api/anime/:id` — remove documento

Erros comuns: 400 (invalid id), 404 (not found), 500 (internal)

### Lookup (Enriquecimento assistido)

`POST /api/anime/lookup`
Body:

```json
{ "name": "Fullmetal Alchemist" }
```

Retorna JSON enriquecido (sem persistir). Requer `OPENAI_API_KEY` válido. Possíveis erros: 400 (name required), 502 (erro provedor), 422 (formato inesperado), 500 (internal).

## 🔁 Fluxo Básico de Uso

1. Criar anime (`POST /api/anime`)
2. (Opcional) Usar lookup para sugerir metadados antes de salvar
3. Atualizar progresso com `PUT /api/anime/:id`
4. Remover quando não for mais relevante (`DELETE /api/anime/:id`)

## 🧩 Scripts (npm)

Script | Descrição
-------|----------
`dev` | Desenvolvimento (Turbopack)
`build` | Build produção
`start` | Servir build
`lint` | Lint de código

## 🔒 Boas Práticas de Segurança

- Não expor `OPENAI_API_KEY` em variáveis `NEXT_PUBLIC_*`
- Usar usuário Mongo com permissões restritas
- Adicionar índices em campos consultados com frequência (`name` já indexado)
- Validar entrada adicional antes de expandir API (ex: rate limiting em lookup)

## 🛠️ Roadmap (Ideias)

- Autenticação / multiusuário
- Paginação e filtros avançados
- Cache de resultados de lookup
- Sistema de tags personalizadas
- Exportar/importar lista em JSON/CSV

## 🤝 Contribuindo

1. Abra uma issue (bug/feature)
2. Crie branch: `feat/descricao` ou `fix/descricao`
3. Commit semântico (ex: `feat(anime): adiciona campo x`)
4. PR com descrição objetiva + passos de teste

Checklist PR:

- [ ] Build passa (`npm run build`)
- [ ] Lint limpo (`npm run lint`)
- [ ] Mudanças documentadas
- [ ] Testes (se aplicável)

## 📄 Licença

MIT — veja `LICENSE`.

## 🙋 Suporte / Contato

Abra uma issue no GitHub ou entre em contato via perfil do mantenedor.

---

> Dúvidas ou quer extender a documentação (ex: diagrama de sequência)? Abra uma issue “docs”.
