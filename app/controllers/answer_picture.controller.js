const AnswerPicture = require("../models/answer_picture.model.js");

// Create and Save a new AnswerPicture
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const file = req.file.filename;
    console.log(file);

    if (!file) {
        res.status(400).send({
            status: false,
            data: "No File is selected.",
        });
    }

    // Create a AnswerPicture
    const answer_picture = new AnswerPicture({
        answer_id: req.body.answer_id,
        path: req.file.filename,
        convert_result: "Anggap ini hasil convert pake Tesseract.js",
    });

    // Save AnswerPicture in the database
    AnswerPicture.create(answer_picture, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AnswerPicture."
            });
        else res.send(data);
    });
};

// Retrieve all Answers from the database.
exports.findAll = (req, res) => {
    AnswerPicture.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single AnswerPicture with a answerPictureId
exports.findOne = (req, res) => {
    AnswerPicture.findById(req.params.answerPictureId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AnswerPicture with id ${req.params.answerPictureId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving AnswerPicture with id " + req.params.answerPictureId
                });
            }
        } else res.send(data);
    });
};

exports.getAnswerDetail = (req, res) => {
    AnswerPicture.getAnswerDetail(req.params.answerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AnswerPicture with answer_id ${req.params.answerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving AnswerPicture with answer_id " + req.params.answerId
                });
            }
        } else res.send(data);
    });
};

// Update a AnswerPicture identified by the answerPictureId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    AnswerPicture.updateById(
        req.params.answerPictureId,
        new AnswerPicture(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found AnswerPicture with id ${req.params.answerPictureId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating AnswerPicture with id " + req.params.answerPictureId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a AnswerPicture with the specified answerPictureId in the request
exports.delete = (req, res) => {
    AnswerPicture.remove(req.params.answerPictureId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AnswerPicture with id ${req.params.answerPictureId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete AnswerPicture with id " + req.params.answerPictureId
                });
            }
        } else res.send({ message: `AnswerPicture was deleted successfully!` });
    });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
    AnswerPicture.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Answers were deleted successfully!` });
    });
};