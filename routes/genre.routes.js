import express from 'express'; 
import { getGenre } from '../controllers/genre.controllers.js';


const router = express.Router();

router.get('/genre', getGenre)


export default router;