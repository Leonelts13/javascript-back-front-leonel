import { appChat } from "./chat/chat.app.js";
import { appPersona } from "./persona/persona.app.js";
import { createConnection } from "./utils/database.js";

createConnection(); //creamos la conexion con la base de datos

appChat.listen(appChat.get("port"));
console.log("**************************************************");
console.log("Servidor del CHATBOT ejecutandose en el puerto:", appChat.get("port"));
console.log("**************************************************");

appPersona.listen(appPersona.get("port"));
console.log("**************************************************");
console.log("Servidor de PERSONAS ejecutandose en el puerto:", appPersona.get("port"));
console.log("**************************************************");