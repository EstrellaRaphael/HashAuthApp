# 🔐 Hash Auth App — Segurança da Informação + Angular + Flask

Projeto fullstack desenvolvido como parte da disciplina de Segurança da Informação.  
O objetivo inicial era criar um sistema de **validação e armazenamento de senhas utilizando hash (SHA-1)** — e a proposta evoluiu para uma **aplicação web completa**, com autenticação, consulta segura e interface moderna.

---

## 🚀 Tecnologias utilizadas

### 🧠 Backend (Flask + Python)
- Flask
- Flask-CORS
- SQLite
- Python-dotenv

### 🎨 Frontend (Angular Standalone)
- Angular 17 (standalone)
- Angular Material
- Reactive Forms
- TypeScript
- LocalStorage para sessão do usuário

---

## 🛠️ Funcionalidades

- Cadastro de e-mail e senha com validação forte
- Geração de hash com SHA-1
- Armazenamento seguro no banco SQLite
- Login com verificação do hash
- Consulta do hash vinculada ao e-mail logado
- Botão para mostrar/ocultar hash
- Sistema de logout
- Proteção de rotas com Angular Guards
- Snackbar e feedbacks visuais com Angular Material

---

## 🧪 Como rodar o projeto localmente

### 📦 Pré-requisitos
- Node.js + Angular CLI
- Python 3.x + pip
- (Opcional) Ambiente virtual com venv

### 🔄 Clonando e executando

```bash
git clone https://github.com/seu-usuario/hash-auth-app.git
cd hash-auth-app

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # ou .\venv\Scripts\activate no Windows
pip install -r requirements.txt
python run.py

# Frontend
cd ../frontend
npm install
ng serve -o
