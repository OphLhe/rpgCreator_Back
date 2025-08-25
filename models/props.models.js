import db from '../config/db.js'

export const addProps = (propsName, propsDesc, propsEffect, genreId, userId) => {
    const insertProps = 
    'INSERT INTO props (propsName, propsDesc, propsEffect, genreId, userId) VALUES (?, ?, ?, ?, ?);';
    return db.query(insertProps, [propsName, propsDesc, propsEffect, genreId, userId]);
}

export const getProps = (userId) => {
    const selectProps = 
    'SELECT propsName, propsDesc, propsEffect, genreId FROM props WHERE userId = ?;';
    return db.query(selectProps, [userId]);
}

export const updateProps = (propsName, propsDesc, propsEffect, genreId, userId) => {
    const updatePropsDatas=
    'UPDATE props SET propsName=?, propsDesc=?, propsEffect=?, genreId=? WHERE userId = ?;';
    return db.query(updatePropsDatas, [propsName, propsDesc, propsEffect, genreId, userId])
}

export const deleteProps = (idProps, userId) => {
    const deleteProps = 
    'DELETE FROM props WHERE idProps=? AND userId=?;';
    return db.query(deleteProps, [idProps, userId])
}