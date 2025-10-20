import db from "../config/db.js";


export const addNpcClassSkill = async (npcClassId, skillId) => {
    const createNpcClassSkills = 
    'INSERT INTO npcClassSkills (npcClassId, skillId) VALUES (?, ?)';
    return await db.query(createNpcClassSkills, [npcClassId, skillId]);
};

export const getNpcClassSkills = async (npcClassId) => {
    const selectNpcClassSkills = 
    'SELECT npcClassId, skillId FROM npcClassSkills WHERE npcClassId = ?';
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