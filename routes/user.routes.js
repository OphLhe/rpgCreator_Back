import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { deleteUserAccount, forgottenUserPassword, getUserProfile, login, register, resetUserPassword, updateUserPassword, updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

// register user
router.post('/register', register);
// login user
router.post('/login', login);
// get user datas on profilePage
router.get('/profile', checkToken, getUserProfile);
// updating user datas 
router.put('/profile/update', checkToken, updateUserProfile);
// updating password
router.put('/profile/updatePassword', checkToken, updateUserPassword);
// sendinf email for reinitializing password
router.post('/forgotPassword', forgottenUserPassword);
// reinitializing password 
router.post('/resetPassword', checkToken, resetUserPassword)
// deleting user account
router.delete('/profile/:id', checkToken, deleteUserAccount);

export default router; 