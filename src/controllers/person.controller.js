const pool = require('../db');

const getAllPerson = async (req, res, next) => {

  try {
    const allPerson = await pool.query('SELECT * FROM person')
    res.json(allPerson.rows)
  } catch (error) {
    next(error);
  }
};

const getPerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM person WHERE person_id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const createPerson = async (req, res, next) => {
  const { first_name, last_name, email, phone } = req.body;

  try {
    const result = await pool.query('INSERT INTO person (first_name, last_name, email, phone) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, phone]);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const deletePerson = async (req, res, next) => {

  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM person WHERE person_id = $1 RETURNING *', [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    console.log(result.rows[0]);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

const updatePerson = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone } = req.body;

    const result = await pool.query(
      'UPDATE person SET first_name = $1, last_name = $2, email = $3, phone = $4 WHERE person_id = $5 RETURNING *', [first_name, last_name, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    //console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPerson,
  getPerson,
  createPerson,
  deletePerson,
  updatePerson
}