const sql = require("./db.js");

// constructor
const Assignment = function(assignment) {
    this.subject_id = assignment.subject_id;
    this.name = assignment.name;
    this.question = assignment.question;
    this.due_datetime = assignment.due_datetime;
};

Assignment.create = (newAssignment, result) => {
    sql.query("INSERT INTO assignments SET ?", newAssignment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created assignment: ", { id: res.insertId, ...newAssignment });
        result(null, { id: res.insertId, ...newAssignment });
    });
};

Assignment.findById = (assignmentId, result) => {
    sql.query(`SELECT * FROM assignments WHERE id = ${assignmentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found assignment: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Assignment with the id
        result({ kind: "not_found" }, null);
    });
};

Assignment.getAll = result => {
    sql.query("SELECT * FROM assignments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("assignments: ", res);
        result(null, res);
    });
};

Assignment.updateById = (id, assignment, result) => {
    sql.query(
        "UPDATE assignments SET subject_id = ?, name = ?, question = ?, due_datetime = ? WHERE id = ?",
        [assignment.subject_id, assignment.name, assignment.question, assignment.due_datetime, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Assignment with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated assignment: ", { id: id, ...assignment });
            result(null, { id: id, ...assignment });
        }
    );
};

Assignment.remove = (id, result) => {
    sql.query("DELETE FROM assignments WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Assignment with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted assignment with id: ", id);
        result(null, res);
    });
};

Assignment.removeAll = result => {
    sql.query("DELETE FROM assignments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} assignments`);
        result(null, res);
    });
};

module.exports = Assignment;