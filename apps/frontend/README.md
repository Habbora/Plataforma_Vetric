# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## Como editar e rodar este frontend

Há várias formas de editar e executar a aplicação.

**Usar Bun (preferido)**

Pré-requisitos:
- Bun instalado: https://bun.sh/docs/installation

Passos:

```sh
# 1. Clonar o repositório
git clone <YOUR_GIT_URL>

# 2. Ir para a pasta do frontend
cd apps/frontend

# 3. Configurar variáveis de ambiente
cp .env.example .env
# edite .env e ajuste VITE_API_URL (ex.: http://localhost:3001)

# 4. Instalar deps
bun install

# 5. Rodar em desenvolvimento
bun run dev

# 6. Build de produção
bun run build

# 7. Preview do build
bun run preview
```

**Usar npm (alternativo)**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

Requisitos: Node.js & npm - [instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Passos:

```sh
git clone <YOUR_GIT_URL>
cd apps/frontend
cp .env.example .env
npm i
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Tecnologias usadas

Este projeto usa:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Como publicar este projeto

Abra [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) e clique em Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
