module.exports = app => {
    const classes = require("../controllers/class.controller.js");

    // Create a new Class
    app.post("/classes", classes.create);

    // Retrieve all classes
    app.get("/classes", classes.findAll);

    // Retrieve a single Class with classId
    app.get("/classes/:classId", classes.findOne);

    // Update a Class with classId
    app.put("/classes/:classId", classes.update);

    // Delete a Class with classId
    app.delete("/classes/:classId", classes.delete);

    // Create a new Class
    app.delete("/classes", classes.deleteAll);
};