const sql = require("./db.js");

// constructor
const Answer = function(answer) {
    this.assignment_id = answer.assignment_id;
    this.student_id = answer.student_id;
    this.submit_datetime = answer.submit_datetime;
    this.score = answer.score;
};

Answer.create = (newAnswer, result) => {
    sql.query("INSERT INTO answers SET ?", newAnswer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created answer: ", { id: res.insertId, ...newAnswer });
        result(null, { id: res.insertId, ...newAnswer });
    });
};

Answer.findById = (answerId, result) => {
    sql.query(`SELECT * FROM answers WHERE id = ${answerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found answer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Answer with the id
        result({ kind: "not_found" }, null);
    });
};

Answer.getAll = result => {
    sql.query("SELECT * FROM answers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("answers: ", res);
        result(null, res);
    });
};

Answer.updateById = (id, answer, result) => {
    sql.query(
        "UPDATE answers SET assignment_id = ?, student_id = ?, submit_datetime = ?, score = ? WHERE id = ?",
        [answer.assignment_id, answer.student_id, answer.submit_datetime, answer.score, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Answer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated answer: ", { id: id, ...answer });
            result(null, { id: id, ...answer });
        }
    );
};

Answer.remove = (id, result) => {
    sql.query("DELETE FROM answers WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Answer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted answer with id: ", id);
        result(null, res);
    });
};

Answer.removeAll = result => {
    sql.query("DELETE FROM answers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} answers`);
        result(null, res);
    });
};

module.exports = Answer;