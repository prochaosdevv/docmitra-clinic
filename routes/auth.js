import express from "express"
import { login, register, getCurrentUser, logout } from "../controllers/auth.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/me", authenticateToken, getCurrentUser)
router.post("/logout", authenticateToken, logout)

export const authRoutes = router
