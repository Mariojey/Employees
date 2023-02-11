const Employee = require("../models/Employee");

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