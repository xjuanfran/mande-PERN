const pool = require('../db');

//Esta funcion trae todos los trabajos que estan activos en status Y
const getAllWork = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM works WHERE status = 'Y'");
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
};

//devuelve todos los trabajos que tiene un employee en estado Y
const getAllMyWorks = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT W.work_id, W.names, EW.price_hour, " +
        " EW.description " +
        "FROM works W INNER JOIN employees_work EW " +
        "ON W.work_id = EW.work_id " +
        "INNER JOIN employee E " +
        "ON E.employee_id = EW.employee_id " +
        "WHERE W.status = 'Y' and EW.status = 'Y' and E.employee_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Este trabajador aun no tiene profesiones' })
        }
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
}

//Esta funcion trae todos los trabajos que estan activos y que tienen empleados asignados en status Y
const getActiveWork = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM works WHERE " +
                "work_id IN (SELECT work_id FROM employees_work WHERE status = 'Y') " +
                "AND status = 'Y' ORDER BY work_id asc ");
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
};

//Devuelve un registro especifico de trabajo en estado Y
const getWork = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM works WHERE work_id = $1 AND status = 'Y'", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el trabajo' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

//Esta funcion crea un registro de trabajo
const createWork = async (req, res, next) => {
    const { names } = req.body;
    try {
        const result = await pool.query("INSERT INTO works (names, status) VALUES ($1, 'Y') RETURNING *", [names]);
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }

}

//Esta funcion inactiva un registro de la table works poniendo su status en N
const deleteWork = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await pool.query("UPDATE works SET status = 'N' WHERE work_id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el trabajo' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

//Esta funcion actualiza un registro de la table works
const updateWork = async (req, res, next) => {
    const { id } = req.params;
    const { names } = req.body;
    try{
        const result = await pool.query("UPDATE works SET names = $1 WHERE work_id = $2 RETURNING *", [names, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el trabajo' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getAllWork,
    getAllMyWorks,
    getActiveWork,
    getWork,
    createWork,
    deleteWork,
    updateWork
}