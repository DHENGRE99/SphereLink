const router = require("express").Router();

const {
    getProfile,
    getAllUsers
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.get("/:id", getProfile);

module.exports = router;