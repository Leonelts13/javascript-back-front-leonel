import { Router } from "express";
import {
    getInfo,
    chat,
    tokenEncriptado,
    tokenDesencriptado,
    chatPDF,
} from '../controllers/chat.controllers.js';

//exportamos el middleware para guardar el archivo
//import { cargarArchivo } from '../../utils/uploadFile.js'
import { cargarArchivo } from '../../utils/uploadFile.js'

const router = Router();

// Definir rutas {definimos la ruuta que usara, el metodo que usara de controllers}
router.get('/info', getInfo);
router.post('/chat', chat);
router.post('/tokenE', tokenEncriptado);
router.post('/tokenD', tokenDesencriptado);
router.post('/chatpdf', cargarArchivo, chatPDF); //pasamos el middleware para guardar el archivo
// cargarArchivo.single('pdf') --> pdf es el identificador que estara en el body
export default router;
