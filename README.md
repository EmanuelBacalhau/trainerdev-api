# TrainerDev API

Bem-vindo ao repositório da **TrainerDev API**! 🎉  
Esta aplicação serve como backend para a plataforma **Trainer.Dev**, projetada para oferecer aulas de programação com diferenciais únicos no mercado. A API foi desenvolvida para gerenciar e fornecer os recursos necessários à operação do aplicativo.

---

## 📝 Funcionalidades

- 🔒 Autenticação de usuários.
- 👤 Gerenciamento de usuários.
- 🛤️ Gerenciamento de trilhas.
- 📦 Gerenciamento de módulos.
- 🎥 Gerenciamento de aulas.
- 🛠️ Controle de acessos e permissões.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express.js**: Framework minimalista para construção de APIs.
- **TypeScript**: Superset do JavaScript para maior segurança no desenvolvimento.
- **Prisma**: ORM moderno para manipulação de banco de dados.
- **PostgreSQL**: Banco de dados relacional para armazenamento das informações.
- **JWT**: Gerenciamento de autenticação com tokens.

---

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes (npm, yarn ou pnpm)
- PostgreSQL (ou outro banco de dados configurado)
- Variáveis de ambiente (.env) configuradas

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/EmanuelBacalhau/trainerdev-api.git
cd trainerdev-api
```

2.

```bash
  npm install
  # ou
  yarn install
  # ou
  pnpm install
```

3. Configure o arquivo .env com as variáveis necessárias:

```.env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=<sua-chave-secreta>
```

4. Execute as migrações do banco de dados:

```bash
  npx prisma migrate dev
  # ou
  yarn prisma migrate dev
  # ou
  pnpm prisma migrate dev
```

5. Inicie o servidor:

```bash
  npm run dev
  # ou
  yarn dev
  # ou
  pnpm run dev
```
