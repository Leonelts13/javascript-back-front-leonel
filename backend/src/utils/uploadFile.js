import * as path from "path";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './src/uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
        console.log("------------>", file.originalname)
    }
});
export const cargarArchivo = multer({
    storage,
    fileFilter(req, file, callback) {
        const fileExtension = path.extname(file.originalname)
        if (!fileExtension.includes('.pdf')) {
            callback(new Error('Only pdfs are allowed'))
        }
        callback(null, true)
    }
}).single('pdf');

//export const cargarArchivo = multer({ storage: storage });



