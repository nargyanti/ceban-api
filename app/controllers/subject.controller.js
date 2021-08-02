const Subject = require("../models/subject.model.js");
// const Teacher = require("../models/user.model.js");

// Create and Save a new Subject
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Subject
    const subject = new Subject({
        name: req.body.name,
        teacher_id: req.body.teacher_id,
        school_year: req.body.school_year
    });

    // Save Subject in the database
    Subject.create(subject, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Subject."
            });
        else res.send(data);
    });
};

// Retrieve all Subjects from the database.
exports.findAll = (req, res) => {
    Subject.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving subjects."
            });
        else res.send(data);
    });
};

// Find a single Subject with a subjectId
exports.findOne = (req, res) => {
    Subject.findById(req.params.subjectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Subject with id ${req.params.subjectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Subject with id " + req.params.subjectId
                });
            }
        } else res.send(data);
    });
};

// Update a Subject identified by the subjectId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Subject.updateById(
        req.params.subjectId,
        new Subject(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Subject with id ${req.params.subjectId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Subject with id " + req.params.subjectId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Subject with the specified subjectId in the request
exports.delete = (req, res) => {
    Subject.remove(req.params.subjectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Subject with id ${req.params.subjectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Subject with id " + req.params.subjectId
                });
            }
        } else res.send({ message: `Subject was deleted successfully!` });
    });
};

// Delete all Subjects from the database.
exports.deleteAll = (req, res) => {
    Subject.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all subjects."
            });
        else res.send({ message: `All Subjects were deleted successfully!` });
    });
};