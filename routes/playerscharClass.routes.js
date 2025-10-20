import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClassOnPlayersChar, getAllPlayersCharsWithClasses, getPlayersCharByClassId, updateClassOnPlayersChar } from '../controllers/playerscharClass.controllers.js';

const router = express.Router();

// Check if Player's Character already has the class
// router.get('/checkPlayersCharClassAssociation/:playersCharacterId/:classId', checkToken, checkPlayersCharClassAssociation)
// Add class to a Players' Character
router.post('/addClassToPlayersChar', checkToken, createClassOnPlayersChar )
// get all players's character by class ID 
router.get('/playersCharByClassId/:idClass', checkToken, getPlayersCharByClassId)
// get all player's character with associated classes
router.get('/allPlayersCharWithClasses', checkToken, getAllPlayersCharsWithClasses)
// update class on a player's character
router.put('/updateClassOnPlayersChar/:idPlayersCharacterClass', checkToken, updateClassOnPlayersChar)


export default router; 