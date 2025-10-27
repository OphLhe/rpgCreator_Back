import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createArmour, deleteArmour, getArmour, getArmourById, updateArmour } from '../controllers/armour.controllers.js';

const router = express.Router();

// create a new armour
router.post('/addArmour/:idGenre', checkToken, createArmour)
// get all armour datas created by user
router.get('/armour', checkToken, getArmour)
// get an armour by its id
router.get('/armour/:idArmour', checkToken, getArmourById)
// update armour 
router.put ('/armour/update/:idArmour', checkToken, updateArmour)
// deleting armour by id
router.delete('/armour/delete/:idArmour', checkToken, deleteArmour)

export default router; 