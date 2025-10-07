import db from "../config/db.js";

export const addClassToNPC = (npcId, classId) => {
    const insertClassToNpc = 
    'INSERT INTO npcClass (npcId, classId) VALUES (?, ?);';
    return db.query(insertClassToNpc, [npcId, classId]);
}

export const getNpcByClassId = (classId) => {
    const selectNpcByClassId = 
    `SELECT 
        npc.idNpc, 
        npcFirstName, 
        npcLastName, 
        npcNickname, 
        npcGender, 
        npcAge, 
        npcBiography, 
        npcPhysic, 
        npcLevel, 
        npcClass.classId, 
        class.className, 
        JSON_ARRAYAGG(
        JSON_OBJECT(
            'skillsId', skills.idSkills,
            'skillsName', skills.skillsName,
            'abilityName', ability.abilityName
        )
    ) AS skills
    FROM npcClass 
    LEFT JOIN npc ON npcClass.npcId = npc.idNpc 
    LEFT JOIN class ON npcClass.classId = class.idClass
    LEFT JOIN classSkills ON class.idClass = classSkills.classId
    LEFT JOIN skills ON classSkills.skillsId = skills.idSkills
    LEFT JOIN ability ON skills.abilityId = ability.idAbility
    WHERE class.idClass = ?
    GROUP BY npc.idNpc, class.idClass;`;
    return db.query(selectNpcByClassId, [classId]);
}

export const getAllNpcsWithClasses = () => {
    const selectAllNpcsWithClasses = 
    `WITH classWithSkills AS(
        SELECT 
            class.idClass,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idSkills', skills.idSkills,
                    'skillsName', skills.skillsName,
                    'abilityName', ability.abilityName
                )
            ) AS skills
        FROM class
        LEFT JOIN classSkills ON class.idClass = classSkills.classId
        LEFT JOIN skills ON classSkills.skillsId = skills.idSkills      
        LEFT JOIN ability ON skills.abilityId = ability.idAbility
        GROUP BY class.idClass
    )
    SELECT 
        idNpc, 
        npcFirstName, 
        npcLastName, 
        npcNickname, 
        npcGender, 
        npcAge, 
        npcBiography,
        npcPhysic, 
        npcLevel,   
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'idClass', class.idClass, 
                'className', class.className, 
                'classDesc', class.classDesc, 
                'classPv', class.classPv,
                'skills', classWithSkills.skills
            )
        ) AS class  
    FROM npc
    LEFT JOIN npcClass ON npc.idNpc = npcClass.npcId
    LEFT JOIN class ON npcClass.classId = class.idClass 
    LEFT JOIN classWithSkills ON class.idClass = classWithSkills.idClass
    GROUP BY npc.idNpc;`;
    return db.query(selectAllNpcsWithClasses);
}