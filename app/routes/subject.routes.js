module.exports = app => {
    const subjects = require("../controllers/subject.controller.js");
    const assignments = require("../controllers/assignment.controller.js");

    // Create a new Subject
    app.post("/subjects", subjects.create);

    // Retrieve all subjects
    app.get("/subjects", subjects.findAll);

    // Retrieve a single Subject with subjectId
    app.get("/subjects/:subjectId", subjects.findOne);

    // Retrieve a assignment based on Subject
    app.get("/subjects/:subjectId/assignments", assignments.findAssignmentList);

    // Update a Subject with subjectId
    app.put("/subjects/:subjectId", subjects.update);

    // Delete a Subject with subjectId
    app.delete("/subjects/:subjectId", subjects.delete);

    // Create a new Subject
    app.delete("/subjects", subjects.deleteAll);

    // Get subject list by teacher     
    app.get("/teacher/:teacherId/subjects", subjects.findSubjectByTeacher);
};