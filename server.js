import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import { createUserTable } from "./models/User.js";
import { createStudentTable, getStudentByUserId } from "./models/Student.js";
import { isAuthenticated } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middlewares for parsing and session
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Make `user` available in all views as `res.locals.user`
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Create database tables (await because they return promises)
await createUserTable();
await createStudentTable();

// Landing page route
app.get("/", (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  res.render("landing", { title: "Welcome - Sherubtse College" });
});

// Dashboard route — fetch user and student info and render
app.get("/dashboard", isAuthenticated, async (req, res) => {
  const user = req.session.user;
  const student = await getStudentByUserId(user.id);

  res.render("dashboard", {
    user,
    student,
    message: "",
    title: "Dashboard - Sherubtse College",
  });
});

// Mount routes
app.use("/", authRoutes);
app.use("/", studentRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
