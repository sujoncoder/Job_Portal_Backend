import multer from "multer";
import { PDF_PATH } from "../secret/secret.js";
import path from "path";
<<<<<<< HEAD
=======

>>>>>>> c18f3007245d7fd6980e2be74dfa23e5b5aeed1d

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, PDF_PATH)
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
<<<<<<< HEAD
    }
}); // You can change this to diskStorage if you want to store files on disk
=======
    },
});

>>>>>>> c18f3007245d7fd6980e2be74dfa23e5b5aeed1d

const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
        const fileName = path.extname(file.originalname);
        if (fileName === '.pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    },
});


// Middleware function to handle PDF file uploads
export const uploadPDF = (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
        if (err) {
            // Handle the Multer error
            return res.status(400).json({ error: err.message });
        }
        console.log('Middleware executed');
        next();
    });
};

