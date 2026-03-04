<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Gerenciador de Tarefas

Aplicação web simples para gerenciamento de tarefas com autenticação de usuário.  
O sistema permite criar uma conta, realizar login e gerenciar tarefas pessoais (criar, editar e excluir).

O frontend está hospedado no **Vercel** e se comunica com uma **API desenvolvida em NestJS** conectada a um banco de dados **MySQL**.

---

# Acesso ao projeto

Frontend online:

🔗 https://gerenciador-de-tarefas-five-iota.vercel.app/login.html

---

# Funcionalidades

- Cadastro de usuário
- Login com autenticação JWT
- Criação de tarefas
- Listagem de tarefas do usuário
- Edição de tarefas
- Exclusão de tarefas
- Atualização de dados do usuário
- Exclusão da conta

Cada usuário possui acesso apenas às próprias tarefas.

---

# Tecnologias utilizadas

## Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)

## Backend
- NestJS
- TypeORM
- JWT para autenticação

## Banco de dados
- MySQL

## Infraestrutura
- Vercel (frontend e API)
- Railway (banco de dados)

---

# Estrutura do projeto
frontend/
src/
migrations/


### Principais partes

**frontend** → páginas HTML, CSS e scripts do cliente  

**src** → código da API NestJS  

**migrations** → migrações do banco de dados

---

# Como executar o projeto localmente

## 1. Clonar o repositório
git clone <url-do-repositorio>
cd <nome-do-projeto>

---

## 2. Instalar dependências
npm install

---

## 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=tarefas

JWT_SECRET=seu_segredo
JWT_EXPIRES_IN=1d

## 4. Executar o backend

``bash
npm run start:dev

A API ficará disponível em:

http://localhost:3000

## 5. Abrir o frontend

Abra o arquivo:

frontend/login.html

ou utilize uma extensão como Live Server no VS Code.

Rotas principais da API:

## Autenticação
POST /auth/login

## Usuários
POST /users
PUT /users/:id
DELETE /users/:id


## Tarefas
GET /tarefas
POST /tarefas
PUT /tarefas/:id
DELETE /tarefas/:id


## Autenticação

Após o login, a API retorna um token JWT que é armazenado no localStorage.

Esse token é enviado nas requisições protegidas utilizando o header:

Authorization: Bearer TOKEN

## Melhorias futuras

- Interface mais responsiva

- Validação mais robusta no frontend

- Paginação de tarefas

- Melhor tratamento de erros


## Autor

Desenvolvido por Weberson.
