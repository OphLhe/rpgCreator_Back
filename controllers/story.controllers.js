import dotenv from "dotenv";
import * as storyModels from "../models/story.models.js";

dotenv.config();

export const createStory = async (req, res) => {
  const {title, synopsis, creationDate, exposition, risingAction} = req.body;
  const genreId = req.params.idGenre;
  const userId = req.user.idUser;

  if (!title || !creationDate || !exposition || !risingAction) {
    return res.status(400).json({
      message: "The following fileds are required : title, creationDate, exposition, risingAction."
    });
  }

  try {
    const [result] = await storyModels.addStory(title, synopsis, creationDate, genreId, userId, exposition, risingAction);
    res.status(200).json({result, message: "Story registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering story" });
  }

};

export const getStories = async (req, res) => {

    const userId = req.user.idUser;

    try {
        const [result] = await storyModels.getStory(userId);
        res.status(200).json({result, message: "Stories fetched successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching stories" });
    }
};

export const getStoryById = async (req, res) => {

    const idStory = req.params.idStory;
    const userId = req.user.idUser;

    try {
        const [story] = await storyModels.getStoryById(idStory, userId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.status(200).json(story);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching story" });
    }
};

export const updateStory = async (req, res) => {
    const userId = req.user.idUser;
    const idStory = req.params.idStory;
    const { title, synopsis, creationDate, genreId, exposition, risingAction, climax, fallingAction, resolution } = req.body;

    if (!title || !creationDate || !exposition || !risingAction ) {
        return res.status(400).json({
            message: "The following fields are required: title, creationDate, exposition, risingAction, genreId."
        });
    }

    try {
        const [result] = await storyModels.updateStory(
            title,
            synopsis,
            creationDate,
            genreId,
            exposition,
            risingAction,
            climax,
            fallingAction,
            resolution,
            userId,
            idStory,
        );
        res.status(200).json({ result, message: "Story updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating story" });
    }
};

export const deleteStory = async (req, res) => {
    const idStory = req.params.idStory;
    const userId = req.user.idUser;
    try {
        const [result] = await storyModels.deleteStory(idStory, userId);
        res.status(200).json({ result, message: "Story deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting story" });
    }
};