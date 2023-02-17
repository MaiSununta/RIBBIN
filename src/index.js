require('dotenv').config({ path: './config.env'});
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

const roomRouter = require('./routes/room.route.js');
const customerRouter = require('./routes/customer.route.js');
const userRoter = require('./routes/user.route')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./db.js")(app);


app.get("/", (req, res) => {
  res.send("Hello! คนสวย");
});

app.get("/about", (req, res) => {
  res.send("About us");
});

app.get("/contact", (req, res) => {
  res.send("Contact us");
});

app.use("/room", roomRouter);

app.use("/customer", customerRouter);

app.use("/user",userRoter);

app.listen(port, () => {
  console.log("Starting node.js at port " + port);
});