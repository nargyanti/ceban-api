module.exports = app => {
    const assignments = require("../controllers/assignment.controller.js");

    // Create a new Assignment
    app.post("/assignments", assignments.create);

    // Retrieve all assignments
    app.get("/assignments", assignments.findAll);

    // Retrieve a single Assignment with assignmentId
    app.get("/assignments/:assignmentId", assignments.findOne);

    // Update a Assignment with assignmentId
    app.put("/assignments/:assignmentId", assignments.update);

    // Delete a Assignment with assignmentId
    app.delete("/assignments/:assignmentId", assignments.delete);

    // Create a new Assignment
    app.delete("/assignments", assignments.deleteAll);
};