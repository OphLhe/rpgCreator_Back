import db from '../config/db.js'

export const addSpells = (spellsName, spellsDesc, spellsEffects, spellsRange, genreId, userId) => {
    const insertSpells = 
    'INSERT INTO spells (spellsName, spellsDesc, spellsEffects, spellsRange, genreId, userId) VALUES (?, ?, ?, ?, ?, ?);';
    return db.query(insertSpells, [spellsName, spellsDesc, spellsEffects, spellsRange, genreId, userId]);
}

export const getSpells = (userId) => {
    const selectSpells = 
    'SELECT spellsName, spellsDesc, spellsEffects, spellsRange, genreId FROM spells WHERE userId = ?;';
    return db.query(selectSpells, [userId]);
}

export const updateSpells = (spellsName, spellsDesc, spellsEffects, spellsRange, genreId, userId) => {
    const updateSpellsDatas=
    'UPDATE spells SET spellsName=?, spellsDesc=?, spellsEffects=?, spellsRange=?, genreId=? WHERE userId = ?;';
    return db.query(updateSpellsDatas, [spellsName, spellsDesc, spellsEffects, spellsRange, genreId, userId])
}

export const deleteSpells = (idSpells, userId) => {
    const deleteSpells = 
    'DELETE FROM spells WHERE idSpells=? AND userId=?;';
    return db.query(deleteSpells, [idSpells, userId])
}