module.exports = app => {
    const assignments = require("../controllers/assignment.controller.js");

    // Create a new Assignment
    app.post("/assignments", assignments.create);

    // Retrieve all assignments
    app.get("/assignments", assignments.findAll);

    // Retrieve a single Assignment with customerId
    app.get("/assignments/:customerId", assignments.findOne);

    // Update a Assignment with customerId
    app.put("/assignments/:customerId", assignments.update);

    // Delete a Assignment with customerId
    app.delete("/assignments/:customerId", assignments.delete);

    // Create a new Assignment
    app.delete("/assignments", assignments.deleteAll);
};