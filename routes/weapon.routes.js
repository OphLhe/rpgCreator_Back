import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createWeapon, deleteWeapon, getWeapon, getWeaponById, updateWeapon } from '../controllers/weapon.controllers.js';

const router = express.Router();

// create a new weapon
router.post('/addWeapon/:idGenre', checkToken, createWeapon)
// get all weapon datas created by user
router.get('/weapon', checkToken, getWeapon)
// get weapon datas by their own ID
router.get('/weaponById/:idWeapon', checkToken, getWeaponById)
// update weapon
router.put ('/weapon/update/:idWeapon', checkToken, updateWeapon)
// deleting weapon by id
router.delete('/weapon/delete/:idWeapon', checkToken, deleteWeapon)

export default router; 