import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { addNpcClassSkill, deleteAllNpcClassSkills, deleteNpcClassSkill, getNpcClassSkills } from '../controllers/npcClassSkills.controllers.js';


const router = express.Router();

// Ajouter une compétence spécifique à un PNJ pour une classe
router.post('/addSkillToNpcClass', checkToken, addNpcClassSkill);

// Récupérer les compétences spécifiques à un PNJ pour une classe
router.get('/npcClassSkills/:npcClassId', checkToken, getNpcClassSkills);

// Supprimer une compétence spécifique à un PNJ pour une classe
router.delete('/npcClassSkills/delete/:idNpcClassSkill', checkToken, deleteNpcClassSkill);

// Supprimer toutes les compétences spécifiques à un PNJ pour une classe
router.delete('/npcClassSkills/deleteAll/:npcClassId',checkToken, deleteAllNpcClassSkills);

export default router;