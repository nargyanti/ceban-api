module.exports = app => {
    const classes = require("../controllers/class.controller.js");

    // Create a new Class
    app.post("/classes", classes.create);

    // Retrieve all classes
    app.get("/classes", classes.findAll);

    // Retrieve a single Class with customerId
    app.get("/classes/:customerId", classes.findOne);

    // Update a Class with customerId
    app.put("/classes/:customerId", classes.update);

    // Delete a Class with customerId
    app.delete("/classes/:customerId", classes.delete);

    // Create a new Class
    app.delete("/classes", classes.deleteAll);
};