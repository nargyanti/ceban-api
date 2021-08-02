const sql = require("./db.js");

// constructor
const Subject = function(subject) {
    this.name = subject.name;
    this.teacher_id = subject.teacher_id;
    this.school_year = subject.school_year;
};

Subject.create = (newSubjectDetail, result) => {
    sql.query("INSERT INTO subjects SET ?", newSubjectDetail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created subject: ", { id: res.insertId, ...newSubjectDetail });
        result(null, { id: res.insertId, ...newSubjectDetail });
    });
};

Subject.findById = (subjectId, result) => {
    sql.query(`SELECT * FROM subjects WHERE id = ${subjectId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found subject: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Subject with the id
        result({ kind: "not_found" }, null);
    });
};

Subject.getAll = result => {
    sql.query("SELECT * FROM subjects", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("subjects: ", res);
        result(null, res);
    });
};

Subject.updateById = (id, subject, result) => {
    sql.query(
        "UPDATE subjects SET name = ?, teacher_id = ?, school_year = ? WHERE id = ?",
        [subject.name, subject.teacher_id, subject.school_year, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Subject with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated subject: ", { id: id, ...subject });
            result(null, { id: id, ...subject });
        }
    );
};

Subject.remove = (id, result) => {
    sql.query("DELETE FROM subjects WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Subject with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted subject with id: ", id);
        result(null, res);
    });
};

Subject.removeAll = result => {
    sql.query("DELETE FROM subjects", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} subjects`);
        result(null, res);
    });
};

module.exports = Subject;