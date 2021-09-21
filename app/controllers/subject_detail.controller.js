const SubjectDetail = require("../models/subject_detail.model.js");
// const Teacher = require("../models/user.model.js");

// Create and Save a new SubjectDetail
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a SubjectDetail
    const subject_detail = new SubjectDetail({
        subject_id: req.body.subject_id,
        student_id: req.body.student_id
    });

    // Save SubjectDetail in the database
    SubjectDetail.create(subject_detail, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SubjectDetail."
            });
        else res.send(data);
    });
};

// Retrieve all Subjects from the database.
exports.findAll = (req, res) => {
    SubjectDetail.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving subject_details."
            });
        else res.send(data);
    });
};

// Find a single SubjectDetail with a sdId
exports.findOne = (req, res) => {
    SubjectDetail.findById(req.params.sdId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SubjectDetail with id ${req.params.sdId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving SubjectDetail with id " + req.params.sdId
                });
            }
        } else res.send(data);
    });
};

// Update a SubjectDetail identified by the sdId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    SubjectDetail.updateById(
        req.params.sdId,
        new SubjectDetail(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found SubjectDetail with id ${req.params.sdId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating SubjectDetail with id " + req.params.sdId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a SubjectDetail with the specified sdId in the request
exports.delete = (req, res) => {
    SubjectDetail.remove(req.params.sdId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SubjectDetail with id ${req.params.sdId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete SubjectDetail with id " + req.params.sdId
                });
            }
        } else res.send({ message: `SubjectDetail was deleted successfully!` });
    });
};

// Delete all Subjects from the database.
exports.deleteAll = (req, res) => {
    SubjectDetail.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all subject_details."
            });
        else res.send({ message: `All Subjects were deleted successfully!` });
    });
};