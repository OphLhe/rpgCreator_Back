import dotenv from "dotenv";
import * as speciesModels from '../models/species.model.js';

dotenv.config()

export const createSpecies =  async (req, res) => {

    const { speciesName, speciesDesc, speciesModifier, speciesSpeed} = req.body;

    try {            
        await speciesModels.addSpecies(speciesName, speciesDesc, speciesModifier, speciesSpeed);
        res.status(201).json({ message: 'Species registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while registering species' });
    }
}

export const getSpecies = async (req, res) => {
    
    try {
        const [result] = await speciesModels.getAllSpecies()
        if (result.length > 0) {
            res.status(201).json(result);
        } else {
            res.status(404).json({ message: 'Species not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message:  'Error while fetching species'})
    }
}

export const updateSpeciesDatas = async (req, res) => {

    const idSpecies = req.user.idSpecies;
    const {speciesName, speciesDesc, speciesModifier, speciesSpeed } = req.body;
    
    try {
        const [result] = await speciesModels.updateSpecies(speciesName, speciesDesc, speciesModifier, speciesSpeed, idSpecies);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Species not found' });
        }
        res.status(201).json({ message: 'Species datas updated successfully' });   
            
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while updating species datas', error });
        }

}

export const deleteSpecies = async (req, res) => {
    const idSpecies = req.params.id; 
    
        try {
            await speciesModels.deleteSpecies(idSpecies);
            res.status(201).json({ message: 'Specie deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while deleting specie', error });
        }
}
