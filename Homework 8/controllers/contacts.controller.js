const db = require("../src/getDB");
const { newContactInDb } = require("../services/contacts.service");


module.exports = {
  contactsGET: (req, res) => {
    // :4000/contacts -> :4000/ 
    res.redirect("/");
  },
  newContactGET: (req, res) => {
    res.render("newContact");
  },
  newContactPOST: (req, res) => {
    newContactInDb(req.body);
    res.redirect("/");
  },
  editContactGET: (req, res) => {
    const { contactId } = req.params;
    const contactIndexInDb = db.findContact(contactId);

    if (contactIndexInDb === -1) {
      res.status(404).render("noContact");
    }

    res.render("editContacts", {
      contact: db.contacts[contactIndexInDb]
    });
  },
  editContactPUT: (req, res) => {
    const { contactId } = req.params;
    db.editContact(contactId, req.body)
    res.redirect("/");
  },
  deleteContact: (req, res) => {
    const { contactId } = req.params;
    db.deleteContact(contactId);
    res.redirect("/");
  }
}
