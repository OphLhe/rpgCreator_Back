import dotenv from "dotenv";
import * as playerscharClassModels from "../models/playerscharClass.models.js";

dotenv.config();

// export const checkPlayersCharClassAssociation = async (req, res) => {
//   const idPlayersCharacter = req.params.playersCharacterId;
//   const idClass = req.params.classId;
  
//     try {
//         const [result] = await playerscharClassModels.getplayersCharClassAssociation(idPlayersCharacter, idClass);
//         if (result.length > 0) {
//             return res.status(400).json({ message: `Player's Character ${idPlayersCharacter} already has class ${idClass}` });
//         } else {
//             return res.status(200).json({ message: `Player's Character ${idPlayersCharacter} does not have class ${idClass}` });
//         }     
//     } catch (error) {
//         console.error("Error checking PlayersCharacter-Class association:", error);
//         throw error;
//     }
// };

export const createClassOnPlayersChar = async (req, res) => {

  try {
    const { playersCharacterId, classId ,strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier} = req.body;
    
      const [result] = await playerscharClassModels.addClassToPlayerschar(playersCharacterId, classId,strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier);
      res.status(200).json({
        data: result,
        message: `Class added to Player's character ${playersCharacterId} successfully`})
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
            res.status(200).json({
              data: result,
              message: `players Characters for class ${classId} fetched successfully`});
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
            res.status(200).json({
              data: result,
              message: 'playersCharacters and Classes fetched successfully'});   
        } else {
            res.status(404).json({ message: "PlayersCharacters or Classes not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching playersCharacters and Classes" });
    }   
};

export const updateClassOnPlayersChar = async (req, res) => {
  const playersCharClassId = req.params.idPlayersCharacterClass;
  
    const { classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier } = req.body;
    
      try {
  
          const [result] = await playerscharClassModels.updateClassOnPlayersChar(playersCharClassId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier);
          res.status(200).json( result, {message: `PlayersChar Class updated successfully` });
  
      } catch (error) {
          console.error("Error updating PlayersCharClass association:", error);
          res.status(500).json({ message: "Error while updating PlayersChar-Class association" });
      }   
}