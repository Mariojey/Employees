const express = require("express");
const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployee);
router.get('/:id', employeeController.getEmployeeById);

module.exports = router;