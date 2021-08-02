const ClassModel = require("../models/class.model.js");

// Create and Save a new ClassModel
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a ClassModel
    const classModel = new ClassModel({
        class_name: req.body.class_name,
    });

    // Save ClassModel in the database
    ClassModel.create(classModel, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ClassModel."
            });
        else res.send(data);
    });
};

// Retrieve all Classes from the database.
exports.findAll = (req, res) => {
    ClassModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving classes."
            });
        else res.send(data);
    });
};

// Find a single ClassModel with a classId
exports.findOne = (req, res) => {
    ClassModel.findById(req.params.classId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ClassModel with id ${req.params.classId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving ClassModel with id " + req.params.classId
                });
            }
        } else res.send(data);
    });
};

// Update a ClassModel identified by the classId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ClassModel.updateById(
        req.params.classId,
        new ClassModel(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ClassModel with id ${req.params.classId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating ClassModel with id " + req.params.classId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a ClassModel with the specified classId in the request
exports.delete = (req, res) => {
    ClassModel.remove(req.params.classId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ClassModel with id ${req.params.classId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete ClassModel with id " + req.params.classId
                });
            }
        } else res.send({ message: `ClassModel was deleted successfully!` });
    });
};

// Delete all Classes from the database.
exports.deleteAll = (req, res) => {
    ClassModel.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all classes."
            });
        else res.send({ message: `All Classes were deleted successfully!` });
    });
};