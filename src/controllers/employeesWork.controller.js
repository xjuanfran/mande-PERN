const pool = require('../db');

//devuelve todos los registros de employeesWork en estado Y
const getAllEmployeesWork = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM employees_work WHERE status = 'Y'");
    res.json(result.rows)
  } catch (error) {
    next(error);
  }
};

//devuelve un registro especifico de employeesWork en estado Y Donde emp_id es el id del empleado y w_id el id del trabajador
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

//crea un registro de employeesWork
const createEmployeesWork = async (req, res, next) => {
  const { employee_id, work_id, price_hour, description } = req.body;

  try {
    const result = await pool.query("INSERT INTO employees_work ( employee_id, work_id, price_hour, status, description) VALUES ($1, $2, $3, 'Y', $4) RETURNING *", [employee_id, work_id, price_hour, description]);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

//Inactiva un registro de employeesWork poniendo su status en N
const deleteEmployeesWork = async (req, res, next) => {
  try {
    const { emp_id, w_id } = req.params;

    const result = await pool.query("UPDATE employees_work SET status = 'N' WHERE employee_id = $1 AND work_id = $2 RETURNING *", [emp_id, w_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se puedo eliminar el trabajo del empleado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

//Actualiza un registro de employeesWork
const updateEmployeesWork = async (req, res, next) => {
  try {
    const { emp_id, w_id } = req.params;
    const { price_hour, description } = req.body;

    const result = await pool.query(
      'UPDATE employees_work SET price_hour = $1, description = $2 WHERE employee_id = $3 AND work_id = $4 RETURNING *', [price_hour, description, emp_id, w_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se puedo actualizar el trabajo del empleado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllEmployeesWork,
  getEmployeesWork,
  createEmployeesWork,
  deleteEmployeesWork,
  updateEmployeesWork
}