const pool = require('../db');

const getAllEmployeesWork = async (req, res, next) => {

  try {
    const result = await pool.query("SELECT * FROM employees_work");
    res.json(result.rows)
  } catch (error) {
    next(error);
  }
};

const getEmployeesWork = async (req, res, next) => {
  try {
    const { emp_id, w_id } = req.params;

    const result = await pool.query("SELECT * FROM employees_work WHERE employee_id = $1 AND work_id = $2", [emp_id, w_id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trabajo del empleado no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const createEmployeesWork = async (req, res, next) => {
  const { employee_id, work_id, price_hour } = req.body;

  try {
    const result = await pool.query("INSERT INTO employees_work ( employee_id, work_id, price_hour) VALUES ($1, $2, $3) RETURNING *", [employee_id, work_id, price_hour]);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const updateEmployeesWork = async (req, res, next) => {

  try {
    const { emp_id, w_id } = req.params;
    const { employee_id, work_id, price_hour } = req.body;

    const result = await pool.query(
      'UPDATE employees_work SET employee_id = $1, work_id = $2, price_hour = $3 WHERE employee_id = $4 AND work_id = $5 RETURNING *', [employee_id, work_id, price_hour, emp_id, w_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se puedo actualizar el trabajo del empleado' });
    }
    //console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllEmployeesWork,
  getEmployeesWork,
  createEmployeesWork,
  updateEmployeesWork
}