const pool = require('../db');

const getAllReviews = async (req, res, next) => {

  try {
    const allAddress = await pool.query("SELECT * FROM reviews");
    res.json(allAddress.rows)
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM reviews WHERE reviews_id = $1", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Calificacion no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const createReviews = async (req, res, next) => {
  const { employee_id, total_jobs, rating } = req.body;

  try {
    const result = await pool.query("INSERT INTO reviews (employee_id, total_jobs, rating) VALUES ($1, $2, $3) RETURNING *", [employee_id, total_jobs, rating]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const updateReviews = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { employee_id, total_jobs, rating } = req.body;

    const result = await pool.query(
      'UPDATE reviews SET employee_id = $1, total_jobs = $2, rating = $3 WHERE reviews_id = $4 RETURNING *', [employee_id, total_jobs, rating, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Calificacion no encontrada' });
    }
    //console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllReviews,
  getReviews,
  createReviews,
  updateReviews
}