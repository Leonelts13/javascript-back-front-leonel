import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import routes from './routes/chat.rutas.js';

dotenv.config();

const appChat = express();
appChat.set("port", process.env.CHAT_PORT || 5000);

//middleware.
appChat.use(express.json());
appChat.use(morgan("dev"));

// Usar las rutas definidas
appChat.use('/', routes);

export { appChat };
