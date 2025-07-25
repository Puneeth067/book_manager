# Backend - Book Manager App

This is the **backend** for the Book Manager App, built using  **Node.js** ,  **Express** , and **Prisma ORM** with a **PostgreSQL** database.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **PostgreSQL**
* **dotenv**
* **cors**
* **jsonwebtoken**

---

## 📁 Project Structure

```
backend/
├── controllers/
├── middleware/
├── prisma/
│   └── schema.prisma
├── routes/
├── utils/
├── server.js
├── package.json
└── .env
```

---

## 🔧 Setup Instructions

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<your_database_name>
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run database migrations (if applicable)

```bash
npx prisma migrate dev --name init
```

### 6. Start development server

```bash
npm run dev
```

---

## ⚠️ Notes

* Ensure PostgreSQL is running and the `DATABASE_URL` in `.env` is correct
* If facing issues with `@prisma/client`, always run:

```bash
npx prisma generate
```

---
