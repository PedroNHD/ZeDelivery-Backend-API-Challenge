# Zé Code Challenge - Backend API

Este é um serviço de backend desenvolvido para o Zé Code Challenge. A aplicação gerencia parceiros (PDVs - Pontos de Venda), permitindo seu cadastro e busca por geolocalização.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no servidor.
- **Fastify**: Framework web de alta performance para Node.js.
- **Prisma**: ORM (Object-Relational Mapping) para Node.js e TypeScript.
- **PostgreSQL**: Banco de dados relacional.
- **PostGIS**: Extensão do PostgreSQL para suporte a objetos geográficos e consultas espaciais.
- **pnpm**: Gerenciador de pacotes rápido e eficiente.
- **Jest**: Framework de testes para JavaScript.
- **ESLint/Prettier**: Ferramentas para garantir a qualidade e a consistência do código.

## Pré-requisitos

- Node.js (v18 ou superior)
- pnpm (ou outro gerenciador de pacotes como npm ou yarn)
- Docker (recomendado para instanciar o banco de dados PostgreSQL com PostGIS)

## Como Começar

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/PedroNHD/Ze-Code-Challenge---Backend-API.git
    cd Ze-Code-Challenge---Backend-API/Backend-01
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz da pasta `Backend-01`, utilizando o `.env.example` como referência. Você precisará configurar a `DATABASE_URL` para a conexão com o banco de dados.

    ```env
    # URL de conexão com o banco de dados PostgreSQL com PostGIS
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
    ```

4.  **Execute as migrações do banco de dados:**
    O Prisma utilizará o schema definido em `prisma/schema.prisma` para criar as tabelas necessárias.

    ```bash
    npx prisma migrate dev
    ```

5.  **Popule o banco de dados (Opcional):**
    Para carregar os dados iniciais de PDVs a partir do arquivo `data/pdvs.json`, execute o script de seed.

    ```bash
    pnpm run seed
    ```

6.  **Inicie o servidor de desenvolvimento:**
    O servidor iniciará em modo de desenvolvimento com hot-reload.
    ```bash
    pnpm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000`.

## Scripts Disponíveis

- `pnpm start`: Inicia a aplicação em modo de produção.
- `pnpm dev`: Inicia a aplicação em modo de desenvolvimento com `nodemon`.
- `pnpm test`: Executa os testes da aplicação.
- `pnpm run seed`: Popula o banco de dados com os dados do arquivo `data/pdvs.json`.

## Rodando os Testes

Para executar a suíte de testes, utilize o seguinte comando:

```bash
pnpm test
```

Os testes verificam os endpoints da API e a lógica de negócio, garantindo a integridade da aplicação.

## Endpoints da API

A API expõe os seguintes endpoints:

### `POST /partners`

Cria um novo parceiro (PDV) no banco de dados.

- **Body (raw JSON):**
  ```json
  {
    "id": 1,
    "tradingName": "Adega da Cerveja - Unidade Pinheiros",
    "ownerName": "Zé da Silva",
    "document": "14.321.321/0001-10",
    "coverageArea": {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [30, 20],
            [45, 40],
            [10, 40],
            [30, 20]
          ]
        ],
        [
          [
            [15, 5],
            [40, 10],
            [10, 20],
            [5, 10],
            [15, 5]
          ]
        ]
      ]
    },
    "address": {
      "type": "Point",
      "coordinates": [-46.57421, -21.785741]
    }
  }
  ```

### `GET /partners/:id`

Busca um parceiro específico pelo seu `id`.

- **Parâmetros da URL:**
  - `id` (string): O ID único do parceiro.

### `GET /partners/search`

Busca o parceiro com a área de cobertura (`coverageArea`) mais próxima que abranja uma determinada localização (longitude e latitude).

- **Query Parameters:**
  - `long` (number/string): Longitude do ponto a ser verificado.
  - `lat` (number/string): Latitude do ponto a ser verificado.
  - `limit` (number/string): Número máximo de resultados a serem retornados. (Opcional)
- **Exemplo:**
  `/partners/search?long=-46.57421&lat=-21.785741`
