import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createWeapon, deleteWeapon, getWeapon, updateWeapon } from '../controllers/weapon.controllers.js';

const router = express.Router();

// create a new props
router.post('/addWeapon/:idGenre', checkToken, createWeapon)
// get all props datas
router.get('/weapon', checkToken, getWeapon)
// update props 
router.put ('/weapon/update', checkToken, updateWeapon)
// deleting props by id
router.delete('/weapon/delete/:id', checkToken, deleteWeapon)

export default router; 