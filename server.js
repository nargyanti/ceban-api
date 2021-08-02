const express = require("express");

const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to CEBAN API." });
});

require("./app/routes/user.routes.js")(app);
// set port, listen for requests
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});