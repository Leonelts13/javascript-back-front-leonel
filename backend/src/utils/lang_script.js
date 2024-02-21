import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import dotenv from 'dotenv';
dotenv.config();

export const procesarDoc = async (filename, question) => {

    console.log("--------filename--------->", filename)
    console.log("--------question--------->", question)

    try {
        //PASO 1
        const loader = new PDFLoader(`./src/uploads/${filename}`, {
            //splitPages: false // para dividir al pdf en paginas (true) en uno solo (false)
        });
        //console.log(loader)
        const doc = await loader.load();
        //console.log( doc)

      //PASO 2
        //splitter function -- dividiimos al pdf en textos mas pequeños
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000, // bloques de cada 1000 caracteres
            chunkOverlap: 200, // similitud de 200 caracteres entre pregunta y pregunta
        });
        //created chunks form pdf -- creamos los fragmentos del pdf
        const splitterDoc = await splitter.splitDocuments(doc);
        //console.log(splitterDoc)

        //PASO 3
        const embeddings = new OpenAIEmbeddings({
            //se puede mandar vacio para que haga con datos por default o sino se manda la API KEY OPENAI
            openAIApiKey: process.env.OPENAI_API_KEY,   // In Node.js defaults to process.env.OPENAI_API_KEY
            batchSize: 512,                             // Default value if omitted is 512. Max is 2048, es para procesar 512 fragmentos de texto para encontrar similitudes 
            modelName: "text-embedding-3-large",
        });

        //PASO 4 VECTORES

        const vectorStore = await MemoryVectorStore.fromDocuments(
            splitterDoc,
            embeddings
        );

        //PASO 5
        // Initialize a retriever wrapper around the vector store -- Iniciamos la recuperacion de datos del vector
        const vectorStoreRetriever = vectorStore.asRetriever();

        //PASO 6
        //CREAMOS LA CONEXION CON LA API DE OPENAI PARA LLM
        const model = new OpenAI({
            modelName: "gpt-3.5-turbo-instruct", // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
            temperature: 0.7,
            openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY */
        });

        //PASO 7
        //Create a chain that uses the OpenAI LLM and vector store.
        // unimos el modelo de chatgpt con el vector de recuperacion para generar las respuestas
        const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
        const respuesta = await chain._call({
            query: question, //MANDAMOS LA PREGUNTA QUE ENVIA EL USUARIO
        });

        //console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.error("Ocurrió un error:", error);
        return "Ocurrió un error al procesar el documento";
    }
}
