import dotenv from "dotenv";
import * as propsModels from "../models/props.models.js";

dotenv.config();

export const createProps = async (req, res) => {
  const { propsName, propsDesc, propsEffect } = req.body;
  const userId = req.user.idUser;
  const genreId = req.params.idGenre
  console.log(userId);

  try {
    const [result] = await propsModels.addProps(propsName, propsDesc, propsEffect, genreId, userId);
    console.log(result);
    res.status(200).json({ message: "Props registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering props" });
  }
};

export const getProps = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const [result] = await propsModels.getProps(userId);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Props not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching Props" });
  }
};

export const updateProps = async (req, res) => {
  const userId = req.user.idUser;
  const idProps = req.params.idProps;
  const { propsName, propsDesc, propsEffect, genreId } = req.body;

  try {
    const [result] = await propsModels.updateProps(idProps, propsName, propsDesc, propsEffect, genreId, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Props not found" });
    }
    res.status(200).json({ message: "Props datas updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating Props datas", error });
  }
};

export const deleteProps = async (req, res) => {
  const userId = req.user.idUser;
  const idProps = req.params.idProps;

  try {
    const [result] = await propsModels.deleteProps(idProps, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Props not found" });
    }
    res.status(200).json({ message: "Props deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting props", error });
  }
};
