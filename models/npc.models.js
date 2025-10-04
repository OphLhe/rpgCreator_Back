import db from "../config/db.js";

export const addNpc = (
    npcFirstname,
    npcLastname,
    npcNickname,
    npcGender,
    npcAge,
    npcBiography,
    npcPhysic,
    npcLevel,
    speciesId,
    userId
) => {
  const insertNpc =
    `INSERT INTO npc (npcFirstname, npcLastname, npcNickname, npcGender, npcAge, npcBiography, npcPhysic, npcLevel, speciesId, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  return db.query(insertNpc, [
    npcFirstname,
    npcLastname,
    npcNickname,
    npcGender,
    npcAge,
    npcBiography,
    npcPhysic,
    npcLevel,
    speciesId,
    userId,
  ]);
};

export const getNpc = (userId, npcNickname) => {
  const selectNpc =
    "SELECT idNpc, npcFirstname,npcLastname,npcNickname,npcGender,npcAge,npcBiography,npcPhysic,npcLevel,speciesId FROM npc WHERE userId = ? ;";
  return db.query(selectNpc, [userId, npcNickname]);
};

export const getNpcById = (idNpc) => {
  const selectNpc =
    "SELECT  npcFirstname,npcLastname,npcNickname,npcGender,npcAge,npcBiography,npcPhysic,npcLevel,speciesId FROM npc WHERE idNpc = ? ;";
  return db.query(selectNpc, [idNpc]);
};

export const updateNpc = (
    idNpc, 
    npcFirstname,
    npcLastname,
    npcNickname,
    npcGender,
    npcAge,
    npcBiography,
    npcPhysic,
    npcLevel,
    speciesId,
    userId
) => {
  const updateNpcDatas =
    "UPDATE npc SET npcFirstname = ?, npcLastname = ?, npcNickname = ?, npcGender = ?, npcAge = ?, npcBiography = ?, npcPhysic = ?, npcLevel = ?, speciesId = ? WHERE userId = ? and idNpc = ?;";
  return db.query(updateNpcDatas, [
      npcFirstname,
      npcLastname,
      npcNickname,
      npcGender,
      npcAge,
      npcBiography,
      npcPhysic,
      npcLevel,
      speciesId,
      userId,
      idNpc
  ]);
};

export const deleteNpc = (idNpc, userId) => {
  const deleteNpc = "DELETE FROM npc WHERE idNpc=? AND userId=?;";
  return db.query(deleteNpc, [idNpc, userId]);
};