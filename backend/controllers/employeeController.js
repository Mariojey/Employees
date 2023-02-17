const Employee = require("../models/Employee");

//Create Employee
exports.createEmployee = async(req, res, next) => {
    try {
        let employee = new Employee(req.body)
        await employee.save()
            .then((employee) => {
                res.status(200).send(employee)
            })
    } catch (error) {
        console.log(error);
        next(error)
    }
}


//Show all Employees
exports.getAllEmployee = (req, res) => {
    Employee.find((err, employees) => {
        res.json(employees)
    });
};

//Show employee with concret id
exports.getEmployeeById = (req, res) => {
    let id = req.params.id
    Employee.findById(id, (err, employee) => {
        if (!employee) {
            res.status(404).send('Result not found');
        } else {
            res.json(employee)
        }
    })
}

// Update Employee by ID
exports.updateEmployeeById = (req, res) => {
    let id = req.params.id
    Employee.findByIdAndUpdate(id, req.body)
        .then(() => {
            res.status(200).send('Employee updated');
        })
        .catch((err) => {
            res.status(422).send('Crud update fail');
        })
}