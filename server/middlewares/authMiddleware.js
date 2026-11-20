
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        // Check token
        if (!token) {
            return res.status(401).json({
                message: "Token not found!",
                success: false,
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user in database
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found!",
                success: false,
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        console.log("Authentication error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};


// Role authorization
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Login required",
                success: false,
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Unauthorized access",
                success: false,
            });
        }

        next();
    };
};

export default authenticate;
