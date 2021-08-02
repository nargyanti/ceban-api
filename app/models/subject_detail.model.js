const sql = require("./db.js");

// constructor
const SubjectDetail = function(subject_detail) {
    this.subject_id = subject_detail.subject_id;
    this.student_id = subject_detail.student_id;
};

SubjectDetail.create = (newSubjectDetail, result) => {
    sql.query("INSERT INTO subject_details SET ?", newSubjectDetail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created subject_detail: ", { id: res.insertId, ...newSubjectDetail });
        result(null, { id: res.insertId, ...newSubjectDetail });
    });
};

SubjectDetail.findById = (sdId, result) => {
    sql.query(`SELECT * FROM subject_details WHERE id = ${sdId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found subject_detail: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found SubjectDetail with the id
        result({ kind: "not_found" }, null);
    });
};

SubjectDetail.getAll = result => {
    sql.query("SELECT * FROM subject_details", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("subject_details: ", res);
        result(null, res);
    });
};

SubjectDetail.updateById = (id, subject_detail, result) => {
    sql.query(
        "UPDATE subject_details SET subject_id = ?, student_id = ? WHERE id = ?",
        [subject_detail.subject_id, subject_detail.student_id, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found SubjectDetail with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated subject_detail: ", { id: id, ...subject_detail });
            result(null, { id: id, ...subject_detail });
        }
    );
};

SubjectDetail.remove = (id, result) => {
    sql.query("DELETE FROM subject_details WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found SubjectDetail with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted subject_detail with id: ", id);
        result(null, res);
    });
};

SubjectDetail.removeAll = result => {
    sql.query("DELETE FROM subject_details", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} subject_details`);
        result(null, res);
    });
};

module.exports = SubjectDetail;