import dotenv from "dotenv";
import * as classSkillsModels from "../models/classSkills.models.js";

dotenv.config();

export const createSkillsToClass = async (req, res) => {

  try {
    const { skillsIds, classId } = req.body;
    
    if (!Array.isArray(skillsIds) || !classId) {
      return res.status(400).json({message: 'skillsIds must be an array and classId is required'})
    }

      const result = await classSkillsModels.addSkillsToClass(skillsIds, classId);
      res.status(200).json(result, {message: `Skill added to class ${classId} successfully`})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering Skill into class" });
  }
};

export const getSkillsByClassId = async (req, res) => {
  const classId = req.params.idClass;

  try {
    const [result] = await classSkillsModels.getSkillsByClassId(classId);
    if (result.length > 0) {
      res.status(200).json(result, {message: `Skills for class ${classId} fetched successfully`});
    } else {
      res.status(404).json({ message: "Skills not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Class" });
  }
};

export const getClassAndSkills = async (req, res) => {
  try {
    const [result] = await classSkillsModels.getClassAndSkills();
    if (result.length > 0) {
      res.status(200).json(result, {message: 'Classes and Skills fetched successfully'});
    } else {
      res.status(404).json({ message: "Classes or Skills not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Classes and Skills" });
  }
};

export const updateSkillsToClass = async (req, res) => {
  const classId = req.params.idClass;
  const { skillsIds } = req.body;  

  try {
      const result = await classSkillsModels.updateSkillsToClass(skillsIds, classId);
      res.status(200).json(result, {message: `Skills updated to class ${classId} successfully`})  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating Skills into class" });
  }
};