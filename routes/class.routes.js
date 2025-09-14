import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClass, deleteClass, getClass, getClassById, updateClass } from '../controllers/class.controllers.js';

const router = express.Router();

// create a new class
router.post('/addClass', checkToken, createClass)
// get all class datas created by user
router.get('/class', checkToken, getClass)
// get class by their own ID
router.get('/classById/:idClass', checkToken, getClassById)
// update class 
router.put ('/class/update/:idClass', checkToken, updateClass)
// deleting class by id
router.delete('/class/delete/:idClass', checkToken, deleteClass)

export default router; 