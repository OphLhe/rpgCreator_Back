import db from '../config/db.js'

export const addSpecies = (speciesName, speciesDesc, speciesModifier, speciesSpeed, userId) => {
    const insertSpecies = 
    'INSERT INTO species (speciesName, speciesDesc, speciesModifier, speciesSpeed) VALUES (?, ?, ?, ?) WHERE userId = ?;';
    return db.query(insertSpecies, [speciesName, speciesDesc, speciesModifier, speciesSpeed, userId]);
}

export const getAllSpecies = () => {
    const selectSpecies= 
    'SELECT idSpecies, speciesName, speciesDesc, speciesModifier, speciesSpeed FROM species WHERE userId = ?;'; 
    return db.query(selectSpecies)
}

export const updateSpecies = (speciesName, speciesDesc, speciesModifier, speciesSpeed, userId) => {
    const updateSpeciesDatas = 
    'UPDATE species SET speciesName=?, speciesDesc=?, speciesModifier=?, speciesSpeed=? WHERE userId = ?;';
    return db.query (updateSpeciesDatas, [speciesName, speciesDesc, speciesModifier, speciesSpeed, userId])
}

export const deleteSpecies = (idSpecies, userId) => {
    const eraseSpecies = 
    'DELETE FROM species WHERE idspecies = ? AND userId = ?;';
    return db.query (eraseSpecies, [idSpecies, userId])
}
