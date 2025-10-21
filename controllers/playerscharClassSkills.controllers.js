import dotenv from "dotenv";
import * as playerscharClassSkillsModels from '../models/playerscharClass.models.js';
dotenv.config();

export const addPlayerscharClassSkill = async (req, res) => {
    const { playerscharClassId, skillId } = req.body;

    try {
        const result = await playerscharClassSkillsModels.addPlayerscharClassSkill(playerscharClassId, skillId);
        res.status(201).json({ message: "Compétence ajoutée avec succès.", result });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la compétence :", error);
        res.status(500).json({ message: "Erreur lors de l'ajout de la compétence." });
    }
};

export const getPlayerscharClassSkills = async (req, res) => {
    const { playerscharClassId } = req.params;

    try {
        const [skills] = await playerscharClassSkillsModels.getPlayerscharClassSkills(playerscharClassId);
        res.status(200).json(skills);
    } catch (error) {
        console.error("Erreur lors de la récupération des compétences :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des compétences." });
    }
};

export const deletePlayerscharClassSkill = async (req, res) => {
    const { playerscharClassSkillId } = req.params;

    try {
        const result = await playerscharClassSkillsModels.deletePlayerscharClassSkill(playerscharClassSkillId);
        res.status(200).json({ message: "Compétence supprimée avec succès.", result });
    } catch (error) {
        console.error("Erreur lors de la suppression de la compétence :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la compétence." });
    }
};

export const deleteAllPlayerscharClassSkills = async (req, res) => {
    const { playerscharClassId } = req.params;

    try {
        const result = await playerscharClassSkillsModels.deleteAllPlayerscharClassSkills(playerscharClassId);
        res.status(200).json({ message: "Toutes les compétences ont été supprimées avec succès.", result });
    } catch (error) {
        console.error("Erreur lors de la suppression des compétences :", error);
        res.status(500).json({ message: "Erreur lors de la suppression des compétences." });
    }
};
