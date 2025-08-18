import dotenv from "dotenv";
import * as genreModels from '../models/genre.models.js';

dotenv.config()

export const getGenre = async (req, res) => {
    
    try {
        const [result] = await genreModels.getAllGenre()
        
        console.log(result);
        
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message:  'Error while fetching Genre'})
    }
}