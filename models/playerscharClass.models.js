import db from "../config/db.js";

export const addClassToPlayerschar = (playersCharacterId, classId) => {
    const insertClassToPlayerschar = 
    'INSERT INTO playerscharClass (playersCharacterId, classId) VALUES (?, ?);';
    return db.query(insertClassToPlayerschar, [playersCharacterId, classId]);
}

export const getPlayersCharByClassId = (classId) => {
    const selectPlayersCharByClassId = 
    `SELECT 
        playerscharacter.idPlayersCharacter, 
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
    GROUP BY playersCharacter.idPlayersCharacter, class.idClass;`;
    return db.query(selectPlayersCharByClassId, [classId]);
}

export const getAllPlayersCharsWithClasses = () => {
    const selectAllPlayersCharsWithClasses = 
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
        idPlayersCharacter, 
        firstName, 
        lastName, 
        nickname, 
        gender, 
        age, 
        biography,
        physic, 
        level,   
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'idClass', class.idClass, 
                'className', class.className, 
                'classDesc', class.classDesc, 
                'classPv', class.classPv,
                'skills', classWithSkills.skills
            )
        ) AS class  
    FROM playersCharacter
    LEFT JOIN playersCharClass ON playersCharacter.idPlayersCharacter = playersCharClass.playersCharacterId
    LEFT JOIN class ON playersCharClass.classId = class.idClass 
    LEFT JOIN classWithSkills ON class.idClass = classWithSkills.idClass
    GROUP BY playersCharacter.idPlayersCharacter;`;
    return db.query(selectAllPlayersCharsWithClasses);
}