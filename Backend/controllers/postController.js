const pool = require("../config/db");

exports.createPost = async (req, res) => {
  try {
    const { user_id, content } = req.body;

    const post = await pool.query(
      `INSERT INTO posts (user_id, content)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, content]
    );

    res.status(201).json(post.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getPosts = async (req, res) => {
  try {

    const posts = await pool.query(`
      SELECT
      posts.id,
      posts.content,
      posts.created_at,
      users.username
      FROM posts
      JOIN users
      ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);

    res.json(posts.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deletePost = async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM posts WHERE id=$1",
      [id]
    );

    res.json({
      message: "Post Deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};