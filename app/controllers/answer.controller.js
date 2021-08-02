const Answer = require("../models/answer.model.js");

// Create and Save a new Answer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Answer
    const answer = new Answer({
        assignment_id: req.body.assignment_id,
        student_id: req.body.student_id,
        submit_datetime: req.body.submit_datetime,
        score: req.body.score,
    });

    // Save Answer in the database
    Answer.create(answer, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Answer."
            });
        else res.send(data);
    });
};

// Retrieve all Answers from the database.
exports.findAll = (req, res) => {
    Answer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Answer with a answerId
exports.findOne = (req, res) => {
    Answer.findById(req.params.answerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Answer with id ${req.params.answerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Answer with id " + req.params.answerId
                });
            }
        } else res.send(data);
    });
};

// Update a Answer identified by the answerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Answer.updateById(
        req.params.answerId,
        new Answer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Answer with id ${req.params.answerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Answer with id " + req.params.answerId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Answer with the specified answerId in the request
exports.delete = (req, res) => {
    Answer.remove(req.params.answerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Answer with id ${req.params.answerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Answer with id " + req.params.answerId
                });
            }
        } else res.send({ message: `Answer was deleted successfully!` });
    });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
    Answer.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Answers were deleted successfully!` });
    });
};