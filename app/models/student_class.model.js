const sql = require("./db.js");

// constructor
const StudentClass = function(studentClass) {
    this.student_id = studentClass.student_id;
    this.class_id = studentClass.class_id;
    this.roll_number = studentClass.roll_number;
};

StudentClass.create = (newStudentClass, result) => {
    sql.query("INSERT INTO student_classes SET ?", newStudentClass, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created studentClass: ", { id: res.insertId, ...newStudentClass });
        result(null, { id: res.insertId, ...newStudentClass });
    });
};

StudentClass.findById = (stId, result) => {
    sql.query(`SELECT * FROM student_classes WHERE id = ${stId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found studentClass: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found StudentClass with the id
        result({ kind: "not_found" }, null);
    });
};

StudentClass.getAll = result => {
    sql.query("SELECT * FROM student_classes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("student_classes: ", res);
        result(null, res);
    });
};

StudentClass.findStudentList = (classId, result) => {
    sql.query(`SELECT u.id, u.name, u.entry_year, sc.roll_number, c.class_name FROM users as u INNER JOIN student_classes as sc ON u.id = sc.student_id INNER JOIN classes as c ON c.id = sc.class_id WHERE sc.class_id = ${classId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("students: ", res);
            result(null, res);
        }

        // not found Subject with the id
        result({ kind: "not_found" }, null);
    });
};

StudentClass.updateById = (id, studentClass, result) => {
    sql.query(
        "UPDATE student_classes SET class_id = ?, student_id = ?, roll_number = ? WHERE id = ?",
        [studentClass.class_id, studentClass.student_name, studentClass.roll_number, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found StudentClass with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated studentClass: ", { id: id, ...studentClass });
            result(null, { id: id, ...studentClass });
        }
    );
};

StudentClass.remove = (id, result) => {
    sql.query("DELETE FROM student_classes WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found StudentClass with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted studentClass with id: ", id);
        result(null, res);
    });
};

StudentClass.removeAll = result => {
    sql.query("DELETE FROM student_classes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} student_classes`);
        result(null, res);
    });
};

module.exports = StudentClass;