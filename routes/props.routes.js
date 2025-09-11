import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createProps, deleteProps, getProps, updateProps } from '../controllers/props.controllers.js';

const router = express.Router();

// create a new props
router.post('/addProps/:idGenre', checkToken, createProps)
// get all props datas created by user
router.get('/props', checkToken, getProps)
// update props 
router.put ('/props/update/:id', checkToken, updateProps)
// deleting props by id
router.delete('/props/delete/:id', checkToken, deleteProps)

export default router; 