import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { addNpcClassSkill,  getNpcClassSkills } from '../controllers/npcClassSkills.controllers.js';


const router = express.Router();

// Confirm skills choice too a class while creating a Npc 
router.post('/addSkillToNpcClass', checkToken, addNpcClassSkill);

// to fetch skills chosen for a specific npc and its class
router.get('/npcClassSkills/:npcClassId', checkToken, getNpcClassSkills);

export default router;