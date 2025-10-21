import db from "../config/db.js";


export const addNpcClassSkill = async (npcClassId, skillId) => {
    const createNpcClassSkills = 
    'INSERT INTO npcClassSkills (npcClassId, skillId) VALUES (?, ?)';
    return await db.query(createNpcClassSkills, [npcClassId, skillId]);
};

export const getNpcClassSkills = async (npcClassId) => {
    const selectNpcClassSkills = 
    `SELECT 
    npcFirstname, 
    npcLastname, 
    npcNickname, 
    className, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idSkills', skills.idSkills, 
            'skillsName', skills.skillsName, 
            'abilityName', ability.abilityName)) 
    AS skills 
    FROM npcClassSkills 
    LEFT JOIN skills ON npcClassSkills.skillId = skills.idSkills 
    LEFT JOIN ability ON skills.abilityId = ability.idAbility 
    LEFT JOIN npcClass ON npcClassSkills.npcClassId = npcClass.idNpcClass 
    LEFT JOIN npc ON npcClass.npcId = npc.idNpc
    LEFT JOIN class ON npcClass.classId = class.idClass
    WHERE npcClassId = ?`
    ;
    return await db.query(selectNpcClassSkills, [npcClassId]);
};

export const deleteNpcClassSkill = async (npcClassSkillId) => {
    const deleteOneSkillFromNpc = 
    'DELETE FROM npcClassSkills WHERE idNpcClassSkills = ?';
    return await db.query(deleteOneSkillFromNpc, [npcClassSkillId]);
};

export const deleteAllNpcClassSkills = async (npcClassId) => {
    const deleteAllSkill = 
    'DELETE FROM npcClassSkills WHERE npcClassId = ?';
    return await db.query(deleteAllSkill, [npcClassId]);
};