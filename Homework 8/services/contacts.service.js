const db = require("../src/getDB");

module.exports = {
  newContactInDb: ({ contName, contPhone }) => {
    let newContactId;
    if (db.contacts.length === 0) {// if no contacts 
      newContactId = 1;
    } else {
      newContactId = db.contacts[db.contacts.length - 1].Id + 1;// find max index 
    }

    const newContact = {
      Id: newContactId,
      fullName: contName,
      phone: contPhone
    }

    db.setContacts([...db.contacts, newContact]);
  }
}
