const foodModel = require("../../src/models/food.model");
const storageService = require("../../src/services/storage.service");
const likeModel = require("../../src/models/likes.model");
const saveModel = require("../../src/models/save.model");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    console.log("REQ.FILE:", req.file); // debug
    console.log("REQ.BODY:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    // Upload file buffer to storage service
    const fileUploadUrl = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    if (!fileUploadUrl) {
      return res.status(500).json({ message: "Video upload failed" });
    }

    const foodItem = await foodModel.create({
      name: req.body.name.replace(/(^"|"$)/g, ""),
      description: req.body.description.replace(/(^"|"$)/g, ""),
      video: fileUploadUrl, // assign the URL string directly
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({});
    res
      .status(200)
      .json({ message: "Food items fetched successfully", foodItems });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: foodId,
    });
    if (isAlreadyLiked) {
      await likeModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
      return res.status(200).json({ message: "Food unliked successfully" });
    }

    const like = await likeModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(201).json({ message: "Food liked successfully", like });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });
    if (isAlreadySaved) {
      await saveModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });
      return res.status(200).json({ message: "Food unsaved successfully" });
    }

    const save = await saveModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

    res.status(201).json({ message: "Food saved successfully", save });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getSaveFood(req, res) {
  try {
    const user = req.user;
    const savedFoods = await saveModel
      .find({ user: user._id })
      .populate("food");
    if (!savedFoods.length) {
      return res.status(404).json({ message: "No saved foods found" });
    }
    res
      .status(200)
      .json({ message: "Saved foods retrieved successfully", savedFoods });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood,
};
