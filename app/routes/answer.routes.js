module.exports = app => {
    const answers = require("../controllers/answer.controller.js");
    const answer_pictures = require("../controllers/answer_picture.controller.js");

    // Create a new Answer
    app.post("/answers", answers.create);

    // Retrieve all answers
    app.get("/answers", answers.findAll);

    // Retrieve a single Answer with answerId
    app.get("/answers/:answerId", answers.findOne);

    // Update a Answer with answerId
    app.put("/answers/:answerId", answers.update);

    // Delete a Answer with answerId
    app.delete("/answers/:answerId", answers.delete);

    // Create a new Answer
    app.delete("/answers", answers.deleteAll);

    // Retrieve a list of picture of answer with answerPictureId
    app.get("/answers/:answerId/detail", answer_pictures.getAnswerDetail);
};