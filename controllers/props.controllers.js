import dotenv from "dotenv";
import * as propsModels from "../models/props.models.js";

dotenv.config();

export const createProps = async (req, res) => {
  const { propsName, propsDesc, propsEffect } = req.body;
  const genreId = req.params.idGenre
  const userId = req.user.idUser;

  if (!propsName || !propsDesc ) {
    return res.status(400).json({
      message: "The following fileds are required : propsName, propsDesc."
    });
  }

  try {
    const [result] = await propsModels.addProps(propsName, propsDesc, propsEffect, genreId, userId);
    res.status(200).json({result, message: "Props registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while registering props" });
  }
};

export const getPropsById = async (req, res) => {
  const idProps = req.params.idProps
  const userId = req.user.idUser;

  try {
    const [result] = await propsModels.getPropsById(idProps,userId);
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
  const { propsName, propsDesc, propsEffect} = req.body;

  try {
    const [result] = await propsModels.updateProps( propsName, propsDesc, propsEffect, userId, idProps);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Props not found" });
    }
    const [updatedProps] = await propsModels.getPropsById( idProps, userId )
      res.status(200).json(updatedProps[0]);
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
