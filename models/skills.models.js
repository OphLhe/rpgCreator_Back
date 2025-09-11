import db from "../config/db.js";

export const addSkills = (skillsName, skillsDesc, userId, abilityId) => {
  const insertSkills =
    "INSERT INTO skills (skillsName, skillsDesc, userId, abilityId) VALUES (?, ?, ?, ?);";
  return db.query(insertSkills, [skillsName, skillsDesc, userId, abilityId]);
};

export const getSkills = (userId) => {
  const selectSkills =
    "SELECT skillsName, skillsDesc, abilityName FROM skills INNER JOIN ability on ability.idAbility = skills.abilityId WHERE userId = ? ;";
  return db.query(selectSkills, [userId]);
};

export const getSkillsById = (idSkills) => {
  const selectSkillsById= 
  `SELECT skillsName, skillsDesc, abilityName FROM skills INNER JOIN ability on ability.idAbility = skills.abilityId WHERE idSkills = ?;`;
  return db.query(selectSkillsById, [idSkills])
}

export const updateSkills = (idSkills, skillsName, skillsDesc, userId) => {
  const updateSkillsDatas =
    "UPDATE skills SET skillsName=?, skillsDesc=? WHERE userId = ? AND idSkills = ?;";
  return db.query(updateSkillsDatas, [idSkills, skillsName, skillsDesc, userId]);
};

export const deleteSkills = (idSkills, userId) => {
  const deleteSkills = "DELETE FROM skills WHERE idSkills=? AND userId=?;";
  return db.query(deleteSkills, [idSkills, userId]);
};