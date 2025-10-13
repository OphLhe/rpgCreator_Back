import db from "../config/db.js";

export const getNpcClassAssociation = (npcId, classId) => {
    const selectNpcClassAssociation =
    `SELECT 1 FROM npcClass WHERE npcId = ? AND classId = ?;`;
    return db.query(selectNpcClassAssociation, [npcId, classId]);
}

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
    GROUP BY npcClass.idNpcClass, class.idClass;`;
    return db.query(selectNpcByClassId, [classId]);
}

export const getAllNpcsWithClasses = () => {
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
    GROUP BY npcClass.idNpcClass, class.idClass;`;
    return db.query(selectAllNpcsWithClasses);
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