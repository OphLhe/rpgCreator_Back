import dotenv from "dotenv";
import * as classModels from "../models/class.models.js";

dotenv.config();

export const createClass = async (req, res) => {
  const { className, classDesc, classPv, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier} =  req.body;
  const userId = req.user.idUser;
  
  try {
    const [result] = await classModels.addClass(className, classDesc, classPv, userId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier );
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
      res.status(200).json(result, {message: 'class fetched successfully'});
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
  idClass = req.params.idClass
  const { className, classDesc, classPv, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier } = req.body;
  
  try {
    const [result] = await classModels.updateClass(idClass, className, classDesc, classPv, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier, userId);  

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class datas updated successfully" });
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