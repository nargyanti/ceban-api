const sql = require("./db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.username = user.username;
  this.telp = user.telp;
  this.password = user.password;
  this.level = user.level;
  this.entry_year = user.entry_year;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.login = (username, password, result) => {
  sql.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, res) => {
      console.log(username);
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found User with the id
      console.log(res);
      result(null, res);
    }
  );
};

User.getAll = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, username = ?, telp = ?, password = ?, level = ?, entry_year = ? WHERE id = ?",
    [
      user.name,
      user.username,
      user.telp,
      user.password,
      user.level,
      user.entry_year,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

User.getByStudentId = (studentId, result) => {
  sql.query(
    `SELECT sd.id,
    sd.subject_id,
    s.name,
    s.teacher_id,
    s.school_year,
    u.name as teacher_name,
    count(a.id) as assignment_count
FROM subjects as s
     INNER JOIN subject_details as sd ON s.id = sd.subject_id
     INNER JOIN users as u ON u.id = s.teacher_id
     LEFT JOIN assignments a on s.id = a.subject_id
WHERE sd.student_id = ${studentId}
GROUP BY s.id`,
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

module.exports = User;
