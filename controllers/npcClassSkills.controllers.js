import dotenv from "dotenv";
import * as npcClassSkillsModels from '../models/npcClassSkills.models.js';
dotenv.config();

export const addNpcClassSkill = async (req, res) => {
    const { npcClassId, skillId } = req.body;

    try {
        const result = await npcClassSkillsModels.addNpcClassSkill(npcClassId, skillId);
        res.status(201).json({ message: "Compétence ajoutée avec succès.", result });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la compétence :", error);
        res.status(500).json({ message: "Erreur lors de l'ajout de la compétence." });
    }
};

export const getNpcClassSkills = async (req, res) => {
    const { npcClassId } = req.params;

    try {
        const [skills] = await npcClassSkillsModels.getNpcClassSkills(npcClassId);
        res.status(200).json(skills);
    } catch (error) {
        console.error("Erreur lors de la récupération des compétences :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des compétences." });
    }
};

export const deleteNpcClassSkill = async (req, res) => {
    const { npcClassSkillId } = req.params;

    try {
        const result = await npcClassSkillsModels.deleteNpcClassSkill(npcClassSkillId);
        res.status(200).json({ message: "Compétence supprimée avec succès.", result });
    } catch (error) {
        console.error("Erreur lors de la suppression de la compétence :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la compétence." });
    }
};

export const deleteAllNpcClassSkills = async (req, res) => {
    const { npcClassId } = req.params;

    try {
        const result = await npcClassSkillsModels.deleteAllNpcClassSkills(npcClassId);
        res.status(200).json({ message: "Toutes les compétences ont été supprimées avec succès.", result });
    } catch (error) {
        console.error("Erreur lors de la suppression des compétences :", error);
        res.status(500).json({ message: "Erreur lors de la suppression des compétences." });
    }
};
