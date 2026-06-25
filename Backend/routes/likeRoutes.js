const router = require("express").Router();

const {
  likePost
} = require("../controllers/likeController");

router.post("/:postId", likePost);

module.exports = router;