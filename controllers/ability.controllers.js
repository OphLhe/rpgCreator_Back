import dotenv from "dotenv";
import * as abilityModels from "../models/ability.models.js";

dotenv.config();

export const getAbility= async (req, res) => {

  try {
    const [result] = await abilityModels.getAbility();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: " Ability not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Ability" });
  }
}