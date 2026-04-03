# 🚀 Finance Dashboard System (Backend)

A scalable backend system for managing financial records with role-based access control and dashboard analytics. Built to demonstrate backend architecture, API design, and business logic.

---

## 📌 Features

### 🔐 Authentication & Authorization
- JWT-based auth
- Role-Based Access Control (RBAC)
- Roles:
  - **Admin** → Full access
  - **Analyst** → Read + dashboard access
  - **Viewer** → Read-only access

### 👤 User Management
- Create users
- Assign roles
- Active / Inactive users
- Password hashing (bcrypt)

### 💰 Financial Records
- CRUD operations
- Fields: amount, type (income/expense), category, date, note
- Filtering: type, category, date range
- Pagination and soft delete

### 📊 Dashboard Analytics
- Total Income, Expense, Net Balance
- Category totals, recent transactions
- Monthly trends (MongoDB aggregation)

### 🚀 Quality
- Validation and centralized error handling
- Secure routes with middleware

---

## 🛠️ Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## ⚡ Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB server (local or Atlas)

---

## 🧩 Project Setup

1. Clone repository

```bash
git clone https://github.com/your-username/finance-dashboard-system.git
cd finance-dashboard-system/backend
```

2. Install dependencies

```bash
npm install
```

3. Add environment variables

Create a `.env` file in `backend/`:

```
MONGO_URI=mongodb://localhost:27017/finance-db
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

4. Start server

- Development mode (with nodemon if installed):

```bash
npm run dev
```

- Production mode:

```bash
npm start
```

5. Verify startup

Open `http://localhost:5000/api/health` (or similar health endpoint if implemented).

---

## 🧪 API Endpoints

> Base URL: `http://localhost:5000/api`

### Auth
- `POST /api/users/login` – login and get JWT

### Users (admin only)
- `GET /api/users` – list users
- `GET /api/users/:id` – get user by id
- `PUT /api/users/:id` – update user
- `DELETE /api/users/:id` – delete user

### Records
- `GET /api/records` – list records (filters: type, category, startDate, endDate, search, page, limit)
- `POST /api/records` – create record
- `GET /api/records/:id` – get a record
- `PUT /api/records/:id` – update record
- `DELETE /api/records/:id` – soft delete record

### Dashboard
- `GET /api/dashboard` – analytics data (income, expense, net, category totals, trends)

---

## 🧾 Example Requests

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret"}'
```

```bash
curl http://localhost:5000/api/records \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 🧰 Development Notes

- Controllers: `src/controllers`
- Services: `src/services`
- Models: `src/models`
- Routes: `src/routes`
- Middleware: `src/middleware`

---

