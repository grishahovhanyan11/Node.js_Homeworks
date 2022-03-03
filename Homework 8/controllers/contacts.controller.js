const db = require("../src/getDB");

module.exports = {
  contactsGET: (req, res) => {
    // :4000/contacts -> :4000/ 
    res.redirect("/");
  },
  newContactGET: (req, res) => {
    res.render("newContact");
  },
  newContactPOST: (req, res) => {
    let newContactId;
    if (db.contacts.length === 0) {// if no contacts 
      newContactId = 1;
    } else {
      newContactId = db.contacts[db.contacts.length - 1].Id + 1;// find max index 
    }

    const newContact = {
      Id: newContactId,
      fullName: req.body.contName,
      phone: req.body.contPhone
    }

    db.setContacts([...db.contacts, newContact]);
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
