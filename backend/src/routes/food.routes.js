const express = require('express');
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require('multer');
const router = express.Router();

// Multer config: store file in memory
const upload = multer({
    storage: multer.memoryStorage(),
});

// POST /api/food/ [protected]
router.post(
    '/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"), // field name must match frontend/form-data key
    foodController.createFood
);

// GET /api/food/ [protected]
router.get(
    "/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
);

// POST /api/food/like [protected]
router.post(
    '/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
);

// POST /api/food/save [protected]
router.post(
    '/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
);

// GET /api/food/save [protected]
router.get(
    '/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
);

module.exports = router;
