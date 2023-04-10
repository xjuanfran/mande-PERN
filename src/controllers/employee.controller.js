const pool = require('../db');

//Devuelve todos los registros de employees en estado Y
const getAllemployee = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM employee WHERE status = 'Y'");
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
};

//devuelve todos los empleados que tiene un trabajo en estado Y
const getAllWorkEmployee = async (req, res, next) => {
    const { id_work, idUser } = req.params;
    try {

        const resultAddress = await pool.query("SELECT description FROM address WHERE address_id = $1 AND status = 'Y'", [idUser]);
        direccionUsuario = resultAddress.rows[0].description;

        const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${direccionUsuario}`);
        const data = await geo.json();
        let coordenates = data[0].lon + " " + data[0].lat;
        console.log(coordenates);

        const result = await pool.query("SELECT E.employee_id, P.first_name, P.last_name, " +
            "E.profile_picture, EW.work_id, EW.price_hour, EW.description, " +
            "CASE WHEN total_jobs = 0 THEN 0 ELSE R.rating/total_jobs END scored, A.description AS direccion, " +
            "ST_Distance(ST_GeographyFromText('POINT (" + coordenates + ")'), coordenates) AS distance  "+
            "FROM address A INNER JOIN employee E " +
                "ON A.person_id = E.employee_id " +
                "AND A.status = 'Y' " +
                "AND E.status = 'Y' " +
                "AND available = 'Y' " +
            "INNER JOIN person P " +
                "ON P.person_id = E.employee_id " +
                "AND P.status = 'Y' " +
            "INNER JOIN reviews R " +
                "ON R.employee_id = E.employee_id " +
            "INNER JOIN employees_work EW " +
                "ON EW.employee_id = E.employee_id " +
                "AND EW.status = 'Y' " +
            "WHERE " +
            "EW.work_id = $1 AND E.employee_id <> $2 " +
            "ORDER BY " +
            "8, 10, 6 DESC", [id_work, idUser]);
            console.log(id_work, idUser);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Este trabajo aun no tiene empleados' })
        }
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
}

//Devuelve un registro especifico de employee en estado Y
const getemployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM employee WHERE employee_id = $1 AND status = 'Y'", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el empleado' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

//crea un registro de employee
const createemployee = async (req, res, next) => {
    const { employee_id, photo_id, profile_picture } = req.body;

    try {
        const result = await pool.query("INSERT INTO employee (employee_id, photo_id, profile_picture, available, cash, status) VALUES ($1, $2, $3, 'Y', 0, 'Y') RETURNING *", [employee_id, photo_id, profile_picture]);
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }

}

//Inactiva un registro de employee poniendo su status en N
const deleteemployee = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await pool.query("UPDATE employee SET status = 'N' WHERE employee_id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el empleado' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

//Actualiza un registro de employee
const updateemployee = async (req, res, next) => {
    const { id } = req.params;
    const { photo_id, profile_picture, available, cash } = req.body;
    try{
        const result = await pool.query("UPDATE employee SET photo_id = $1, profile_picture = $2, available = $3, cash = $4 WHERE employee_id = $5 RETURNING *", [photo_id, profile_picture, available, cash, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el empleado' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getAllemployee,
    getAllWorkEmployee,
    getemployee,
    createemployee,
    deleteemployee,
    updateemployee
}