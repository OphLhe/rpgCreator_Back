import db from "../config/db.js";

export const addStory = (title, synopsis, creationDate, genreId, userId, exposition, risingAction) => {
    const insertStory = 
    `INSERT INTO story (
        title, 
        synopsis, 
        creationDate, 
        genreId, 
        userId, 
        exposition, 
        risingAction) 
    VALUES (?,?,?,?,?,?,?);`;
    return db.query(insertStory, [title, synopsis, creationDate, genreId, userId, exposition, risingAction]);
};

export const getStory = (userId) => {
    const selectStory = 
    `SELECT 
        idStory, 
        title, 
        synopsis, 
        date_format(creationDate, '%d/%m/%Y') as creationDate, 
        exposition, 
        risingAction, 
        climax, 
        fallingAction, 
        resolution, 
        genreId, 
        genreName 
    FROM story 
    INNER JOIN genre on genre.idGenre = story.genreId
    WHERE userId = ?;`;
    return db.query(selectStory, [userId]);
}

export const getStoryById = (idStory, userId) => {
    const selectStoryById = 
    `SELECT 
        idStory, 
        title, 
        synopsis, 
        date_format(creationDate, '%d/%m/%Y'), 
        exposition, 
        risingAction, 
        climax, 
        fallingAction, 
        resolution, 
        genreId, 
        genreName 
    FROM story 
    INNER JOIN genre on genre.idGenre = story.genreId 
    WHERE idStory = ? AND userId = ?;`;
    return db.query(selectStoryById, [idStory, userId]);
}

export const updateStory = (title, synopsis, creationDate, genreId, exposition, risingAction, climax, fallingAction, resolution, idStory, userId) => {
    const updateStoryDatas=
    `UPDATE story 
        SET title=? , 
        synopsis=?, 
        creationDate=?, 
        genreId =?, 
        exposition=?, 
        risingAction=?, 
        climax=?, 
        fallingAction=?, 
        resolution=? 
    WHERE userId = ? AND idStory = ?;`;
    return db.query(updateStoryDatas, [ title, synopsis, creationDate, genreId, exposition, risingAction, climax, fallingAction, resolution, userId, idStory ])
}

export const deleteStory = (idStory, userId) => {
    const deleteStory = 
    `DELETE FROM story WHERE idStory=? AND userId=?;`;
    return db.query(deleteStory, [idStory, userId])
} 