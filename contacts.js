const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// cek folder
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// cek file didalam folder
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const simpanContact = (nama, email, nohp) => {
  const contact = { nama, email, nohp };
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Nama sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  // cek format email
  if (email && !validator.isEmail(email)) {
    console.log(chalk.red.inverse.bold("Email tidak valid!"));
    return false;
  }

  // cek nomor hp
  if (!validator.isMobilePhone(nohp, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor hp tidak valid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
  console.log(chalk.green.inverse.bold("Terimakasih telah isi data."));
};

const hapusContact = (nama) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  const filtered = contacts.filter(
    (c) => c.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === filtered.length) {
    console.log(chalk.red.inverse("Kontak tidak ditemukan!"));
  } else {
    fs.writeFileSync(dataPath, JSON.stringify(filtered, null, 2));
    console.log(chalk.green.inverse("Kontak berhasil dihapus."));
  }
};

const listContact = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  console.log(chalk.cyan.inverse(`Daftar Kontak (${contacts.length}):`));
  contacts.forEach((c, i) => {
    console.log(`${i + 1}. ${c.nama} - ${c.nohp}`);
  });
};

const detailContact = (nama) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  const contact = contacts.find(
    (c) => c.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold("Kontak tidak ditemukan"));
    return;
  }

  console.log(chalk.cyan.inverse.bold("Detail Kontak:"));
  console.log(`Nama  : ${contact.nama}`);
  console.log(
    `Email : ${contact.email || chalk.yellow.inverse("Email tidak ada.")}`
  );
  console.log(`No HP : ${contact.nohp}`);
};

const editContact = (nama, email, nohp) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  let index = contacts.findIndex(
    (c) => c.nama.toLowerCase() === nama.toLowerCase()
  );

  if (index === -1) {
    console.log(chalk.red.inverse.bold("Kontak tidak ditemukan!"));
    return;
  }

  // validasi
  if (email && !validator.isEmail(email)) {
    console.log(chalk.red.inverse.bold("Email tidak valid!"));
    return;
  }
  if (!validator.isMobilePhone(nohp, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor hp tidak valid!"));
    return;
  }

  // update
  contacts[index] = { nama, email, nohp };
  fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
  console.log(chalk.green.inverse("Kontak berhasil diubah."));
};

const searchContact = (nama) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  const results = contacts.filter((c) => {
    return c.nama.toLowerCase().includes(nama.toLowerCase());
  });

  if (results.length === 0) {
    console.log(chalk.red.inverse.bold("Kontak tidak ditemukan!"));
    return;
  }

  console.log(
    chalk.cyan.inverse.bold(
      `Ditemukan ${results.length} kontak dengan nama '${nama}':`
    )
  );
  results.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

module.exports = {
  simpanContact,
  hapusContact,
  listContact,
  detailContact,
  editContact,
  searchContact,
};
