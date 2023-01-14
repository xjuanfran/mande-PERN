const pool = require('../db');

const getAllPerson = async (req, res, next) => {

  try {
    const allPerson = await pool.query("SELECT * FROM person WHERE status = 'Y'");
    res.json(allPerson.rows)
  } catch (error) {
    next(error);
  }
};

const getPerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM person WHERE person_id = $1 AND status = 'Y'", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const createPerson = async (req, res, next) => {
  const { first_name, last_name, email, phone, password } = req.body;

  try {
    const result = await pool.query("INSERT INTO person (first_name, last_name, email, phone, status, password) VALUES ($1, $2, $3, $4, 'Y', $5) RETURNING *", [first_name, last_name, email, phone, password]);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const personValidation = async (req, res, next) => {
  const { email, phone } = req.body;

  try {
    const result = await pool.query("SELECT * FROM person WHERE email = $1 OR phone = $2", [email, phone]);

    if (result.rows.length > 0) {
      return res.json({ message: true });
    }
    res.json({ message: false });
  } catch (error) {
    next(error);
  }
}

const loginPerson = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT person_id, email, password FROM person WHERE email = $1 AND password = $2 AND status = 'Y'", [email, password]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(result.rows[0].person_id);
  } catch (error) {
    next(error);
  }
}

const deletePerson = async (req, res, next) => {

  const { id } = req.params;
  try {
    const result = await pool.query("UPDATE person SET status = 'N' WHERE person_id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

const updatePerson = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, password } = req.body;

    const result = await pool.query(
      'UPDATE person SET first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE person_id = $6 RETURNING *', [first_name, last_name, email, phone, password, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPerson,
  getPerson,  
  createPerson,
  personValidation,
  loginPerson,
  deletePerson,
  updatePerson
}