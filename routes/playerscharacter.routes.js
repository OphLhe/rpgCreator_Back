import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createPlayerscharacter, deletePlayerscharacter, getPlayerscharacter, getPlayerscharacterById, updatePlayerscharacter } from '../controllers/playerscharacter.controllers.js';

const router = express.Router();

// Routes to create playerscharacter
router.post('/addPlayerscharacter', checkToken, createPlayerscharacter);
// Route to get all playerscharacter created by user
router.get('/playerscharacter', checkToken, getPlayerscharacter);
// Route to get playerscharacter by their own ID
router.get('/playerscharacterById/:idPlayersCharacter', checkToken, getPlayerscharacterById);
// Route to update playerscharacter by id
router.put ('/playerscharacter/update/:idPlayersCharacter', checkToken, updatePlayerscharacter)
// Route to delete playerscharacter by id
router.delete('/playerscharacter/delete/:idPlayersCharacter', checkToken, deletePlayerscharacter)

export default router; 