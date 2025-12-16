import dotenv from "dotenv";
import * as speciesModels from "../models/species.models.js";

dotenv.config();

export const createSpecies = async (req, res) => {
  const { speciesName, speciesDesc, speciesSpeed } = req.body;
  const userId = req.user.idUser;

  if (!speciesName || !speciesDesc || !speciesSpeed) {
    return res
      .status(400)
      .json({
        message:
          "The following fileds are required: speciesName, speciesDesc, speciesSpeed",
      });
  }

  try {
    const [result] = await speciesModels.addSpecies(
      speciesName,
      speciesDesc,
      speciesSpeed,
      userId
    );
    console.log(result);
    res.status(200).json({ message: "Species registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering species" });
  }
};

export const getSpecies = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await speciesModels.getAllSpecies(userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Species not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching species" });
  }
};

export const updateSpeciesDatas = async (req, res) => {
  const userId = req.user.idUser;
  const idSpecies = req.params.idSpecies;
  const { speciesName, speciesDesc, speciesSpeed } = req.body;

  try {
    const [result] = await speciesModels.updateSpecies(
      speciesName,
      speciesDesc,
      speciesSpeed,
      userId,
      idSpecies
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Species not found" });
    }
    res.status(200).json({ message: "Species datas updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating species datas", error });
  }
};

export const deleteSpecies = async (req, res) => {
  const idSpecies = req.params.idSpecies;
  const userId = req.user.idUser;

  try {
    const { npcCount, playerCount } = await speciesModels.canDeleteSpecies(idSpecies);
    console.log(npcCount, playerCount);
    if (npcCount > 0 || playerCount > 0) {
      return res
        .status(403)
        .json({
          message: `impossible de supprimer cette espèce car elle est utilisée par un ou plusieurs personnages (${npcCount} PNJ et ${playerCount} Personnages Joueurs).`,
        });
    }

    const [result] = await speciesModels.deleteSpecies(idSpecies, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Spells not found" });
    }
    res.status(200).json({ message: "Specie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting specie", error });
  }
};
