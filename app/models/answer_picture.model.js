const sql = require("./db.js");

// constructor
const AnswerPicture = function(answer_picture) {
    this.answer_id = answer_picture.answer_id;
    this.path = answer_picture.path;
    this.convert_result = answer_picture.convert_result;
};

AnswerPicture.create = (newAnswerPicture, result) => {
    sql.query("INSERT INTO answer_pictures SET ?", newAnswerPicture, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created answer_picture: ", { id: res.insertId, ...newAnswerPicture });
        result(null, { id: res.insertId, ...newAnswerPicture });
    });
};

AnswerPicture.findById = (answerPictureId, result) => {
    sql.query(`SELECT * FROM answer_pictures WHERE id = ${answerPictureId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found answer_picture: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found AnswerPicture with the id
        result({ kind: "not_found" }, null);
    });
};

AnswerPicture.getAll = result => {
    sql.query("SELECT * FROM answer_pictures", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("answer_pictures: ", res);
        result(null, res);
    });
};

AnswerPicture.getAnswerDetail = (answerId, result) => {
    sql.query(`SELECT * FROM answer_pictures WHERE answer_id = ${answerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("answer_pictures: ", res);
            result(null, res);
            return;
        }

        // not found AnswerPicture with the id
        result({ kind: "not_found" }, null);
    });
};

AnswerPicture.updateById = (id, answer_picture, result) => {
    sql.query(
        "UPDATE answer_pictures SET answer_id = ?, path = ?, convert_result = ? WHERE id = ?",
        [answer_picture.answer_id, answer_picture.path, answer_picture.convert_result, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found AnswerPicture with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated answer_picture: ", { id: id, ...answer_picture });
            result(null, { id: id, ...answer_picture });
        }
    );
};

AnswerPicture.remove = (id, result) => {
    sql.query("DELETE FROM answer_pictures WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found AnswerPicture with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted answer_picture with id: ", id);
        result(null, res);
    });
};

AnswerPicture.removeAll = (id, result) => {
    sql.query("DELETE FROM answer_pictures WHERE answer_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found AnswerPicture with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted answer_picture with id: ", id);
        result(null, res);
    });
};

module.exports = AnswerPicture;