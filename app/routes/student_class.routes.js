module.exports = app => {
    const student_classes = require("../controllers/student_class.controller.js");

    // Create a new User
    app.post("/student_classes", student_classes.create);

    // Retrieve all student_classes
    app.get("/student_classes", student_classes.findAll);

    // Retrieve a single User with scId
    app.get("/student_classes/:scId", student_classes.findOne);

    // Update a User with scId
    app.put("/student_classes/:scId", student_classes.update);

    // Delete a User with scId
    app.delete("/student_classes/:scId", student_classes.delete);

    // Create a new User
    app.delete("/student_classes", student_classes.deleteAll);
};