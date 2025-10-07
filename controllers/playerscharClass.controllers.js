import dotenv from "dotenv";
import * as playerscharClassModels from "../models/playerscharClass.models.js";

dotenv.config();

export const createClassOnPlayersChar = async (req, res) => {

  try {
    const { playersCharacterId, classId } = req.body;

    if(!playersCharacterId || !classId) {
      return res.status(400).json({message: 'playersCharacterId and classId are required'})
    }

    const result = await playerscharClassModels.addClassToPlayerschar(playersCharacterId, classId);
    res.status(200).json( {result, message: `Class added to Player's character ${playersCharacterId} successfully`})

  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error while registering Class into Player's character" });
  }
};

export const getPlayersCharByClassId = async (req, res) => {
  const classId = req.params.idClass;

    try {
        const [result] = await playerscharClassModels.getPlayersCharByClassId(classId);
        if (result.length > 0) {
            res.status(200).json(result, {message: `players Characters for class ${classId} fetched successfully`});
        } else {
            res.status(404).json({ message: "playersCharacters not found" });
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching playerscharacters" });
    }   
};

export const getAllPlayersCharsWithClasses = async (req, res) => {

        try {   
            const [result] = await playerscharClassModels.getAllPlayersCharsWithClasses();
        if (result.length > 0) {
            res.status(200).json(result, {message: 'playersCharacterss and Classes fetched successfully'});   
        } else {
            res.status(404).json({ message: "PlayersCharacters or Classes not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching playersCharacters and Classes" });
    }   
};