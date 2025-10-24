import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClassOnPlayersChar, getAllPlayersCharWithClasses, getPlayersCharById, updateClassOnPlayersChar } from '../controllers/playerscharClass.controllers.js';


const router = express.Router();

// add class to player's character
router.post(`/addClassToPlayerschar`, checkToken, createClassOnPlayersChar)
// get one player's character with its class by idPlayersCharacter
router.get(`/playerscharClassById/:playersCharacterId`, checkToken, getPlayersCharById)
//  get all player's characters with their classes 
router.get(`/allPlayerscharWithClasses`, checkToken, getAllPlayersCharWithClasses)
//  update class of one player's character
router.put(`/updatePlayerscharClass/:idPlayerscharClass`, checkToken, updateClassOnPlayersChar)

export default router; 