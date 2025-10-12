import dotenv from "dotenv";
import * as npcClassModels from "../models/npcClass.models.js";

dotenv.config();

export const checkNpcClassAssociation = async (req, res) => {
  const idNpc = req.params.npcId;
  const idClass = req.params.classId;
  
    try {
        const [result] = await npcClassModels.getNpcClassAssociation(idNpc, idClass);
        if (result.length > 0) {
            return res.status(200).json({ message: `NPC ${idNpc} already has class ${idClass}` });
        } else {
            return res.status(400).json({ message: `NPC ${idNpc} does not have class ${idClass}` });
        }     
    } catch (error) {
        console.error("Error checking NPC-Class association:", error);
        throw error;
    }
};

export const createClassOnNpc = async (req, res) => {

  try {
    const { npcId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier } = req.body;

    const existingAssociation = await npcClassModels.getNpcClassAssociation(npcId, classId);

    if (existingAssociation[0].length > 0) {
      return res.status(400).json({ message: `NPC ${npcId} already has class ${classId}` });
    }else{
      const result = await npcClassModels.addClassToNPC(npcId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier);
      res.status(200).json( {result, message: `Class added to NPC ${npcId} successfully`})
    }

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

        try {   
            const [result] = await npcClassModels.getAllNpcsWithClasses();
        if (result.length > 0) {
            res.status(200).json(result, {message: 'NPCs and Classes fetched successfully'});   
        } else {
            res.status(404).json({ message: "NPCs or Classes not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching NPCs and Classes" });
    }   
};