const pool = require("../config/db");

exports.followUser = async (req, res) => {

  try {

    const { follower_id } = req.body;
    const { id } = req.params;

    await pool.query(
      `INSERT INTO followers
      (follower_id, following_id)
      VALUES ($1,$2)`,
      [follower_id, id]
    );

    res.json({
      message: "User followed"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};