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

exports.getEmployee = async(req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let department = req.query.department || "All";
        let title = req.query.title || "All";

        const departmentOptions = Employee.find('department');
        const titleOptins = Employee.find('title');
        department === "All" ?
            (department = [...departmentOptions]) :
            (department = req.query.department.split(","));
        title === "All" ?
            (title = [...titleOptins]) :
            (title = req.query.title.split(","))

        const employees = await Employee.find({ name: { $regex: search, $options: "i" } })
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).send(error)
    }
}

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

exports.getEmployeeByName = (req, res) => {
    let name = req.query.name
    Employee.find({ firstName: { $regex: name, $options: "i" } }, (err, employee) => {
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
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(422).send('Crud update fail');
        })
}