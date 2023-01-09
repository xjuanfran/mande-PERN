const pool = require('../db');

const getAllUsers = async (req, res, next) => {

  try {
    const allUsers = await pool.query("SELECT * FROM users WHERE status = 'Y'");
    res.json(allUsers.rows)
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1 AND status = 'Y'", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
  const { user_id, utility_bill } = req.body;
  try {
    const result = await pool.query("INSERT INTO users (user_id, utility_bill, status) VALUES ($1, $2,'Y') RETURNING *", [user_id, utility_bill]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {

  const { id } = req.params;
  try {
    const result = await pool.query("UPDATE users SET status = 'N' WHERE user_id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { utility_bill} = req.body;

    const result = await pool.query(
      'UPDATE users SET utility_bill = $1 WHERE user_id = $2 RETURNING *', [utility_bill, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    //console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
}