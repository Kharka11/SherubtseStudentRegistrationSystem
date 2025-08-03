import pool from "../config/db.js";

export const createStudentTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS students (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            course VARCHAR(100),
            year INT,
            gender VARCHAR(10),
            scholarship VARCHAR(20),
            payment_screenshot VARCHAR(255)
        );
    `);
};

export const insertStudent = async (id, userId, course, year, gender, scholarship, screenshotPath) => {
    await pool.query(
        `INSERT INTO students (id, user_id, course, year, gender, scholarship, payment_screenshot) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, userId, course, year, gender, scholarship, screenshotPath]
    );
};
