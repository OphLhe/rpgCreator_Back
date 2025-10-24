import db from "../config/db.js";

export const addClassToPlayerschar = (
    playersCharacterId, 
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
    chaModifier) => {
    const insertClassToPlayerschar = 
    `INSERT INTO playerscharClass (
        playersCharacterId, 
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
    return db.query(insertClassToPlayerschar, [
        playersCharacterId, 
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
        chaModifier]);
}

export const getPlayersCharById= (playersCharacterId) => {
    const selectPlayersCharById = 
    `SELECT 
        playersCharacterId, 
        firstName, 
        lastName, 
        nickname, 
        gender, 
        age, 
        biography, 
        physic, 
        level, 
        playersCharClass.classId, 
        class.className, 
        class.classPv,
        playersCharClass.strengthStat, 
        playersCharClass.dexterityStat, 
        playersCharClass.constitutionStat,
        playersCharClass.intelligenceStat,
        playersCharClass.wisdomStat,
        playersCharClass.charismaStat,
        playersCharClass.strModifier, 
        playersCharClass.dexModifier, 
        playersCharClass.conModifier,
        playersCharClass.intModifier, 
        playersCharClass.wisModifier, 
        playersCharClass.chaModifier, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'skillsId', skills.idSkills,
                'skillsName', skills.skillsName,
                'abilityName', ability.abilityName
            )
        ) AS skills
    FROM playersCharClass 
    LEFT JOIN playersCharacter ON playersCharClass.playersCharacterId = playersCharacter.idPlayersCharacter 
    LEFT JOIN class ON playersCharClass.classId = class.idClass
    LEFT JOIN classSkills ON class.idClass = classSkills.classId
    LEFT JOIN skills ON classSkills.skillsId = skills.idSkills
    LEFT JOIN ability ON skills.abilityId = ability.idAbility
    WHERE class.idClass = ?
    GROUP BY playersCharClass.idPlayerscharClass, class.idClass;`;
    return db.query(selectPlayersCharById, [playersCharacterId]);
}

export const getAllPlayersCharsWithClasses = (userId) => {
    const selectAllPlayersCharsWithClasses = 
    `SELECT 
        idPlayerscharClass,
        playersCharacter.idPlayersCharacter, 
        firstName, 
        lastName, 
        nickname, 
        gender, 
        age, 
        biography,
        physic, 
        level,   
        speciesId, 
        species.speciesName,
        playersCharClass.classId, 
        class.className,
        class.classPv,
        playersCharClass.strengthStat, 
        playersCharClass.dexterityStat, 
        playersCharClass.constitutionStat,
        playersCharClass.intelligenceStat,
        playersCharClass.wisdomStat,
        playersCharClass.charismaStat,
        playersCharClass.strModifier, 
        playersCharClass.dexModifier, 
        playersCharClass.conModifier,
        playersCharClass.intModifier, 
        playersCharClass.wisModifier, 
        playersCharClass.chaModifier,
    (SELECT 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'skillsId', s.idSkills,
                'skillsName', s.skillsName,
                'abilityName', a.abilityName
            )
        ) 
        FROM playerscharClassSkills pcsk
        LEFT JOIN skills s ON pcsk.skillsId = s.idSkills
        LEFT JOIN ability a ON s.abilityId = a.idAbility
        WHERE pcsk.playerscharClassId = playersCharClass.idPlayerscharClass
    )AS validatedSkills 
    FROM playersCharClass
    LEFT JOIN playersCharacter ON  playersCharClass.playersCharacterId = playersCharacter.idPlayersCharacter
    LEFT JOIN species on playerscharacter.speciesId = species.idSpecies
    LEFT JOIN class ON playersCharClass.classId = class.idClass 
    WHERE playersCharacter.userId = ?
    GROUP BY playersCharClass.idPlayerscharClass, class.idClass;`; 
    return db.query(selectAllPlayersCharsWithClasses, [userId]);
}

export const updateClassOnPlayersChar = (
    idPlayersCharClass, 
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
    chaModifier) => {
    const updateClassOnPlayersCharQuery =
    `UPDATE playerscharClass
    SET 
        playerscharClass.classId = ?, 
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
    WHERE idPlayerscharClass = ?;`;
    return db.query(updateClassOnPlayersCharQuery, [
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
        chaModifier, 
        idPlayersCharClass]);
}