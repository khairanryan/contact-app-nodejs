const yargs = require("yargs");
const {
  simpanContact,
  hapusContact,
  listContact,
  detailContact,
  editContact,
  searchContact,
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
        demandOption: true,
        describe: "Nama Lengkap",
      },
      email: {
        type: "string",
        demandOption: false,
        describe: "Email",
      },
      nohp: {
        type: "string",
        demandOption: true,
        describe: "Nomor Telephone",
      },
    },
    handler(argv) {
      console.log("Menambahkan kontak...");
      simpanContact(argv.nama, argv.email, argv.nohp);
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
  // list
  .command({
    command: "list",
    describe: "List kontak yang sudah ada",
    handler() {
      console.log("Menampilkan list kontak...");
      listContact();
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
      nohp: {
        type: "string",
        demandOption: true,
        describe: "Nomor Telephone",
      },
    },
    handler(argv) {
      console.log("Mengedit kontak...");
      editContact(argv.nama, argv.email, argv.nohp);
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
  .demandCommand(1)
  .help()
  .parse();
