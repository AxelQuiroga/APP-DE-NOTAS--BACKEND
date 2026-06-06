import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../errors/AppError.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_super_seguro");
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return next(new AppError("No autorizado, usuario no encontrado", 401));
            }

            next();
        } catch (error) {
            next(new AppError("No autorizado, token falló", 401));
        }
    } else {
        next(new AppError("No autorizado, no hay token", 401));
    }
};
