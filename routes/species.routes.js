import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createSpecies, deleteSpecies, getSpecies, updateSpeciesDatas } from '../controllers/species.controllers.js';

const router = express.Router();

// create a new specie
router.post('/addSpecies', checkToken, createSpecies)
// get all species datas created by user
router.get ('/species', checkToken, getSpecies)
// update species 
router.put ('/species/update/:idSpecies', checkToken, updateSpeciesDatas)
// deleting species by id
router.delete('/species/delete/:idSpecies', checkToken, deleteSpecies)

export default router;