import UserRepository from "../repositories/userRepository.js";
import AppError from "../errors/AppError.js";
import jwt from "jsonwebtoken";

export default class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET || "secreto_super_seguro", {
            expiresIn: '30d'
        });
    }

    async register(data) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new AppError("Email ya registrado", 409);
        }
        const user = await this.userRepository.create(data);
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: this.generateToken(user._id)
        };
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Credenciales inválidas", 401);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new AppError("Credenciales inválidas", 401);
        }
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: this.generateToken(user._id)
        };
    }
}
