const pool = require('../db');

const getAllservice = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM service WHERE status = 'Y'");
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
};

const getservice = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM service WHERE service_id = $1 AND status = 'Y'", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el servicio' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

const createservice = async (req, res, next) => {
    const { hours, status_rating, user_id, employee_id, pay_id } = req.body;

    try {
        const result = await pool.query("INSERT INTO service (hours, status_rating, user_id, employee_id, pay_id, status) VALUES ($1, $2, $3, $4, $5, 'Y') RETURNING *", [hours, status_rating, user_id, employee_id, pay_id]);
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }

}

const deleteservice = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await pool.query("UPDATE service SET status = 'N' WHERE service_id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el servicio' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

const updateservice = async (req, res, next) => {
    const { id } = req.params;
    const { hours, status_rating, user_id, employee_id, pay_id } = req.body;
    try{
        const result = await pool.query("UPDATE service SET hours = $1, status_rating = $2, user_id = $3, employee_id, = $4, pay_id = $5 WHERE service_id = $6 RETURNING *", [hours, status_rating, user_id, employee_id, pay_id, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el servicio' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getAllservice,
    getservice,
    createservice,
    deleteservice,
    updateservice
}