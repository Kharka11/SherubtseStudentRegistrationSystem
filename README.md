# Sherubtse Student Registration System

A full-stack web application for student registration and course enrollment at Sherubtse College, Royal University of Bhutan.

## Tech Stack

- **Backend:** Node.js, Express 5
- **Database:** PostgreSQL
- **Templating:** EJS
- **Auth:** Session-based authentication (express-session), bcrypt password hashing, email verification via Nodemailer
- **File Uploads:** Multer (payment screenshots)
- **Other:** dotenv, uuid, cookie-parser

## Features

- Signup restricted to `sherubtse@rub.edu.bt` email addresses (e.g. `index.sherubtse@rub.edu.bt`)
- Email verification before login
- Student registration form (course, year, gender, scholarship type, payment screenshot)
- Dashboard showing registered student details
- Update existing registration

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Kharka11/SherubtseStudentRegistrationSystem.git
   cd SherubtseStudentRegistrationSystem
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   DB_USER=your_postgres_user
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_PASS=your_postgres_password
   DB_PORT=5432
   SESSION_SECRET=your_session_secret
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   PORT=3000
   ```

4. Create the database in PostgreSQL:
   ```sql
   CREATE DATABASE your_database_name;
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open `http://localhost:3000` in your browser.

## Notes

- Gmail App Password is required for email verification (not your regular Gmail password). Generate one at [Google Account Security](https://myaccount.google.com/security).
- The `node_modules/` and `.env` files are excluded from the repository via `.gitignore`.
