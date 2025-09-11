import db from "../config/db.js";

export const getAbility = () => {
  const selectAbility =
    "SELECT idAbility, abilityName FROM ability;";
  return db.query(selectAbility);
};

