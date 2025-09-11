import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClass, deleteClass, getClass, getClassById, updateClass } from '../controllers/class.controllers.js';

const router = express.Router();

// create a new class
router.post('/addClass', checkToken, createClass)
// get all class datas created by user
router.get('/class', checkToken, getClass)
// get class by their own ID
router.get('/classById/:id', checkToken, getClassById)
// update class 
router.put ('/class/update/:id', checkToken, updateClass)
// deleting class by id
router.delete('/class/delete/:id', checkToken, deleteClass)

export default router; 