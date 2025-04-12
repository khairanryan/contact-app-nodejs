const yargs = require("yargs");
const {
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
} = require("./contacts");

yargs
  // tampilkan error saat typo cmd
  .strict()
  // add
  .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
      nama: {
        type: "string",
        demandOption: true, //wajib diisi
        describe: "Nama Lengkap",
      },
      email: {
        type: "string",
        demandOption: false, //tidak wajib diisi
        describe: "Email",
      },
      noHP: {
        type: "string",
        demandOption: true,
        describe: "Nomor Telephone",
      },
    },
    handler(argv) {
      console.log("Menambahkan kontak...");
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  // remove
  .command({
    command: "remove",
    describe: "Menghapus kontak berdasarkan nama",
    builder: {
      nama: {
        type: "string",
        demandOption: true,
      },
    },
    handler(argv) {
      console.log("Menghapus kontak...");
      hapusContact(argv.nama);
    },
  })
  // list Contact
  .command({
    command: "list",
    describe: "List kontak yang sudah ada",
    handler() {
      console.log("Menampilkan list kontak...");
      listContact();
    },
  })

  // List Contact Provider
  .command({
    command: "list-provider",
    describe: "Menampilkan list kontak berdasarkan provider",
    builder: {
      provider: {
        type: "string",
        describe: "Masukkan nama provider (contoh: telkomsel)",
        demandOption: true,
      },
    },
    handler(argv) {
      console.log("Menampilkan list kontak berdasarkan provider...");
      listContactProvider(argv.provider);
    },
  })
  // detail
  .command({
    command: "detail",
    describe: "Detail kontak",
    builder: {
      nama: {
        type: "string",
        demandOption: true,
        describe: "Nama kontak yang dicari <nama lengkap>",
      },
    },
    handler(argv) {
      console.log("Menampilkan detail kontak...");
      detailContact(argv.nama);
    },
  })
  // edit
  .command({
    command: "edit",
    describe: "Mengubah data kontak sesuai nama",
    builder: {
      nama: {
        type: "string",
        demandOption: true,
        describe: "Nama Lengkap",
      },
      email: {
        type: "string",
        demandOption: false,
        describe: "Email",
      },
      noHP: {
        type: "string",
        demandOption: true,
        describe: "Nomor Telephone",
      },
    },
    handler(argv) {
      console.log("Mengedit kontak...");
      editContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .command({
    command: "search",
    describe: "Mencari kontak sesuai nama",
    builder: {
      nama: {
        type: "string",
        demandOption: true,
        describe: "Nama yang dicari",
      },
    },
    handler(argv) {
      console.log("Mencari kontak...");
      searchContact(argv.nama);
    },
  })
  .command({
    command: "stats",
    describe: "Menampilkan total kontak yang memiliki email atau tidak",
    handler() {
      console.log("Stats kontak...");
      statsContact();
    },
  })
  .command({
    command: "filter-email",
    describe: "Menampilkan email berdasarkan domain",
    builder: {
      domain: {
        type: "string",
        demandOption: true,
        describe: "Masukkan domain email (contoh:@gmail.com)",
      },
    },
    handler(argv) {
      console.log("Menampilkan kontak berdasarkan domain email...");
      listContactWithDomain(argv.domain);
    },
  })
  .command({
    command: "search-phone",
    describe: "Mencari kontak berdasarkan nomor telepon",
    builder: {
      noHP: {
        type: "string",
        describe: "Nomor telepone yang dicari",
        demandOption: true,
      },
    },
    handler(argv) {
      console.log("Menampilkan kontak berdasarkan nomor telepon...");
      cariNoHP(argv.noHP);
    },
  })
  .demandCommand(1)
  .help()
  .parse();
