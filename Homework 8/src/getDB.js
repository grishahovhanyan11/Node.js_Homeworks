const fs = require("fs");

try {
  module.exports = {
    contacts: require("../db/contacts.json"),
    setContacts: async function (contacts) {
      this.contacts = contacts;
      const data = JSON.stringify(this.contacts);
      await fs.promises.writeFile("./db/contacts.json", data);
    },
    findContact: function (contactId, start = 0, end = this.contacts.length - 1) {
      if (end >= start) {
        let mid = Math.round(start + (end - start) / 2);

        if (this.contacts[mid].Id == contactId)
          return mid;

        if (this.contacts[mid].Id > contactId)
          return this.findContact(contactId, start, mid - 1);

        return this.findContact(contactId, mid + 1, end);
      }

      return -1;
    },
    editContact: function (contactId, newData) {
      const editedContactIndex = this.findContact(contactId);// find contact index in array
      const editedContact = this.contacts[editedContactIndex];

      editedContact.fullName = newData.contName;// change data
      editedContact.phone = newData.contPhone;

      this.setContacts([...this.contacts]);// change data in DB
    },
    deleteContact: function (contactId) {
      const deletedContactId = this.findContact(contactId);
      this.contacts.splice(deletedContactId, 1);

      this.setContacts([...this.contacts]);
    }

  };
} catch (err) {
  console.log("Error from: getDB -> ", err);
}
