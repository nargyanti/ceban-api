module.exports = app => {
    const subject_details = require("../controllers/subject_detail.controller.js");

    // Create a new SubjectDetail
    app.post("/subject_details", subject_details.create);

    // Retrieve all subject_details
    app.get("/subject_details", subject_details.findAll);

    // Retrieve a single SubjectDetail with sdId
    app.get("/subject_details/:sdId", subject_details.findOne);

    // Update a SubjectDetail with sdId
    app.put("/subject_details/:sdId", subject_details.update);

    // Delete a SubjectDetail with sdId
    app.delete("/subject_details/:sdId", subject_details.delete);

    // Create a new SubjectDetail
    app.delete("/subject_details", subject_details.deleteAll);
};