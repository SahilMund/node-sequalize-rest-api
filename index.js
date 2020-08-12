const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions))

const db = require("./models/index.js");
db.sequelize.sync();

//routes settings
app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

app.use('/tutorial', require('./routes/tutorial.route'))


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port port ${port}`));