const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const contactsRouter = require("../routers/contacts.router");
const db = require("./getDB");

require('dotenv').config();

const app = express();
app.set("view engine", "pug");

app
  .use(express.static("public"))
  .use(methodOverride("_method"))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(morgan("dev"))
  .get("/", (req, res) => { // Home page
    res.render("homePage", {
      contacts: db.contacts
    });
  })
  .use("/contacts", contactsRouter);

app.use((err, req, res, next) => {
  console.log("Error from: server.js -> ", err.message);
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
});  
