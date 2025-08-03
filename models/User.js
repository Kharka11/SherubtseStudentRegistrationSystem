import pool from "../config/db.js";

export const createUserTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            is_verified BOOLEAN DEFAULT FALSE,
            verification_token VARCHAR(200)
        );
    `);
};

export const insertUser = async (id, name, email, hashedPassword, token) => {
    await pool.query(
        `INSERT INTO users (id, name, email, password, verification_token) VALUES ($1, $2, $3, $4, $5)`,
        [id, name, email, hashedPassword, token]
    );
};

export const findUserByEmail = async (email) => {
    const res = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return res.rows[0];
};

export const verifyUser = async (token) => {
    await pool.query(`UPDATE users SET is_verified = TRUE WHERE verification_token=$1`, [token]);
};
