# Frontend - Book Manager App

This is the **frontend** of the Book Manager App built using  **Vite + React** . It allows users to register, log in, and manage book listings with a clean, modern UI.

---

## 🚀 Tech Stack

* **Vite**
* **React**
* **React Router DOM**
* **Axios**
* **Tailwind CSS**
* **Prisma (via API)**

---

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   │   ├── AuthProvider.jsx
│   │   └── AuthContext.js
│   ├── pages/
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

---

## 🔧 Setup Instructions

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173/) to view the app.

---

## 📦 Build for Production

```bash
npm run build
```

---

## ⚠️ Notes

* Ensure backend is running on the correct port configured in `.env`
* All auth logic is managed via `AuthProvider.jsx`

---
