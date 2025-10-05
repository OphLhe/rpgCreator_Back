import db from '../config/db.js'

export const createGenre = async (genreName, genrePicture, genreDef) => {
    const createGenreDatas = 
    'INSERT INTO genre (genreName, genrePicture, genreDef) VALUES (?, ?, ?);';
    return db.query(createGenreDatas, [genreName, genrePicture, genreDef]);
}

export const updateGenre = (genreName, genrePicture, genreDef, idGenre) => {
    const updateGenreDatas=
    'UPDATE genre SET genreName = ?, genrePicture = ? , genreDef = ? where idGenre =?;'
    return db.query(updateGenreDatas, [genreName, genrePicture, genreDef, idGenre]);
}

export const getAllGenre = () => {
    const selectGenre = 
    'SELECT idGenre, genreName, genrePicture, genreDef FROM genre;'
    return db.query(selectGenre);
}

export const getGenreById = (idGenre) => {
    const selectGenreById = 
    'SELECT genreName, genrePicture, genreDef FROM genre WHERE idGenre = ?;';
    return db.query(selectGenreById, [idGenre]);
}
