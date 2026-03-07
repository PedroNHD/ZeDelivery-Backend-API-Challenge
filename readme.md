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
    <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle">
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Localização-Brasil-blue?style=flat-square&logo=googlemaps&logoColor=white" />
    <img src="https://img.shields.io/badge/Idiomas-PT--BR%20%7C%20EN--US-lightgrey?style=flat-square" />
  </p>
</div>

### O Desafio Técnico

Este projeto resolve um desafio complexo de geoprocessamento. A funcionalidade principal consiste em realizar consultas espaciais eficientes para encontrar pontos de venda (PDVs) dentro de áreas de cobertura (multipolígonos) e o mais próximo de uma determinada localização.

A implementação utiliza **Oracle Database** com suas capacidades espaciais e **TypeORM** para o mapeamento objeto-relacional. As consultas demonstram a aplicação de funções geoespaciais para garantir precisão e performance na busca por parceiros.

### 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| **Node.js** | Ambiente de execução do backend |
| **Fastify** | Framework web focado em performance |
| **Oracle Database** | Banco de dados relacional com suporte espacial |
| **TypeORM** | ORM para interação com o banco de dados |
| **Docker** | Gerenciamento de contêineres (Oracle DB) |
| **Jest** | Testes automatizados |
| **Zod** | Validação de schemas e dados |
| **ESLint** | Padronização e qualidade de código |
| **Prettier** | Formatação de código |

### ✅ Funcionalidades Implementadas

- [x] **Cadastro de PDV**: Criação de novos pontos de venda.
- [x] **Busca por ID**: Procura um PDV específico pelo seu identificador.
- [x] **Busca por Localização**: Encontra o PDV mais próximo de uma coordenada (longitude/latitude).
- [x] **Seed**: Script para popular o banco de dados com dados iniciais e criar o usuário da aplicação.
- [x] **Linting**: Ferramentas de análise estática para garantir a qualidade do código.

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

Crie o arquivo de variáveis de ambiente a partir do exemplo e preencha com as credenciais do banco de dados que deseja criar:

```bash
cp .env.example .env
```

O arquivo `.env` deve ter a seguinte estrutura:

```env
DB_HOST=localhost
DB_PORT=1521
DB_USER=myuser
DB_PASSWORD=myuserpassword
DB_ADMIN_PASSWORD=sua_senha_segura
DB_SERVICE_NAME=FREEPDB1
```

#### 4. Subir o Banco de Dados com Docker

Inicie o contêiner do Oracle Database usando Docker Compose. O Docker Compose irá configurar a senha do usuário `SYSTEM` do banco de dados usando o valor da variável `DB_ADMIN_PASSWORD` do seu arquivo `.env`. Certifique-se de que esta variável esteja definida.

```bash
docker-compose up -d
```

Aguarde alguns minutos para o banco de dados ser inicializado completamente. Você pode verificar os logs com `docker-compose logs -f oracle-db`. O banco estará pronto quando a mensagem "DATABASE IS READY TO USE!" aparecer.

#### 5. Criando o Usuário e Populando o Banco (Seed)

Execute o script de seed. Este comando irá:
1. Conectar-se ao banco como usuário `SYSTEM`.
2. Criar um novo usuário e senha com as credenciais definidas no seu arquivo `.env`.
3. Popular o banco de dados com os dados do arquivo `pdvs.json`.

```bash
pnpm seed
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
    <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="Oracle">
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Location-Brazil-blue?style=flat-square&logo=googlemaps&logoColor=white" />
    <img src="https://img.shields.io/badge/Languages-PT--BR%20%7C%20EN--US-lightgrey?style=flat-square" />
  </p>
</div>

### The Technical Challenge

This project solves a complex geoprocessing challenge. The main functionality is to perform efficient spatial queries to find Points of Sale (PoS) within coverage areas (multipolygons) and the one closest to a given location.

The implementation uses **Oracle Database** with its spatial capabilities and **TypeORM** for object-relational mapping. The queries demonstrate the application of geospatial functions to ensure accuracy and performance in partner searches.

### 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Node.js** | Backend runtime environment |
| **Fastify** | Performance-focused web framework |
| **Oracle Database** | Relational database with spatial support |
| **TypeORM** | ORM for database interaction |
| **Docker** | Container management (Oracle DB) |
| **Jest** | Automated tests |
| **Zod** | Schema and data validation |
| **ESLint** | Code standardization and quality |
| **Prettier** | Code formatting |

### ✅ Implemented Features

- [x] **PoS Registration**: Create new Points of Sale.
- [x] **Search by ID**: Find a specific PoS by its identifier.
- [x] **Search by Location**: Find the nearest PoS to a given coordinate (longitude/latitude).
- [x] **Seed**: Script to populate the database with initial data and create the application user.
- [x] **Linting**: Static analysis tools to ensure code quality.

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

Create the environment variables file from the example and fill it with the database credentials you want to create:

```bash
cp .env.example .env
```

The `.env` file should have the following structure:

```env
DB_HOST=localhost
DB_PORT=1521
DB_USER=myuser
DB_PASSWORD=myuserpassword
DB_ADMIN_PASSWORD=your_secure_password
DB_SERVICE_NAME=FREEPDB1
```

#### 4. Start the Database with Docker

Start the Oracle Database container using Docker Compose. Docker Compose will configure the database `SYSTEM` user password using the value from the `DB_ADMIN_PASSWORD` variable in your `.env` file. Make sure this variable is set.

```bash
docker-compose up -d
```

Wait a few minutes for the database to initialize completely. You can check the logs with `docker-compose logs -f oracle-db`. The database is ready when the message "DATABASE IS READY TO USE!" appears.

#### 5. Creating the User and Populating the Database (Seed)

Run the seed script. This command will:
1. Connect to the database as the `SYSTEM` user.
2. Create a new user and password with the credentials defined in your `.env` file.
3. Populate the database with data from the `pdvs.json` file.

```bash
pnpm seed
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
