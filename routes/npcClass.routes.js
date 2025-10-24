import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createClassOnNpc, getAllNpcsWithClasses, getNpcByIdNpc, updateNpcClass } from '../controllers/npcClass.controllers.js';


const router = express.Router();

// Add class to a NPC
router.post('/addClassToNPC', checkToken, createClassOnNpc)
// get one npc and its class with idNpc
router.get('/npcClassByIdNpc/:npcId', checkToken, getNpcByIdNpc)
// get all npcs with associated classes
router.get('/allNpcWithClasses', checkToken, getAllNpcsWithClasses)
// update class of one npc
router.put('/updateNpcClass/:idNpcClass', checkToken, updateNpcClass)
0
export default router; 