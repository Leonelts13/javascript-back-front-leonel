
import axios from 'axios';
import crypto from 'crypto'; // ess una liberia integrada de node.js

//importamos el script que permite chatear con el documento
import { procesarDoc } from '../../utils/lang_script.js';

// Controlador para obtener información del chatbot
export const getInfo = (req, res) => {
    const chatbotInfo = {
        name: 'Chatbot de OpenAI',
        version: '1.0',
        description: 'Un chatbot que utiliza la API de OpenAI Creado por Leonel Alexander Tualombo Aules'
    };
    res.json(chatbotInfo);
};

// Controlador para manejar la conversación con el chatbot
export const chat = async (req, res) => {
    console.log("Usuario: ", req.body.message)
    try {
        const mensaje = req.body.message;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            temperature: 0,
            max_tokens: 100,
            messages: [
                {
                    role: 'user',
                    content: mensaje, // la entrada del usuario, lo que el usuario escribió en el chat
                },
                {
                    role: 'assistant', // Cambiado de 'system' a 'assistant' para reflejar que es un chatbot o asistente virtual
                    content: "¡Hola! Soy un chatbot aquí para ayudarte. ¿En qué puedo ayudarte hoy?", // Mensaje del chatbot
                    
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        
        /* const data = response.data;
        let numTokens = data.usage?.total_tokens || 0;
        let message = data.choices[0]?.message?.content || 'No se pudo procesar la solicitud';
        return { numTokens, message }; */
        
        const { usage, choices } = response.data;
        const numTokens = usage?.total_tokens || 0;
        const message = choices[0]?.message?.content || 'No se pudo procesar la solicitud';
        console.log("Chatbot mensaje: ", message);
        console.log("Chatbot tokens: ", numTokens);
        res.json({ message, numTokens });

        return { message, numTokens };
        
        //console.log(response.data.choices[0].message);
        //res.json(response.data.choices[0].message);
        //res.json(response.data);
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener la respuesta de la API');
    }
    
};

export const tokenEncriptado = async (req, res) => {
    //console.log(crypto.getCiphers()) //para ver todos los modelos de encriptar una palabra
    //const key = crypto.randomBytes(32)
    //console.log("key ", key.toString("hex"))
    
    // Obtener la clave desde la variable de entorno
    const keyHexString = process.env.KEY_CRYPTO;
    // Convertir la cadena hexadecimal a un Buffer
    const keyBuffer = Buffer.from(keyHexString, 'hex');

    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(process.env.SHA_256_ALGORITMO, keyBuffer, iv)
    const palabraEncript = Buffer.concat([cipher.update(req.body.message), cipher.final()])
    res.json({
        iv: iv.toString("hex"),
        token: palabraEncript.toString("hex"),
    });
    
    console.log("iv:", iv.toString("hex"))
    console.log("token:", palabraEncript.toString("hex"))
    return {
        iv: iv.toString("hex"),
        token: palabraEncript.toString("hex"),
    };
};

export const tokenDesencriptado = async (req, res) => {
    const iv = Buffer.from(req.body.iv, "hex")
    const token = Buffer.from(req.body.token, "hex")

    // Obtener la clave desde la variable de entorno
    const keyHexString = process.env.KEY_CRYPTO;
    // Convertir la cadena hexadecimal a un Buffer
    const keyBuffer = Buffer.from(keyHexString, 'hex');
    
    const palabraDescript = crypto.createDecipheriv(process.env.SHA_256_ALGORITMO, keyBuffer, iv)
    const palabraEntendible = Buffer.concat([palabraDescript.update(token), palabraDescript.final()]).toString()
    res.json({
        correo: palabraEntendible,
    });
    
    console.log("correo:", palabraEntendible)
    return {
        correo: palabraEntendible,
    }; 
};

export const chatPDF = async (req, res) => {
    res.setHeader("Content-Type", "applicaton/json")
    if (!req.file) {
        res.status(400).send({ message: 'No se ha proporcionado ningún archivo PDF.' });
    }
    if (!req.body.question) {
        res.status(400).send({ message: 'No se ha proporcionado ninguna pregunta.' });
    }
    //console.log(`./src/uploads/${req.file?.filename}`)
    const text = await procesarDoc(
        //path: `./src/uploads/${req.file?.filename}`,
        `${req.file?.filename}`,
        req.body.question
    )
    console.log("Respuesta: ",text)
    //res.json(text)
    res.status(200).send({ message: text });

};