import db from "../config/db.js";

export const addPlayerscharClassSkill = async (playerscharClassId, skillsId) => {
    const createPlayerscharClassSkills = 
    `INSERT INTO playerscharClassSkills (playerscharClassId, skillsId) VALUES (?, ?)`;
    return await db.query(createPlayerscharClassSkills, [playerscharClassId, skillsId]);
};

export const getPlayersClassSkills = async (playerscharClassId) => {
    const selectPlayerscharClassSkills = 
    `SELECT 
        firstName, 
        lastName, 
        nickname, 
        className, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'idSkills', skills.idSkills, 
                'skillsName', skills.skillsName, 
                'abilityName', ability.abilityName
            )
        ) 
    AS skills 
    FROM playerscharClassSkills 
    LEFT JOIN skills ON playerscharClassSkills.skillsId = skills.idSkills 
    LEFT JOIN ability ON skills.abilityId = ability.idAbility 
    LEFT JOIN playerscharClass ON playerscharClassSkills.playerscharClassId = playerscharClass.idPlayerscharClass 
    LEFT JOIN playerscharacter ON playerscharClass.playersCharacterId = playerscharacter.idPlayersCharacter
    LEFT JOIN class ON playerscharClass.classId = class.idClass
    WHERE playerscharClassId = ?;`
    return await db.query(selectPlayerscharClassSkills, [playerscharClassId]);
};

export const deletePlayerscharClassSkill = async (playerscharClassSkillId) => {
    const deleteOneSkillFromPlayerschar = 
    `DELETE FROM playerscharClassSkills WHERE idPlayerscharClassSkills = ?`;
    return await db.query(deleteOneSkillFromPlayerschar, [playerscharClassSkillId]);
};

export const deleteAllPlayerscharClassSkills = async (playerscharClassId) => {
    const deleteAllSkill = 
    `DELETE FROM playerscharClassSkills WHERE playerscharClassId = ?`;
    return await db.query(deleteAllSkill, [playerscharClassId]);
};