import multer from "multer";
import { PDF_PATH } from "../secret/secret.js";

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, PDF_PATH)
    }
}); // You can change this to diskStorage if you want to store files on disk
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
});

// Middleware function to handle PDF file uploads
export const uploadPDF = (req, res, next) => {
    console.log('Middleware executed');
    upload.single('resume')(req, res, next);
};

