import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { createStory, deleteStory, getStories, getStoryById, updateStory } from '../controllers/story.controllers.js';

const router = express.Router();

// create a new story with Genre ID
router.post('/addStory/:idGenre', checkToken, createStory)
// get all story datas created by user
router.get('/story', checkToken, getStories)
// get story by their own ID
router.get('/storyById/:idStory', checkToken, getStoryById)
// update story 
router.put ('/story/update/:idStory', checkToken, updateStory)
// deleting story by id
router.delete('/story/delete/:idStory', checkToken, deleteStory)

export default router; 