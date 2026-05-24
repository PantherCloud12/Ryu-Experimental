# Ryu Experimental Bot WhatsApp

Bot WhatsApp sederhana menggunakan library Baileys. Bisa dijalankan di Termux atau Panel Pterodactyl.

## Cara Install di Termux (Android)

1. Pastikan Anda sudah menginstall Termux dari F-Droid.
2. Jalankan perintah berikut satu per satu:
   ```bash
   pkg update && pkg upgrade -y
   pkg install nodejs git -y
   git clone https://github.com/Monnstore/Ryu-Experimental.git
   cd Ryu-Experimental
   npm install
   npm start
   ```
3. Scan QR Code yang muncul di terminal menggunakan WhatsApp Anda (Tautkan Perangkat).
4. Bot sudah aktif! Coba kirim pesan `.ping` ke nomor bot dari nomor lain.

## Cara Install di Panel Pterodactyl

1. Buat server baru menggunakan Egg **Node.js** (Minimal Node.js v16+).
2. Di bagian Startup / Git, masukkan link repositori ini.
3. Pastikan **Startup Command** diisi dengan:
   ```bash
   npm install && npm start
   ```
4. Start server dan buka bagian **Console**.
5. Tunggu hingga QR Code muncul di Console, lalu scan dengan WhatsApp Anda.

## Catatan
- Sesi login akan disimpan secara otomatis di folder `session`.
- Jika bot logout atau error terus menerus, hapus folder `session` dan scan ulang QR code.
