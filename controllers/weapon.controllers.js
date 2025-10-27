import dotenv from "dotenv";
import * as weaponModels from "../models/weapon.models.js";

dotenv.config();

export const createWeapon = async (req, res) => {
  const { weaponName, weaponType, weaponDesc, weaponEffects, weaponRange } = req.body;
  const userId = req.user.idUser;
  const genreId = req.params.idGenre;

  if (!weaponName || !weaponType || !weaponDesc || !weaponRange) {
    return res.status(400).json
    ({ message: "The following fields are requires: weaponName, weaponType, weaponDesc, weaponRange" });
  }

  try {
    const [result] = await weaponModels.addWeapon(weaponName, weaponType, weaponDesc, weaponEffects, weaponRange, genreId, userId);
    console.log(result);
    res.status(200).json({ message: "weapon registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering weapon" });
  }
};

export const getWeapon = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await weaponModels.getWeapon(userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "weapon not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching weapon" });
  }
};

export const getWeaponById = async (req, res) => {
  const idWeapon = req.params.idWeapon
  const userId = req.user.idUser;

  try {
    const [result] = await weaponModels.getWeaponById(idWeapon, userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "weapon not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching weapon" });
  }
};

export const updateWeapon = async (req, res) => {
  const userId = req.user.idUser;
  const idWeapon = req.params.idWeapon
  const { weaponName, weaponType, weaponDesc, weaponEffects, weaponRange,} = req.body;

  try {
    const [result] = await weaponModels.updateWeapon(weaponName, weaponType, weaponDesc, weaponEffects, weaponRange, userId, idWeapon);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "weapon not found" });
    }
     const [updatedWeapon] = await weaponModels.getWeaponById( userId, idWeapon)
     console.log("Updated weapon:", updatedWeapon[0]);
        res.status(200).json(updatedWeapon[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating weapon datas", error });
  }
};

export const deleteWeapon = async (req, res) => {
  const userId = req.user.idUser;
  const idWeapon = req.params.idWeapon;

  try {
    const [result] = await weaponModels.deleteWeapon(idWeapon, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "weapon not found" });
    }
    res.status(200).json({ message: "weapon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting weapon", error });
  }
};
