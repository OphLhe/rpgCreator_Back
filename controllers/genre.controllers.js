import dotenv from "dotenv";
import * as genreModels from '../models/genre.models.js';
import { handleUploadPicture } from "../config/pictureConfig.js";

dotenv.config()

export const createGenre = async (req, res) => {

    const {genreName, genreDef} = req.body
    const genrePicture = req.file ? `/pictures/${req.file.filename}` : null;

    handleUploadPicture(req)

    try {
        const newGenre = await genreModels.createGenre(genreName, genrePicture, genreDef);
        res.status(200).json(newGenre, { message: 'Genre created successfully' });
    } catch (error) {
        console.error('Error while creating genre', error);
        res.status(500).json({ message: 'Error while creating genre' });
    }
};

export const updateGenre = async (req, res) => {

    const genreId = req.params.idGenre;
    const {genreName, genreDef} = req.body;
    const genrePicture = req.file ? req.file.originalname : null;

    handleUploadPicture(req)
    
    try {
        const updatedGenre = await genreModels.updateGenre( genreName, genrePicture, genreDef, genreId );
        res.status(200).json(updatedGenre, { message: 'Genre updated successfully' });
    } catch (error) {
        console.error(`Error updating genre with Id ${genreId}`, error);
        res.status(500).json({message: 'Error while updating genre'});
    }
};

export const getGenre = async (req, res) => {
    
    try {
        const [result] = await genreModels.getAllGenre();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message:  'Error while fetching Genre'})
    }
};

export const getGenreById = async (req, res) => {
    const genreId = req.params.idGenre;

    try {
        const [result] = await genreModels.getGenreById(genreId);
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