import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { insertUser, findUserByEmail, verifyUser } from "../models/User.js";

export const getSignup = (req, res) => {
    res.render("signup", { message: "", title: "Signup - Sherubtse College" });
};

export const postSignup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email.endsWith("sherubtse@rub.edu.bt")) {
        return res.render("signup", { message: "Please use your Sherubtse College email.", title: "Signup - Sherubtse College" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.render("signup", { message: "Email already registered.", title: "Signup - Sherubtse College" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const token = uuidv4();

    await insertUser(userId, name, email, hashedPassword, token);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const url = `http://${req.headers.host}/verify-email?token=${token}`;
    await transporter.sendMail({
        to: email,
        subject: "Verify your email",
        html: `<h3>Welcome ${name}</h3><p>Please verify your account by clicking the link: <a href="${url}">Verify</a></p>`
    });

    res.render("verifyEmail", { message: "Check your email to verify your account.", title: "Verify Email - Sherubtse College" });
};

export const verifyEmail = async (req, res) => {
    const token = req.query.token;
    await verifyUser(token);
    res.render("login", { message: "Email verified successfully. Please login.", title: "Login - Sherubtse College" });
};

export const getLogin = (req, res) => {
    res.render("login", { message: "", title: "Login - Sherubtse College" });
};

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) 
        return res.render("login", { message: "Invalid credentials.", title: "Login - Sherubtse College" });
    if (!user.is_verified) 
        return res.render("login", { message: "Please verify your email first.", title: "Login - Sherubtse College" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) 
        return res.render("login", { message: "Invalid credentials.", title: "Login - Sherubtse College" });

    req.session.user = user;

    const redirectTo = req.session.redirectTo || "/dashboard";
    delete req.session.redirectTo;

    res.redirect(redirectTo);
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
