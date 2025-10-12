import express from 'express'; 
import { createGenre, getGenre, getGenreById, updateGenre } from '../controllers/genre.controllers.js';
import checkToken from '../middlewares/checkToken.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({dest: '../pictures/'});

// create genre with picture 
router.post('/genre/create', checkToken, upload.single('picture'), createGenre);
// get all genres with picture
router.get('/genre', upload.single('picture'), getGenre);
// get genre by id with picture
router.get('/genre/:idGenre', checkToken, upload.single('picture'), getGenreById);
// update genre by id with picture
router.put('/genre/update/:idGenre', upload.single('picture') , updateGenre);

export default router;