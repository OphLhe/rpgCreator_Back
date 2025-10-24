import dotenv from "dotenv";
import * as playerscharClassModels from "../models/playerscharClass.models.js";
import * as playerscharClassSkillsModels from "../models/playerscharClassSkills.models.js";

dotenv.config();

export const createClassOnPlayersChar = async (req, res) => {

  try {
    const { playersCharacterId, 
      classId ,
      skills,
      strengthStat, 
      dexterityStat, 
      constitutionStat, 
      intelligenceStat, 
      wisdomStat, 
      charismaStat, 
      strModifier, 
      dexModifier, 
      conModifier, 
      intModifier, 
      wisModifier, 
      chaModifier} = req.body;
    
      const [result] = await playerscharClassModels.addClassToPlayerschar(
        playersCharacterId, 
        classId,
        strengthStat, 
        dexterityStat, 
        constitutionStat, 
        intelligenceStat, 
        wisdomStat, 
        charismaStat, 
        strModifier, 
        dexModifier, 
        conModifier, 
        intModifier, 
        wisModifier, 
        chaModifier);

      for (const skillsId of skills){
        await playerscharClassSkillsModels.addPlayerscharClassSkill(result.insertId, skillsId);
      }
      res.status(200).json({data: result, message: `Class added to Player's character ${playersCharacterId} successfully`})
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error while registering Class into Player's character" });
  }
};

export const getPlayersCharById = async (req, res) => {
  const playersCharacterId = req.params.idPlayersCharacter;

    try {
        const [result] = await playerscharClassModels.getPlayersCharById(playersCharacterId);
        if (result.length > 0) {
            res.status(200).json({result, message: `players Characters ${playersCharacterId} fetched successfully`});
        } else {
            res.status(404).json({ message: "playersCharacters not found" });
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching playerscharacters" });
    }   
};

export const getAllPlayersCharWithClasses = async (req, res) => {
  const userId = req.user.idUser;
    try {   
      const [result] = await playerscharClassModels.getAllPlayersCharsWithClasses(userId);
      if (result.length > 0) {
        res.status(200).json({result, message: 'playersCharacters and Classes fetched successfully'});   
      }else {
        res.status(404).json({ message: "PlayersCharacters or Classes not found" });
      }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching playersCharacters and Classes" });
    }   
}; 

export const updateClassOnPlayersChar = async (req, res) => {
  const playersCharClassId = req.params.idPlayersCharClass;
  
    const { classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier } = req.body;
    
      try {
  
          const [result] = await playerscharClassModels.updateClassOnPlayersChar(playersCharClassId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier);
          res.status(200).json( result, {message: `PlayersChar Class updated successfully` });
  
      } catch (error) {
          console.error("Error updating PlayersCharClass association:", error);
          res.status(500).json({ message: "Error while updating PlayersChar-Class association" });
      }   
}