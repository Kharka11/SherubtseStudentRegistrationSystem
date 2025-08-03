import { v4 as uuidv4 } from "uuid";
import { insertStudent } from "../models/Student.js";

export const getRegisterForm = (req, res) => {
    res.render("registerForm", { message: "" });
};

export const postRegisterForm = async (req, res) => {
    const { course, year, gender, scholarship } = req.body;
    let screenshot = null;

    if (scholarship === "self" && req.file) {
        screenshot = req.file.filename;
    }

    await insertStudent(
        uuidv4(),
        req.session.user.id,
        course,
        year,
        gender,
        scholarship,
        screenshot
    );

    res.render("dashboard", { user: req.session.user, message: "Registration successful!" });
};
