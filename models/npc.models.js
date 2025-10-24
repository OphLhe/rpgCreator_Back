import db from "../config/db.js";

export const addNpc = (
    npcFirstName,
    npcLastName,
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
    `INSERT INTO npc (
      npcFirstName, 
      npcLastName, 
      npcNickname, 
      npcGender, 
      npcAge, 
      npcBiography, 
      npcPhysic, 
      npcLevel, 
      speciesId, 
      userId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  return db.query(insertNpc, [
    npcFirstName,
    npcLastName,
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

export const getNpc = (userId) => {
  const selectNpc =
    `SELECT 
      idNpc, 
      npcFirstName, 
      npcLastName, 
      npcNickname, 
      npcGender, 
      npcAge, 
      npcBiography, 
      npcPhysic, 
      npcLevel, 
      speciesId, 
      speciesName 
    FROM npc 
    INNER JOIN species on species.idSpecies = npc.speciesId 
    WHERE npc.userId = ? ;`;
  return db.query(selectNpc, [userId]);
};

export const getNpcById = (idNpc, userId) => {
  const selectNpc =
    `SELECT  
    npcFirstName, 
    npcLastName, 
    npcNickname, 
    npcGender, 
    npcAge, 
    npcBiography, 
    npcPhysic, 
    npcLevel, 
    speciesId, 
    speciesName 
    FROM npc 
    INNER JOIN species on species.idSpecies = npc.speciesId 
    WHERE idNpc = ? AND npc.userId = ? ;`;
  return db.query(selectNpc, [idNpc, userId]);
};

export const updateNpc = (
    idNpc, 
    npcFirstName,
    npcLastName,
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
    `UPDATE npc 
      SET npcFirstName = ?, 
      npcLastName = ?, 
      npcNickname = ?, 
      npcGender = ?, 
      npcAge = ?, 
      npcBiography = ?, 
      npcPhysic = ?, 
      npcLevel = ?, 
      speciesId = ? 
    WHERE userId = ? and idNpc = ?;`;
  return db.query(updateNpcDatas, [
      idNpc,
      npcFirstName,
      npcLastName,
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

export const deleteNpc = (idNpc, userId) => {
  const deleteNpc = `DELETE FROM npc WHERE idNpc=? AND userId=?;`;
  return db.query(deleteNpc, [idNpc, userId]);
};