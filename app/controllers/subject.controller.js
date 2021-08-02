const Customer = require("../models/subject.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const subject = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    // Save Customer in the database
    Customer.create(subject, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

// Retrieve all Subjects from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving subjects."
            });
        else res.send(data);
    });
};

// Find a single Customer with a subjectId
exports.findOne = (req, res) => {
    Customer.findById(req.params.subjectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.subjectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.subjectId
                });
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the subjectId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.updateById(
        req.params.subjectId,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.subjectId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.subjectId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified subjectId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.subjectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.subjectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.subjectId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// Delete all Subjects from the database.
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all subjects."
            });
        else res.send({ message: `All Subjects were deleted successfully!` });
    });
};