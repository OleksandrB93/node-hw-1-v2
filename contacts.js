const fs = require("fs").promises;
const path = require("path");

const { nanoid } = require("nanoid");
const id = nanoid();

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const fileData = await fs.readFile(contactsPath);
    const data = JSON.parse(fileData.toString());
    return data;
  } catch (error) {
    console.log("listContacts", error);
  }
}


async function getContactById(contactID) {
  try {
    const data = await listContacts();
    const getContact = data.find(
      (contact) => contact.id === contactID.toString()
    );
    console.log(getContact);
    return getContact;
  } catch (error) {
    console.log("getContactById", error);
  }
}

async function removeContact(contactID) {
  try {
    const data = await listContacts();
    const deleteContact = data.filter((contact) => contact.id !== contactID);

    await fs.writeFile(contactsPath, JSON.stringify(deleteContact, null, 2));
    console.log(`User with id: ${contactID} has been deleted`);
  } catch (error) {
    console.log("removeConract", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const contact = { id, name, email, phone };
    data.push(contact);

    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    console.log(`User with name: ${contact.name} has been added`);
  } catch (error) {
    console.log("addContact", error);
  }
}






module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
