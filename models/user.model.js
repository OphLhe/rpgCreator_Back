import db from '../config/db.js'


export const addUser = (email, firstName, lastName, nickname, dateOfBirth, cryptedPassword) => {
    const insertUser = 
    'INSERT INTO user (email, firstName, lastName, nickname, dateOfBirth, password) VALUES (?, ?, ?, ?, ?, ?);';
    return db.query(insertUser, [email, firstName, lastName, nickname, dateOfBirth, cryptedPassword]);
}

export const getUser = (email, cryptedPassword) => {
    const selectUser = 
    'SELECT idUser, email, firstName, lastName, nickname, dateOfBirth, password, registerDate FROM user WHERE email = ?;';
    return db.query(selectUser, [email, cryptedPassword]);
}

export const getProfile = (userId) => {
    const selectUserDatas = 
    'SELECT idUser, email, firstName, lastName, nickname, dateOfBirth FROM user WHERE idUser = ?;';
    return db.query(selectUserDatas, [userId]);
}

export const updateProfile = (email, firstName, lastName, nickname, idUser) => {
    const updateUserDatas = 
    'UPDATE user SET email = ?, firstName = ?, lastName = ?, nickname = ? WHERE idUser = ?;';
    return db.query(updateUserDatas, [email, firstName, lastName, nickname, idUser]);
}

export const updateProfilePassword = (cryptedPassword , userId) => {
    const updateUserPassword = 
    'UPDATE user SET password = ? WHERE idUser = ?;';
    return db.query(updateUserPassword, [cryptedPassword, userId]);
}

export const getProfilePassword = (userId) => {
    const selectUserPassword = 
    'SELECT password FROM user WHERE idUser = ?;';
    return db.query(selectUserPassword, [userId]);
}

export const deleteUser = (idUser) => {
    const deleteUser= 
    'DELETE FROM user WHERE idUser = ?;';
    return db.query(deleteUser, [idUser]);
}