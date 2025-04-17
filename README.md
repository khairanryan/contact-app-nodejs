# Contact CLI NodeJS 📇

Aplikasi Command Line Interface (CLI) sederhana untuk mengelola daftar kontak menggunakan **Node.js**. Fitur lengkap mulai dari tambah, hapus, cari, filter, hingga statistik kontak berdasarkan email. Cocok buat belajar `Node.js`, `yargs`, dan file handling JSON!

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-green.svg)

---

## ✨ Fitur Utama

- ✅ Tambah, hapus, update kontak
- 📑 Lihat detail dan daftar semua kontak
- 🔍 Cari kontak berdasarkan nama / nomor HP
- 🧠 Filter berdasarkan:
  - Provider nomor HP (Telkomsel, Indosat, dll)
  - Domain email (`@gmail.com`, `@yahoo.com`, dst.)
- 📊 Statistik jumlah kontak dengan dan tanpa email
- 💾 Penyimpanan data lokal ke file `contacts.json`

---

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

## ⚙️ Instalasi

1. Clone repositori ini:

```bash
git clone https://github.com/username/contact-app-nodejs.git
cd contact-app-nodejs
npm install
```

2. Install semua dependensi otomatis:

```bash
npm i
```

## 🧑‍💻 Cara Penggunaan

### ➕ Tambah Kontak

```bash
node app.js add --nama="John Doe" --email="john@example.com" --nohp="081234567890"
```

### 🗑️ Hapus Kontak

```bash
node app.js remove --nama="John Doe"
```

### ✏️ Update Kontak (Nama <optional>, Email <optional>, atau noHP <optional>)

```bash
node app.js update --nama="John" --namaBaru="Johnny"
```

### 📋 Lihat Semua Kontak

```bash
node app.js list
```

### 🔎 Lihat Detail Kontak

```bash
node app.js detail --nama="John Doe"
```

### 🔍 Cari Kontak Berdasarkan Nama

```bash
node app.js search --nama="John"
```

### 🔎 Cari Kontak Berdasarkan Nomor HP

```bash
node app.js search-phone --noHP="0812"
```

### 📡 Filter Berdasarkan Provider

```bash
node app.js list-provider --provider="telkomsel"
```

### 📬 Filter Email Berdasarkan Domain

```bash
node app.js filter-email --domain="@gmail.com"
```

### 📊 Statistik Kontak (Email & Tidak Ada Email)

```bash
node app.js stats
```

## 📦 Dependensi

- [Node.js](https://nodejs.org/)
- [Yargs](https://www.npmjs.com/package/yargs)
- [Chalk](https://www.npmjs.com/package/chalk)
- [Validator](https://www.npmjs.com/package/validator)

## 📜 Lisensi

MIT License – Bebas digunakan untuk pembelajaran dan eksplorasi.

Selamat ngoding! 🚀
