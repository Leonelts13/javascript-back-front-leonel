//rutas que estaran disponibles para PERSONA
import { Router } from "express";
const router = Router();

//importamos solo las rutas que se usaran como endpoints que se programaron en controllers
import {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    count,
} from "../controllers/persona.controllers.js";

router.get("/tasks", getTasks);

router.get("/tasks/count", count);

router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
