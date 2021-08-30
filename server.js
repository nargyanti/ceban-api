const express = require("express");
const path = require('path');

const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    // res.json({ message: "Welcome to CEBAN API." });
    res.sendFile(path.join(__dirname + '/index.html'));
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/class.routes.js")(app);
require("./app/routes/subject.routes.js")(app);
require("./app/routes/assignment.routes.js")(app);
require("./app/routes/student_class.routes.js")(app);
require("./app/routes/answer.routes.js")(app);

// set port, listen for requests
app.listen(5001, () => {
    console.log("Server is running on port 5001.");
});