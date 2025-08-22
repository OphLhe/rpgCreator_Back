import express from 'express'; 
import { createGenre, getGenre, getGenreById, updateGenre } from '../controllers/genre.controllers.js';
import checkToken from '../middlewares/checkToken.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({dest: '../pictures/'});

router.post('/genre/create', checkToken, upload.single('picture'), createGenre);
router.get('/genre', upload.single('picture'), getGenre);
router.get('/genre/:idGenre', checkToken, upload.single('picture'), getGenreById);
router.put('/genre/update/:idGenre', upload.single('picture') , updateGenre);

export default router;