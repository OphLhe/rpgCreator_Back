import db from '../config/db.js'

export const getAllGenre = () => {
    const selectGenre = 
    'select genreName from genre'
    return db.query(selectGenre)
}