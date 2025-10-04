import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createNpc, deleteNpc, getNpc, getNpcById, updateNpc } from '../controllers/npc.controllers.js';

const router = express.Router();

// create a new npc
router.post('/addNpc', checkToken, createNpc)
// get all npc datas created by user
router.get('/npc', checkToken, getNpc)
// get npc by their own ID
router.get('/npcById/:idNpc', checkToken, getNpcById)
// update npc 
router.put ('/npc/update/:idNpc', checkToken, updateNpc)
// deleting npc by id
router.delete('/npc/delete/:idNpc', checkToken, deleteNpc)

export default router; 