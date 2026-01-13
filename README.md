# ARC Tracker (Português)

Assistente de coleta para o jogo ARC Raiders. Este aplicativo web permite buscar itens na base oficial, definir metas de coleta e acompanhar o progresso com uma interface simples e responsiva. Os dados são salvos no `localStorage`, mantendo sua lista entre sessões.

## Visão Geral

- Buscar itens por nome na API ARC Raiders
- Adicionar itens à lista de rastreio e definir a meta (`target`)
- Incrementar/decrementar quantidade coletada (`owned`) e visualizar progresso
- Editar a meta posteriormente via modal
- Remover itens com confirmação
- Limpar itens já concluídos (quando `owned >= target`)

## Stack

- React 19
- Vite 7
- Tailwind CSS 4 (plugin oficial `@tailwindcss/vite`)
- React Router 7
- ESLint 9

## Requisitos

- Node.js 18+ (recomendado 20+)
- `pnpm` instalado globalmente (ou use `npm`/`yarn` com ajustes nos comandos)

## Instalação e Execução

```bash
# Instalar dependências
pnpm install

# Ambiente de desenvolvimento (com HMR)
pnpm dev

# Build de produção
pnpm build

# Preview do build
pnpm preview
```

O comando `pnpm dev` inicia o servidor do Vite expondo na rede local (`--host`).

## Scripts

- `dev`: inicia o servidor de desenvolvimento
- `build`: gera build de produção
- `preview`: serve o build gerado
- `lint`: roda o ESLint em todo o projeto

## Estrutura do Projeto

```
src/
	App.jsx              # Rotas e modais globais (edição/remoção)
	pages/
		Home.jsx           # Lista, progresso e limpeza de concluídos
		AddItem.jsx        # Busca na API e adição com meta via modal
	components/
		ItemCard.jsx       # Cartão com quantidade, progresso e ações
		ModalInput.jsx     # Modal para definir/editar meta
		ModalConfirm.jsx   # Modal de confirmação para remoção/limpeza
	services/
		api.js             # Integração com API ARC Raiders via proxy CORS
	index.css            # Import do Tailwind CSS 4
main.jsx               # Bootstrap do React
vite.config.js         # Vite + plugin React + plugin Tailwind
```

## Estilo/Tailwind

- Tailwind 4 é habilitado via `@tailwindcss/vite` no arquivo de configuração do Vite.
- O CSS principal importa Tailwind diretamente:

```css
@import "tailwindcss";
```

## API e CORS

- Base: `https://metaforge.app/api/arc-raiders`
- Para contornar CORS, o projeto usa o proxy público `https://api.allorigins.win/get?url=`.
- Endpoints:
  - Lista: `/items`
  - Busca: `/items?search=<query>`

Exemplo simplificado (ver `src/services/api.js` para implementação com proxy e parsing):

```js
const BASE_URL = "https://metaforge.app/api/arc-raiders";
const url = `${BASE_URL}/items?search=${encodeURIComponent(query)}`;
```

Observação: o uso de proxy público é adequado para desenvolvimento/hobby. Em produção, considere um backend próprio para gerenciar requisições à API e headers CORS.

## Persistência

- A lista é armazenada no `localStorage` sob a chave `arc_watchlist`.

## Desenvolvimento

- Rotas principais: `/` (Home) e `/add-item` (Adicionar Item)
- Estados e modais são controlados em `App.jsx`
- Boas práticas de UI: feedback visual, animações leves, confirmação antes de ações destrutivas

## Roadmap (ideias futuras)

- Filtros/ordenação na lista
- Compartilhamento/exportação da `watchlist`
- Integração com backend para evitar proxy público
- Suporte offline com `IndexedDB`

## Licença

Projeto para fins educacionais/hobby. Sem afiliação oficial com ARC Raiders.

--------------------------------------------------

# ARC Tracker (English)

A collection assistant for the ARC Raiders game. This web application allows you to search for items in the official database, set collection goals, and track progress with a simple and responsive interface. Data is saved in `localStorage`, keeping your list between sessions.

## Overview

- Search for items by name using the ARC Raiders API
- Add items to your tracking list and set a target (`target`)
- Increment/decrement collected quantity (`owned`) and view progress
- Edit the target later via modal
- Remove items with confirmation
- Clear completed items (when `owned >= target`)

## Stack

- React 19
- Vite 7
- Tailwind CSS 4 (official `@tailwindcss/vite` plugin)
- React Router 7
- ESLint 9

## Requirements

- Node.js 18+ (recommended 20+)
- `pnpm` installed globally (or use `npm`/`yarn` with command adjustments)

## Installation and Running

```bash
# Install dependencies
pnpm install

# Development server (with HMR)
pnpm dev

# Production build
pnpm build

# Preview the build
pnpm preview
```

The `pnpm dev` command starts the Vite server exposed on the local network (`--host`).

## Scripts

- `dev`: starts the development server
- `build`: generates production build
- `preview`: serves the generated build
- `lint`: runs ESLint on the entire project

## Project Structure

```
src/
  App.jsx              # Routes and global modals (edit/remove)
  pages/
    Home.jsx           # List, progress, and cleanup of completed items
    AddItem.jsx        # API search and adding with target via modal
  components/
    ItemCard.jsx       # Card with quantity, progress, and actions
    ModalInput.jsx     # Modal for setting/editing target
    ModalConfirm.jsx   # Confirmation modal for removal/cleanup
  services/
    api.js             # ARC Raiders API integration via CORS proxy
  index.css            # Tailwind CSS 4 import
main.jsx               # React bootstrap
vite.config.js         # Vite + React plugin + Tailwind plugin
```

## Styling/Tailwind

- Tailwind 4 is enabled via `@tailwindcss/vite` in the Vite configuration file.
- The main CSS imports Tailwind directly:

```css
@import "tailwindcss";
```

## API and CORS

- Base: `https://metaforge.app/api/arc-raiders`
- To bypass CORS, the project uses the public proxy `https://api.allorigins.win/get?url=`.
- Endpoints:
  - List: `/items`
  - Search: `/items?search=<query>`

Simplified example (see `src/services/api.js` for proxy implementation and parsing):

```js
const BASE_URL = "https://metaforge.app/api/arc-raiders";
const url = `${BASE_URL}/items?search=${encodeURIComponent(query)}`;
```

Note: Using a public proxy is suitable for development/hobby projects. In production, consider a custom backend to manage API requests and CORS headers.

## Persistence

- The list is stored in `localStorage` under the key `arc_watchlist`.

## Development

- Main routes: `/` (Home) and `/add-item` (Add Item)
- States and modals are controlled in `App.jsx`
- UI best practices: visual feedback, light animations, confirmation before destructive actions

## Roadmap (Future Ideas)

- Filters/sorting in the list
- Sharing/exporting `watchlist`
- Backend integration to avoid public proxy
- Offline support with `IndexedDB`

## License

Project for educational/hobby purposes. No official affiliation with ARC Raiders.
