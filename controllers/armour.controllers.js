import dotenv from "dotenv";
import * as armourModels from "../models/armour.models.js";

dotenv.config();

export const createArmour = async (req, res) => {
  const { armourName, armourDesc, armourClass, armourEffect} =  req.body;
  const genreId = req.params.idGenre
  const userId = req.user.idUser;
  
  try {
    const [result] = await armourModels.addArmour(armourName,armourDesc,armourClass,armourEffect,genreId,userId);
    console.log(result);
    res.status(200).json({ message: "Armour registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering armour" });
  }
};

export const getArmour = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await armourModels.getArmour(userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Armour not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Armour" });
  }
};

export const updateArmour = async (req, res) => {
  const userId = req.user.idUser;
  const idArmour = req.params.idArmour
  const { armourName, armourDesc, armourClass, armourEffect, genreId } = req.body;

  try {
    const [result] = await armourModels.updateArmour(armourName, armourDesc, armourClass, armourEffect, genreId, userId, idArmour);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Armour not found" });
    }
    res.status(200).json({ message: "Armour datas updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating Armour datas", error });
  }
};

export const deleteArmour = async (req, res) => {
  const userId = req.user.idUser;
  const idArmour = req.params.idArmour;

  try {
    const [result] = await armourModels.deleteArmour(idArmour, userId);
     if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Armour not found" });
    }
    res.status(200).json({ message: "Armour deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting armour", error });
  }
};
