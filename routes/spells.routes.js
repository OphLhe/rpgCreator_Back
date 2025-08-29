import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createSpells, deleteSpells, getSpells, updateSpells } from '../controllers/spells.controllers.js';

const router = express.Router();

// create a new armour
router.post('/addSpells/:idGenre', checkToken, createSpells)
// get all armour datas
router.get('/spells', checkToken, getSpells)
// update armour 
router.put ('/spells/update', checkToken, updateSpells)
// deleting armour by id
router.delete('/spells/delete/:id', checkToken, deleteSpells)

export default router; 