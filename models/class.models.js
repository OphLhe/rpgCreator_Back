import db from "../config/db.js";

export const addClass = (
  className,
  classDesc,
  classPv,
  userId,
  strengthStat,
  dexterityStat,
  constitutionStat,
  intelligenceStat,
  wisdomStat,
  charismaStat,
  strModifier,
  dexModifier,
  conModifier,
  intModifier,
  wisModifier,
  chaModifier
) => {
  const insertClass =
    "INSERT INTO class (className, classDesc, classPv, userId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  return db.query(insertClass, [
    className,
    classDesc,
    classPv,
    userId,
    strengthStat,
    dexterityStat,
    constitutionStat,
    intelligenceStat,
    wisdomStat,
    charismaStat,
    strModifier,
    dexModifier,
    conModifier,
    intModifier,
    wisModifier,
    chaModifier,
  ]);
};

export const getClass = (userId) => {
  const selectClass =
    "SELECT className, classDesc, classPv, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier FROM class WHERE userId = ? ;";
  return db.query(selectClass, [userId]);
};

export const getClassById = (idClass) => {
  const selectClass =
    "SELECT className, classDesc, classPv, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier FROM class WHERE idClass = ? ;";
  return db.query(selectClass, [idClass]);
};

export const updateClass = (
  idClass,
  className,
  classDesc,
  classPv,
  userId,
  strengthStat,
  dexterityStat,
  constitutionStat,
  intelligenceStat,
  wisdomStat,
  charismaStat,
  strModifier,
  dexModifier,
  conModifier,
  intModifier,
  wisModifier,
  chaModifier
) => {
  const updateClassDatas =
    "UPDATE class SET className=?, classDesc=?, classPv=?, strengthStat=?, dexterityStat=?, constitutionStat=?, intelligenceStat=?, wisdomStat=?, charismaStat=?, strModifier=?, dexModifier=?, conModifier=?, intModifier=?, wisModifier=?, chaModifier=? WHERE userId = ? and idClass = ?;";
  return db.query(updateClassDatas, [
    idClass,
    className,
    classDesc,
    classPv,
    userId,
    strengthStat,
    dexterityStat,
    constitutionStat,
    intelligenceStat,
    wisdomStat,
    charismaStat,
    strModifier,
    dexModifier,
    conModifier,
    intModifier,
    wisModifier,
    chaModifier,
  ]);
};

export const deleteClass = (idClass, userId) => {
  const deleteClass = "DELETE FROM class WHERE idClass=? AND userId=?;";
  return db.query(deleteClass, [idClass, userId]);
};
