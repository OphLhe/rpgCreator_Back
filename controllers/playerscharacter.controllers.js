 import dotenv from "dotenv";
 import * as playerscharacterModels from "../models/playerscharacter.models.js";

 dotenv.config();
 
export const createPlayerscharacter = async (req, res) => {
   const { firstName, lastName, nickname, gender, age, biography, physic, level, speciesId } =  req.body;
   const userId = req.user.idUser;
   
   if (!firstName || !age || !level || !speciesId) {
     return res.status(400).json({ message: "The following field are required: firstName, age, level, speciesId" });
   }  
   try {
    const [result] = await playerscharacterModels.addPlayersCharacter(firstName, lastName, nickname, gender, age, biography, physic, level, userId, speciesId )
    res.status(200).json(result, { message: "Player's character registered successfully" });
   }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering player's character" });
   }
 };

export const getPlayerscharacter = async (req, res) => {   
    const userId = req.user.idUser;

    try {
        const [result] = await playerscharacterModels.getPlayersCharacter(userId);    
        if(result.length > 0){
        res.status(200).json({result, message: "Player's characters retrieved successfully" });
        } else {
            res.status(404).json({ message: "No player's characters found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while retrieving player's characters" });
    }       
};

export const getPlayerscharacterById = async (req, res) => { 
    const idPlayersCharacter = req.params.idPlayersCharacter;
    const userId = req.user.idUser;

    console.log(userId);
    console.log(idPlayersCharacter);

    try {
        const [result] = await playerscharacterModels.getPlayersCharacterById(  idPlayersCharacter, userId);    
        if(result.length > 0){
        res.status(200).json({result, message: `Player's character ${idPlayersCharacter} retrieved successfully` });        
        } else {
            res.status(404).json({ message: "No player's character found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while retrieving player's character" });
    }   
};

export const updatePlayerscharacter = async (req, res) => { 
    const idPlayersCharacter = req.params.idPlayersCharacter;
    const userId = req.user.idUser;
    const { firstName, lastName, nickname, gender, age, biography, physic, level, speciesId } =  req.body;
             
    try {
        const [result] = await playerscharacterModels.updatePlayersCharacter(firstName, lastName, nickname, gender, age, biography, physic, level, speciesId, idPlayersCharacter, userId);    

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Player's does not exist" });
        }               
        res.status(200).json({ message: "Player's character updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating player's character" });
    }       
};  

export const deletePlayerscharacter = async (req, res) => {
    const idPlayersCharacter = req.params.idPlayersCharacter;
    const userId = req.user.idUser;
    
    try {
        const [result] = await playerscharacterModels.deletePlayersCharacter(idPlayersCharacter, userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Player's character does not exist" });
        }   
        res.status(200).json({ message: "Player's character deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting player's character" });
    }       
};  