const sql = require("./db.js");

// constructor
const Subject = function(subject) {
    this.name = subject.name;
    this.teacher_id = subject.teacher_id;
    this.school_year = subject.school_year;
    this.class_id = subject.class_id;
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

Subject.findSubjectList = (classId, result) => {
    sql.query(`SELECT * FROM subjects WHERE class_id = ${classId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("subjects: ", res);
            result(null, res);
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
        "UPDATE subjects SET name = ?, teacher_id = ?, school_year = ?, class_id = ? WHERE id = ?",
        [subject.name, subject.teacher_id, subject.school_year, subject.class_id, id],
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

Subject.getByStudentId = (studentId, result) => {
    sql.query(
        `SELECT s.id,
        s.name,
        s.teacher_id,
        s.school_year,
        c.id
        c.class_name,
        u.name as teacher_name,
        count(distinct a.id) as assignment_count,
        count(distinct sc.student_id)as student_count
        FROM subjects as s
        INNER JOIN users as u ON u.id = s.teacher_id
        INNER JOIN classes as c ON c.id = s.class_id
        INNER JOIN student_classes as sc ON sc.class_id = c.id
        LEFT JOIN assignments a on s.id = a.subject_id
        WHERE sc.student_id = ${studentId}
        GROUP BY s.id;`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, res);
        }
    );
};

Subject.getByTeacherId = (teacherId, result) => {
    sql.query(
        `SELECT s.id,
        s.name,
        s.teacher_id,
        s.school_year,
        c.id
        c.class_name,
        u.name as teacher_name,
        count(distinct a.id) as assignment_count,
        count(distinct sc.student_id)as student_count
        FROM subjects as s
        INNER JOIN users as u ON u.id = s.teacher_id
        INNER JOIN classes as c ON c.id = s.class_id
        INNER JOIN student_classes as sc ON sc.class_id = c.id
        LEFT JOIN assignments a on s.id = a.subject_id
        WHERE s.teacher = ${teacherId}
        GROUP BY s.id;`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, res);
        }
    );
};

module.exports = Subject;