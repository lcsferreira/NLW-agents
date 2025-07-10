# NLW Server - API de Salas

> Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat

## 📋 Sobre o Projeto

Este é o servidor backend de uma aplicação de gerenciamento de salas, desenvolvido com Node.js e TypeScript.

## 🚀 Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Zod** - Validação de schemas e tipagem
- **fastify-type-provider-zod** - Integração entre Fastify e Zod

### Banco de Dados

- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM moderno para TypeScript
- **pgvector** - Extensão PostgreSQL para operações vetoriais
- **Docker** - Containerização do banco de dados

### Ferramentas de Desenvolvimento

- **drizzle-seed** - Geração de dados de teste
- **Docker Compose** - Orquestração de containers

## 🏗️ Padrões de Projeto

- **Arquitetura em Camadas**: Separação entre rotas, conexão com banco e schemas
- **Validação de Dados**: Uso do Zod para validação de entrada e tipagem
- **Type Safety**: TypeScript em todo o projeto para maior segurança
- **Environment Variables**: Configuração através de variáveis de ambiente
- **Database Migrations**: Controle de versão do banco de dados com Drizzle

## 📁 Estrutura do Projeto

```
server/
├── src/
│   ├── db/
│   │   ├── connection.ts      # Conexão com o banco
│   │   ├── migrations/        # Migrações do banco
│   │   ├── schema/           # Definição das tabelas
│   │   └── seed.ts           # Dados de teste
│   ├── http/
│   │   └── routes/           # Rotas da API
│   ├── env.ts                # Validação de variáveis de ambiente
│   └── server.ts             # Configuração do servidor
├── docker/
│   └── setup.sql             # Script de inicialização do banco
├── docker-compose.yaml       # Configuração do Docker
└── drizzle.config.ts         # Configuração do Drizzle ORM
```

## 🔧 Configuração e Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Git

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd server
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações

```bash
npx drizzle-kit migrate
```

### 6. Popule o banco com dados de teste (opcional)

```bash
npm run db:seed
```

### 7. Inicie o servidor

```bash
# Desenvolvimento (com watch)
npm run dev

# Produção
npm start
```

## 📡 Endpoints da API

### GET /health

- **Descrição**: Verifica se o servidor está funcionando
- **Resposta**: `"Server OK"`

### GET /rooms

- **Descrição**: Lista todas as salas
- **Resposta**: Array de objetos com `id` e `name` das salas

Exemplo de resposta:

```json
[
  {
    "id": "uuid-da-sala",
    "name": "Nome da Sala"
  }
]
```

## 🗄️ Schema do Banco de Dados

### Tabela: rooms

| Campo       | Tipo      | Descrição                            |
| ----------- | --------- | ------------------------------------ |
| id          | UUID      | Identificador único (chave primária) |
| name        | TEXT      | Nome da sala (obrigatório)           |
| description | TEXT      | Descrição da sala (opcional)         |
| createdAt   | TIMESTAMP | Data de criação                      |

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm start` - Inicia o servidor em modo produção
- `npm run db:seed` - Popula o banco com dados de teste

## 🐳 Docker

O projeto utiliza Docker para o banco de dados PostgreSQL com a extensão pgvector. Para iniciar:

```bash
docker-compose up -d
```

## 📝 Licença

Este projeto foi desenvolvido durante o evento NLW da Rocketseat para fins educacionais.
