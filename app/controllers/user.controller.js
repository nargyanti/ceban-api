const User = require("../models/user.model.js");
const md5 = require('md5');

// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        telp: req.body.telp,
        password: md5(req.body.password),
        level: req.body.level,
        entry_year: req.body.entry_year
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving User with id ${req.params.userId}`
                });
            }
        } else res.send(data);
    });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userId
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        else res.send({ message: `All Users were deleted successfully!` });
    });
};

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Save User in the database
    User.login(req.body.username, md5(req.body.password), (err, data) => {
        if (res.length > 0) {
            req.session.loggedin = true;
            req.session.username = req.body.username;
        }

        if (err)
            res.status(500).send({
                message:
                    err.message || "You can't login"
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving User with id ${req.params.userId}`
                });
            }
        } else res.send(data);
    });
};

exports.findSubjectByStudentId = (req, res) => {
    User.getByStudentId(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving User with id ${req.params.userId}`
                });
            }
        } else res.send(data);
    })
}
