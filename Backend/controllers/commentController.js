const pool = require("../config/db");

exports.createComment = async (req, res) => {
  try {
    const { post_id, user_id, comment } = req.body;

    const result = await pool.query(
      `INSERT INTO comments
      (post_id,user_id,comment)
      VALUES ($1,$2,$3)
      RETURNING *`,
      [post_id, user_id, comment]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getComments = async (req, res) => {
  try {

    const { postId } = req.params;

    const comments = await pool.query(
      `SELECT
        comments.*,
        users.username
       FROM comments
       JOIN users
       ON comments.user_id = users.id
       WHERE post_id = $1
       ORDER BY created_at DESC`,
      [postId]
    );

    res.json(comments.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};