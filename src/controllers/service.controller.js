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

const getserviceRecord = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT S.service_id, S.hours, CASE WHEN S.status_rating = 'N' " +
        "THEN 'No calificaste este servicio' ELSE 'Servicio calificado' END status_rating, " +
        "P.first_name || ' ' || P.last_name AS name, CASE WHEN S.status = 'N' THEN 'Servicio cancelado' " +
        "ELSE 'Servicio completado' END status, S.description, W.names, CASE WHEN Pa.status = 'N' " +
        "THEN 'Pendiente por pagar' ELSE 'Pagado' END statusPay " +
        "FROM service S INNER JOIN works W ON S.work_id = W.work_id INNER JOIN EMPLOYEE E " +
        "ON S.employee_id = E.employee_id INNER JOIN person P ON E.employee_id = P.person_id " +
        "left JOIN pay Pa ON S.service_id = Pa.service_id WHERE S.user_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Este usuario no ha realizado ningun servicio' })
        }
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
}

const createservice = async (req, res, next) => {
    const { hours, user_id, employee_id, description, work_id } = req.body;

    try {
        const result = await pool.query("INSERT INTO service (hours, status_rating, user_id, employee_id, status, description, work_id) VALUES ($1, 'N', $2, $3, 'Y', $4, $5) RETURNING *", [hours, user_id, employee_id, description, work_id]);
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
    const { hours, status_rating, user_id, employee_id, description } = req.body;
    try{
        const result = await pool.query("UPDATE service SET hours = $1, status_rating = $2, user_id = $3, employee_id = $4, description = $5 WHERE service_id = $6 RETURNING *", [hours, status_rating, user_id, employee_id, description, id]);
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
    getserviceRecord,
    createservice,
    deleteservice,
    updateservice
}