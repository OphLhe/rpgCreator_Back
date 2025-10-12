import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createSkillsToClass, getClassAndSkills, getSkillsByClassId, updateSkillsToClass } from '../controllers/classSkills.controllers.js';

const router = express.Router();

// Add Skills to Class
router.post('/addSkillsToClass', checkToken, createSkillsToClass)
// get Skills added to one Class
router.get('/skillsByClassId/:idClass', checkToken, getSkillsByClassId)
// get all classes with associated skills 
router.get('/allClassesWithSkills', checkToken, getClassAndSkills)
// Update Skills to Class
router.put('/updateSkillsToClass/:idClass', checkToken, updateSkillsToClass)

export default router; 