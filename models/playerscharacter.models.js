import db from "../config/db.js";

export const addPlayersCharacter = (
    firstname, 
    lastname, 
    nickname, 
    gender, 
    age, 
    biography, 
    physic, 
    level, 
    userId, 
    speciesId) => {
  const insertPlayersCharacter =
    "INSERT INTO playersCharacter (firstname, lastname, nickname, gender, age, biography, physic, level, userId, speciesId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  return db.query(insertPlayersCharacter, [firstname, 
    lastname, 
    nickname, 
    gender, 
    age, 
    biography, 
    physic, 
    level, 
    userId, 
    speciesId]);
}

export const getPlayersCharacter = (userId, nickname) => {
  const selectPlayersCharacter =
    "SELECT idPlayersCharacter, firstName, lastName, nickname, gender, age, biography, physic, level, speciesId FROM playerscharacter WHERE userId = ? ;";
  return db.query(selectPlayersCharacter, [userId, nickname]);
}

export const getPlayersCharacterById = (idPlayersCharacter, userId) => {
  const selectPlayersCharacterById =
    "SELECT idPlayersCharacter, firstName, lastName, nickname, gender, age, biography, physic, level, speciesId FROM playerscharacter WHERE idPlayersCharacter = ? AND userId = ? ;";              
    return db.query(selectPlayersCharacterById, [idPlayersCharacter, userId]);
}

export const updatePlayersCharacter = (firstname, lastname, nickname, gender, age, biography, physic, level, speciesId, idPlayersCharacter, userId) => {        
    const updatePlayersCharacterById =
    "UPDATE playerscharacter SET firstname = ?, lastname = ?, nickname = ?, gender = ?, age = ?, biography = ?, physic = ?, level = ?, speciesId = ? WHERE idPlayersCharacter = ? AND userId = ?;";
    return db.query(updatePlayersCharacterById, [firstname, lastname, nickname, gender, age, biography, physic, level, speciesId, idPlayersCharacter, userId]);
}

export const deletePlayersCharacter = (idPlayersCharacter, userId) => {
    const deletePlayersCharacterById =
    "DELETE FROM playerscharacter WHERE idPlayersCharacter = ? AND userId = ?;";
    return db.query(deletePlayersCharacterById, [idPlayersCharacter, userId]);
}