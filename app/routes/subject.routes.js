module.exports = app => {
    const subjects = require("../controllers/subject.controller.js");

    // Create a new Subject
    app.post("/subjects", subjects.create);

    // Retrieve all subjects
    app.get("/subjects", subjects.findAll);

    // Retrieve a single Subject with subjectId
    app.get("/subjects/:subjectId", subjects.findOne);

    // Update a Subject with subjectId
    app.put("/subjects/:subjectId", subjects.update);

    // Delete a Subject with subjectId
    app.delete("/subjects/:subjectId", subjects.delete);

    // Create a new Subject
    app.delete("/subjects", subjects.deleteAll);
};