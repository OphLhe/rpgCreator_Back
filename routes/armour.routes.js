import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createArmour, deleteArmour, getArmour, updateArmour } from '../controllers/armour.controllers.js';

const router = express.Router();

// create a new armour
router.post('/addArmour/:idGenre', checkToken, createArmour)
// get all armour datas created by user
router.get('/armour', checkToken, getArmour)
// update armour 
router.put ('/armour/update/:id', checkToken, updateArmour)
// deleting armour by id
router.delete('/armour/delete/:id', checkToken, deleteArmour)

export default router; 