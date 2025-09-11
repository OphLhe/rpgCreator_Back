import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createSkills, deleteSkills, getSkills, getSkillsById, updateSkills } from '../controllers/skills.controller.js';

const router = express.Router();

// create a new skills
router.post('/addSkills', checkToken, createSkills)
// get all skills datas created by user
router.get('/skills', checkToken, getSkills)
// get skills by their own Id
router.get(`/skillsById/:id`, checkToken, getSkillsById)
// update skills 
router.put ('/skills/update/:id', checkToken, updateSkills)
// deleting skills by id
router.delete('/skills/delete/:id', checkToken, deleteSkills)

export default router; 