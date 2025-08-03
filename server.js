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
<<<<<<< HEAD
import { createStudentTable } from "./models/Student.js";
=======
import { createStudentTable, getStudentByUserId } from "./models/Student.js";
>>>>>>> 7756fb0 (Updated RS)
import { isAuthenticated } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

<<<<<<< HEAD
=======
// ✅ Make user available in all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

>>>>>>> 7756fb0 (Updated RS)
// Create tables if not exists
await createUserTable();
await createStudentTable();

// Landing Page
app.get("/", (req, res) => {
    if (req.session.user) return res.redirect("/dashboard");
    res.render("landing");
});

<<<<<<< HEAD
// Dashboard Page
app.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard", { 
        user: req.session.user, 
        message: "" 
    });
=======
// Dashboard Page - Fetch student details automatically
app.get("/dashboard", isAuthenticated, async (req, res) => {
    try {
        const student = await getStudentByUserId(req.session.user.id);
        res.render("dashboard", { 
            user: req.session.user, 
            student 
        });
    } catch (err) {
        console.error("Error fetching student:", err);
        res.render("dashboard", { 
            user: req.session.user, 
            student: null 
        });
    }
>>>>>>> 7756fb0 (Updated RS)
});

// Routes
app.use("/", authRoutes);
app.use("/", studentRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
