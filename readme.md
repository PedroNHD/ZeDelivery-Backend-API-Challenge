<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=339933&height=150&section=header&text=🍺%20Zé%20Delivery%20Code%20Challenge&fontSize=40&animation=fadeIn" />
</div>
<p align="center">
  <a href="#-português">Português</a> | <a href="#-english">English</a>
</p>

---

<h2 id="-português">🇧🇷 Português</h2>

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/badge/status-Completo-brightgreen" alt="Status Completo">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Localização-Brasil-blue?style=flat-square&logo=googlemaps&logoColor=white" />
    <img src="https://img.shields.io/badge/Idiomas-PT--BR%20%7C%20EN--US-lightgrey?style=flat-square" />
  </p>
</div>

### O Desafio Técnico

Este projeto resolve um desafio complexo de geoprocessamento utilizando **PostGIS**, a extensão geoespacial para PostgreSQL. A funcionalidade principal consiste em realizar consultas espaciais eficientes para encontrar pontos de venda (PDVs) dentro de áreas de cobertura (multipolígonos).

A implementação demonstra um conhecimento avançado em SQL e geoprocessamento, aplicando a função `ST_Intersects` para verificar a intersecção entre a geometria de um ponto (localização do PDV) e as áreas de cobertura armazenadas, garantindo precisão e performance na busca por parceiros.

### 🛠️ Tecnologias Utilizadas

| Tecnologia     | Finalidade                              |
| -------------- | --------------------------------------- |
| **Node.js**    | Ambiente de execução do backend         |
| **Fastify**    | Framework web focado em performance     |
| **PostgreSQL** | Banco de dados relacional               |
| **PostGIS**    | Extensão para consultas geoespaciais    |
| **Prisma**     | ORM para interação com o banco de dados |
| **Docker**     | Gerenciamento de contêineres (PostGIS)  |
| **Jest**       | Testes automatizados                    |
| **Zod**        | Validação de schemas e dados            |
| **ESLint**     | Padronização e qualidade de código      |
| **Prettier**   | Formatação de código                    |

### ✅ Funcionalidades Implementadas

- [x] **Cadastro de PDV**: Criação de novos pontos de venda.
- [x] **Busca por ID**: Procura um PDV específico pelo seu identificador.
- [x] **Busca por Localização**: Encontra o PDV mais próximo de uma coordenada (longitude/latitude).
- [x] **Seed**: Script para popular o banco de dados com dados iniciais.
- [x] **Linting**: Ferramentas de análise estática para garantir a qualidade do código.

### 🧠 Aprendizados & Desafios

- **Integração Prisma & PostGIS**: Um dos maiores desafios foi fazer o Prisma ORM, que não tem suporte nativo para os tipos de dados geométricos do PostGIS, funcionar corretamente. Isso exigiu uma pesquisa aprofundada na documentação e a implementação de queries nativas (`$queryRaw`) para manipular geometrias, um aprendizado que uniu a abstração do ORM com a flexibilidade do SQL puro.

- **Infraestrutura como Código**: Minha experiência prévia em Suporte de TI foi fundamental para configurar o ambiente de desenvolvimento com Docker. A habilidade de diagnosticar e resolver problemas de rede e de contêineres permitiu criar uma infraestrutura resiliente e facilmente replicável.

- **Consistência de Código**: A adoção de ESLint e Prettier desde o início do projeto foi crucial para manter a consistência e a legibilidade do código. Em um sistema com integrações complexas, ter um padrão de código bem definido evitou bugs e facilitou a manutenção.

- **Consultas Espaciais**: O estudo e a aplicação de consultas espaciais, especialmente com `ST_Intersects`, foram um grande aprendizado. Entender como o banco de dados pode ir além do armazenamento de dados tabulares e se tornar uma ferramenta poderosa para análises geoespaciais expandiu minha visão sobre o potencial dos bancos de dados relacionais.

### 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local.

#### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [Docker](https://www.docker.com/get-started/) e Docker Compose
- [PNPM](https://pnpm.io/installation) (ou outro gerenciador de pacotes)

#### 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/PedroNHD/ZeDelivery-Backend-API-Challenge.git
cd "Ze Code Challenge - Backend API/Backend-01"
pnpm install
```

#### 3. Configuração do Ambiente

Crie o arquivo de variáveis de ambiente a partir do exemplo e preencha com suas credenciais do banco de dados:

```bash
cp .env.example .env
```

O arquivo `.env` deve ter a seguinte estrutura:

```env
# PostgreSQL connection string (com PostGIS)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

#### 4. Subir o Banco de Dados com Docker

Inicie o contêiner do PostGIS usando Docker Compose:

```bash
docker-compose up -d
```

#### 5. Migrações e Seed do Banco

Aplique as migrações do Prisma e popule o banco de dados com os dados iniciais:

```bash
npx prisma migrate dev
pnpm run seed
```

#### 6. Executando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3000`.

#### 7. Executando os Testes

Para rodar os testes automatizados, utilize o comando:

```bash
pnpm test
```

---

<h2 id="-english">🇺🇸 English</h2>

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/badge/status-Completed-brightgreen" alt="Status Completed">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Location-Brazil-blue?style=flat-square&logo=googlemaps&logoColor=white" />
    <img src="https://img.shields.io/badge/Languages-PT--BR%20%7C%20EN--US-lightgrey?style=flat-square" />
  </p>
</div>

### The Technical Challenge

This project solves a complex geoprocessing challenge using **PostGIS**, the spatial extension for PostgreSQL. The main functionality consists of performing efficient spatial queries to find Points of Sale (PoS) within coverage areas (multipolygons).

The implementation demonstrates advanced knowledge in SQL and geoprocessing, applying the `ST_Intersects` function to check for intersection between the geometry of a point (PoS location) and the stored coverage areas, ensuring accuracy and performance in partner searches.

### 🛠️ Technologies Used

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| **Node.js**    | Backend runtime environment       |
| **Fastify**    | Performance-focused web framework |
| **PostgreSQL** | Relational database               |
| **PostGIS**    | Extension for geospatial queries  |
| **Prisma**     | ORM for database interaction      |
| **Docker**     | Container management (PostGIS)    |
| **Jest**       | Automated tests                   |
| **Zod**        | Schema and data validation        |
| **ESLint**     | Code standardization and quality  |
| **Prettier**   | Code formatting                   |

### ✅ Implemented Features

- [x] **PoS Registration**: Create new Points of Sale.
- [x] **Search by ID**: Find a specific PoS by its identifier.
- [x] **Search by Location**: Find the nearest PoS to a given coordinate (longitude/latitude).
- [x] **Seed**: Script to populate the database with initial data.
- [x] **Linting**: Static analysis tools to ensure code quality.

### 🧠 Lessons Learned & Challenges

- **Prisma & PostGIS Integration**: One of the biggest challenges was making the Prisma ORM, which lacks native support for PostGIS geometric data types, work correctly. This required in-depth research of the documentation and implementing raw queries (`$queryRaw`) to handle geometries. This experience bridged the gap between the ORM's abstraction and the flexibility of pure SQL, marking a significant step in my transition from **IT Support to Backend Developer**.

- **Infrastructure as Code**: My previous experience in IT Support was fundamental in setting up the development environment with Docker. The ability to diagnose and resolve network and container issues allowed me to create a resilient and easily replicable infrastructure.

- **Code Consistency**: Adopting ESLint and Prettier from the start was crucial for maintaining code consistency and readability. In a system with complex integrations, a well-defined code standard prevented bugs and facilitated maintenance.

- **Spatial Queries**: Studying and applying spatial queries, especially with `ST_Intersects`, was a major learning experience. Understanding how a database can go beyond storing tabular data and become a powerful tool for geospatial analysis expanded my view on the potential of relational databases.

### 🚀 How to Run the Project

Follow the steps below to set up and run the application in your local environment.

#### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Docker](https://www.docker.com/get-started/) and Docker Compose
- [PNPM](https://pnpm.io/installation) (or another package manager)

#### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/PedroNHD/ZeDelivery-Backend-API-Challenge.git
cd "Ze Code Challenge - Backend API/Backend-01"
pnpm install
```

#### 3. Environment Setup

Create the environment variables file from the example and fill it with your database credentials:

```bash
cp .env.example .env
```

The `.env` file should have the following structure:

```env
# PostgreSQL connection string (with PostGIS)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

#### 4. Start the Database with Docker

Start the PostGIS container using Docker Compose:

```bash
docker-compose up -d
```

#### 5. Database Migrations and Seed

Apply the Prisma migrations and populate the database with the initial data:

```bash
pnpm prisma migrate dev
pnpm run seed
```

#### 6. Running the Application

Start the development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:3000`.

#### 7. Running the Tests

To run the automated tests, use the command:

```bash
pnpm test
```

---

## 🤝 Contributions

This is a project developed for a technical challenge. However, feedback and suggestions are always welcome!

1. **Fork** the project.
2. Create a **Branch** for your modification (`git checkout -b feature/new-feature`).
3. **Commit** your changes (`git commit -m 'Adding new feature'`).
4. Push to the **Repo** (`git push origin feature/new-feature`).
5. Open a **Pull Request**.

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

---

### Developed with ☕ by [Pedro Domingues](https://www.linkedin.com/in/pedro-domingues-horta-neto/)
