import dotenv from "dotenv";
import * as spellsModels from "../models/spells.models.js";

dotenv.config();

export const createSpells = async (req, res) => {
  const {spellsName, spellsDesc, spellsEffects, spellsRange } = req.body;
  const userId = req.user.idUser;
  const genreId = req.params.idGenre
  
  try {
    const [result] = await spellsModels.addSpells(spellsName, spellsDesc, spellsEffects, spellsRange, genreId, userId);
    console.log(result);
    res.status(200).json({ message: "Spells registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering spells" });
  }
};

export const getSpells = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await spellsModels.getSpells(userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Spells not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching spells" });
  }
};

export const updateSpells = async (req, res) => {
  const userId = req.user.idUser;
  const idSpells = req.params.id
  const { spellsName, spellsDesc, spellsEffects, spellsRange, genreId } = req.body;

  try {
    const [result] = await spellsModels.updateSpells(idSpells, spellsName, spellsDesc, spellsEffects, spellsRange, genreId, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Spells not found" });
    }
    res.status(200).json({ message: "Spells datas updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating Spells datas", error });
  }
};

export const deleteSpells = async (req, res) => {
  const userId = req.user.idUser;
  const idSpells = req.params.id;

  try {
    const [result] = await spellsModels.deleteSpells(idSpells, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Spells not found" });
    }
    res.status(200).json({ message: "Spells deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting spells", error });
  }
};
