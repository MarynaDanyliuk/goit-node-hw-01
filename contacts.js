const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

// const getAll = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getById = async (id) => {
//   const contacts = await getAll();
//   const result = contacts.find((item) => item.id === id);
//   return result || null;
// };

// const add = async ({ name, email, phone }) => {
//   const contacts = await getAll();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateById = async (id, data) => {
//   const contacts = await getAll();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// const deleteById = async (id) => {
//   const contacts = await getAll();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };
