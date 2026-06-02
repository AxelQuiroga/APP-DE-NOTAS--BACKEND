import express from "express"
import notesRouter from "./routes/notesRoutes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import cors from "cors"
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRoutes.js"

dotenv.config()
const app = express()

app.use(cors({
    origin: ["http://localhost:5173","https://guileless-alpaca-c1ab24.netlify.app"]
    
}))

app.use(express.json())

// Request logger (temporal, para debug)
app.use((req, res, next) => {
    console.log('▶', req.method, req.url, 'body:', req.body);
    next();
});

app.use("/api/auth", authRouter)
app.use("/api/notes",notesRouter)

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3001

connectDB()
.then(() =>{
    app.listen(PORT,()=>{
    console.log(`Servidor levantado en puerto http://localhost:${PORT}`)
})
})
