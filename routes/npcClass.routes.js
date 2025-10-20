import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClassOnNpc, getAllNpcsWithClasses, getNpcByClassId, updateNpcClass } from '../controllers/npcClass.controllers.js';


const router = express.Router();

// Check if NPC already has the class
// router.get('/checkNpcClassAssociation/:npcId/:classId', checkToken, checkNpcClassAssociation)
// Add class to a NPC
router.post('/addClassToNPC', checkToken, createClassOnNpc)
// get all npc by class ID 
router.get('/npcByClassId/:idClass', checkToken, getNpcByClassId)
// get all npcs with associated classes
router.get('/allNpcWithClasses', checkToken, getAllNpcsWithClasses)
// update class of a npc
router.put('/updateNpcClass/:npcClassId', checkToken, updateNpcClass)

export default router; 