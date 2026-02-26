<div align="center">
  <img src="https://img.shields.io/badge/status-Completo-brightgreen" alt="Status Completo">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
</div>

<h1 align="center">Zé Code Challenge - Backend API</h1>

## O Desafio Técnico

Este projeto resolve um desafio complexo de geoprocessamento utilizando **PostGIS**, a extensão geoespacial para PostgreSQL. A funcionalidade principal consiste em realizar consultas espaciais eficientes para encontrar pontos de venda (PDVs) dentro de áreas de cobertura (multipolígonos).

A implementação demonstra um conhecimento avançado em SQL e geoprocessamento, aplicando a função `ST_Intersects` para verificar a intersecção entre a geometria de um ponto (localização do PDV) e as áreas de cobertura armazenadas, garantindo precisão e performance na busca por parceiros.

## 🛠️ Tecnologias Utilizadas

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

## ✅ Funcionalidades Implementadas

- [x] **Cadastro de PDV**: Criação de novos pontos de venda.
- [x] **Busca por ID**: Procura um PDV específico pelo seu identificador.
- [x] **Busca por Localização**: Encontra o PDV mais próximo de uma coordenada (longitude/latitude).
- [x] **Seed**: Script para popular o banco de dados com dados iniciais.
- [x] **Linting**: Ferramentas de análise estática para garantir a qualidade do código.

## 🧠 Aprendizados & Desafios

- **Integração Prisma & PostGIS**: Um dos maiores desafios foi fazer o Prisma ORM, que não tem suporte nativo para os tipos de dados geométricos do PostGIS, funcionar corretamente. Isso exigiu uma pesquisa aprofundada na documentação e a implementação de queries nativas (`$queryRaw`) para manipular geometrias, um aprendizado que uniu a abstração do ORM com a flexibilidade do SQL puro.

- **Infraestrutura como Código**: Minha experiência prévia em Suporte de TI foi fundamental para configurar o ambiente de desenvolvimento com Docker. A habilidade de diagnosticar e resolver problemas de rede e de contêineres permitiu criar uma infraestrutura resiliente e facilmente replicável.

- **Consistência de Código**: A adoção de ESLint e Prettier desde o início do projeto foi crucial para manter a consistência e a legibilidade do código. Em um sistema com integrações complexas, ter um padrão de código bem definido evitou bugs e facilitou a manutenção.

- **Consultas Espaciais**: O estudo e a aplicação de consultas espaciais, especialmente com `ST_Intersects`, foram um grande aprendizado. Entender como o banco de dados pode ir além do armazenamento de dados tabulares e se tornar uma ferramenta poderosa para análises geoespaciais expandiu minha visão sobre o potencial dos bancos de dados relacionais.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local.

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [Docker](https://www.docker.com/get-started/) e Docker Compose
- [PNPM](https://pnpm.io/installation) (ou outro gerenciador de pacotes)

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/PedroNHD/ZeDelivery-Backend-API-Challenge.git
cd "Ze Code Challenge - Backend API/Backend-01"
pnpm install
```

### 3. Configuração do Ambiente

Crie o arquivo de variáveis de ambiente a partir do exemplo e preencha com suas credenciais do banco de dados:

```bash
cp .env.example .env
```

O arquivo `.env` deve ter a seguinte estrutura:

```env
# PostgreSQL connection string (com PostGIS)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### 4. Subir o Banco de Dados com Docker

Inicie o contêiner do PostGIS usando Docker Compose:

```bash
docker-compose up -d
```

### 5. Migrações e Seed do Banco

Aplique as migrações do Prisma e popule o banco de dados com os dados iniciais:

```bash
pnpm prisma migrate dev
pnpm run seed
```

### 6. Executando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3000`.

### 7. Executando os Testes

Para rodar os testes automatizados, utilize o comando:

```bash
pnpm test
```

---

## 📞 Contato

**Pedro Domingues**

- **LinkedIn**: [https://www.linkedin.com/in/pedro-domingues-horta-neto/](https://www.linkedin.com/in/pedro-domingues-horta-neto/)
