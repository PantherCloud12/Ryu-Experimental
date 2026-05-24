# Ryu Experimental Bot WhatsApp

Bot WhatsApp sederhana menggunakan library Baileys. Bisa dijalankan di Termux atau Panel Pterodactyl.

## Cara Install di Termux (Android)

1. Pastikan Anda sudah menginstall Termux dari F-Droid.
2. Jalankan perintah berikut satu per satu:
   ```bash
   pkg update && pkg upgrade -y
   pkg install nodejs git -y
   git clone https://github.com/PantherCloud12/Ryu-Experimental.git
   cd Ryu-Experimental
   npm install
   npm start
   ```
3. Pilih metode koneksi:
   - **Pilihan 1 (QR Code)**: Scan QR Code yang muncul di terminal menggunakan WhatsApp Anda (Tautkan Perangkat).
   - **Pilihan 2 (Pairing Code)**: Masukkan nomor bot Anda (contoh: `628123456789`) dan gunakan pairing code 8 karakter untuk menautkan perangkat di WhatsApp.
4. Bot sudah aktif! Coba kirim pesan `.ping` ke nomor bot dari nomor lain.

## Cara Install di Panel Pterodactyl

1. Buat server baru menggunakan Egg **Node.js** (Minimal Node.js v16+).
2. Di bagian Startup / Git, masukkan link repositori ini: `https://github.com/PantherCloud12/Ryu-Experimental.git`
3. Pastikan **Startup Command** diisi dengan:
   ```bash
   npm install && npm start
   ```
4. Jika panel Pterodactyl Anda non-interaktif (tidak bisa input di console), Anda bisa mengatur environment variable:
   - Tambahkan env `PAIRING_NUMBER` dan isi dengan nomor WhatsApp Anda (contoh: `628123456789`).
   - Bot otomatis akan meminta pairing code untuk nomor tersebut dan menampilkannya di console log tanpa perlu input menu.
5. Start server dan hubungkan perangkat Anda!

## Catatan
- Sesi login akan disimpan secara otomatis di folder `session`.
- Jika bot logout atau error terus menerus, hapus folder `session` dan hubungkan ulang.
