
import { getConnection } from "../../utils/database.js";
import { v4 as idAleatorio } from "uuid";

// Obtener todas las tareas
export const getTasks = (req, res) => {
    try {
        const tasks = getConnection().data.Persona;
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send("Error al obtener las tareas: " + error.message);
    }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        const newTask = {
            id: idAleatorio(),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
        };

        const db = getConnection();
        db.data.Persona.push(newTask);
        await db.write();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).send("Error al crear la tarea: " + error.message);
    }
};

// Obtener una tarea por su ID
export const getTask = (req, res) => {
    try {
        const taskFound = getConnection().data.Persona.find(
            (p) => p.id === req.params.id
        );

        if (!taskFound) {
            res.status(404).send("Tarea no encontrada");
        } else {
            res.status(200).json(taskFound);
        }

        return taskFound;
    } catch (error) {
        res.status(500).send("Error al obtener la tarea: " + error.message);
    }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
    try {
        const db = getConnection();
        const taskFound = db.data.Persona.find((p) => p.id === req.params.id);

        if (!taskFound) {
            res.status(404).send("Tarea no encontrada");
        } else {
            const { nombre, apellido, edad } = req.body;
            taskFound.nombre = nombre;
            taskFound.apellido = apellido;
            taskFound.edad = edad;

            await db.write();
            res.status(200).json(taskFound);
        }
    } catch (error) {
        res.status(500).send("Error al actualizar la tarea: " + error.message);
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const db = getConnection();
        const taskFound = db.data.Persona.find((p) => p.id === req.params.id);

        if (!taskFound) {
            res.status(404).send("Tarea no encontrada");
        } else {
            const newTasks = db.data.Persona.filter((p) => p.id !== req.params.id);
            db.data.Persona = newTasks;
            await db.write();
            res.status(200).json(taskFound);
        }
        return taskFound;
    } catch (error) {
        res.status(500).send("Error al eliminar la tarea: " + error.message);
    }
};

// Obtener el número total de tareas
export const count = async (req, res) => {
    try {
        const totalTasks = getConnection().data.Persona.length;
        res.status(200).json({ count: totalTasks });
    } catch (error) {
        res.status(500).send("Error al obtener el número total de tareas: " + error.message);
    }
};
