import db from '../config/db.js'

export const createGenre = async (genreName, genrePicture) => {
    const createGenreDatas = 
    'INSERT INTO genre (genreName, genrePicture) VALUES (?, ?);';
    return db.query(createGenreDatas, [genreName, genrePicture]);
}

export const updateGenre = (genreName, genrePicture, idGenre) => {
    const updateGenreDatas=
    'UPDATE genre SET genreName = ?, genrePicture = ? where idGenre =?;'
    return db.query(updateGenreDatas, [genreName, genrePicture, idGenre]);
}

export const getAllGenre = () => {
    const selectGenre = 
    'SELECT genreName, genrePicture FROM genre;'
    return db.query(selectGenre);
}
