# 🚀 Taskflow API (Backend)

API REST desenvolvida com Node.js, Express e MongoDB para gerenciamento de tarefas com autenticação JWT.

---

## 📌 Sobre o projeto

O **Taskflow API** é um backend completo que permite:

* Cadastro de usuários
* Login com autenticação JWT
* Criação de tarefas
* Listagem de tarefas por usuário
* Atualização e exclusão de tarefas
* Proteção de rotas

---

## 🛠️ Tecnologias utilizadas

* Node.js
* Express
* MongoDB (Mongoose)
* JWT (JSON Web Token)
* bcryptjs
* dotenv

---

## 📂 Estrutura do projeto

```
taskflow-api/
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── auth.js
│   └── task.js
├── middleware/
│   └── auth.js
├── index.js
├── package.json
├── .env
├── .gitignore
```

---

## ⚙️ Instalação

```bash
# Clonar repositório
git clone https://github.com/SEU-USUARIO/taskflow-api.git

# Entrar na pasta
cd taskflow-api

# Instalar dependências
npm install
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=seu_segredo_jwt
```

---

## ▶️ Rodando o projeto

```bash
npm run dev
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 🔑 Autenticação

A API utiliza JWT para autenticação.

Após o login, envie o token no header:

```
Authorization: Bearer SEU_TOKEN
```

---

## 📌 Rotas da API

### 🟢 Auth

#### Cadastro

```
POST /api/auth/register
```

#### Login

```
POST /api/auth/login
```

---

### 📋 Tasks

#### Criar tarefa

```
POST /api/tasks
```

#### Listar tarefas

```
GET /api/tasks
```

#### Atualizar tarefa

```
PUT /api/tasks/:id
```

#### Deletar tarefa

```
DELETE /api/tasks/:id
```

---

## 🧠 Funcionalidades implementadas

* 🔐 Autenticação com JWT
* 🔒 Proteção de rotas com middleware
* 🔑 Criptografia de senha com bcrypt
* 📦 Organização em MVC
* 🌐 API RESTful

---

## 💼 Autor

Desenvolvido por Alexandre Gomes 🚀

---

## 📄 Licença

Este projeto está sob a licença ISC.
