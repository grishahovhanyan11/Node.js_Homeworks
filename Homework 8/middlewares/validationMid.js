const db = require("../src/getDB");

module.exports = (req, res, next) => {
  const newName = req.body.contName;
  const newPhone = req.body.contPhone;
  let infoObj = {};
  let errorMessage = "";

  if (!newPhone.match(/((\+{1})(374{1}\s?)\d{2}\s?\d{6})|((0{1})\d{2}\s?\d{6})/)) {// phone validation
    /*(+374 77777777)(+374 77 777777)(+37477 777777)(077 777777)(077777777)*/
    infoObj = {
      notValidValue: true,
      message: "Phone number must be Armenian:(+374** ****** OR 0** ******)."
    };

    errorMessage = "Not valid contact phone.";
  }

  if (newName.length < 2 || !newName.match(/([a-zA-Z]\s?)+$/)) { // Full name validation
    infoObj = {
      notValidValue: true,
      message: "Full name must be a string with min-length 2 and without any character other than letter."
    };

    errorMessage = "Not valid contact fullName";
  }

  if (errorMessage !== "") { // if (errorMessage === "") -> no validation problem 
    if (req.url.includes("/edit")) { // for edit contact
      const { contactId } = req.params;
      const contactIndexInDb = db.findContact(contactId);

      res.render("editContacts", {
        ...infoObj,
        contact: db.contacts[contactIndexInDb]
      });
    } else if (req.url.includes("/new")) { // for new contact 
      res.render("newContact", infoObj);
    }

    next(errorMessage);
  }
  next();
};
