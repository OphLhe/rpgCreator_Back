import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createPlayerscharacter, deletePlayerscharacter, getPlayerscharacter, getPlayerscharacterById, updatePlayerscharacter } from '../controllers/playerscharacter.controllers.js';

const router = express.Router();

// create a new players's character 
router.post(`/addPlayerscharacter`, checkToken, createPlayerscharacter)
// get all player's character datas created by user 
router.get(`/playerscharacter`, checkToken, getPlayerscharacter)
//  get player's character by their own id
router.get(`/playerscharacterById/:idPlayersCharacter`, checkToken, getPlayerscharacterById)
// update player's character from their own id
router.put(`/playerscharacter/update/:idPlayersCharacter`, checkToken, updatePlayerscharacter)
//  deleting player's character by their own id and user id 
router.delete(`/playerscharacter/delete/:idPlayersCharacter`, checkToken, deletePlayerscharacter)

export default router; 