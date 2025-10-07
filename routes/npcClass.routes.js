import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClassOnNpc, getAllNpcsWithClasses, getNpcByClassId } from '../controllers/npcClass.controllers.js';


const router = express.Router();

// Add class to a NPC
router.post('/addClassToNPC', checkToken, createClassOnNpc)
// get all npc by class ID 
router.get('/npcByClassId/:idClass', checkToken, getNpcByClassId)
// get all npcs with associated classes
router.get('/allNpcWithClasses', checkToken, getAllNpcsWithClasses)


export default router; 