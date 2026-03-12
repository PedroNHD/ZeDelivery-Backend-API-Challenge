<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=339933&height=150&section=header&text=🍺%20Zé%20Delivery%20Code%20Challenge&fontSize=40&animation=fadeIn" />
</div>

<p align="center">
  <a href="#-português">Português</a> │ <a href="#-english">English</a>
</p>

---

<h2 id="-português">🇧🇷 Português</h2>

<div align="center">
  <img src="https://img.shields.io/badge/status-Completo-brightgreen?style=for-the-badge" alt="Status Completo">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle">
</div>

### 🎯 O Desafio Técnico

Este projeto resolve um desafio de geoprocessamento, com foco em consultas espaciais para encontrar **Pontos de Venda (PDVs)** em áreas de cobertura (multipolígonos) e o mais próximo de uma localização.

A implementação utiliza **Oracle Database** com suas capacidades espaciais e **TypeORM** para o mapeamento objeto-relacional.

### 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| **Node.js** | Ambiente de execução |
| **Fastify** | Framework web de alta performance |
| **Oracle Database** | Banco de dados com suporte espacial |
| **TypeORM** | ORM para interação com o banco de dados |
| **Docker** | Gerenciamento de contêineres |
| **Jest** | Testes automatizados |
| **Zod** | Validação de schemas |
| **ESLint** | Padronização de código |
| **Prettier** | Formatação de código |

### ✅ Funcionalidades

- **Cadastro de PDV**: Criação de novos pontos de venda.
- **Busca por ID**: Procura um PDV pelo seu identificador.
- **Busca por Localização**: Encontra o PDV mais próximo de uma coordenada.
- **Seed**: Script para popular o banco de dados.
- **Linting**: Ferramentas para garantir a qualidade do código.

### 🚀 Como Executar

Siga os passos para configurar e executar a aplicação.

#### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18+)
- [Docker](https://www.docker.com/get-started/) e Docker Compose
- [PNPM](https://pnpm.io/installation)

#### 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/PedroNHD/ZeDelivery-Backend-API-Challenge.git
cd "Ze Code Challenge - Backend API/Backend-01"
pnpm install
```

#### 3. Ambiente

Crie o arquivo `.env` a partir do exemplo e preencha com as credenciais do banco:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=1521
DB_USER=myuser
DB_PASSWORD=myuserpassword
DB_ADMIN_PASSWORD=sua_senha_segura
DB_SERVICE_NAME=FREEPDB1
```

#### 4. Banco de Dados com Docker

Inicie o contêiner do Oracle Database. A senha do usuário `SYSTEM` será configurada com o valor de `DB_ADMIN_PASSWORD`.

```bash
docker-compose up -d
```

Aguarde a mensagem **"DATABASE IS READY TO USE!"** nos logs (`docker-compose logs -f oracle-db`).

#### 5. Seed

Execute o script para criar o usuário e popular o banco de dados:

```bash
pnpm seed
```

#### 6. Execução

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3000`.

#### 7. Testes

Para rodar os testes automatizados:

```bash
pnpm test
```

---

<h2 id="-english">🇺🇸 English</h2>

<div align="center">
  <img src="https://img.shields.io/badge/status-Completed-brightgreen?style=for-the-badge" alt="Status Completed">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle">
</div>

### 🎯 The Technical Challenge

This project solves a geoprocessing challenge, focusing on spatial queries to find **Points of Sale (PoS)** within coverage areas (multipolygons) and the one closest to a given location.

The implementation uses **Oracle Database** with its spatial capabilities and **TypeORM** for object-relational mapping.

### 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Node.js** | Runtime environment |
| **Fastify** | High-performance web framework |
| **Oracle Database** | Database with spatial support |
| **TypeORM** | ORM for database interaction |
| **Docker** | Container management |
| **Jest** | Automated tests |
| **Zod** | Schema validation |
| **ESLint** | Code standardization |
| **Prettier** | Code formatting |

### ✅ Features

- **PoS Registration**: Create new Points of Sale.
- **Search by ID**: Find a PoS by its identifier.
- **Search by Location**: Find the nearest PoS to a given coordinate.
- **Seed**: Script to populate the database.
- **Linting**: Tools to ensure code quality.

### 🚀 How to Run

Follow the steps to set up and run the application.

#### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18+)
- [Docker](https://www.docker.com/get-started/) and Docker Compose
- [PNPM](https://pnpm.io/installation)

#### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/PedroNHD/ZeDelivery-Backend-API-Challenge.git
cd "Ze Code Challenge - Backend API/Backend-01"
pnpm install
```

#### 3. Environment

Create the `.env` file from the example and fill it with your database credentials:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=1521
DB_USER=myuser
DB_PASSWORD=myuserpassword
DB_ADMIN_PASSWORD=your_secure_password
DB_SERVICE_NAME=FREEPDB1
```

#### 4. Database with Docker

Start the Oracle Database container. The `SYSTEM` user password will be set from the `DB_ADMIN_PASSWORD` variable.

```bash
docker-compose up -d
```

Wait for the **"DATABASE IS READY TO USE!"** message in the logs (`docker-compose logs -f oracle-db`).

#### 5. Seed

Run the script to create the user and populate the database:

```bash
pnpm seed
```

#### 6. Execution

Start the development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:3000`.

#### 7. Tests

To run the automated tests:

```bash
pnpm test
```

---

### 🤝 Contributions

This project was developed for a technical challenge. However, feedback and suggestions are welcome!

1. **Fork** the project.
2. Create a **Branch** (`git checkout -b feature/new-feature`).
3. **Commit** your changes (`git commit -m 'feat: Add new feature'`).
4. **Push** to the branch (`git push origin feature/new-feature`).
5. Open a **Pull Request**.

### 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

---

<div align="center">
  <p>Developed with ☕ by <a href="https://www.linkedin.com/in/pedro-domingues-horta-neto/">Pedro Domingues</a></p>
</div>
