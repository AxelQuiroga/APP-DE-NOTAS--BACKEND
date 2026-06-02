import AuthService from "../services/authService.js";

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req, res, next) {
        try {
            console.log('authController.register called. typeof next =', typeof next);
            console.log('body:', req.body);
            const { name, email, phone, password } = req.body;
            const userData = await this.authService.register({ name, email, phone, password });
            res.status(201).json(userData);
        } catch (error) {
            console.error('authController.register error:', error && error.stack ? error.stack : error);
            if (typeof next === 'function') {
                next(error);
            } else {
                // fallback: send generic error
                res.status(500).json({ error: error.message || 'Internal error' });
            }
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await this.authService.login(email, password);
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }
}
