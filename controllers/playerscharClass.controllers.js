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
  const idPlayersCharClass = req.params.idPlayerscharClass;
  const { classId, 
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
    chaModifier } = req.body;

  console.log("Valeurs reçues :", {
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
    chaModifier 
  });

  try {
    const [result] = await playerscharClassModels.updateClassOnPlayersChar(
      idPlayersCharClass, 
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

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Player's character class does not exist" });
    }
    const [updatedClasses] = await playerscharClassModels.getPlayersCharById(idPlayersCharClass);
      res.status(200).json(updatedClasses[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error while updating player's character class" });
    }
}