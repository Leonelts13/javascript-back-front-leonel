// configuramos la base de datos
import { Low, JSONFile } from "lowdb";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

let db; //definimos la variable que hace conexion
const __dirname = dirname(fileURLToPath(import.meta.url)); // para obtener la ruta del archivo db.json

export async function createConnection() {
    const file = join(__dirname, "../db.json");//creamos la base de datos
    const adapter = new JSONFile(file);
    db = new Low(adapter); //creamos la conexion

    /*console.log(file)
    console.log(db)*/

    await db.read(); // vemos si la base de datos tiene algo
    db.data ||= { Persona: [] }; // si la base esta vacia la inicializa caso contrario no hace nada
    await db.write(); // guardamos la base de datos
}

export const getConnection = () => db; // exportamos la conexion 
