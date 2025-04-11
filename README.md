# Contact App NodeJS 📇

Aplikasi CLI sederhana untuk menyimpan, melihat, dan mengelola kontak menggunakan Node.js. Mendukung validasi input dan penyimpanan data ke file JSON.

## 📦 Fitur

- Menambahkan kontak baru
- Menghapus kontak berdasarkan nama
- Melihat daftar kontak
- Melihat detail kontak
- Mengedit kontak yang sudah ada
- Validasi:
  - Nama tidak boleh duplikat
  - Format email harus valid (jika diisi)
  - Nomor HP harus valid (format Indonesia)
- Menyimpan data ke dalam file `contacts.json`

## 📁 Struktur Proyek

```
.
├── app.js            # Entry point (CLI handler dengan yargs)
├── contacts.js       # Logic utama (CRUD kontak)
├── data/
│   └── contacts.json # File penyimpanan data
├── package.json
└── README.md
```

## 🚀 Instalasi

1. Clone repositori ini:

```bash
git clone https://github.com/username/contact-app-nodejs.git
cd contact-app-nodejs
```

2. Install dependensi:

```bash
npm install chalk validator yargs
```

## 🧑‍💻 Penggunaan

### Menambahkan Kontak

```bash
node app.js add --nama="John Doe" --email="john@example.com" --nohp="081234567890"
```

### Menghapus Kontak

```bash
node app.js remove --nama="John Doe"
```

### Menampilkan Daftar Kontak

```bash
node app.js list
```

### Menampilkan Detail Kontak

```bash
node app.js detail --nama="John Doe"
```

### Mengedit Kontak

```bash
node app.js edit --nama="John Doe" --email="johnny@example.com" --nohp="089876543210"
```

## 📦 Dependensi

- [Node.js](https://nodejs.org/)
- [Yargs](https://www.npmjs.com/package/yargs)
- [Chalk](https://www.npmjs.com/package/chalk)
- [Validator](https://www.npmjs.com/package/validator)

## 📝 Lisensi

Bebas digunakan untuk belajar dan eksplorasi. Tidak untuk diperjualbelikan tanpa izin.

Selamat ngoding! 🚀
