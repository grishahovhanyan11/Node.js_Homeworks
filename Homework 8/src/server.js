const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const contactsRouter = require("../routers/contacts.router");
const db = require("./getDB");

const app = express();
app.set("view engine", "pug");

app
  .use(express.static("public"))
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

app.listen(4000, () => {
  console.log("Server is running on port: 4000");
});  
