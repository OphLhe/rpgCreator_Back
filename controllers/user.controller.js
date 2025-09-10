import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModels from '../models/user.models.js';
import { mailForgotPassword, transporter } from "../config/nodemailerConfig.js";

dotenv.config()

export const register = async (req, res) => {

    const { email, firstName, lastName, nickname, dateOfBirth, password, registerDate} = req.body;

    try {

        const [existingUser] = await userModels.getUser(email);
      
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        else{
            
            const cryptedPassword = bcrypt.hashSync(password, 10);
            const user = await userModels.addUser(email, firstName, lastName, nickname, dateOfBirth, cryptedPassword, registerDate);
            res.status(200).json({ message: 'User registered successfully', user });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while registering user' });
    }   
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const [result] = await userModels.getUser(email);
        const userData = result[0];
        
        if(result){
            const checkPassword = await bcrypt.compare(password, userData.password);
            if(checkPassword === true){
                const token = jwt.sign({idUser: userData.idUser, email: userData.email, nickname: userData.nickname}, process.env.JWT_SECRET, { expiresIn: '4h'  });
                res.status(200).json({
                    message: 'connexion successful',
                    token: token,
                })
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
        }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while logging in user', error });
    }
}

export const getUserProfile = async (req, res) => {
    const userId = req.user.idUser;
    
    try {
        const [result] = await userModels.getProfile(userId);
        
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching user profile', error });
    }
}

export const updateUserProfile = async (req, res) => {
    const idUser = req.user.idUser;
    const { email, firstName, lastName, nickname } = req.body;

    try {
        await userModels.updateProfile(email, firstName, lastName, nickname, idUser);
        res.status(200).json({ message: 'User profile updated successfully' });   
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while updating user profile', error });
    }
}

export const updateUserPassword = async (req, res) => {
    const userId = req.user.idUser;
    const { oldPassword, newPassword } = req.body;
    
    try {
        const [result] = await userModels.getProfilePassword(userId);
        
        if(result.length > 0){
            const userData = result[0];
            
            const checkOldPassword = await bcrypt.compare(oldPassword, userData.password);
            if(checkOldPassword){
                const cryptedNewPassword = await bcrypt.hashSync(newPassword, 10);
                await userModels.updateProfilePassword(cryptedNewPassword, userId);
                res.status(200).json({ message: 'User password updated successfully' });
            } else{
                res.status(401).json({ message: 'Old password is incorrect' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while updating user password', error });
    }
}

export const forgottenUserPassword = async (req, res) => {
    const {email} = req.body

    try {
        const user = await userModels.forgottenPassword(email);

        if(user.length === 0){
            return res.status(404).json({message: "Email not found"})
        }
        
        const tokenReset = jwt.sign({idUser: user[0][0].idUser}, process.env.JWT_SECRET, {expiresIn: '1h'})

        transporter.sendMail(mailForgotPassword(email, user[0][0].nickname, tokenReset), (error, info) =>{
            
            if(error){
                return console.error('error sending email:', error);
            }  
        })
        res.status(200).json({message: 'reinitialization mail sent'})

    } catch (error) {
        console.error('error while fetching password:', error);
        res.status(500).json({message: 'server erreur'})
    }
}

export const resetUserPassword = async (req, res) => {
    const {password} = req.body
    const {idUser} = req.user

    try {
        const cryptPassword = bcrypt.hashSync(password, 10);
        const result = await userModels.resettingPassword(cryptPassword, idUser);

            if (result.affectedRows === 0){
                return res.status(404).json({message: 'user not found'})
            }

            res.status(200).json({message: 'password reset successfully'});
        
    } catch (error) {
        console.error('error while resetting password:', error);
        res.status(500).json({message: 'server error'})
    }
}

export const deleteUserAccount = async (req, res) => {
    const idUser = req.params.id; 

    try {
        const [result] = await userModels.deleteUser(idUser);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Spells not found" });
        }
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while deleting user account', error });
    }
}