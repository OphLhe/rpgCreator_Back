import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createWeapon, deleteWeapon, getWeapon, getWeaponById, updateWeapon } from '../controllers/weapon.controllers.js';

const router = express.Router();

// create a new props
router.post('/addWeapon/:idGenre', checkToken, createWeapon)
// get all props datas created by user
router.get('/weapon', checkToken, getWeapon)

router.get('/weaponById/:idWeapon', checkToken, getWeaponById)
// update props 
router.put ('/weapon/update/:idWeapon', checkToken, updateWeapon)
// deleting props by id
router.delete('/weapon/delete/:idWeapon', checkToken, deleteWeapon)

export default router; 