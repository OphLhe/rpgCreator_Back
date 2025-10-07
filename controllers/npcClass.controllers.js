import dotenv from "dotenv";
import * as npcClassModels from "../models/npcClass.models.js";

dotenv.config();

export const createClassOnNpc = async (req, res) => {

  try {
    const { npcId, classId } = req.body;

    if(!npcId || !classId) {
      return res.status(400).json({message: 'npcId and classId are required'})
    }

    const existingAssociation = await npcClassModels.getAllNpcsWithClasses(npcId, classId);
    if (existingAssociation.length > 0) {
      return res.status(409).json({ message: "This class is already associated with the NPC" });
    }

    const result = await npcClassModels.addClassToNPC(npcId, classId);
    res.status(200).json( {result, message: `Class added to NPC ${npcId} successfully`})

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