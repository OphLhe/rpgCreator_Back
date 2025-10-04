import db from '../config/db.js'

export const addArmour = (armourName, armourDesc, armourClass, armourEffect, genreId, userId) => {
    const insertArmour = 
    'INSERT INTO armour (armourName, armourDesc, armourClass, armourEffect, genreId, userId) VALUES (?, ?, ?, ?, ?, ?);';
    return db.query(insertArmour, [armourName, armourDesc, armourClass, armourEffect, genreId, userId]);
}

export const getArmour = (userId) => {
    const selectArmour = 
    'SELECT idArmour, armourName, armourDesc, armourClass, armourEffect, genreId, genreName FROM armour INNER JOIN genre on genre.idGenre = armour.genreId WHERE userId = ? ;';
    return db.query(selectArmour, [userId]);
}

export const updateArmour = (idArmour, armourName, armourDesc, armourClass, armourEffect, genreId, userId) => {
    const updateArmourDatas=
    'UPDATE armour SET armourName=?, armourDesc=?, armourClass=?, armourEffect=?, genreId=? WHERE userId = ? and idArmour = ?;';
    return db.query(updateArmourDatas, [idArmour, armourName, armourDesc, armourClass, armourEffect, genreId, userId])
}

export const deleteArmour = (idArmour, userId) => {
    const deleteArmour = 
    'DELETE FROM armour WHERE idArmour=? AND userId=?;';
    return db.query(deleteArmour, [idArmour, userId])
}