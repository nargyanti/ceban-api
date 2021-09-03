const Assignment = require("../models/assignment.model.js");

// Create and Save a new Assignment
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Assignment
    const assignment = new Assignment({
        subject_id: req.body.subject_id,
        name: req.body.name,
        question: req.body.question,
        due_datetime: req.body.due_datetime
    });

    // Save Assignment in the database
    Assignment.create(assignment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Assignment."
            });
        else res.send(data);
    });
};

// Retrieve all Assignments from the database.
exports.findAll = (req, res) => {
    Assignment.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assignments."
            });
        else res.send(data);
    });
};

// Find a single Assignment with a assignmentId
exports.findOne = (req, res) => {
    Assignment.findById(req.params.assignmentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Assignment with id ${req.params.assignmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Assignment with id " + req.params.assignmentId
                });
            }
        } else res.send(data);
    });
};

exports.findAssignmentList = (req, res) => {
    Assignment.findAssignmentList(req.params.subjectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Assignment with subject_id ${req.params.subjectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Assignment with subject_id " + req.params.subjectId
                });
            }
        } else res.send(data);
    });
};

// Update a Assignment identified by the assignmentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Assignment.updateById(
        req.params.assignmentId,
        new Assignment(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Assignment with id ${req.params.assignmentId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Assignment with id " + req.params.assignmentId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Assignment with the specified assignmentId in the request
exports.delete = (req, res) => {
    Assignment.remove(req.params.assignmentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Assignment with id ${req.params.assignmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Assignment with id " + req.params.assignmentId
                });
            }
        } else res.send({ message: `Assignment was deleted successfully!` });
    });
};

// Delete all Assignments from the database.
exports.deleteAll = (req, res) => {
    Assignment.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all assignments."
            });
        else res.send({ message: `All Assignments were deleted successfully!` });
    });
};

exports.getStudentById = (req, res) => {
    Assignment.getStudentById(req.params.assignmentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Assignment with id ${req.params.assignmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Assignment with id " + req.params.assignmentId
                });
            }
        } else res.send(data);
    }) 
}