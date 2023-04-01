const express = require("express");
const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.patch('/:id', employeeController.updateEmployeeById);
router.get('/name/:name', employeeController.getEmployeeByName)
module.exports = router;