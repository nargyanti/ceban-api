const sql = require("./db.js");

// constructor
const ClassModel = function(classModel) {
    this.class_name = classModel.class_name;
};

ClassModel.create = (newClass, result) => {
    sql.query("INSERT INTO classes SET ?", newClass, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created classModel: ", { id: res.insertId, ...newClass });
        result(null, { id: res.insertId, ...newClass });
    });
};

ClassModel.findById = (classId, result) => {
    sql.query(`SELECT * FROM classes WHERE id = ${classId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found classModel: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found ClassModel with the id
        result({ kind: "not_found" }, null);
    });
};

ClassModel.getAll = result => {
    sql.query("SELECT * FROM classes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("classes: ", res);
        result(null, res);
    });
};

ClassModel.updateById = (id, classModel, result) => {
    sql.query(
        "UPDATE classes SET class_name = ? WHERE id = ?",
        [classModel.class_name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ClassModel with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated classModel: ", { id: id, ...classModel });
            result(null, { id: id, ...classModel });
        }
    );
};

ClassModel.remove = (id, result) => {
    sql.query("DELETE FROM classes WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ClassModel with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted classModel with id: ", id);
        result(null, res);
    });
};

ClassModel.removeAll = result => {
    sql.query("DELETE FROM classes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} classes`);
        result(null, res);
    });
};

module.exports = ClassModel;