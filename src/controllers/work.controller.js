const pool = require('../db');

const getAllWork = async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  //console.log(result);
  res.json(result.rows[0].now);
};

const getWork = async  (req, res) => {
  res.send("Get Puto")
}
    

const createWork = (req, res) => {
    res.send("Post Puto")
}

const deleteWork = (req, res) => {
    res.send("Te Elimine Putoooo")
}

const updateWork = (req, res) => {
    res.send("Te edite Putoooo")
}

module.exports = {
    getAllWork,
    getWork,
    createWork,
    deleteWork,
    updateWork
}