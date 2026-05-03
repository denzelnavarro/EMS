# EMS — Employee Management System

A simple Employee Management System (EMS) with role-based authentication, attendance tracking, leave management, payslip generation, and an admin dashboard.

## Features

- Authentication: Admin and Employee login with JWT-based tokens.
- Employee management: Add / edit / list employees (Admin).
- Attendance: Check-in, attendance history, and stats.
- Leave management: Apply for leave and view leave history.
- Payslips: Generate and list payslips.
- Profile: View and update user profile, change password.
- Background tasks & email: Inngest-powered background workflows and email notifications via Nodemailer.

## Tech Stack & Tools

**Frontend**

- React (v19) + Vite
- Tailwind CSS
- React Router DOM
- Axios for HTTP requests
- react-hot-toast for notifications
- date-fns for date utilities
- lucide-react for icons

**Backend**

- Node.js + Express
- MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT)
- Password hashing: bcrypt
- File uploads: multer
- Email: nodemailer (SMTP)
- Background processing: Inngest
- Environment variables: dotenv

**Dev / Deployment**

- ESLint
- nodemon (dev)
- Vercel configs included for deployment


## Quick Start

Prerequisites:

- Node.js (16+ recommended)
- npm
- MongoDB (local or Atlas)

1) Clone the repository

```bash
git clone <repo-url>
cd EMS
```

2) Backend (server)

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=sender@example.com
PORT=4000 # optional
```

- Seed the database (optional):

```bash
npm run seed
```

- Start the server (development):

```bash
npm run server
# or in production mode
npm start
```

3) Frontend (client)

```bash
cd ../client
npm install
```

Create a `.env` in the `client` folder (example already present as `VITE_BASE_URL`):

```env
VITE_BASE_URL="http://localhost:4000"
```

- Start the development server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
npm run preview
```

Open the frontend at `http://localhost:5173` (Vite default).


## Project Structure (high level)

- `client/` — React + Vite frontend
- `server/` — Express API, MongoDB models, and controllers
- `server/config/db.js` — MongoDB connection (uses `MONGODB_URI`)
- `server/config/nodemailer.js` — SMTP settings (uses `SMTP_USER`, `SMTP_PASS`, `SENDER_EMAIL`)

For details, inspect:

- [client/package.json](client/package.json)
- [server/package.json](server/package.json)
- [server/config/db.js](server/config/db.js)
- [client/.env](client/.env)


## Deployment

- Vercel configuration files exist in the repo for quick deployment of frontend and (if configured) serverless backend.
- Ensure environment variables are set in your hosting provider.


## Notes

- The server exposes REST endpoints under `/api/*` (see `server/routes/`).
- Background jobs are wired with Inngest (`server/inngest/`).


## Contributing

Feel free to open issues or PRs. Follow existing code style; ESLint is included for the frontend.


## License

MIT
