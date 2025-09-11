import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { getAbility } from '../controllers/ability.controllers.js';

const router = express.Router();

// get all abilities from ability table
router.get('/ability', checkToken, getAbility)

export default router; 