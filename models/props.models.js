import db from '../config/db.js'

export const addProps = (propsName, propsDesc, propsEffect, genreId, userId) => {
    const insertProps = 
    'INSERT INTO props (propsName, propsDesc, propsEffect, genreId, userId) VALUES (?, ?, ?, ?, ?);';
    return db.query(insertProps, [propsName, propsDesc, propsEffect, genreId, userId]);
}

export const getProps = (userId) => {
    const selectProps = 
    'SELECT propsName, propsDesc, propsEffect, genreId, genreName FROM props INNER JOIN genre on genre.idGenre = props.genreId WHERE userId = ?;';
    return db.query(selectProps, [userId]);
}

export const updateProps = (idProps, propsName, propsDesc, propsEffect, genreId, userId) => {
    const updatePropsDatas=
    'UPDATE props SET propsName=?, propsDesc=?, propsEffect=?, genreId=? WHERE userId = ? AND idProps = ?;';
    return db.query(updatePropsDatas, [idProps, propsName, propsDesc, propsEffect, genreId, userId])
}

export const deleteProps = (idProps, userId) => {
    const deleteProps = 
    'DELETE FROM props WHERE idProps=? AND userId=?;';
    return db.query(deleteProps, [idProps, userId])
}