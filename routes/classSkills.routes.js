import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createSkillsToClass, getSkillsByClassId } from '../controllers/classSkills.controllers.js';

const router = express.Router();

// Add Skills to Class
router.post('/addSkillsToClass/:idClass', checkToken, createSkillsToClass)
// get Skills added to one Class
router.get('/skillsByClassId/:idClass', checkToken, getSkillsByClassId)


export default router; 