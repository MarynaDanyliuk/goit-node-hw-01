const { program } = require("commander");

const contacts = require("./contacts");

// console.log(contacts);
// const program = new program();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-num, --number <type>");

program.parse();

const options = program.opts();

invokeAction(options);

// _____________________________
// const fs = require("fs/promises");

// const getAllContacts = async () => {
//   const data = await fs.readFile(`${__dirname}/contacts.json`, "utf-8");
//   return JSON.parse(data);
// };

// module.exports = {
//   getAllContacts,
// };
