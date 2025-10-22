import db from '../config/db.js'

export const addWeapon = (weaponName, weaponType, weaponDesc, weaponEffects, weaponRange, genreId, userId) => {
    const insertWeapon = 
    `INSERT INTO weapon (
        weaponName, 
        weaponType, 
        weaponDesc, 
        weaponEffects, 
        weaponRange, 
        genreId, 
        userId) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`;
    return db.query(insertWeapon, [weaponName, weaponType, weaponDesc, weaponEffects, weaponRange, genreId, userId]);
}

export const getWeapon = (userId) => {
    const selectWeapon = 
    `SELECT
        idWeapon, 
        weaponName, 
        weaponType, 
        weaponDesc, 
        weaponEffects, 
        weaponRange, 
        genreId, 
        genreName 
    FROM weapon 
    INNER JOIN genre on genre.idGenre = weapon.genreId 
    WHERE userId = ?;`;
    return db.query(selectWeapon, [userId]);
}

export const updateWeapon = (idWeapon, weaponName, weaponType, weaponDesc, weaponEffects, weaponRange, genreId, userId) => {
    const updateWeaponDatas=
    `UPDATE WEAPON 
        SET 
            weaponName=?, 
            weaponType=?, 
            weaponDesc=?, 
            weaponEffects=?, 
            weaponRange=?, 
            genreId=? 
        WHERE userId = ? AND idWeapon = ?;`;
    return db.query(updateWeaponDatas, [idWeapon, weaponName, weaponType, weaponDesc, weaponEffects, weaponRange, genreId, userId])
}

export const deleteWeapon = (idWeapon, userId) => {
    const deleteWeapon = 
    `DELETE FROM weapon WHERE idWeapon=? AND userId=?;`;
    return db.query(deleteWeapon, [idWeapon, userId])
}