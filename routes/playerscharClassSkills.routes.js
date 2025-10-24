import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import {  } from '../controllers/playerscharClassSkills.controllers.js';


const router = express.Router();

// Confirm skills choice too a class while creating a Player's character 
router.post(`/addSkillToPlayerscharClass`, checkToken, )
// to fetch skills chosen for a specific player's character and its class
router.get(`/playerscharClassSkills/:playerscharClassId`, checkToken, )

export default router;