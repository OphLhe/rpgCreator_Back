import dotenv from "dotenv";
import * as skillsModels from "../models/skills.models.js";

dotenv.config();

export const createSkills = async (req, res) => {
  const { skillsName, skillsDesc, abilityId } = req.body;
  const userId = req.user.idUser;

  try {
    const [result] = await skillsModels.addSkills(skillsName, skillsDesc, userId, abilityId);
    console.log(result);
    res.status(200).json({ message: "Skills registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering skills" });
  }
};

export const getSkills = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await skillsModels.getSkills(userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Skills not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Skills" });
  }
};

export const getSkillsById = async (req, res) => {
  const userId = req.user.idUser;
  const idSkills = req.params.idSkills;

  try {
    const [result] = await skillsModels.getSkillsById(idSkills, userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Skills not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Skills" });
  }
};

export const updateSkills = async (req, res) => {
  const userId = req.user.idUser;
  const idSkills = req.params.idSkills;
  const { skillsName, skillsDesc } = req.body;

  try {
    const [result] = await skillsModels.updateSkills(skillsName, skillsDesc, userId, idSkills);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Skills not found" });
    }
    res.status(200).json({ message: "Skills datas updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating Skills datas", error });
  }
};

export const deleteSkills = async (req, res) => {
  const userId = req.user.idUser;
  const idSkills = req.params.idSkills;

  try {
    const [result] = await skillsModels.deleteSkills(idSkills, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Skills not found" });
    }
    res.status(200).json({ message: "Skills deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting Skills", error });
  }
};