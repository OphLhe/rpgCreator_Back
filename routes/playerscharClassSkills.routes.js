import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { addPlayerscharClassSkill, deleteAllPlayerscharClassSkills, deletePlayerscharClassSkill, getPlayerscharClassSkills } from '../controllers/playerscharClassSkills.controllers.js';


const router = express.Router();

// Ajouter une compétence spécifique à un PNJ pour une classe
router.post('/addSkillToPlayerscharClass', checkToken, addPlayerscharClassSkill);

// Récupérer les compétences spécifiques à un PNJ pour une classe
router.get('playerscharClassSkills/:playerscharClassId', checkToken, getPlayerscharClassSkills);

// Supprimer une compétence spécifique à un PNJ pour une classe
router.delete('playerscharClassSkills/delete/:playerscharClassSkillId', checkToken, deletePlayerscharClassSkill);

// Supprimer toutes les compétences spécifiques à un PNJ pour une classe
router.delete('/playerscharClassSkills/deleteAll/:playerscharClassId',checkToken, deleteAllPlayerscharClassSkills);

export default router;