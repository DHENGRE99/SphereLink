const pool = require("../config/db");

exports.likePost = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { postId } = req.params;

    await pool.query(
      `INSERT INTO likes (user_id, post_id)
       VALUES ($1, $2)`,
      [user_id, postId]
    );

    res.json({ message: "Post liked" });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};