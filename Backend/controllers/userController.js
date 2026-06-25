const pool = require("../config/db");

exports.getProfile = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await pool.query(
            "SELECT id, username, email FROM users WHERE id = $1",
            [id]
        );

        res.json(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {

        const users = await pool.query(
            "SELECT id, username, email FROM users"
        );

        res.json(users.rows);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};