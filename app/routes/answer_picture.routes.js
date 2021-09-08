const multer = require("multer");
const path = require("path");

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../../public/uploads"));
    },
    filename: function(req, file, cb) {
        cb(
            null,
            "photo" + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: diskStorage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            req.fileValidationError = 'Only .jpg / .jpeg, and .png are allowed';
            return cb(new Error('Only .jpg / .jpeg, and .png are allowed'));
        }
        cb(null, true)
    }
}).single("path");

module.exports = app => {
    const answer_pictures = require("../controllers/answer_picture.controller.js");

    // Create a new AnswerPicture
    app.post("/answer_pictures", upload, answer_pictures.create);

    // Retrieve all answer_pictures
    // app.get("/answer_pictures", answer_pictures.findAll);

    // Retrieve a single AnswerPicture with answerPictureId
    app.get("/answer_pictures/:answerPictureId", answer_pictures.findOne);

    app.get("/download", answer_pictures.download);

    // Update a AnswerPicture with answerPictureId
    // app.put("/answer_pictures/:answerPictureId", upload, answer_pictures.update);

    // Delete a AnswerPicture with answerPictureId
    app.delete("/answer_pictures/:answerPictureId", answer_pictures.delete);

    // Create a new AnswerPicture
    app.delete("/answer_pictures", answer_pictures.deleteAll);
};