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

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP, dibuat: new Date().toISOString() };
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
  if (!validator.isMobilePhone(noHP, "id-ID")) {
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
    console.log(`${i + 1}. ${c.nama} - ${c.noHP}`);
    if (c.dibuat) {
      console.log(
        `    📅 Dibuat: ${new Date(c.dibuat).toLocaleString("id-ID")}`
      );
    }
  });
};

const listContactProvider = (namaProvider) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  const providerPrefixes = {
    telkomsel: ["0811", "0812", "0813", "0821", "0822", "0852", "0853", "0823"],
    indosat: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
    xl: ["0817", "0818", "0819", "0859", "0877", "0878"],
    tri: ["0895", "0896", "0897", "0898", "0899"],
    smartfren: [
      "0881",
      "0882",
      "0883",
      "0884",
      "0885",
      "0886",
      "0887",
      "0888",
      "0889",
    ],
    axis: ["0831", "0832", "0833", "0838"],
    "by.u": ["0851"],
  };

  const prefix = providerPrefixes[namaProvider.toLowerCase()];

  if (!prefix) {
    console.log(
      chalk.red.inverse.bold(`Provider '${namaProvider}' tidak dikenali.`)
    );
    return;
  }

  const filtered = contacts.filter((c) => {
    const awal = c.noHP.slice(0, 4);
    return prefix.includes(awal);
  });

  if (filtered.length === 0) {
    console.log(
      chalk.red.inverse.bold(`Tidak ada kontak dari provider '${namaProvider}'`)
    );
    return;
  }

  console.log(
    chalk.cyan.inverse.bold(
      `Daftar kontak provider '${namaProvider}' (${filtered.length}):`
    )
  );
  filtered.forEach((c, i) => {
    console.log(`${i + 1}. ${c.nama} - ${c.noHP}`);
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
  console.log(`No HP : ${contact.noHP}`);
};

const editContact = (nama, email, noHP) => {
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
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor hp tidak valid!"));
    return;
  }

  // update
  const contact = contacts[index];
  contacts[index] = { ...contact, nama, email, noHP };
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

const statsContact = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);
  let haveEmail = 0;
  let noEmail = 0;

  contacts.forEach((contact) => {
    if (contact.email) {
      haveEmail += 1;
    }
    if (!contact.email) {
      noEmail += 1;
    }
  });

  console.log(chalk.yellow.inverse.bold(`Total Kontak: ${contacts.length}`));
  console.log(`- Dengan Email   : ${haveEmail}`);
  console.log(`- Tanpa Email    : ${noEmail}`);
};

const listContactWithDomain = (domain) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  const filtered = contacts.filter((c) => {
    return c.email && c.email.endsWith(domain);
  });

  if (filtered.length === 0) {
    console.log(
      chalk.red.inverse.bold(`Tidak ada kontak dengan domain '${domain}'`)
    );
    return;
  }

  console.log(chalk.cyan.inverse.bold(`Kontak dengan domain '${domain}':`));
  filtered.forEach((c, i) => {
    console.log(`${i + 1}. ${c.nama} - ${c.email}`);
  });
};

const cariNoHP = (nomor) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  const hasil = contacts.filter((c) => c.noHP.includes(nomor));

  if (hasil.length === 0) {
    console.log(
      chalk.red.inverse.bold(
        `Nomor telepon yang dicari tidak terdaftar, nomor: ${nomor}`
      )
    );
    return;
  }

  console.log(chalk.green.inverse.bold(`Kontak dengan nomor '${nomor}': `));
  hasil.forEach((c, i) => {
    console.log(`${i + 1}. ${c.nama} - ${c.noHP}`);
  });
};

const renameContact = (namaLama, namaBaru) => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  // cari index dari nama lama
  let index = contacts.findIndex(
    (c) => c.nama.toLowerCase() === namaLama.toLowerCase()
  );

  // jika nama lama tidak ada
  if (index === -1) {
    console.log(
      chalk.red.inverse.bold(`Nama kontak '${namaLama}' tidak terdaftar!`)
    );
    return;
  }

  // pastikan nama baru belum dipakai kontak lain
  const isDuplikat = contacts.some(
    (c) => c.nama.toLowerCase() === namaBaru.toLowerCase()
  );
  if (isDuplikat) {
    console.log(
      chalk.red.inverse.bold(`Nama kontak '${namaBaru}' telah digunakan!`)
    );
    return;
  }

  // ubah nama
  const contactLama = contacts[index];
  contacts[index] = {
    ...contactLama,
    nama: namaBaru,
  };
  fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
  console.log(
    chalk.green.inverse(
      `Kontak '${namaLama}' berhasil diubah menjadi '${namaBaru}'.`
    )
  );
};

module.exports = {
  simpanContact,
  hapusContact,
  listContact,
  listContactProvider,
  detailContact,
  editContact,
  searchContact,
  statsContact,
  listContactWithDomain,
  cariNoHP,
  renameContact,
};
