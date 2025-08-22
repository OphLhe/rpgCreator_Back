import db from '../config/db.js'

export const addSpecies = (speciesName, speciesDesc, speciesSpeed, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier, userId) => {
    const insertSpecies = 
    'INSERT INTO species (speciesName, speciesDesc, speciesSpeed, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    return db.query(insertSpecies, [speciesName, speciesDesc, speciesSpeed, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier, userId]);
}

export const getAllSpecies = (userId) => {
    const selectSpecies= 
    'SELECT idSpecies, speciesName, speciesDesc, speciesSpeed, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier FROM species WHERE userId = ?;'; 
    return db.query(selectSpecies, [userId])
}

export const updateSpecies = (speciesName, speciesDesc, speciesSpeed, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier, userId) => {
    const updateSpeciesDatas = 
    'UPDATE species SET speciesName=?, speciesDesc=?, speciesSpeed=?, strModifier=?, dexModifier=?, conModifier=?, intModifier=?, wisModifier=?, chaModifier=? WHERE userId = ?;';
    return db.query (updateSpeciesDatas, [speciesName, speciesDesc, speciesSpeed, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier, userId])
}

export const deleteSpecies = (idSpecies, userId) => {
    const eraseSpecies = 
    'DELETE FROM species WHERE idspecies = ? AND userId = ?;';
    return db.query (eraseSpecies, [idSpecies, userId])
}
