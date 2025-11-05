import db from "../config/db.js";

export const addClass = (className, classDesc, classPv, userId) => {
  const insertClass =
    "INSERT INTO class (className, classDesc, classPv, userId) VALUES (?, ?, ?, ?);";
  return db.query(insertClass, [className, classDesc, classPv, userId]);
};

export const getClass = (userId) => {
  const selectClass =
    `SELECT idClass, className, classDesc, classPv FROM class WHERE userId = ? ;`;
  return db.query(selectClass, [userId]);
};

export const getClassById = (idClass, userId) => {
  const selectClass =
    `SELECT
      c.idClass,
      c.className,
      c.classDesc,
      c.classPv,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'idSkills', s.idSkills,
            'skillsName', s.skillsName,
            'skillsDesc', s.skillsDesc,
            'abilityName', a.abilityName
          )
      ) AS skills
    FROM class c
    LEFT JOIN classSkills cs ON c.idClass = cs.classId
    LEFT JOIN skills s ON cs.skillsId = s.idSkills
    LEFT JOIN ability a ON s.abilityId = a.idAbility
    WHERE c.idClass = ? AND c.userId = ?
    GROUP BY c.idClass;`;
  return db.query(selectClass, [idClass, userId]);
};

export const updateClass = ( className, classDesc, classPv, userId, idClass) => {
  const updateClassDatas =
    `UPDATE class SET className=?, classDesc=?, classPv=? WHERE userId = ? and idClass = ?;`;
  return db.query(updateClassDatas, [className, classDesc, classPv, userId, idClass]);
};

export const canDeleteClass =  async (idClass) => {
  const checkNpcPlayerscharClass = 
    `SELECT 
      (SELECT COUNT(*) FROM npcClass WHERE classId = ?) AS npcCount,
      (SELECT COUNT(*) FROM playerscharClass WHERE classId = ?) AS playerCount;`;
    const [result] = await db.query(checkNpcPlayerscharClass, [idClass, idClass]);
    return result[0];
}

export const deleteClass = (idClass, userId) => {
  const deleteClass = `DELETE FROM class WHERE idClass=? AND userId=?;`;
  return db.query(deleteClass, [idClass, userId]);
};