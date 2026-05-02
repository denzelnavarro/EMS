import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// Login for Employee and Admin
// POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        if (role_type === "admin" && user.role !== "ADMIN") {
            return res.status(401).json({ error: "Not Authorized As Admin" });
        }

        if (role_type === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({ error: "Not Authorized As Employee" });
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(401).json({ error: "Invalid Credentials" })
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});

        return res.json({ user: payload, token });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Login Failed" });
    }
}

// GET Session For Employee and Admin
// GET /api/auth/session
export const session = (req, res) => {
    const session = req.session;
    return res.json({ user: session })
}

// Change Password For Employee and Admin
// POST /api/auth/change-password
export const changePassword = async (req, res) => {
    try {
        const session = req.session;
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Both passwords are required" });
        }

        const user = await User.findById(session.userId)
        
        if (!user) return res.status(404).json({ error: "User not found" });

        const isValid = await bcrypt.compare(currentPassword, user.password);

        if (!isValid) return res.status(400).json({ error: "Current Password Is Incorrent" });

        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(session.userId, { password: hashed })
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: "Failed to change password" });
    }
}