import mongoose from "mongoose"
import { MongoMemoryServer } from 'mongodb-memory-server'

export const connectDB = async() => {
    try {
        let dbURI = process.env.MONGODB_URI;

        // Si no hay URI, arrancar un Mongo en memoria para pruebas/local
        if (!dbURI) {
            console.warn("MONGODB_URI no definida: arrancando MongoDB en memoria para pruebas.");
            const mongoServer = await MongoMemoryServer.create();
            dbURI = mongoServer.getUri();
            console.log("MongoDB in-memory URI:", dbURI);
        }

        await mongoose.connect(dbURI);
        console.log("MongoDB conectado")
    } catch (error) {
        console.error("Error al conectar con MongoDB", error)
        process.exit(1)
    }
}