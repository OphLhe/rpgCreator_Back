import db from "../config/db.js";

export const addSkillsToClass = (skillsId, classId) => {
  const insertSkillsToClass =
    "INSERT INTO classSkills (skillsId, classId) VALUES (?, ?);";
  return db.query(insertSkillsToClass, [skillsId, classId]);
};

export const getSkillsByClassId = (classId) => {
  const selectSkillsByClassId =
    "SELECT skillsId, skillsName, abilityName, className FROM classSkills inner join  skills on classSkills.skillsId = skills.idSkills inner join ability on skills.abilityId = ability.idAbility inner join class on classSkills.classId = class.idClass WHERE classId = ? ;";
  return db.query(selectSkillsByClassId, [classId]);
};

