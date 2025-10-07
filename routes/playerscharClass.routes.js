import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClassOnPlayersChar, getAllPlayersCharsWithClasses, getPlayersCharByClassId } from '../controllers/playerscharClass.controllers.js';

const router = express.Router();

// Add class to a Players' Character
router.post('/addClassToPlayersChar', checkToken, createClassOnPlayersChar )
// get all players's character by class ID 
router.get('/playersCharByClassId/:idClass', checkToken, getPlayersCharByClassId)
// get all player's character with associated classes
router.get('/allPlayersCharWithClasses', checkToken, getAllPlayersCharsWithClasses)

export default router; 