import db from '../config/db.js'

export const addSpecies = (speciesName, speciesDesc, speciesModifier, speciesSpeed) => {
    const insertSpecies = 
    'INSERT INTO species (speciesName, speciesDesc, speciesModifier, speciesSpeed) VALUES (?, ?, ?, ?);';
    return db.query(insertSpecies, [speciesName, speciesDesc, speciesModifier, speciesSpeed]);
}

export const getAllSpecies = () => {
    const selectSpecies= 
    'SELECT idSpecies, speciesName, speciesDesc, speciesModifier, speciesSpeed FROM species;'; 
    return db.query(selectSpecies)
}

export const updateSpecies = (speciesName, speciesDesc, speciesModifier, speciesSpeed, idSpecies) => {
    const updateSpeciesDatas = 
    'UPDATE species SET speciesName=?, speciesDesc=?, speciesModifier=?, speciesSpeed=? WHERE idSpecies=?;';
    return db.query (updateSpeciesDatas, [speciesName, speciesDesc, speciesModifier, speciesSpeed, idSpecies])
}

export const deleteSpecies = (idSpecies) => {
    const eraseSpecies = 
    'DELETE FROM species WHERE idspecies =?;';
    return db.query (eraseSpecies, [idSpecies])
}
