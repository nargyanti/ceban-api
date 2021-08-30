const StudentClass = require("../models/student_class.model.js")

// Create and Save a new StudentClass
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a StudentClass
    const studentClasses = new StudentClass({
        student_id: req.body.student_id,
        class_id: req.body.class_id,
        roll_number: req.body.roll_number
    });

    // Save StudentClass in the database
    StudentClass.create(studentClasses, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the StudentClass."
            });
        else res.send(data);
    });
};

// Retrieve all StudentClasses from the database.
exports.findAll = (req, res) => {
    StudentClass.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving student_classes."
            });
        else res.send(data);
    });
};

// Find a single StudentClass with a scId
exports.findOne = (req, res) => {
    StudentClass.findById(req.params.scId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StudentClass with id ${req.params.scId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving StudentClass with id ${req.params.scId}`
                });
            }
        } else res.send(data);
    });
};

exports.findStudentList = (req, res) => {
    StudentClass.findStudentList(req.params.classId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StudentClass with class_id ${req.params.classId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving StudentClass with class_id ${req.params.classId}`
                });
            }
        } else res.send(data);
    });
};


exports.findSubjectList = (req, res) => {
    Subject.findSubjectList(req.params.classId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Subject with class_id ${req.params.classId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Subject with class_id " + req.params.classId
                });
            }
        } else res.send(data);
    });
};

// Update a StudentClass identified by the scId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    StudentClass.updateById(
        req.params.scId,
        new StudentClass(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found StudentClass with id ${req.params.scId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating StudentClass with id " + req.params.scId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a StudentClass with the specified scId in the request
exports.delete = (req, res) => {
    StudentClass.remove(req.params.scId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found StudentClass with id ${req.params.scId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete StudentClass with id " + req.params.scId
                });
            }
        } else res.send({ message: `StudentClass was deleted successfully!` });
    });
};

// Delete all StudentClasses from the database.
exports.deleteAll = (req, res) => {
    StudentClass.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all student_classes."
            });
        else res.send({ message: `All StudentClasses were deleted successfully!` });
    });
};