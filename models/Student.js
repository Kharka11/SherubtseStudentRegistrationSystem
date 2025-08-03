import pool from "../config/db.js";

<<<<<<< HEAD
=======
// Create students table
>>>>>>> 7756fb0 (Updated RS)
export const createStudentTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS students (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            course VARCHAR(100),
            year INT,
<<<<<<< HEAD
=======
            name VARCHAR(255),
>>>>>>> 7756fb0 (Updated RS)
            gender VARCHAR(10),
            scholarship VARCHAR(20),
            payment_screenshot VARCHAR(255)
        );
    `);
};

<<<<<<< HEAD
export const insertStudent = async (id, userId, course, year, gender, scholarship, screenshotPath) => {
    await pool.query(
        `INSERT INTO students (id, user_id, course, year, gender, scholarship, payment_screenshot) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, userId, course, year, gender, scholarship, screenshotPath]
=======
// Insert new student record
export const insertStudent = async (id, userId, course, year, name, gender, scholarship, screenshotPath) => {
    await pool.query(
        `INSERT INTO students 
        (id, user_id, course, year, name, gender, scholarship, payment_screenshot) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [id, userId, course, year, name, gender, scholarship, screenshotPath]
    );
};

// Fetch student record by user ID
export const getStudentByUserId = async (userId) => {
    const result = await pool.query(
        `SELECT * FROM students WHERE user_id = $1 LIMIT 1`,
        [userId]
    );
    return result.rows[0];
};

// Update student registration (for edits)
export const updateStudent = async (userId, course, year, name, gender, scholarship, screenshotPath) => {
    await pool.query(
        `UPDATE students 
         SET course = $1, year = $2, name = $3, gender = $4, scholarship = $5, payment_screenshot = $6
         WHERE user_id = $7`,
        [course, year, name, gender, scholarship, screenshotPath, userId]
>>>>>>> 7756fb0 (Updated RS)
    );
};
