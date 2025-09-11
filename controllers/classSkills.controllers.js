import dotenv from "dotenv";
import * as classSkillsModels from "../models/classSkills.models.js";

dotenv.config();

export const createSkillsToClass = async (req, res) => {

  try {
    const classId = req.params.idClass;
    const { skillsId } = req.body;

    if (!Array.isArray(skillsId)) {
      return res.status(400).json({ message: "skillsId doit être un tableau" });
    }
 
    const [existingSkills] = await classSkillsModels.getSkillsByClassId(classId);
    console.log(existingSkills);
    
    const existingSkillsIds = existingSkills.map(skill => skill.skillsId)
    console.log(existingSkillsIds);
    
      
    const results = []
    const errors = []

    for (const skillId of skillsId) {
      if (existingSkillsIds.includes(skillId)) {
        errors.push(`The ability ${skillId} already exist in class ${classId}.`)
      } else {
        const [result] = await classSkillsModels.addSkillsToClass(skillId, classId);
        results.push(result)
      }
    }

    if(errors.length > 0){
        return res.status(400).json({errors})
    }

    res.status(200).json({results, message: `Ability added to class ${classId} successfully`})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering ability into class" });
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