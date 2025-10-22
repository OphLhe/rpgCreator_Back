import dotenv from "dotenv";
import * as npcClassModels from "../models/npcClass.models.js";
import * as npcClassSkillsModels from "../models/npcClassSkills.models.js";

dotenv.config();

export const createClassOnNpc = async (req, res) => {

  try {
    const { npcId, classId, skills, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier } = req.body;

      const [result] = await npcClassModels.addClassToNPC(npcId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier);

      for (const skillId of skills){
        await npcClassSkillsModels.addNpcClassSkill(result.insertId, skillId);
      }
      res.status(200).json( {result, message: `Class ${classId} added to NPC ${npcId} successfully`})
    } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error while registering Class into NPC" });
  }
};

export const getNpcByClassId = async (req, res) => {
  const classId = req.params.idClass;

    try {
        const [result] = await npcClassModels.getNpcByClassId(classId);
        if (result.length > 0) {
            res.status(200).json(result, {message: `NPCs for class ${classId} fetched successfully`});
        } else {
            res.status(404).json({ message: "NPCs not found" });
        }   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching NPCs" });
    }   
};

export const getAllNpcsWithClasses = async (req, res) => {
  const userId = req.user.idUser;
    try {   
      const [result] = await npcClassModels.getAllNpcsWithClasses(userId);
      if (result.length > 0) {
        res.status(200).json({result, message: 'NPCs and Classes fetched successfully'});   
      } else {
        res.status(404).json({ message: "NPCs or Classes not found" });
      }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching NPCs and Classes" });
    }   
};

export const updateNpcClass = async (req, res) => {

  const npcClassId = req.params.idNpcClass;
 

  const { classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier } = req.body;
  
    try {

        const [result] = await npcClassModels.updateNpcClass(npcClassId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier);
        res.status(200).json( result, {message: `Npc Class updated successfully` });

    } catch (error) {
        console.error("Error updating NPC-Class association:", error);
        res.status(500).json({ message: "Error while updating NPC-Class association" });
    }   
};