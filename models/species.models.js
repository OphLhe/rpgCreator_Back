import db from '../config/db.js'

export const addSpecies = (speciesName, speciesDesc, speciesSpeed, userId) => {
    const insertSpecies = 
    `INSERT INTO species (speciesName, speciesDesc, speciesSpeed, userId) VALUES (?, ?, ?, ?);`;
    return db.query(insertSpecies, [speciesName, speciesDesc, speciesSpeed, userId]);
}

export const getAllSpecies = (userId) => {
    const selectSpecies= 
    `SELECT idSpecies, speciesName, speciesDesc, speciesSpeed FROM species WHERE userId = ?;`; 
    return db.query(selectSpecies, [userId])
}

export const updateSpecies = (idSpecies, speciesName, speciesDesc, speciesSpeed, userId) => {
    const updateSpeciesDatas = 
    `UPDATE species SET speciesName=?, speciesDesc=?, speciesSpeed=? WHERE userId = ? AND idSpecies = ? ;`;
    return db.query (updateSpeciesDatas, [idSpecies, speciesName, speciesDesc, speciesSpeed, userId])
}

export const canDeleteSpecies =  async (idSpecies) => {
  const checkNpcPlayerscharacter = 
    `SELECT 
      (SELECT COUNT(*) FROM npc WHERE speciesId = ?) AS npcCount,
      (SELECT COUNT(*) FROM playerscharacter WHERE speciesId = ?) AS playerCount;`;
    const [result] = await db.query(checkNpcPlayerscharacter, [idSpecies, idSpecies]);
    return result[0];
}

export const deleteSpecies = (idSpecies, userId) => {
    const eraseSpecies = 
    `DELETE FROM species WHERE idspecies = ? AND userId = ?;`;
    return db.query (eraseSpecies, [idSpecies, userId])
}
