import { v4 as uuidv4 } from "uuid";
import { insertStudent, getStudentByUserId, updateStudent } from "../models/Student.js";

export const getRegisterForm = async (req, res) => {
    const student = await getStudentByUserId(req.session.user.id);
    res.render("registerForm", { message: "", title: "Register - Sherubtse College", student });
};

export const postRegisterForm = async (req, res) => {
    const { course, year, gender, scholarship, name } = req.body;
    let screenshot = null;

    if (scholarship === "Self-financed" && req.file) {
        screenshot = req.file.filename;
    }

    const existingStudent = await getStudentByUserId(req.session.user.id);

    if (existingStudent) {
        await updateStudent(
            req.session.user.id,
            course,
            year,
            name,
            gender,
            scholarship,
            screenshot
        );
    } else {
        await insertStudent(
            uuidv4(),
            req.session.user.id,
            course,
            year,
            name,
            gender,
            scholarship,
            screenshot
        );
    }

    // 🔥 Fetch updated student to pass to dashboard
    const student = await getStudentByUserId(req.session.user.id);

    res.render("dashboard", { 
        user: req.session.user, 
        student,  // ✅ now defined
        message: "Registration successful!", 
        title: "Dashboard - Sherubtse College" 
    });
};
