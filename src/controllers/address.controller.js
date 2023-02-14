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
  const { description, person_id } = req.body;

  try {

    //Obtiene las coordenadas de la dirección
    const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${description}`);
    const data = await geo.json();
    if(data.length === 0){
      return res.status(404).json({ message: 'Address not found' });
    }
    else{
      var coordenates = data[0].lon + " " + data[0].lat;
    }
    //Aqui termina la obtención de las coordenadas

    //Comienza la inserción de los datos
    const result = await pool.query("INSERT INTO address (description, person_id, status, coordenates) VALUES ($1, $2, 'Y', ST_GeomFromText('POINT(" + coordenates + ")', 4326)) RETURNING *", [description, person_id]);
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
    const { description } = req.body;

    //Obtiene las coordenadas de la dirección
    const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${description}`);
    const data = await geo.json();
    let coordenates = data[0].lon + " " + data[0].lat;
    //Aqui termina la obtención de las coordenadas

    const result = await pool.query(
      "UPDATE address SET description = $1, coordenates = ST_GeomFromText('POINT(" + coordenates + ")', 4326) WHERE address_id = $2 RETURNING *", [description, id]
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