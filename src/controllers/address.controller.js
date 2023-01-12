const pool = require('../db');

//Devuelve todos los registros de addres en estado Y
const getAllAddress = async (req, res, next) => {
  try {
    const allAddress = await pool.query("SELECT * FROM address WHERE status = 'Y'");
    res.json(allAddress.rows)
  } catch (error) {
    next(error);
  }
};

//Devuelve un registro especifico de address en estado Y
const getAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM address WHERE address_id = $1 AND status = 'Y'", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

//devuelve todos los registros de address de un usuario en estado Y
const getUserAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM address WHERE person_id = $1 AND status = 'Y'", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}


//crea un registro de address
const createAddress = async (req, res, next) => {
  const { latitude, longitude, person_id } = req.body;
  try {
    const result = await pool.query("INSERT INTO address (latitude, longitude, person_id, status) VALUES ($1, $2, $3, 'Y') RETURNING *", [latitude, longitude, person_id]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

//Inactiva un registro de la table Address poniendo su status en N
const deleteAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("UPDATE address SET status = 'N' WHERE address_id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

//Actualiza un registro de la tabla Address
const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, person_id } = req.body;

    const result = await pool.query(
      'UPDATE address SET latitude = $1, longitude = $2, person_id = $3 WHERE address_id = $4 RETURNING *', [latitude, longitude, person_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }
    //console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAddress,
  getAllAddress,
  getUserAddress,
  createAddress,
  deleteAddress,
  updateAddress
}