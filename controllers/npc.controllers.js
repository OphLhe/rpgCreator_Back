import dotenv from "dotenv";
import * as npcModels from "../models/npc.models.js";

dotenv.config();


export const createNpc = async (req, res) => {

  const { npcFirstname, npcLastname, npcNickname, npcGender, npcAge, npcBiography, npcPhysic, npcLevel, speciesId } =  req.body;
  const userId = req.user.idUser;
  
  try {

    const [existingNpc] = await npcModels.getNpc(npcNickname);
    
    if (existingNpc && existingNpc.length > 0) {
      return res.status(400).json({ message: "Npc NickName already exists" });
    }else{
        const [result] = await npcModels.addNpc(npcFirstname, npcLastname, npcNickname, npcGender, npcAge, npcBiography, npcPhysic, npcLevel, speciesId, userId )
        res.status(200).json(result, { message: "Npc registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering npc" });
  }
};

export const getNpc = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await npcModels.getNpc(userId);
    if (result.length > 0) {
      res.status(200).json(result, {message: 'npc fetched successfully'});
    } else {
      res.status(404).json({ message: "Npc not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Npc" });
  }
};

export const getNpcById = async (req, res) => {
  const userId = req.user.idUser;
  const idNpc= req.params.idNpc

  try {
    const [result] = await npcModels.getNpcById(idNpc, userId);
    if (result.length > 0) {
      res.status(200).json(result, {message: `npc ${idNpc} fetched successfully`});
    } else {
      res.status(404).json({ message: "Npc not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Npc" });
  }
};

export const updateNpc = async (req, res) => {
  const userId = req.user.idUser;
  const idNpc = req.params.idNpc
  const { npcFirstname, npcLastname, npcNickname, npcGender, npcAge, npcBiography, npcPhysic, npcLevel, speciesId } = req.body;
  
  try {
    const [result] = await npcModels.updateNpc(idNpc, npcFirstname, npcLastname, npcNickname, npcGender, npcAge, npcBiography, npcPhysic, npcLevel, speciesId, userId);  

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Npc not found" });
    }
    res.status(200).json({ message: "Npc datas updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error while updating Npc datas", error });
  }
};

export const deleteNpc = async (req, res) => {
  const userId = req.user.idUser;
  const idNpc = req.params.idNpc;

  try {
    const [result] = await npcModels.deleteNpc(idNpc, userId);
     if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Npc not found" });
    }
    res.status(200).json({ message: "Npc deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting Npc", error });
  }
};