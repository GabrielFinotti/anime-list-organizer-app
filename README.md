# 🎌 Anime List Organizer

<div align="center">

![Anime List Organizer Logo](https://via.placeholder.com/200x200?text=🎌)

**Sistema moderno de organização e gerenciamento de animes**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Development Status](https://img.shields.io/badge/Status-Active%20Development-green.svg)](https://github.com/GabrielFinotti/anime-list-organizer-app)
[![Version](https://img.shields.io/badge/Version-2.0.0-purple.svg)](https://github.com/GabrielFinotti/anime-list-organizer-app/releases)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

*Aplicação web responsiva para organização e acompanhamento estruturado da sua lista de animes pessoal.*

[🚀 Demo](#demo) • [📖 Documentação](#documentação) • [🔧 Instalação](#instalação) • [🤝 Contribuir](#contribuição)

</div>

---

## 📋 Índice

- [📌 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#-tecnologias)
- [🏗️ Arquitetura](#-arquitetura)
- [� Instalação e Configuração](#-instalação-e-configuração)
- [� Como Usar](#-como-usar)
- [🌐 API Integration](#-api-integration)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎨 UI/UX Design](#-uiux-design)
- [🔐 Segurança](#-segurança)
- [🧪 Testes](#-testes)
- [🚀 Deploy](#-deploy)
- [🛣️ Roadmap](#-roadmap)
- [🤝 Contribuição](#-contribuição)
- [� Licença](#-licença)

## 📌 Sobre o Projeto

O **Anime List Organizer** é uma aplicação web moderna desenvolvida para otacos que desejam organizar, acompanhar e gerenciar sua coleção pessoal de animes de forma estruturada e eficiente.

### 🎯 Objetivo

Fornecer uma interface intuitiva e responsiva que permita aos usuários:

- Catalogar animes assistidos, em andamento e na lista de desejados
- Acompanhar progresso de episódios e temporadas
- Organizar por categorias, gêneros e status
- Buscar e descobrir novos animes através de scraping externo
- Manter registros detalhados com sinopses, datas e derivados

## ✨ Funcionalidades

### 🏠 Dashboard Principal

- **Lista de Animes**: Visualização organizada de toda sua coleção
- **Busca Avançada**: Filtros por categoria, gênero, status e tipo
- **Cards Detalhados**: Informações completas de cada anime
- **Status de Progresso**: Acompanhamento de episódios e temporadas

### ➕ Gerenciamento de Animes

- **Adicionar Manualmente**: Formulário completo para cadastro
- **Scraping Automático**: Busca de dados via lookup externo
- **Edição Detalhada**: Atualização de informações e progresso
- **Categorização**: Organização por gêneros, categorias e status

### 🔍 Recursos de Busca

- **Lookup Inteligente**: Integração com APIs externas para busca de animes
- **Filtros Múltiplos**: Combinação de critérios para busca específica
- **Pesquisa em Tempo Real**: Resultados instantâneos conforme digitação
- **Histórico**: Manutenção do progresso e alterações

### 📱 Interface Móvel

- **Design Responsivo**: Otimizado para todas as telas
- **Navegação Intuitiva**: Menu lateral e navegação simplificada
- **Performance**: Carregamento rápido e smooth scrolling
- **Offline Ready**: Preparado para funcionalidades PWA

## 🛠️ Tecnologias

### Frontend Stack

- **[Next.js 15.5.2](https://nextjs.org/)** - Framework React com App Router
- **[React 19.1.0](https://reactjs.org/)** - Biblioteca para interfaces
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[SASS Modules](https://sass-lang.com/)** - Preprocessador CSS com escopo local

### Ferramentas de Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Turbopack](https://turbo.build/pack)** - Bundler de alta performance
- **[PostCSS](https://postcss.org/)** - Processamento CSS moderno

### Padrões e Arquitetura

- **App Router** - Sistema de roteamento do Next.js 13+
- **Client/Server Components** - Renderização híbrida otimizada
- **CSS Modules** - Estilização com escopo local
- **REST API Integration** - Consumo de APIs externas

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │       Lib           │  │
│  │             │  │             │  │                     │  │
│  │ • /login    │  │ • Forms     │  │ • API Client        │  │
│  │ • /list     │  │ • Cards     │  │ • DTOs              │  │
│  │ • /add      │  │ • Inputs    │  │ • Types             │  │
│  │ • /lookup   │  │ • Headers   │  │ • Utilities         │  │
│  │ • /data/:id │  │ • Loaders   │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                   Middleware & Auth                         │
├─────────────────────────────────────────────────────────────┤
│                    External API                             │
│              (Backend separado)                             │
└─────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

1. **Autenticação** → Middleware verifica sessão
2. **Páginas** → Carregam dados via API Client
3. **Componentes** → Recebem props e gerenciam estado local
4. **API Client** → Comunica com backend via HTTP/REST
5. **Estado** → Gerenciado com React State e Session Storage

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 ou **yarn** ≥ 1.22.0
- **Git** para clonagem do repositório

### 1. Clonagem do Repositório

```bash
git clone https://github.com/GabrielFinotti/anime-list-organizer-app.git
cd anime-list-organizer-app
```

### 2. Instalação de Dependências

```bash
# Com npm
npm install

# Com yarn
yarn install
```

### 3. Configuração do Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASIC_USERNAME=seu_usuario
NEXT_PUBLIC_BASIC_PASSWORD=sua_senha
```

### 4. Execução em Desenvolvimento

```bash
# Com npm
npm run dev

# Com yarn
yarn dev
```

A aplicação estará disponível em `http://localhost:3001`.

### 5. Build para Produção

```bash
# Build
npm run build

# Start em produção
npm run start
```

## 📱 Como Usar

### 1. Login

- Acesse a aplicação e faça login com suas credenciais
- As credenciais são configuradas via variáveis de ambiente

### 2. Navegação Principal

- **Home/Lista**: Visualize todos os seus animes cadastrados
- **Adicionar**: Cadastre novos animes manualmente
- **Scrapper**: Busque animes automaticamente via lookup

### 3. Gerenciamento de Animes

- **Filtrar**: Use a barra de pesquisa e filtros avançados
- **Editar**: Clique em um anime para editar suas informações
- **Status**: Atualize o progresso de episódios e temporadas
- **Categorizar**: Organize por gêneros e categorias

### 4. Recursos Avançados

- **Derivados**: Adicione movies, OVAs e specials relacionados
- **Status de Publicação**: Acompanhe se o anime está em produção
- **Material de Origem**: Registre se é baseado em manga, light novel, etc.

## 🌐 API Integration

### Endpoints Utilizados

```typescript
// Busca de animes
GET /animes - Lista todos os animes
GET /animes/:id - Busca anime específico
GET /anime/lookup?title=:title - Lookup externo

// Gerenciamento
POST /animes - Cria novo anime
PUT /anime/update/:id - Atualiza anime
DELETE /anime/delete/:id - Remove anime

// Metadados
GET /categories - Lista categorias
GET /genres - Lista gêneros
GET /adult-genres - Lista gêneros adultos
```

### Estrutura de Dados

```typescript
interface AnimeDTO {
  id: string;
  name: string;
  synopsis: string;
  category: CategoryDTO;
  genres: GenreDTO[];
  adultGenres: AdultGenreDTO[];
  typeOfMaterialOrigin: string;
  materialOriginName: string;
  releaseDate: string;
  isMovie: boolean;
  isAdult: boolean;
  derivate?: {
    movies: string[];
    ovas: string[];
    specials: string[];
  };
  lastReleaseSeason: number;
  lastWatchedSeason: number;
  lastWatchedEpisode: number;
  actualStatus: "publishing" | "completed" | "cancelled" | "in production";
## 📁 Estrutura do Projeto

```

anime-list-organizer-app/
├── 📁 public/                    # Assets estáticos
│   └── 📁 icons/                 # Ícones SVG
├── 📁 src/
│   ├── 📁 app/                   # App Router (Next.js 13+)
│   │   ├── 📄 layout.tsx         # Layout global
│   │   ├── 📄 page.tsx          # Página inicial (Login)
│   │   └── 📁 anime/            # Rotas protegidas
│   │       ├── 📄 layout.tsx    # Layout com header
│   │       ├── 📁 add/          # Adicionar anime
│   │       ├── 📁 data/[id]/    # Detalhes do anime
│   │       ├── 📁 list/         # Lista de animes
│   │       └── 📁 lookup/       # Busca externa
│   ├── 📁 components/           # Componentes reutilizáveis
│   │   ├── 📁 layout/           # Componentes de layout
│   │   │   ├── 📁 cards/        # Cards de exibição
│   │   │   ├── 📁 forms/        # Formulários
│   │   │   └── 📁 headers/      # Cabeçalhos
│   │   └── 📁 ui/               # Componentes de UI
│   │       ├── 📁 inputs/       # Campos de entrada
│   │       └── 📁 loaders/      # Indicadores de carregamento
│   ├── 📁 lib/                  # Utilitários e APIs
│   │   ├── 📁 api/              # Cliente da API
│   │   └── 📁 dto/              # Data Transfer Objects
│   └── 📄 middleware.ts         # Middleware de autenticação
├── 📄 next.config.ts            # Configuração Next.js
├── 📄 tsconfig.json             # Configuração TypeScript
├── 📄 package.json              # Dependências e scripts
└── 📄 eslint.config.mjs         # Configuração ESLint

```

## 🎨 UI/UX Design

### Design System

- **Tipografia**: Work Sans (font customizada)
- **Cores**: Esquema dark/light mode ready
- **Layout**: CSS Grid e Flexbox
- **Responsividade**: Mobile-first approach
- **Animações**: Transições suaves e micro-interações

### Componentes Principais

- **AnimeCard**: Card responsivo com informações do anime
- **AnimeForm**: Formulário completo para CRUD
- **SearchForm**: Barra de busca com filtros avançados
- **MobileHeader**: Navegação mobile com menu lateral
- **LoginForm**: Autenticação simples e segura

## 🔐 Segurança

### Autenticação

- **Basic Authentication**: Credenciais via variáveis de ambiente
- **Session Management**: Storage no browser e cookies
- **Middleware Protection**: Rotas protegidas automaticamente
- **Logout Automático**: Limpeza de sessão

### Boas Práticas

- **Environment Variables**: Dados sensíveis fora do código
- **Input Validation**: Sanitização em formulários
- **HTTPS Ready**: Preparado para produção segura
- **CSP Headers**: Content Security Policy configurável

## 🧪 Testes

### Estrutura de Testes

```bash
# Executar linting
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit

# Build de produção (teste completo)
npm run build
```

### Testes Planejados

- [ ] **Unit Tests** - Jest + React Testing Library
- [ ] **Integration Tests** - Cypress ou Playwright
- [ ] **E2E Tests** - Cenários completos de usuário
- [ ] **Performance Tests** - Lighthouse CI

## 🚀 Deploy

### Opções de Deploy

#### Vercel (Recomendado)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Variáveis de Ambiente (Produção)

```env
NEXT_PUBLIC_API_URL=https://sua-api.com
NEXT_PUBLIC_BASIC_USERNAME=usuario_producao
NEXT_PUBLIC_BASIC_PASSWORD=senha_segura_producao
```

## 🛣️ Roadmap

### 🚀 Versão Atual (v2.0.0)

- [x] Interface mobile-first responsiva
- [x] CRUD completo de animes
- [x] Sistema de filtros e busca
- [x] Integração com API externa
- [x] Autenticação básica

### 📋 Próximas Versões

#### v2.1.0 - UX/UI Improvements

- [ ] Dark/Light theme toggle
- [ ] Animações e micro-interações
- [ ] Skeleton loading states
- [ ] Toast notifications
- [ ] Infinite scroll na lista

#### v2.2.0 - PWA & Performance

- [ ] Service Worker implementação
- [ ] Offline functionality
- [ ] Push notifications
- [ ] App install prompt
- [ ] Performance optimizations

#### v2.3.0 - Features Avançadas

- [ ] Sistema de avaliação (rating)
- [ ] Comentários e notas pessoais
- [ ] Exportar/importar dados
- [ ] Estatísticas avançadas
- [ ] Recomendações personalizadas

#### v3.0.0 - Multi-user & Social

- [ ] Sistema de usuários múltiplos
- [ ] Compartilhamento de listas
- [ ] Rede social de otakus
- [ ] Reviews e discussões
- [ ] API Gateway implementação

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Este é um projeto de código aberto e toda ajuda é valiosa.

### Como Contribuir

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
4. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. **Push** para a branch (`git push origin feature/AmazingFeature`)
6. **Abra um Pull Request**

### Diretrizes de Desenvolvimento

- **Code Style**: Siga as configurações do ESLint
- **TypeScript**: Mantenha tipagem estrita
- **Commits**: Use [Conventional Commits](https://conventionalcommits.org/)
- **Testing**: Adicione testes para novas features
- **Documentation**: Atualize documentação quando necessário

### Tipos de Contribuição

- 🐛 **Bug Reports**: Relate bugs encontrados
- 💡 **Feature Requests**: Sugira novas funcionalidades  
- 📖 **Documentation**: Melhore a documentação
- 🎨 **UI/UX**: Aprimore a interface
- 🚀 **Performance**: Otimize performance
- 🧪 **Tests**: Adicione ou melhore testes

## 📊 Status do Projeto

![GitHub issues](https://img.shields.io/github/issues/GabrielFinotti/anime-list-organizer-app)
![GitHub pull requests](https://img.shields.io/github/issues-pr/GabrielFinotti/anime-list-organizer-app)
![GitHub last commit](https://img.shields.io/github/last-commit/GabrielFinotti/anime-list-organizer-app)
![GitHub contributors](https://img.shields.io/github/contributors/GabrielFinotti/anime-list-organizer-app)

## 🙏 Agradecimentos

- **Next.js Team** - Framework incrível e bem documentado
- **React Community** - Ecosystem rico e ativo
- **TypeScript Team** - Type safety que faz a diferença
- **Sass Team** - CSS preprocessor poderoso
- **Vercel** - Platform de deploy excepcional

## 📞 Suporte e Contato

- **Documentação**: [GitHub Wiki](https://github.com/GabrielFinotti/anime-list-organizer-app/wiki)
- **Issues**: [GitHub Issues](https://github.com/GabrielFinotti/anime-list-organizer-app/issues)
- **Discussões**: [GitHub Discussions](https://github.com/GabrielFinotti/anime-list-organizer-app/discussions)
- **Email**: <contato@seudominio.com>

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2024 Gabriel Finotti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**[⬆ Voltar ao topo](#-anime-list-organizer)**

Feito com ❤️ por [Gabriel Finotti](https://github.com/GabrielFinotti)

⭐ **Se este projeto foi útil para você, considere dar uma estrela!** ⭐

</div>
```
- **Modularização**: Componentes reutilizáveis e arquitetura escalável
- **Performance**: Next.js 15 + Turbopack para desenvolvimento rápido

### 🎯 Objetivos Principais

- Centralizar gerenciamento de coleção de animes
- Acompanhar progresso de temporadas e episódios
- Diferenciação inteligente entre filmes e séries
- Enriquecimento automático de metadados via lookup AI
- Preparação para recursos PWA e suporte desktop

## ⚡ Features Principais

### 📊 Gestão de Dados

| Feature | Descrição | Status |
|---------|-----------|--------|
| **CRUD Completo** | Criar, listar, editar e deletar animes | ✅ Ativo |
| **Busca em Tempo Real** | Filtro instantâneo via `useMemo` (client-side) | ✅ Ativo |
| **Lookup AI** | Enriquecimento automático de metadados | ✅ Ativo |
| **Categorização** | Gêneros, demografia, origem | ✅ Ativo |
| **Progresso Tracking** | Temporadas/episódios assistidos | ✅ Ativo |
