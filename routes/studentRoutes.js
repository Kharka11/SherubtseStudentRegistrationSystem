import express from "express";
import multer from "multer";
import { getRegisterForm, postRegisterForm } from "../controllers/studentController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/register", isAuthenticated, getRegisterForm);
router.post("/register", isAuthenticated, upload.single("payment"), postRegisterForm);

export default router;
