import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res
            .status(200)
            .json({ message: "token not found!", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECTRET);

    const user = await User.findById(decoded.id);

    req.user = user;

    if (!decoded) {
        return res
            .status(401)
            .json({ message: "invalide token", success: false });
    }

    next();
};
//role accessing for admin
export const authorize = (...roles) => {
    return async(req,res,next)=>{

        if (!req.user) {
            return res.status(401).json({message:"Login required", success: false})
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({message:"unauthorix=ze attempt", success:false})
        }

        next()
    }
};

export default authenticate;
