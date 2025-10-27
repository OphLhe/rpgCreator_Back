import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createProps, deleteProps, getProps, getPropsById, updateProps } from '../controllers/props.controllers.js';

const router = express.Router();

// create a new props
router.post('/addProps/:idGenre', checkToken, createProps)
// get all props datas created by user
router.get('/props', checkToken, getProps)

router.get('/propsById/:idProps', checkToken, getPropsById)
// update props 
router.put ('/props/update/:idProps', checkToken, updateProps)
// deleting props by id
router.delete('/props/delete/:idProps', checkToken, deleteProps)

export default router; 