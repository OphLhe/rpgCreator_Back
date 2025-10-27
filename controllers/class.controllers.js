import dotenv from "dotenv";
import * as classModels from "../models/class.models.js";
import * as classSkillsModels from '../models/classSkills.models.js'

dotenv.config();

export const createClass = async (req, res) => {
  const { className, classDesc, classPv } =  req.body;
  const userId = req.user.idUser;
  
  if (!className || !classDesc || !classPv) {
    return res.status(400).json({ message: "The following field are required: className, classDesc, classPv" });
  } 

  try {
    const [result] = await classModels.addClass(className, classDesc, classPv, userId );
    res.status(200).json(result, { message: "Class registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering class" });
  }
};

export const getClass = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await classModels.getClass(userId);
    if (result.length > 0) {
      res.status(200).json(result, {message: 'Class fetched successfully'});
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Class" });
  }
};

export const getClassById = async (req, res) => {
  const userId = req.user.idUser;
  const idClass= req.params.idClass

  try {
    const [result] = await classModels.getClassById(idClass, userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Class" });
  }
};

export const updateClass = async (req, res) => {
  const userId = req.user.idUser;
  const idClass = req.params.idClass;
  const { className, classDesc, classPv, skills } = req.body;
  console.log(idClass);
  
  try {
    const [result] = await classModels.updateClass(className, classDesc, classPv, userId, idClass );
    
     if (skills && Array.isArray(skills)) {
      await classSkillsModels.updateSkillsToClass(skills, idClass);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    const [updatedClass] = await classModels.getClassById(userId, idClass)
    res.status(200).json(updatedClass[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating Class datas", error });
  }
};

export const deleteClass = async (req, res) => {
  const userId = req.user.idUser;
  const idClass = req.params.idClass;

  try {
    const {npcCount, playerCount} = await classModels.canDeleteClass(idClass)
    console.log(npcCount, playerCount);
    if(npcCount > 0 || playerCount > 0){
      return res.status(403).json({message : `Cannot delete this class for it is already used for a npc or a player's character`})
    }

    const [result] = await classModels.deleteClass(idClass, userId);
     if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting class", error });
  }
};