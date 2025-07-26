---

## 📘 Book Management App

This repository contains a **full-stack Book Management Application** built with:

* **Frontend**: Vite + React + TailwindCSS
* **Backend**: Node.js + Express + Prisma ORM
* **Database**: PostgreSQL (hosted on Railway)
* **Deployment**: Frontend on Vercel, Backend on Render

### 🔗 Live URL

* **Frontend**: [https://readixx.vercel.app](https://readixx.vercel.app)
* **Backend API**: [https://readix-backend.onrender.com/api](https://readix-backend.onrender.com/api)

### 📂 Project Structure

```
book_manager/
├── client/     # React frontend
├── server/     # Express backend
├── scripts/    # Migration and rollback scripts
├── prisma/     # Prisma schema and migrations
```

---

## 📘 ReadMe: `client/` (Frontend)

### 📦 Tech Stack

* Vite
* React
* TailwindCSS
* Axios
* Shadcn UI

### 🚀 Setup Instructions

```bash
cd client
npm install
npm run dev
```

### 🌐 Environment Variables

Create a `.env` file in `client/`:

```
VITE_API_URL=https://readix-backend.onrender.com/api
```

### 📌 Features

* Book listing with search and filters
* Add/Edit/Delete books
* Upload and display cover images
* Auth-integrated frontend

### 📂 Key Files

```
src/
├── pages/
├── components/
├── services/api.js   # Axios API wrapper
├── utils/auth.js     # Token handling
```

---

## 📘 ReadMe: `server/` (Backend)

### 📦 Tech Stack

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication

### 🚀 Setup Instructions

```bash
cd server
npm install
npx prisma generate
npx prisma migrate deploy
npm run migrate:cover-images
npm start
```

### 🌐 Environment Variables (`.env`)

```
DATABASE_URL=postgresql://...
PORT=5000
NODE_ENV=production
```

### 🔐 Auth

* JWT-based authentication
* Routes protected with middleware

### 📂 API Endpoints

```
/api/auth
  - POST /signup
  - POST /login
  - GET /profile

/api/books
  - GET /       # Get all books
  - POST /      # Add a book
  - PUT /:id    # Update a book
  - DELETE /:id # Delete a book
```

---

## 📘 ReadMe: `scripts/`

### 🛠️ Purpose

Scripts for migration and rollback of the new `cover_image` field in `Book` model.

### 📜 Scripts

```bash
npm run migrate:cover-images     # Set default cover images
npm run rollback:cover-images    # Revert cover image changes
npm run test:migration           # Test migration integrity
```

Ensure scripts are run **after** Prisma migration.

---

## 🔒 License

MIT

## 👤 Author

**Puneeth Kumar** — Sahyadri College of Engineering & Management
