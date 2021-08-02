module.exports = app => {
    const answers = require("../controllers/answer.controller.js");

    // Create a new Answer
    app.post("/answers", answers.create);

    // Retrieve all answers
    app.get("/answers", answers.findAll);

    // Retrieve a single Answer with customerId
    app.get("/answers/:customerId", answers.findOne);

    // Update a Answer with customerId
    app.put("/answers/:customerId", answers.update);

    // Delete a Answer with customerId
    app.delete("/answers/:customerId", answers.delete);

    // Create a new Answer
    app.delete("/answers", answers.deleteAll);
};