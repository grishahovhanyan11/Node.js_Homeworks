const express = require("express");
const validationMid = require("../middlewares/validationMid");
const contactsController = require("../controllers/contacts.controller");

const contactsRouters = express.Router();

contactsRouters
  .get("/", contactsController.contactsGET)
  .get("/new", contactsController.newContactGET)
  .post("/new", validationMid, contactsController.newContactPOST)
  .get("/edit/:contactId", contactsController.editContactGET)
  .put("/edit/:contactId", validationMid, contactsController.editContactPUT)
  .delete("/delete/:contactId", contactsController.deleteContact);

contactsRouters.use((err, req, res, next) => {
  console.log("Error from: contacts.router.js -> ", err);
})

module.exports = contactsRouters;
