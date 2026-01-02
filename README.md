## 📦 API Node.js com Express

API RESTful desenvolvida com Node.js e Express, seguindo a arquitetura MVC, com foco em boas práticas, segurança, escalabilidade e padronização de código.

---

> 🚀 Tecnologias Utilizadas

- Node.js

- Express

- Arquitetura MVC

- Docker

- Sequelize (Banco de dados relacional)

- Mongoose (MongoDB)

- JWT (JSON Web Token) – Autenticação

- bcrypt.js – Criptografia de senhas

- Yup – Validação de dados

- Eslint/Prettier – Padronização e formatação de código

> 🧱 Arquitetura

- O projeto segue o padrão MVC (Model - View - Controller):

- Models: Regras de negócio e comunicação com o banco de dados

- Controllers: Controle das requisições e respostas

- Routes: Definição das rotas da aplicação

- Middlewares: Autenticação, validações e interceptações

> 🔐 Autenticação

- A autenticação é feita utilizando JWT (JSON Web Token):

- Login gera um token JWT

- Rotas protegidas utilizam middleware de autenticação

- Senhas são criptografadas com bcrypt.js

> ✅ Validação de Dados

- As validações de entrada são feitas com Yup

- Campos obrigatórios

- Tipos corretos

- Regras personalizadas de validação

> 🧹 Padronização de Código

- O projeto utiliza Eslint e Prettier

- Formatação automática

- Padronização de código

- Análise estática

> 🐳 Docker

O projeto é containerizado com Docker, facilitando o ambiente de desenvolvimento e deploy.

> 🗄️ Banco de Dados

- Sequelize: Banco relacional (ex: PostgreSQL, MySQL)

- Mongoose: Banco NoSQL (MongoDB)

- Essa abordagem permite flexibilidade para diferentes tipos de dados.

> 📄 Licença

Este projeto está sob a licença MIT.
Sinta-se livre para usar, modificar e distribuir.

---

<p align="center">
  Feito com ❤️ by JulioPaschoal
</p>
