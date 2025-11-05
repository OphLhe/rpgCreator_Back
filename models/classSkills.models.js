import db from "../config/db.js";

export const addSkillsToClass = (skillsIds, classId) => {
  const values = skillsIds.map(skillsId => [skillsId, classId])
  const insertSkillsToClass =
    `INSERT INTO classSkills (skillsId, classId) VALUES ?;`;
  return db.query(insertSkillsToClass, [values]);
};

export const getClassSkillsById = (classId, userId) => {
  const selectclassSkillsById =
    `SELECT idClass, 
    className, 
    classPv, 
    classDesc, 
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'idSkills', skills.idSkills, 
        'skillsName', skills.skillsName, 
        'skillsDesc', skills.skillsDesc, 
        'abilityName', ability.abilityName
      )
    ) AS skills  
    FROM class
    LEFT JOIN classSkills ON class.idClass = classSkills.classId
    LEFT JOIN skills ON classSkills.skillsId = skills.idSkills      
    LEFT JOIN ability ON skills.abilityId = ability.idAbility
    WHERE classId = ? AND class.userId = ?
    GROUP BY class.idClass;`;
  return db.query(selectclassSkillsById, [classId, userId]);
};

export const getClassAndSkills = (userId) => {
  const selectClassAndSkills =
    `SELECT idClass, 
    className, 
    classPv, 
    classDesc, 
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'idSkills', skills.idSkills, 
        'skillsName', skills.skillsName, 
        'skillsDesc', skills.skillsDesc, 
        'abilityName', ability.abilityName
      )
    ) AS skills  
    FROM class
    LEFT JOIN classSkills ON class.idClass = classSkills.classId
    LEFT JOIN skills ON classSkills.skillsId = skills.idSkills      
    LEFT JOIN ability ON skills.abilityId = ability.idAbility
    WHERE class.userId = ? 
    GROUP BY class.idClass;`;
  return db.query(selectClassAndSkills, [userId]);
}; 

export const updateSkillsToClass = async (skills, classId) => {

  const deleteExistingSkills = `DELETE FROM classSkills WHERE classId = ?;`;
  await db.query(deleteExistingSkills, [classId]);

  const values = skills.map(skill => [skill.idSkills, classId])
  const insertNewSkills =
    `INSERT INTO classSkills (skillsId, classId) VALUES ?;`;
  return db.query(insertNewSkills, [values]);
};