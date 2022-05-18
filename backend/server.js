const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome Aurelius Sugianto application." });
});

require("./app/routes/data.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
