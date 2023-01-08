const pool = require('../db');

const getAllWork = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM works");
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
};

const getWork = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM works WHERE work_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json("No existe el trabajo")
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

const createWork = async (req, res, next) => {
    const { names } = req.body;
    try {
        const result = await pool.query("INSERT INTO works (names) VALUES ($1) RETURNING *", [names]);
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }

}

const deleteWork = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await pool.query("DELETE FROM works WHERE work_id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json("No existe el trabajo")
        }
        console.log(result.rows[0]);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}

const updateWork = async (req, res, next) => {
    const { id } = req.params;
    try{
        const { names } = req.body;
        const result = await pool.query("UPDATE works SET names = $1 WHERE work_id = $2 RETURNING *", [names, id]);
        if (result.rows.length === 0) {
            return res.status(404).json("No existe el trabajo")
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
    
}

module.exports = {
    getAllWork,
    getWork,
    createWork,
    deleteWork,
    updateWork
}