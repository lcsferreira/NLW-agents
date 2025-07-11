# NLW Server - API de Salas com IA

> Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat

## 📋 Sobre o Projeto

Este é o servidor backend de uma aplicação de gerenciamento de salas com funcionalidades de IA, desenvolvido com Node.js e TypeScript. O sistema permite criar salas, fazer upload de áudios, transcrever conteúdo e responder perguntas baseadas no contexto dos áudios gravados.

## 🚀 Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Zod** - Validação de schemas e tipagem
- **fastify-type-provider-zod** - Integração entre Fastify e Zod
- **@fastify/multipart** - Upload de arquivos

### Inteligência Artificial

- **Google Gemini API** - Transcrição de áudio e geração de respostas
- **Embeddings** - Busca semântica por similaridade

### Banco de Dados

- **PostgreSQL** - Banco de dados relacional
- **pgvector** - Extensão PostgreSQL para operações vetoriais
- **Drizzle ORM** - ORM moderno para TypeScript
- **Docker** - Containerização do banco de dados

### Ferramentas de Desenvolvimento

- **drizzle-seed** - Geração de dados de teste
- **Docker Compose** - Orquestração de containers

## 🏗️ Padrões de Projeto

- **Arquitetura em Camadas**: Separação entre rotas, serviços, conexão com banco e schemas
- **Validação de Dados**: Uso do Zod para validação de entrada e tipagem
- **Type Safety**: TypeScript em todo o projeto para maior segurança
- **Environment Variables**: Configuração através de variáveis de ambiente
- **Database Migrations**: Controle de versão do banco de dados com Drizzle
- **Busca Semântica**: Utilização de embeddings para busca por similaridade

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
│   ├── services/
│   │   └── gemini.ts         # Integração com Google Gemini
│   ├── env.ts                # Validação de variáveis de ambiente
│   └── server.ts             # Configuração do servidor
├── docker/
│   └── setup.sql             # Script de inicialização do banco
├── client.http               # Testes da API
├── docker-compose.yaml       # Configuração do Docker
└── drizzle.config.ts         # Configuração do Drizzle ORM
```

## 🔧 Configuração e Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Chave da API do Google Gemini
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
GEMINI_API_KEY=sua_chave_do_gemini_aqui
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações

```bash
npm run db:migrate
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

- **Descrição**: Lista todas as salas com contador de perguntas
- **Resposta**: Array de objetos com `id`, `name`, `createdAt` e `questionsCount`

### POST /rooms

- **Descrição**: Cria uma nova sala
- **Body**: `{ "name": "string", "description": "string?" }`
- **Resposta**: `{ "roomId": "uuid" }`

### GET /rooms/:roomId/questions

- **Descrição**: Lista todas as perguntas de uma sala
- **Resposta**: Array de objetos com `id`, `question`, `answer` e `createdAt`

### POST /rooms/:roomId/questions

- **Descrição**: Cria uma nova pergunta e gera resposta baseada nos áudios da sala
- **Body**: `{ "question": "string" }`
- **Resposta**: `{ "questionId": "uuid", "answer": "string" }`

### POST /rooms/:roomId/audio

- **Descrição**: Faz upload de áudio, transcreve e armazena embeddings
- **Body**: Arquivo de áudio (multipart/form-data)
- **Resposta**: `{ "chunkId": "uuid" }`

## 🗄️ Schema do Banco de Dados

### Tabela: rooms

| Campo       | Tipo      | Descrição                            |
| ----------- | --------- | ------------------------------------ |
| id          | UUID      | Identificador único (chave primária) |
| name        | TEXT      | Nome da sala (obrigatório)           |
| description | TEXT      | Descrição da sala (opcional)         |
| createdAt   | TIMESTAMP | Data de criação                      |

### Tabela: questions

| Campo     | Tipo      | Descrição                            |
| --------- | --------- | ------------------------------------ |
| id        | UUID      | Identificador único (chave primária) |
| roomId    | UUID      | Referência para a sala               |
| question  | TEXT      | Pergunta feita                       |
| answer    | TEXT      | Resposta gerada pela IA              |
| createdAt | TIMESTAMP | Data de criação                      |

### Tabela: audioChunks

| Campo         | Tipo        | Descrição                            |
| ------------- | ----------- | ------------------------------------ |
| id            | UUID        | Identificador único (chave primária) |
| roomId        | UUID        | Referência para a sala               |
| transcription | TEXT        | Transcrição do áudio                 |
| embeddings    | VECTOR(768) | Embeddings para busca semântica      |
| createdAt     | TIMESTAMP   | Data de criação                      |

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm start` - Inicia o servidor em modo produção
- `npm run db:generate` - Gera migrações do banco
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:seed` - Popula o banco com dados de teste
- `npm run db:studio` - Abre o Drizzle Studio

## 🤖 Funcionalidades de IA

O projeto utiliza a API do Google Gemini para:

1. **Transcrição de Áudio**: Converte áudio em texto em português brasileiro
2. **Geração de Embeddings**: Cria vetores semânticos para busca por similaridade
3. **Geração de Respostas**: Responde perguntas baseadas no contexto dos áudios transcritos

## 🐳 Docker

O projeto utiliza Docker para o banco PostgreSQL com extensão pgvector:

```bash
docker-compose up -d
```

## 📝 Licença

Este projeto foi desenvolvido durante o evento NLW da Rocketseat para fins educacionais.
