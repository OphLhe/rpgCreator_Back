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
    `SELECT className, classDesc, classPv FROM class WHERE idClass = ? AND userId = ? ;`;
  return db.query(selectClass, [idClass, userId]);
};

export const updateClass = (idClass, className, classDesc, classPv, userId) => {
  const updateClassDatas =
    `UPDATE class SET className=?, classDesc=?, classPv=? WHERE userId = ? and idClass = ?;`;
  return db.query(updateClassDatas, [idClass, className, classDesc, classPv, userId]);
};

export const deleteClass = (idClass, userId) => {
  const deleteClass = `DELETE FROM class WHERE idClass=? AND userId=?;`;
  return db.query(deleteClass, [idClass, userId]);
};