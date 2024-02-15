// para hacer los endpoints solo de PERSONA
import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import taskRoutes from "./routes/persona.rutas.js";

dotenv.config();

const appPersona = express();

appPersona.set("port", process.env.PERSON_PORT || 4000);

// middlewares
appPersona.use(express.json());
appPersona.use(morgan("dev"));

// Routes
appPersona.use(taskRoutes);

export { appPersona };
