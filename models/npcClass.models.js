import db from "../config/db.js";

export const addClassToNPC = (npcId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier) => {
    const insertClassToNpc = 
    `INSERT INTO npcClass (
        npcId, 
        classId, 
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
        chaModifier)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    return db.query(insertClassToNpc, [npcId, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier]);
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
        speciesId,
        species.speciesName, 
        npcClass.classId, 
        class.className,
        class.classPv,
        npcClass.strengthStat, 
        npcClass.dexterityStat, 
        npcClass.constitutionStat,
        npcClass.intelligenceStat,
        npcClass.wisdomStat,
        npcClass.charismaStat,
        npcClass.strModifier, 
        npcClass.dexModifier, 
        npcClass.conModifier,
        npcClass.intModifier, 
        npcClass.wisModifier, 
        npcClass.chaModifier, 
    (SELECT 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'skillsId', s.idSkills,
                'skillsName', s.skillsName,
                'abilityName', a.abilityName
            )
        )
        FROM npcClassSkills ncs
        LEFT JOIN skills s ON ncs.skillId = s.idSkills
        LEFT JOIN ability a ON s.abilityId = a.idAbility
        WHERE ncs.npcClassId = npcClass.idNpcClass
    ) AS validatedSkills
    FROM npcClass 
    LEFT JOIN npc ON npcClass.npcId = npc.idNpc
    LEFT JOIN species ON npc.speciesId = species.idSpecies
    LEFT JOIN class ON npcClass.classId = class.idClass;
    WHERE class.idClass = ?
    GROUP BY npcClass.idNpcClass, class.idClass;`;
    return db.query(selectNpcByClassId, [classId]);
}

export const getAllNpcsWithClasses = (userId) => {
    const selectAllNpcsWithClasses = 
    
    ` SELECT
        idNpcClass,
        npc.idNpc, 
        npcFirstName, 
        npcLastName, 
        npcNickname, 
        npcGender, 
        npcAge, 
        npcBiography, 
        npcPhysic, 
        npcLevel,
        speciesId, 
        species.speciesName,
        npcClass.classId, 
        class.className,
        class.classPv,
        npcClass.strengthStat, 
        npcClass.dexterityStat, 
        npcClass.constitutionStat,
        npcClass.intelligenceStat,
        npcClass.wisdomStat,
        npcClass.charismaStat,
        npcClass.strModifier, 
        npcClass.dexModifier, 
        npcClass.conModifier,
        npcClass.intModifier, 
        npcClass.wisModifier, 
        npcClass.chaModifier, 
    (SELECT 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'skillsId', s.idSkills,
                'skillsName', s.skillsName,
                'abilityName', a.abilityName
            )
        )
        FROM npcClassSkills ncs
        LEFT JOIN skills s ON ncs.skillId = s.idSkills
        LEFT JOIN ability a ON s.abilityId = a.idAbility
        WHERE ncs.npcClassId = npcClass.idNpcClass
    ) AS validatedSkills
    FROM npcClass 
    LEFT JOIN npc ON npcClass.npcId = npc.idNpc
    LEFT JOIN species ON npc.speciesId = species.idSpecies
    LEFT JOIN class ON npcClass.classId = class.idClass
    WHERE npc.userId = ?
    GROUP BY npcClass.idNpcClass, class.idClass;`; 
    return db.query(selectAllNpcsWithClasses, [userId]);
}

export const updateNpcClass = (idNpcClass, classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier) => {
    const updateNpcClass =
    `UPDATE npcClass

    SET 
        npcClass.classId= ?, 
        strengthStat = ?,
        dexterityStat = ?,
        constitutionStat = ?,
        intelligenceStat = ?,
        wisdomStat = ?,
        charismaStat = ?,
        strModifier = ?,
        dexModifier = ?,
        conModifier = ?,
        intModifier = ?,
        wisModifier = ?,
        chaModifier = ?

    WHERE idNpcClass = ?;`;

    return db.query(updateNpcClass, [ classId, strengthStat, dexterityStat, constitutionStat, intelligenceStat, wisdomStat, charismaStat, strModifier, dexModifier, conModifier, intModifier, wisModifier, chaModifier, idNpcClass]);
};