import db from "../config/db.js";

export const addSkillsToClass = (skillsIds, classId) => {
  const values = skillsIds.map(skillsId => [skillsId, classId])
  const insertSkillsToClass =
    "INSERT INTO classSkills (skillsId, classId) VALUES ?;";
  return db.query(insertSkillsToClass, [values]);
};

export const getSkillsByClassId = (classId) => {
  const selectSkillsByClassId =
    "SELECT skillsId, skillsName, abilityName, className FROM classSkills inner join  skills on classSkills.skillsId = skills.idSkills inner join ability on skills.abilityId = ability.idAbility inner join class on classSkills.classId = class.idClass WHERE classId = ? ;";
  return db.query(selectSkillsByClassId, [classId]);
};

export const getClassAndSkills = () => {
  const selectClassAndSkills =
    `SELECT idClass, className, classPv, classDesc, JSON_ARRAYAGG(JSON_OBJECT('idSkills', skills.idSkills, 'skillsName', skills.skillsName, 'abilityName', ability.abilityName)) AS skills  
    FROM class
    LEFT JOIN classSkills ON class.idClass = classSkills.classId
    LEFT JOIN skills ON classSkills.skillsId = skills.idSkills      
    LEFT JOIN ability ON skills.abilityId = ability.idAbility
    GROUP BY class.idClass;`;
  return db.query(selectClassAndSkills);
} 