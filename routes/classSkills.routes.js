import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createSkillsToClass, getClassAndSkills, getClassSkillsById, updateSkillsToClass } from '../controllers/classSkills.controllers.js';

const router = express.Router();

// Add Skills to Class
router.post('/addSkillsToClass', checkToken, createSkillsToClass)
// get a class and its skills by id
router.get('/classSkillsById/:idClass', checkToken, getClassSkillsById)
// get all classes with associated skills 
router.get('/allClassesWithSkills', checkToken, getClassAndSkills)
// Update Skills to Class
router.put('/updateSkillsToClass/:idClass', checkToken, updateSkillsToClass)

export default router; 