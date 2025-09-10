import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClass, deleteClass, getClass, updateClass } from '../controllers/class.controllers.js';

const router = express.Router();

// create a new class
router.post('/addClass', checkToken, createClass)
// get all class datas
router.get('/class', checkToken, getClass)
// update class 
router.put ('/class/update', checkToken, updateClass)
// deleting class by id
router.delete('/class/delete/:id', checkToken, deleteClass)

export default router; 