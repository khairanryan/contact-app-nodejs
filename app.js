const yargs = require("yargs");
const { simpanContact } = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
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
      console.log("Menambahkan contact...");
      simpanContact(argv.nama, argv.email, argv.nohp);
    },
  })
  .demandCommand(1)
  .help()
  .parse();
