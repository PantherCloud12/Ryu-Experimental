# Ryu Experimental Bot WhatsApp 🚀

Bot WhatsApp eksperimental dan serbaguna menggunakan library **Baileys**. Memiliki total **500 menu/command** yang siap digunakan dan terbagi ke dalam berbagai kategori fungsional.

## 📋 FITUR UTAMA & KATEGORI MENU

Bot ini dirancang khusus untuk memisahkan setiap perintah ke dalam file tersendiri sehingga sangat terorganisir dan mudah dikembangkan. Berikut adalah pembagian kategorinya:

- **[AI]** (65 Perintah) - Kumpulan menu dan utilitas bertema ai.
- **[ANIME]** (55 Perintah) - Kumpulan menu dan utilitas bertema anime.
- **[DEBUG]** (2 Perintah) - Kumpulan menu dan utilitas bertema debug.
- **[DOWNLOADER]** (20 Perintah) - Kumpulan menu dan utilitas bertema downloader.
- **[FUN]** (75 Perintah) - Kumpulan menu dan utilitas bertema fun.
- **[GAME]** (57 Perintah) - Kumpulan menu dan utilitas bertema game.
- **[GROUP]** (28 Perintah) - Kumpulan menu dan utilitas bertema group.
- **[IMAGE]** (1 Perintah) - Kumpulan menu dan utilitas bertema image.
- **[INFO]** (2 Perintah) - Kumpulan menu dan utilitas bertema info.
- **[ISLAMIC]** (63 Perintah) - Kumpulan menu dan utilitas bertema islamic.
- **[MAKER]** (15 Perintah) - Kumpulan menu dan utilitas bertema maker.
- **[OWNER]** (15 Perintah) - Kumpulan menu dan utilitas bertema owner.
- **[PUSHKONTAK]** (10 Perintah) - Kumpulan menu dan utilitas bertema pushkontak.
- **[SEARCH]** (20 Perintah) - Kumpulan menu dan utilitas bertema search.
- **[TOOLS]** (72 Perintah) - Kumpulan menu dan utilitas bertema tools.

---

## 🚀 CARA INSTALL & MENJALANKAN

### 📱 Instalasi di Termux (Android)

1. Pastikan Anda sudah mengunduh dan menginstall Termux.
2. Jalankan perintah berikut secara berurutan:
   ```bash
   pkg update && pkg upgrade -y
   pkg install nodejs git -y
   git clone https://github.com/PantherCloud12/Ryu-Experimental.git
   cd Ryu-Experimental
   npm install
   npm start
   ```

### 🖥️ Instalasi di Panel Pterodactyl

1. Unggah file bot ke panel Pterodactyl Anda.
2. Pastikan Startup Command diatur ke:
   ```bash
   npm install && npm start
   ```
3. **Penyelesaian Buffering Console**: Bot ini telah diperbarui agar menampilkan petunjuk input secara langsung di panel Pterodactyl Anda (menggunakan `console.log` instan).
4. **Fallback Non-Interaktif**: Jika Anda mendiamkan input atau menjalankannya di PM2 tanpa stdin, bot otomatis akan menggunakan mode **QR Code** setelah 20 detik.
5. **Tautan via Nomor HP**: Jika Anda ingin langsung menautkan lewat kode pairing tanpa menjawab opsi, Anda dapat menambahkan Environment Variable `PAIRING_NUMBER` pada panel Anda dengan nilai nomor bot Anda (contoh: `628123456789`). Bot otomatis akan memproses pairing code dan menampilkannya di console.


---

## 📂 DAFTAR LENGKAP 500 PERINTAH (COMMANDS LIST)

Berikut adalah daftar seluruh perintah yang dipisah secara mendetail per kategori agar Anda tidak bingung:

### Kategori: [AI]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.aicharacter` | `charai` | Mengobrol dengan karakter AI pilihan |
| `.aicoder` | `aicoding` | Asisten pemrograman AI khusus |
| `.aimath` | `aimatematika` | Menyelesaikan soal matematika dengan penjelasan lengkap |
| `.ainews` | `infonews` | Meringkas berita terkini secara otomatis |
| `.aiprompt1` | `aip1`, `aprompt1` | Template instruksi AI pintar bagian 1 |
| `.aiprompt10` | `aip10`, `aprompt10` | Template instruksi AI pintar bagian 10 |
| `.aiprompt11` | `aip11`, `aprompt11` | Template instruksi AI pintar bagian 11 |
| `.aiprompt12` | `aip12`, `aprompt12` | Template instruksi AI pintar bagian 12 |
| `.aiprompt13` | `aip13`, `aprompt13` | Template instruksi AI pintar bagian 13 |
| `.aiprompt14` | `aip14`, `aprompt14` | Template instruksi AI pintar bagian 14 |
| `.aiprompt15` | `aip15`, `aprompt15` | Template instruksi AI pintar bagian 15 |
| `.aiprompt16` | `aip16`, `aprompt16` | Template instruksi AI pintar bagian 16 |
| `.aiprompt17` | `aip17`, `aprompt17` | Template instruksi AI pintar bagian 17 |
| `.aiprompt18` | `aip18`, `aprompt18` | Template instruksi AI pintar bagian 18 |
| `.aiprompt19` | `aip19`, `aprompt19` | Template instruksi AI pintar bagian 19 |
| `.aiprompt2` | `aip2`, `aprompt2` | Template instruksi AI pintar bagian 2 |
| `.aiprompt20` | `aip20`, `aprompt20` | Template instruksi AI pintar bagian 20 |
| `.aiprompt21` | `aip21`, `aprompt21` | Template instruksi AI pintar bagian 21 |
| `.aiprompt22` | `aip22`, `aprompt22` | Template instruksi AI pintar bagian 22 |
| `.aiprompt23` | `aip23`, `aprompt23` | Template instruksi AI pintar bagian 23 |
| `.aiprompt24` | `aip24`, `aprompt24` | Template instruksi AI pintar bagian 24 |
| `.aiprompt25` | `aip25`, `aprompt25` | Template instruksi AI pintar bagian 25 |
| `.aiprompt26` | `aip26`, `aprompt26` | Template instruksi AI pintar bagian 26 |
| `.aiprompt27` | `aip27`, `aprompt27` | Template instruksi AI pintar bagian 27 |
| `.aiprompt28` | `aip28`, `aprompt28` | Template instruksi AI pintar bagian 28 |
| `.aiprompt29` | `aip29`, `aprompt29` | Template instruksi AI pintar bagian 29 |
| `.aiprompt3` | `aip3`, `aprompt3` | Template instruksi AI pintar bagian 3 |
| `.aiprompt30` | `aip30`, `aprompt30` | Template instruksi AI pintar bagian 30 |
| `.aiprompt31` | `aip31`, `aprompt31` | Template instruksi AI pintar bagian 31 |
| `.aiprompt32` | `aip32`, `aprompt32` | Template instruksi AI pintar bagian 32 |
| `.aiprompt33` | `aip33`, `aprompt33` | Template instruksi AI pintar bagian 33 |
| `.aiprompt34` | `aip34`, `aprompt34` | Template instruksi AI pintar bagian 34 |
| `.aiprompt35` | `aip35`, `aprompt35` | Template instruksi AI pintar bagian 35 |
| `.aiprompt36` | `aip36`, `aprompt36` | Template instruksi AI pintar bagian 36 |
| `.aiprompt37` | `aip37`, `aprompt37` | Template instruksi AI pintar bagian 37 |
| `.aiprompt38` | `aip38`, `aprompt38` | Template instruksi AI pintar bagian 38 |
| `.aiprompt39` | `aip39`, `aprompt39` | Template instruksi AI pintar bagian 39 |
| `.aiprompt4` | `aip4`, `aprompt4` | Template instruksi AI pintar bagian 4 |
| `.aiprompt40` | `aip40`, `aprompt40` | Template instruksi AI pintar bagian 40 |
| `.aiprompt5` | `aip5`, `aprompt5` | Template instruksi AI pintar bagian 5 |
| `.aiprompt6` | `aip6`, `aprompt6` | Template instruksi AI pintar bagian 6 |
| `.aiprompt7` | `aip7`, `aprompt7` | Template instruksi AI pintar bagian 7 |
| `.aiprompt8` | `aip8`, `aprompt8` | Template instruksi AI pintar bagian 8 |
| `.aiprompt9` | `aip9`, `aprompt9` | Template instruksi AI pintar bagian 9 |
| `.aipsychologist` | `curhat`, `psikolog` | Tempat curhat dengan konselor AI |
| `.aiwriter` | `aipenulis` | Membuat artikel, esai, atau cerita dengan AI |
| `.askai` | `ask`, `tanya` | Bertanya apa saja kepada AI asisten |
| `.bard` | `bardai` | Tanya jawab dengan Google Bard AI (Legacy) |
| `.brainly` | `tanyabrainly` | Mencari jawaban soal sekolah di Brainly |
| `.claude` | `claude` | Tanya jawab dengan Claude AI |
| `.codex` | `codex`, `writecode` | Membuat kode pemrograman berdasarkan deskripsi |
| `.copilot` | `githubcopilot` | Bertanya kepada GitHub Copilot AI |
| `.dalle` | `dalle`, `text2img` | Membuat gambar dari deskripsi teks (DALL-E) |
| `.dan` | `danmode` | ChatGPT mode bebas (Developer Mode / Jailbreak) |
| `.deepseek` | `deepseek` | Tanya jawab dengan DeepSeek AI |
| `.gemini` | `gemini`, `googleai` | Tanya jawab dengan Google Gemini AI |
| `.gpt4` | `gpt4`, `chatgpt`, `gpt` | Tanya jawab dengan ChatGPT-4 AI |
| `.grammar` | `grammar`, `fixgrammar` | Memperbaiki tata bahasa Inggris |
| `.llama` | `llama`, `metaai` | Tanya jawab dengan Llama 3 AI |
| `.midjourney` | `midjourney`, `mj` | Membuat gambar AI dengan gaya artistik |
| `.ocr` | `ocr`, `readtext` | Membaca teks dari gambar (Optical Character Recognition) |
| `.simi` | `simi`, `simisimi` | Chatbot Simi-simi interaktif |
| `.summarizer` | `summarize`, `ringkas` | Meringkas artikel atau teks panjang |
| `.translate` | `translate`, `tr` | Menerjemahkan teks antar bahasa |
| `.tts` | `tts`, `gtts`, `texttospeech` | Mengubah teks menjadi suara (Text-to-Speech) |

### Kategori: [ANIME]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.amv` | `videomuted-anime`, `animemusicvideo` | Mendapatkan video AMV (Anime Music Video) acak |
| `.animefact` | `fakta-anime`, `info-anime` | Menampilkan fakta unik seputar studio/karakter anime |
| `.animequote1` | `aq1`, `anq1` | Kutipan anime jepang populer bagian 1 |
| `.animequote10` | `aq10`, `anq10` | Kutipan anime jepang populer bagian 10 |
| `.animequote11` | `aq11`, `anq11` | Kutipan anime jepang populer bagian 11 |
| `.animequote12` | `aq12`, `anq12` | Kutipan anime jepang populer bagian 12 |
| `.animequote13` | `aq13`, `anq13` | Kutipan anime jepang populer bagian 13 |
| `.animequote14` | `aq14`, `anq14` | Kutipan anime jepang populer bagian 14 |
| `.animequote15` | `aq15`, `anq15` | Kutipan anime jepang populer bagian 15 |
| `.animequote16` | `aq16`, `anq16` | Kutipan anime jepang populer bagian 16 |
| `.animequote17` | `aq17`, `anq17` | Kutipan anime jepang populer bagian 17 |
| `.animequote18` | `aq18`, `anq18` | Kutipan anime jepang populer bagian 18 |
| `.animequote19` | `aq19`, `anq19` | Kutipan anime jepang populer bagian 19 |
| `.animequote2` | `aq2`, `anq2` | Kutipan anime jepang populer bagian 2 |
| `.animequote20` | `aq20`, `anq20` | Kutipan anime jepang populer bagian 20 |
| `.animequote21` | `aq21`, `anq21` | Kutipan anime jepang populer bagian 21 |
| `.animequote22` | `aq22`, `anq22` | Kutipan anime jepang populer bagian 22 |
| `.animequote23` | `aq23`, `anq23` | Kutipan anime jepang populer bagian 23 |
| `.animequote24` | `aq24`, `anq24` | Kutipan anime jepang populer bagian 24 |
| `.animequote25` | `aq25`, `anq25` | Kutipan anime jepang populer bagian 25 |
| `.animequote26` | `aq26`, `anq26` | Kutipan anime jepang populer bagian 26 |
| `.animequote27` | `aq27`, `anq27` | Kutipan anime jepang populer bagian 27 |
| `.animequote28` | `aq28`, `anq28` | Kutipan anime jepang populer bagian 28 |
| `.animequote29` | `aq29`, `anq29` | Kutipan anime jepang populer bagian 29 |
| `.animequote3` | `aq3`, `anq3` | Kutipan anime jepang populer bagian 3 |
| `.animequote30` | `aq30`, `anq30` | Kutipan anime jepang populer bagian 30 |
| `.animequote31` | `aq31`, `anq31` | Kutipan anime jepang populer bagian 31 |
| `.animequote32` | `aq32`, `anq32` | Kutipan anime jepang populer bagian 32 |
| `.animequote33` | `aq33`, `anq33` | Kutipan anime jepang populer bagian 33 |
| `.animequote34` | `aq34`, `anq34` | Kutipan anime jepang populer bagian 34 |
| `.animequote35` | `aq35`, `anq35` | Kutipan anime jepang populer bagian 35 |
| `.animequote36` | `aq36`, `anq36` | Kutipan anime jepang populer bagian 36 |
| `.animequote37` | `aq37`, `anq37` | Kutipan anime jepang populer bagian 37 |
| `.animequote38` | `aq38`, `anq38` | Kutipan anime jepang populer bagian 38 |
| `.animequote39` | `aq39`, `anq39` | Kutipan anime jepang populer bagian 39 |
| `.animequote4` | `aq4`, `anq4` | Kutipan anime jepang populer bagian 4 |
| `.animequote40` | `aq40`, `anq40` | Kutipan anime jepang populer bagian 40 |
| `.animequote5` | `aq5`, `anq5` | Kutipan anime jepang populer bagian 5 |
| `.animequote6` | `aq6`, `anq6` | Kutipan anime jepang populer bagian 6 |
| `.animequote7` | `aq7`, `anq7` | Kutipan anime jepang populer bagian 7 |
| `.animequote8` | `aq8`, `anq8` | Kutipan anime jepang populer bagian 8 |
| `.animequote9` | `aq9`, `anq9` | Kutipan anime jepang populer bagian 9 |
| `.animequotes` | `quotes-anime`, `kata-anime` | Menampilkan kutipan bijak karakter anime terpopuler |
| `.cosplay` | `cosplayer` | Menampilkan foto cosplay anime cantik acak |
| `.husbu` | `husbu`, `husbando` | Menampilkan gambar husbando anime tampan acak |
| `.loli` | `loli`, `lolicon` | Menampilkan gambar loli anime acak |
| `.manga` | `mangasearch`, `baca-manga` | Mencari informasi detail komik manga di MyAnimeList |
| `.megumin` | `megumin` | Menampilkan gambar Megumin Konosuba acak |
| `.myanimelist` | `mal`, `animelist` | Mencari informasi anime lengkap di MyAnimeList |
| `.neko` | `neko` | Menampilkan gambar neko acak |
| `.otakudesu` | `otakudesusearch` | Mencari informasi rilis anime terbaru di Otakudesu |
| `.randomcharacter` | `animechar`, `karakter-anime` | Menampilkan info karakter anime acak beserta gambar |
| `.shinobu` | `shinobu` | Menampilkan gambar Shinobu Kocho acak |
| `.waifu` | `waifu` | Menampilkan gambar waifu anime acak |
| `.wallanime` | `wallpaper-anime`, `wallhp-anime` | Mendapatkan wallpaper anime kualitas tinggi acak |

### Kategori: [DEBUG]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.get` | `get`, `fetch` | Melakukan HTTP GET request ke URL (scraping/debug) |
| `.post` | `post` | Melakukan HTTP POST request ke URL dengan JSON/text body (scraping/debug) |

### Kategori: [DOWNLOADER]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.applemusic` | `appledl`, `applesong` | Mengunduh lagu dari Apple Music |
| `.capcut` | `capcut`, `cc`, `ccdl` | Mengunduh video CapCut tanpa watermark |
| `.facebook` | `fb`, `fbdl`, `facebookdl` | Mengunduh video dari Facebook |
| `.gdrive` | `gdrivedl`, `googledrivedl` | Mengunduh file dari Google Drive |
| `.gitclone` | `gitclonedl`, `gitclonezip` | Mengunduh repository git dalam bentuk zip |
| `.instagram` | `ig`, `igdl`, `instadl` | Mengunduh video/foto dari Instagram Post/Reels/Story |
| `.likee` | `likeedl`, `lkdl` | Mengunduh video dari Likee |
| `.mediafire` | `mfdl`, `mediafiredownload` | Mengunduh file dari Mediafire |
| `.mega` | `megadl`, `meganz` | Mengunduh file dari Mega.nz |
| `.pinterestdl` | `pindl`, `pinterestdownload` | Mengunduh video/gambar dari link Pinterest |
| `.sfile` | `sfiledl`, `sfilemobi` | Mengunduh file dari Sfile.mobi |
| `.snackvideo` | `snackdl`, `svdl` | Mengunduh video dari SnackVideo |
| `.soundcloud` | `scdl`, `soundcloudmusic` | Mengunduh audio dari SoundCloud |
| `.spotify` | `spotify`, `spotydl` | Mengunduh lagu dari Spotify menggunakan tautan track |
| `.terabox` | `teraboxdl`, `tbxdl` | Mengunduh file dari Terabox |
| `.threads` | `threadsdl`, `thdl` | Mengunduh media dari Threads Instagram |
| `.tiktok` | `tiktok`, `tt`, `ttdl` | Mengunduh video atau gambar slideshow TikTok beserta audionya |
| `.twitter` | `tw`, `twdl`, `xdl`, `twitterdl` | Mengunduh video dari Twitter/X |
| `.vimeo` | `vimeodl` | Mengunduh video dari Vimeo |
| `.youtube` | `ytmp3`, `ytmp4`, `yt` | Mengunduh audio (ytmp3) atau video (ytmp4) dari YouTube |

### Kategori: [FUN]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.aesthetic` | `aestheticquotes` | Mendapatkan kutipan estetik puitis |
| `.aestheticquote` | `aestquotes` | Kutipan estetik acak |
| `.apakah` | `apakahramal` | Bertanya ramalan ya/tidak kepada bot |
| `.artimimpi` | `tafsirmimpi` | Tafsir mimpi acak untuk hiburan |
| `.bacotquote` | `bquote` | Kutipan sindiran atau bacotan lucu acak |
| `.bagaimanakah` | `bagaimanakahramal` | Bertanya ramalan bagaimana keadaan sesuatu kepada bot |
| `.bucin` | `gombalan`, `katabucin` | Mendapatkan kata-kata gombalan bucin mematikan |
| `.confess` | `menfess`, `titip-pesan` | Kirim pesan rahasia secara anonim ke nomor tujuan (Format: .confess nomor|nama|pesan) |
| `.dare` | `dare`, `tantangan` | Mendapatkan tantangan melakukan sesuatu gila (Dare) |
| `.daresay` | `katakanlantang` | Tantangan mengucapkan kata konyol secara lantang |
| `.darkjoke` | `darkjokes` | Mendapatkan lelucon gelap (Dark Joke) |
| `.fakta` | `faktaunik` | Menampilkan fakta unik dunia yang menakjubkan |
| `.faktadunia` | `faktaduniauni` | Menampilkan fakta unik dunia acak |
| `.funquote1` | `fq1`, `funq1` | Kutipan hiburan dan fakta lucu bagian 1 |
| `.funquote10` | `fq10`, `funq10` | Kutipan hiburan dan fakta lucu bagian 10 |
| `.funquote11` | `fq11`, `funq11` | Kutipan hiburan dan fakta lucu bagian 11 |
| `.funquote12` | `fq12`, `funq12` | Kutipan hiburan dan fakta lucu bagian 12 |
| `.funquote13` | `fq13`, `funq13` | Kutipan hiburan dan fakta lucu bagian 13 |
| `.funquote14` | `fq14`, `funq14` | Kutipan hiburan dan fakta lucu bagian 14 |
| `.funquote15` | `fq15`, `funq15` | Kutipan hiburan dan fakta lucu bagian 15 |
| `.funquote16` | `fq16`, `funq16` | Kutipan hiburan dan fakta lucu bagian 16 |
| `.funquote17` | `fq17`, `funq17` | Kutipan hiburan dan fakta lucu bagian 17 |
| `.funquote18` | `fq18`, `funq18` | Kutipan hiburan dan fakta lucu bagian 18 |
| `.funquote19` | `fq19`, `funq19` | Kutipan hiburan dan fakta lucu bagian 19 |
| `.funquote2` | `fq2`, `funq2` | Kutipan hiburan dan fakta lucu bagian 2 |
| `.funquote20` | `fq20`, `funq20` | Kutipan hiburan dan fakta lucu bagian 20 |
| `.funquote21` | `fq21`, `funq21` | Kutipan hiburan dan fakta lucu bagian 21 |
| `.funquote22` | `fq22`, `funq22` | Kutipan hiburan dan fakta lucu bagian 22 |
| `.funquote23` | `fq23`, `funq23` | Kutipan hiburan dan fakta lucu bagian 23 |
| `.funquote24` | `fq24`, `funq24` | Kutipan hiburan dan fakta lucu bagian 24 |
| `.funquote25` | `fq25`, `funq25` | Kutipan hiburan dan fakta lucu bagian 25 |
| `.funquote26` | `fq26`, `funq26` | Kutipan hiburan dan fakta lucu bagian 26 |
| `.funquote27` | `fq27`, `funq27` | Kutipan hiburan dan fakta lucu bagian 27 |
| `.funquote28` | `fq28`, `funq28` | Kutipan hiburan dan fakta lucu bagian 28 |
| `.funquote29` | `fq29`, `funq29` | Kutipan hiburan dan fakta lucu bagian 29 |
| `.funquote3` | `fq3`, `funq3` | Kutipan hiburan dan fakta lucu bagian 3 |
| `.funquote30` | `fq30`, `funq30` | Kutipan hiburan dan fakta lucu bagian 30 |
| `.funquote31` | `fq31`, `funq31` | Kutipan hiburan dan fakta lucu bagian 31 |
| `.funquote32` | `fq32`, `funq32` | Kutipan hiburan dan fakta lucu bagian 32 |
| `.funquote33` | `fq33`, `funq33` | Kutipan hiburan dan fakta lucu bagian 33 |
| `.funquote34` | `fq34`, `funq34` | Kutipan hiburan dan fakta lucu bagian 34 |
| `.funquote35` | `fq35`, `funq35` | Kutipan hiburan dan fakta lucu bagian 35 |
| `.funquote36` | `fq36`, `funq36` | Kutipan hiburan dan fakta lucu bagian 36 |
| `.funquote37` | `fq37`, `funq37` | Kutipan hiburan dan fakta lucu bagian 37 |
| `.funquote38` | `fq38`, `funq38` | Kutipan hiburan dan fakta lucu bagian 38 |
| `.funquote39` | `fq39`, `funq39` | Kutipan hiburan dan fakta lucu bagian 39 |
| `.funquote4` | `fq4`, `funq4` | Kutipan hiburan dan fakta lucu bagian 4 |
| `.funquote40` | `fq40`, `funq40` | Kutipan hiburan dan fakta lucu bagian 40 |
| `.funquote5` | `fq5`, `funq5` | Kutipan hiburan dan fakta lucu bagian 5 |
| `.funquote6` | `fq6`, `funq6` | Kutipan hiburan dan fakta lucu bagian 6 |
| `.funquote7` | `fq7`, `funq7` | Kutipan hiburan dan fakta lucu bagian 7 |
| `.funquote8` | `fq8`, `funq8` | Kutipan hiburan dan fakta lucu bagian 8 |
| `.funquote9` | `fq9`, `funq9` | Kutipan hiburan dan fakta lucu bagian 9 |
| `.gombalcinta` | `gombalan` | Menampilkan kata-kata gombal romantis acak |
| `.hacker` | `hackertext` | Mengirimkan pesan gaya hacker keren dengan font khusus |
| `.jodoh` | `ramaljodoh` | Meramal kecocokan jodoh berdasarkan nama lengkap pasangan |
| `.joke` | `candaan`, `jokes`, `bapak2` | Mendapatkan lelucon lucu garing ala bapak-bapak acak |
| `.kapankah` | `kapankahramal` | Bertanya ramalan kapan terjadinya sesuatu kepada bot |
| `.katabijak` | `bijak` | Mendapatkan kata bijak filosofis kehidupan |
| `.love` | `cinta`, `lovecalculator` | Menghitung persen kecocokan cinta antar dua nama |
| `.meme` | `memelucu` | Mendapatkan meme lucu acak dari internet |
| `.motivasisukses` | `msukses` | Menampilkan kutipan motivasi sukses acak |
| `.pantun` | `pantunjenaka` | Menampilkan pantun jenaka melayu acak |
| `.pantuncinta` | `pcinta` | Menampilkan pantun cinta romantis acak |
| `.pantunjawa` | `pjawa` | Menampilkan pantun atau parikan Jawa acak |
| `.pantunnasihat` | `pnasihat` | Menampilkan pantun nasihat kehidupan acak |
| `.predict` | `ramalnasib` | Meramal nasib dan keberuntungan kamu hari ini |
| `.quotes` | `kutipan`, `motivasi` | Mendapatkan kutipan motivasi hidup bijak |
| `.ramalanzodiak` | `ramalzodiak` | Melihat ramalan zodiak acak harian |
| `.rate` | `nilai`, `ratealkohol` | Meminta bot menilai tingkat kehebatan/kegantengan/kecantikan |
| `.shadow` | `shadowtext` | Menampilkan kutipan misterius bayangan hitam |
| `.siapakah` | `siapakahramal` | Memilih anggota grup secara acak untuk pertanyaan lucu |
| `.truth` | `truth`, `jujur` | Mendapatkan tantangan menjawab jujur (Truth) |
| `.weton` | `ramalweton` | Meramal kecocokan berdasarkan weton lahir jawa |
| `.zodiak` | `bintangzodiak` | Membaca ramalan bintang zodiak terkini hari ini |

### Kategori: [GAME]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.asahotak` | `asah-otak` | Bermain game asah otak menjawab teka-teki logika |
| `.caklontong` | `cak-lontong` | Bermain game tebak tebakan kocak ala Cak Lontong |
| `.family100` | `f100`, `family-100` | Bermain game kuis Family 100 interaktif |
| `.gameinfo1` | `gi1`, `ginfo1` | Informasi trivia game seru bagian 1 |
| `.gameinfo10` | `gi10`, `ginfo10` | Informasi trivia game seru bagian 10 |
| `.gameinfo11` | `gi11`, `ginfo11` | Informasi trivia game seru bagian 11 |
| `.gameinfo12` | `gi12`, `ginfo12` | Informasi trivia game seru bagian 12 |
| `.gameinfo13` | `gi13`, `ginfo13` | Informasi trivia game seru bagian 13 |
| `.gameinfo14` | `gi14`, `ginfo14` | Informasi trivia game seru bagian 14 |
| `.gameinfo15` | `gi15`, `ginfo15` | Informasi trivia game seru bagian 15 |
| `.gameinfo16` | `gi16`, `ginfo16` | Informasi trivia game seru bagian 16 |
| `.gameinfo17` | `gi17`, `ginfo17` | Informasi trivia game seru bagian 17 |
| `.gameinfo18` | `gi18`, `ginfo18` | Informasi trivia game seru bagian 18 |
| `.gameinfo19` | `gi19`, `ginfo19` | Informasi trivia game seru bagian 19 |
| `.gameinfo2` | `gi2`, `ginfo2` | Informasi trivia game seru bagian 2 |
| `.gameinfo20` | `gi20`, `ginfo20` | Informasi trivia game seru bagian 20 |
| `.gameinfo21` | `gi21`, `ginfo21` | Informasi trivia game seru bagian 21 |
| `.gameinfo22` | `gi22`, `ginfo22` | Informasi trivia game seru bagian 22 |
| `.gameinfo23` | `gi23`, `ginfo23` | Informasi trivia game seru bagian 23 |
| `.gameinfo24` | `gi24`, `ginfo24` | Informasi trivia game seru bagian 24 |
| `.gameinfo25` | `gi25`, `ginfo25` | Informasi trivia game seru bagian 25 |
| `.gameinfo26` | `gi26`, `ginfo26` | Informasi trivia game seru bagian 26 |
| `.gameinfo27` | `gi27`, `ginfo27` | Informasi trivia game seru bagian 27 |
| `.gameinfo28` | `gi28`, `ginfo28` | Informasi trivia game seru bagian 28 |
| `.gameinfo29` | `gi29`, `ginfo29` | Informasi trivia game seru bagian 29 |
| `.gameinfo3` | `gi3`, `ginfo3` | Informasi trivia game seru bagian 3 |
| `.gameinfo30` | `gi30`, `ginfo30` | Informasi trivia game seru bagian 30 |
| `.gameinfo31` | `gi31`, `ginfo31` | Informasi trivia game seru bagian 31 |
| `.gameinfo32` | `gi32`, `ginfo32` | Informasi trivia game seru bagian 32 |
| `.gameinfo33` | `gi33`, `ginfo33` | Informasi trivia game seru bagian 33 |
| `.gameinfo34` | `gi34`, `ginfo34` | Informasi trivia game seru bagian 34 |
| `.gameinfo35` | `gi35`, `ginfo35` | Informasi trivia game seru bagian 35 |
| `.gameinfo36` | `gi36`, `ginfo36` | Informasi trivia game seru bagian 36 |
| `.gameinfo37` | `gi37`, `ginfo37` | Informasi trivia game seru bagian 37 |
| `.gameinfo4` | `gi4`, `ginfo4` | Informasi trivia game seru bagian 4 |
| `.gameinfo5` | `gi5`, `ginfo5` | Informasi trivia game seru bagian 5 |
| `.gameinfo6` | `gi6`, `ginfo6` | Informasi trivia game seru bagian 6 |
| `.gameinfo7` | `gi7`, `ginfo7` | Informasi trivia game seru bagian 7 |
| `.gameinfo8` | `gi8`, `ginfo8` | Informasi trivia game seru bagian 8 |
| `.gameinfo9` | `gi9`, `ginfo9` | Informasi trivia game seru bagian 9 |
| `.math` | `matematika-kuis` | Bermain game matematika hitung cepat |
| `.rpghunt` | `rpg-berburu` | Pergi berburu monster untuk mendapatkan exp/gold |
| `.rpginventory` | `rpg-tas`, `inv` | Melihat barang bawaan di dalam inventaris RPG |
| `.rpgprofile` | `rpg-profil` | Melihat statistik lengkap karakter RPG kamu |
| `.rpgstart` | `rpg-mulai` | Memulai petualangan dunia RPG bot |
| `.siapakahaku` | `siapakah-aku` | Bermain game tebak nama tokoh/hewan/benda dari petunjuk |
| `.suit` | `suwit`, `suten` | Bermain game gunting batu kertas dengan bot |
| `.susunkata` | `susun-kata` | Bermain game menyusun huruf acak menjadi kata utuh |
| `.tebakbendera` | `tebak-bendera` | Bermain game tebak negara berdasarkan gambar bendera |
| `.tebakgambar` | `tg`, `tebak-gambar` | Bermain game tebak gambar berhadiah poin |
| `.tebakgitar` | `tebak-gitar` | Bermain game tebak chord gitar berdasarkan lirik |
| `.tebakhewan` | `tebak-hewan` | Bermain game tebak hewan dari deskripsi suara/fisik |
| `.tebakkata` | `tebak-kata` | Bermain game tebak kata tersembunyi |
| `.tebakkimia` | `tebak-unsur` | Bermain game tebak singkatan unsur kimia (contoh: H = Hidrogen) |
| `.tebaklagu` | `tebak-lagu` | Bermain game tebak judul lagu dari potongan lirik |
| `.tebaktebakan` | `tebak-tebakan` | Bermain game tebak-tebakan santai penuh teka-teki |
| `.tictactoe` | `ttt`, `tictac` | Bermain game TicTacToe bersama teman di chat |

### Kategori: [GROUP]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.add` | `add`, `tambah` | Menambahkan member ke dalam grup menggunakan nomor HP |
| `.antidelete` | `antihapus` | Mengaktifkan fitur anti hapus pesan di grup |
| `.antilink` | `antilink` | Mengaktifkan atau menonaktifkan fitur anti-link WhatsApp grup |
| `.antiswgc` | `antiswgc` | Mengaktifkan atau menonaktifkan fitur anti-SWGC (Group Status Message V2 / Group Invite Message V2) |
| `.antiviewonce` | `antiviewonce`, `antivo` | Mengaktifkan fitur anti sekali lihat di grup |
| `.delete` | `del`, `delete`, `hapus` | Menghapus pesan yang di-reply (memerlukan bot admin jika menghapus pesan orang lain) |
| `.demote` | `demote`, `dm` | Menurunkan jabatan Admin grup menjadi member biasa (tag atau reply) |
| `.ephemeral` | `pesan-sementara`, `ephe` | Mengaktifkan atau menonaktifkan pesan sementara grup (24 jam/7 hari/90 hari) |
| `.group` | `group`, `grup` | Membuka atau menutup grup (membatasi pengiriman pesan) |
| `.hidetag` | `hidetag`, `htag`, `totag` | Men-tag semua anggota grup secara senyap/tidak terlihat |
| `.kick` | `kick`, `k`, `remove` | Mengeluarkan member dari grup (tag atau reply) |
| `.leave` | `leave`, `keluar`, `out` | Membuat bot keluar dari grup |
| `.linkgc` | `linkgc`, `linkgrup`, `link` | Mendapatkan link undangan grup ini |
| `.listadmins` | `listadmins`, `admins`, `adminlist` | Menampilkan daftar seluruh admin grup |
| `.promote` | `promote`, `pm` | Mempromosikan member menjadi Admin grup (tag atau reply) |
| `.restrict` | `restriksi`, `kuncigrup` | Membatasi pengaturan grup agar hanya admin yang dapat mengedit info grup |
| `.revoke` | `revoke`, `resetlink` | Mereset/menarik kembali link undangan grup |
| `.setbye` | `setbye`, `setb` | Mengatur pesan selamat tinggal/keluar khusus untuk grup ini |
| `.setdesc` | `setdesc`, `setdeskripsi` | Mengubah deskripsi grup |
| `.setname` | `setname`, `setsubject`, `gantinama` | Mengubah nama/subject grup |
| `.setpp` | `setpp`, `seticon` | Mengubah foto profil grup (kirim gambar dengan caption atau reply gambar) |
| `.setwelcome` | `setwelcome`, `setw` | Mengatur pesan selamat datang khusus untuk grup ini |
| `.swgc` | `swgc`, `statusgc` | Memposting status grup menggunakan groupStatusMessageV2 |
| `.tagall` | `tagall`, `everyone` | Men-tag semua anggota grup dengan list nama |
| `.unmute` | `bukagrup`, `opengroup` | Membuka grup agar seluruh member bisa mengirim pesan |
| `.unwarn` | `unwarn`, `clearwarn`, `resetwarn` | Mereset/menghapus jumlah peringatan member |
| `.warn` | `warn`, `peringatan` | Memberikan peringatan kepada member (3x peringatan = kick) |
| `.welcome` | `welcome` | Mengaktifkan atau menonaktifkan pesan sambutan selamat datang/tinggal |

### Kategori: [IMAGE]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.wink` | `wink`, `hd`, `enhance` | Meningkatkan resolusi/kualitas gambar menjadi Ultra HD |

### Kategori: [INFO]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.menu` | `menu`, `help`, `h` | Menampilkan daftar seluruh perintah bot |
| `.ping` | `ping` | Mengecek apakah bot dalam keadaan aktif/merespon |

### Kategori: [ISLAMIC]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.alquran` | `quran`, `ngaji` | Membaca surat Al-Quran beserta terjemahannya (Contoh: .quran 1 atau .quran 1 2) |
| `.asmaulhusna` | `asmaul-husna` | Menampilkan 99 nama baik Allah SWT beserta terjemahannya |
| `.asmaulhusna1` | `asmaul1` | Menampilkan 10 Asmaul Husna pertama beserta artinya |
| `.ayatkursi` | `kursi`, `baca-ayatkursi` | Menampilkan teks arab, latin dan terjemahan Ayat Kursi |
| `.bacaansholat` | `tuntunan-sholat`, `sholat-panduan` | Panduan gerakan dan bacaan sholat dari takbir hingga salam |
| `.doaharian` | `doa`, `doa-harian` | Menampilkan doa-doa harian lengkap |
| `.doamakan` | `doasebelummakan` | Doa sebelum makan |
| `.doapagi` | `doapagihari` | Menampilkan doa pagi hari |
| `.doasholat` | `doasetelahsholat` | Doa setelah sholat fardhu |
| `.doasore` | `doasorehari` | Menampilkan doa sore hari |
| `.hadits` | `hadis`, `baca-hadits` | Membaca hadits shahih acak tentang kehidupan |
| `.islamicfact1` | `ifact1`, `islq1` | Fakta dan kutipan islami bagian 1 |
| `.islamicfact10` | `ifact10`, `islq10` | Fakta dan kutipan islami bagian 10 |
| `.islamicfact11` | `ifact11`, `islq11` | Fakta dan kutipan islami bagian 11 |
| `.islamicfact12` | `ifact12`, `islq12` | Fakta dan kutipan islami bagian 12 |
| `.islamicfact13` | `ifact13`, `islq13` | Fakta dan kutipan islami bagian 13 |
| `.islamicfact14` | `ifact14`, `islq14` | Fakta dan kutipan islami bagian 14 |
| `.islamicfact15` | `ifact15`, `islq15` | Fakta dan kutipan islami bagian 15 |
| `.islamicfact16` | `ifact16`, `islq16` | Fakta dan kutipan islami bagian 16 |
| `.islamicfact17` | `ifact17`, `islq17` | Fakta dan kutipan islami bagian 17 |
| `.islamicfact18` | `ifact18`, `islq18` | Fakta dan kutipan islami bagian 18 |
| `.islamicfact19` | `ifact19`, `islq19` | Fakta dan kutipan islami bagian 19 |
| `.islamicfact2` | `ifact2`, `islq2` | Fakta dan kutipan islami bagian 2 |
| `.islamicfact20` | `ifact20`, `islq20` | Fakta dan kutipan islami bagian 20 |
| `.islamicfact21` | `ifact21`, `islq21` | Fakta dan kutipan islami bagian 21 |
| `.islamicfact22` | `ifact22`, `islq22` | Fakta dan kutipan islami bagian 22 |
| `.islamicfact23` | `ifact23`, `islq23` | Fakta dan kutipan islami bagian 23 |
| `.islamicfact24` | `ifact24`, `islq24` | Fakta dan kutipan islami bagian 24 |
| `.islamicfact25` | `ifact25`, `islq25` | Fakta dan kutipan islami bagian 25 |
| `.islamicfact26` | `ifact26`, `islq26` | Fakta dan kutipan islami bagian 26 |
| `.islamicfact27` | `ifact27`, `islq27` | Fakta dan kutipan islami bagian 27 |
| `.islamicfact28` | `ifact28`, `islq28` | Fakta dan kutipan islami bagian 28 |
| `.islamicfact29` | `ifact29`, `islq29` | Fakta dan kutipan islami bagian 29 |
| `.islamicfact3` | `ifact3`, `islq3` | Fakta dan kutipan islami bagian 3 |
| `.islamicfact30` | `ifact30`, `islq30` | Fakta dan kutipan islami bagian 30 |
| `.islamicfact31` | `ifact31`, `islq31` | Fakta dan kutipan islami bagian 31 |
| `.islamicfact32` | `ifact32`, `islq32` | Fakta dan kutipan islami bagian 32 |
| `.islamicfact33` | `ifact33`, `islq33` | Fakta dan kutipan islami bagian 33 |
| `.islamicfact34` | `ifact34`, `islq34` | Fakta dan kutipan islami bagian 34 |
| `.islamicfact35` | `ifact35`, `islq35` | Fakta dan kutipan islami bagian 35 |
| `.islamicfact36` | `ifact36`, `islq36` | Fakta dan kutipan islami bagian 36 |
| `.islamicfact37` | `ifact37`, `islq37` | Fakta dan kutipan islami bagian 37 |
| `.islamicfact38` | `ifact38`, `islq38` | Fakta dan kutipan islami bagian 38 |
| `.islamicfact39` | `ifact39`, `islq39` | Fakta dan kutipan islami bagian 39 |
| `.islamicfact4` | `ifact4`, `islq4` | Fakta dan kutipan islami bagian 4 |
| `.islamicfact40` | `ifact40`, `islq40` | Fakta dan kutipan islami bagian 40 |
| `.islamicfact5` | `ifact5`, `islq5` | Fakta dan kutipan islami bagian 5 |
| `.islamicfact6` | `ifact6`, `islq6` | Fakta dan kutipan islami bagian 6 |
| `.islamicfact7` | `ifact7`, `islq7` | Fakta dan kutipan islami bagian 7 |
| `.islamicfact8` | `ifact8`, `islq8` | Fakta dan kutipan islami bagian 8 |
| `.islamicfact9` | `ifact9`, `islq9` | Fakta dan kutipan islami bagian 9 |
| `.istighfar` | `sayyidul-istighfar` | Menampilkan keutamaan dan teks sayyidul istighfar |
| `.jadwalsholat` | `adzan`, `sholat`, `jadwal-sholat` | Melihat jadwal sholat untuk wilayah/kota tertentu |
| `.kalammutiara` | `nasihat-ulama`, `hikmah` | Kumpulan mutiara hikmah ulama salaf terdahulu |
| `.kisahnabi` | `kisah-nabi` | Membaca kisah dari 25 nabi pilihan |
| `.kisahnabiadam` | `nabiadam` | Kisah singkat Nabi Adam AS |
| `.kisahnabinuh` | `nabinuh` | Kisah singkat Nabi Nuh AS |
| `.kisahnabiyusuf` | `nabiyusuf` | Kisah singkat Nabi Yusuf AS |
| `.kisahsahabat` | `kisah-sahabat` | Membaca kisah teladan perjuangan para sahabat nabi |
| `.niatsholat` | `niat-sholat` | Menampilkan niat sholat wajib 5 waktu lengkap |
| `.shalawat` | `sholawat-nabi` | Menampilkan bacaan shalawat nabi terpopuler |
| `.tahlil` | `bacaan-tahlil` | Menampilkan bacaan tahlil lengkap beserta artinya |
| `.wirid` | `bacaan-wirid`, `dzikir` | Menampilkan bacaan wirid dan dzikir setelah sholat fardhu |

### Kategori: [MAKER]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.attp` | `attpsticker` | Membuat stiker tulisan berwarna-warni yang bergerak |
| `.blur` | `blureffect` | Membuat efek blur pada foto |
| `.circle` | `bulat`, `lingkaran` | Membuat gambar menjadi lingkaran/bulat |
| `.gray` | `grayscale`, `hitamputih` | Membuat gambar hitam putih |
| `.invert` | `negatif` | Membalikkan warna gambar (negative effect) |
| `.resize` | `skala` | Mengubah ukuran dimensi gambar secara cepat |
| `.rotate` | `putar` | Mutar gambar 90 derajat searah jarum jam |
| `.sticker` | `s`, `stiker` | Mengubah gambar atau video menjadi stiker WhatsApp |
| `.toimage` | `toimg` | Mengubah stiker menjadi gambar biasa |
| `.tomp3` | `tomp3`, `toaudio` | Mengubah video menjadi audio MP3 |
| `.tovideo` | `tovid`, `tovideo` | Mengubah stiker bergerak/GIF menjadi video |
| `.trigger` | `triggered`, `gemetar` | Membuat efek gambar bergetar (triggered meme) dari foto |
| `.ttp` | `ttpsticker` | Membuat stiker tulisan biasa |
| `.wanted` | `wantedposter` | Membuat poster buronan (Wanted) dari foto |
| `.wasted` | `wastedfilter` | Membuat efek gambar filter Wasted GTA |

### Kategori: [OWNER]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.addowner` | `tambahowner` | Menambahkan nomor baru ke daftar owner bot (Owner Only) |
| `.addplugin` | `tambahplugin` | Membuat plugin baru langsung lewat WhatsApp chat (Owner Only) |
| `.backup` | `backupbot`, `zipcode` | Mencadangkan file source code bot ke file ZIP (Owner Only) |
| `.broadcast` | `bc`, `siaran` | Mengirimkan pesan siaran ke seluruh chat pribadi bot (Owner Only) |
| `.delowner` | `hapusowner` | Menghapus nomor dari daftar owner bot (Owner Only) |
| `.delplugin` | `hapusplugin` | Menghapus file plugin dari server bot (Owner Only) |
| `.eval` | `ev`, `evaluate` | Mengeksekusi kode javascript (Owner Only) |
| `.exec` | `run`, `sh` | Mengeksekusi perintah shell terminal linux (Owner Only) |
| `.join` | `gabung`, `masukgc` | Menyuruh bot masuk ke suatu grup lewat link undangan (Owner Only) |
| `.leave` | `keluargc`, `out` | Menyuruh bot keluar dari grup saat ini (Owner/Admin Only) |
| `.listplugin` | `pluginslist`, `listfiles` | Menampilkan daftar seluruh file plugin yang terinstall (Owner Only) |
| `.resetdb` | `resetdatabase`, `cleardb` | Mereset semua data chat dan user di database (Owner Only) |
| `.restore` | `restoredb` | Memulihkan cadangan database bot (Owner Only) |
| `.setprefix` | `ubahprefix`, `gantiprefix` | Mengubah karakter awalan command bot (Owner Only) |
| `.shutdown` | `matikanbot` | Mematikan proses bot dari jauh (Owner Only) |

### Kategori: [PUSHKONTAK]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.broadcastgc` | `bcgc`, `siarangrup` | Mengirimkan pesan siaran ke semua grup yang bot ikuti (Owner Only) |
| `.jeda` | `delaytime`, `setdelay` | Mengubah waktu jeda default untuk push kontak |
| `.listgc` | `listgc` | Melihat daftar seluruh grup yang diikuti oleh bot |
| `.ps1` | `ps1` | Mengirim pesan private ke seluruh member grup (hanya bisa di dalam grup) |
| `.ps2` | `ps2` | Mengirim pesan private ke seluruh member grup tertentu lewat ID grup (bisa dari luar grup) |
| `.pushkontakv3` | `pushv3`, `pushmassal` | Push kontak dengan parameter pesan dan jeda kustom |
| `.savecontacts` | `savekontak`, `exportcontacts` | Mengekspor kontak grup ke file VCF (vcard) |
| `.sendcontacts` | `sharekontak`, `kirimkontak` | Membagikan kartu kontak WhatsApp secara massal ke member grup |
| `.setjeda` | `setjeda` | Mengatur jeda waktu pengiriman pushkontak (dalam detik) |
| `.sv` | `sv` | Mengirimkan vcard kontak bot ke dalam chat privat |

### Kategori: [SEARCH]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.chord` | `kunci-gitar`, `kord` | Mencari chord kunci gitar lagu |
| `.duckduckgo` | `ddg` | Mencari informasi secara privat dengan DuckDuckGo |
| `.github` | `ghsearch` | Mencari user atau repository GitHub |
| `.google` | `gsearch`, `googlesearch` | Mencari informasi di Google Search |
| `.imdb` | `movie` | Mencari informasi film di Internet Movie Database (IMDB) |
| `.kbbi` | `kamus` | Mencari definisi kata di Kamus Besar Bahasa Indonesia (KBBI) |
| `.lyrics` | `lirik` | Mencari lirik lagu |
| `.map` | `maps`, `lokasi` | Mendapatkan link peta Google Maps untuk suatu lokasi |
| `.news` | `berita` | Membaca berita hangat hari ini |
| `.npm` | `npmsearch` | Mencari package di npmjs.com |
| `.pinterest` | `pin`, `pinsearch` | Mencari gambar di Pinterest |
| `.playstore` | `apps` | Mencari aplikasi di Google Play Store |
| `.recipe` | `resep`, `resepmasakan` | Mencari resep masakan Nusantara |
| `.spotifysearch` | `apispotify` | Mencari lagu di Spotify |
| `.tenor` | `gifsearch` | Mencari gambar GIF di Tenor |
| `.tiktoksearch` | `ttsplay` | Mencari video di TikTok berdasarkan query |
| `.unsplash` | `photossearch` | Mencari foto berkualitas tinggi di Unsplash |
| `.weather` | `cuaca` | Melihat prakiraan cuaca di lokasi tertentu |
| `.wikipedia` | `wiki`, `wikisearch` | Mencari artikel di Wikipedia |
| `.ytsearch` | `yts` | Mencari video di YouTube |

### Kategori: [TOOLS]

| Nama Perintah | Alias / Command | Deskripsi Perintah |
| --- | --- | --- |
| `.b64decode` | `base64decode` | Mengubah format Base64 kembali ke teks asli |
| `.b64encode` | `base64encode` | Mengubah teks menjadi format Base64 |
| `.baliktext` | `reverse` | Membalikkan urutan karakter teks |
| `.base64` | `b64`, `base64encode` | Encode atau decode teks menggunakan sandi Base64 |
| `.calculator` | `kalkulator`, `hitung` | Melakukan operasi kalkulator matematika dasar |
| `.clock` | `waktudunia`, `jam` | Menampilkan jam digital wilayah Indonesia (WIB/WITA/WIT) |
| `.cpu` | `bebandata` | Melihat beban kerja CPU dan penggunaan RAM server |
| `.dns` | `dnslookup` | Melakukan DNS lookup IP record pada domain |
| `.hash` | `md5encrypt`, `sha256encrypt` | Membuat enkripsi hash md5 atau sha256 dari teks input |
| `.headers` | `httpheaders` | Mendapatkan HTTP response headers dari link web target |
| `.ip` | `geoip`, `lacakip` | Melacak lokasi geografi dan ISP dari suatu IP Address |
| `.jsonformat` | `prettifyjson`, `formatjson` | Merapikan format data JSON mentah menjadi terstruktur |
| `.lower` | `lowercase` | Mengubah teks menjadi huruf kecil semua |
| `.minify` | `kompresjs` | Mengecilkan ukuran file kode Javascript/CSS |
| `.obfuscate` | `obfjs`, `amankanjs` | Mengamankan/mengacak kode javascript agar sulit didekripsi |
| `.passgen` | `pwgen`, `password` | Membuat password acak yang kuat |
| `.ping` | `speedtest`, `tesping` | Mengukur kecepatan respon server bot (milidetik) |
| `.qr` | `qrmaker`, `barcode` | Membuat kode QR dari teks atau link web |
| `.readqr` | `bacaqr`, `decodeqr` | Membaca teks dari gambar kode QR (reply gambar) |
| `.runtime` | `aktif`, `uptime` | Melihat durasi bot telah aktif menyala online |
| `.screenshot` | `ssweb`, `webss` | Mengambil screenshot visual halaman website (Format: .ssweb link) |
| `.serverinfo` | `spekserver` | Melihat spesifikasi lengkap sistem server host |
| `.shorturl` | `pendekkanlink`, `shorten` | Membuat link pendek menggunakan tinyurl |
| `.speed` | `tesrespon` | Mengecek respon dan spesifikasi ringkas server host |
| `.tempmail` | `emailsementara`, `tempmailsec` | Membuat kotak masuk email sementara untuk pendaftaran web |
| `.timer` | `alarmku` | Membuat timer alarm pengingat dalam hitungan detik |
| `.tinyurl` | `tinyurldl` | Mempendekkan link dengan layanan TinyURL |
| `.toolgen1` | `toolg1`, `tgen1` | Alat bantu utilitas bagian 1 |
| `.toolgen10` | `toolg10`, `tgen10` | Alat bantu utilitas bagian 10 |
| `.toolgen11` | `toolg11`, `tgen11` | Alat bantu utilitas bagian 11 |
| `.toolgen12` | `toolg12`, `tgen12` | Alat bantu utilitas bagian 12 |
| `.toolgen13` | `toolg13`, `tgen13` | Alat bantu utilitas bagian 13 |
| `.toolgen14` | `toolg14`, `tgen14` | Alat bantu utilitas bagian 14 |
| `.toolgen15` | `toolg15`, `tgen15` | Alat bantu utilitas bagian 15 |
| `.toolgen16` | `toolg16`, `tgen16` | Alat bantu utilitas bagian 16 |
| `.toolgen17` | `toolg17`, `tgen17` | Alat bantu utilitas bagian 17 |
| `.toolgen18` | `toolg18`, `tgen18` | Alat bantu utilitas bagian 18 |
| `.toolgen19` | `toolg19`, `tgen19` | Alat bantu utilitas bagian 19 |
| `.toolgen2` | `toolg2`, `tgen2` | Alat bantu utilitas bagian 2 |
| `.toolgen20` | `toolg20`, `tgen20` | Alat bantu utilitas bagian 20 |
| `.toolgen21` | `toolg21`, `tgen21` | Alat bantu utilitas bagian 21 |
| `.toolgen22` | `toolg22`, `tgen22` | Alat bantu utilitas bagian 22 |
| `.toolgen23` | `toolg23`, `tgen23` | Alat bantu utilitas bagian 23 |
| `.toolgen24` | `toolg24`, `tgen24` | Alat bantu utilitas bagian 24 |
| `.toolgen25` | `toolg25`, `tgen25` | Alat bantu utilitas bagian 25 |
| `.toolgen26` | `toolg26`, `tgen26` | Alat bantu utilitas bagian 26 |
| `.toolgen27` | `toolg27`, `tgen27` | Alat bantu utilitas bagian 27 |
| `.toolgen28` | `toolg28`, `tgen28` | Alat bantu utilitas bagian 28 |
| `.toolgen29` | `toolg29`, `tgen29` | Alat bantu utilitas bagian 29 |
| `.toolgen3` | `toolg3`, `tgen3` | Alat bantu utilitas bagian 3 |
| `.toolgen30` | `toolg30`, `tgen30` | Alat bantu utilitas bagian 30 |
| `.toolgen31` | `toolg31`, `tgen31` | Alat bantu utilitas bagian 31 |
| `.toolgen32` | `toolg32`, `tgen32` | Alat bantu utilitas bagian 32 |
| `.toolgen33` | `toolg33`, `tgen33` | Alat bantu utilitas bagian 33 |
| `.toolgen34` | `toolg34`, `tgen34` | Alat bantu utilitas bagian 34 |
| `.toolgen35` | `toolg35`, `tgen35` | Alat bantu utilitas bagian 35 |
| `.toolgen36` | `toolg36`, `tgen36` | Alat bantu utilitas bagian 36 |
| `.toolgen37` | `toolg37`, `tgen37` | Alat bantu utilitas bagian 37 |
| `.toolgen38` | `toolg38`, `tgen38` | Alat bantu utilitas bagian 38 |
| `.toolgen39` | `toolg39`, `tgen39` | Alat bantu utilitas bagian 39 |
| `.toolgen4` | `toolg4`, `tgen4` | Alat bantu utilitas bagian 4 |
| `.toolgen40` | `toolg40`, `tgen40` | Alat bantu utilitas bagian 40 |
| `.toolgen5` | `toolg5`, `tgen5` | Alat bantu utilitas bagian 5 |
| `.toolgen6` | `toolg6`, `tgen6` | Alat bantu utilitas bagian 6 |
| `.toolgen7` | `toolg7`, `tgen7` | Alat bantu utilitas bagian 7 |
| `.toolgen8` | `toolg8`, `tgen8` | Alat bantu utilitas bagian 8 |
| `.toolgen9` | `toolg9`, `tgen9` | Alat bantu utilitas bagian 9 |
| `.upper` | `uppercase` | Mengubah teks menjadi huruf besar semua |
| `.urlshortener` | `cleanlink` | Mempendekkan link dengan layanan shortener alternatif |
| `.uuidgen` | `uuid`, `generateuuid` | Menghasilkan UUID v4 acak |
| `.whois` | `whoisdomain` | Mencari kepemilikan registrasi domain website |
| `.xmlformat` | `formatxml` | Merapikan format data XML |


---

## ⚙️ KONFIGURASI BOT

Atur bot Anda melalui file [config.js](file:///root/Ryu-Experimental/config.js):
```javascript
module.exports = {
    owner: ['628xxx@s.whatsapp.net'],
    botName: 'Ryu Bot',
    ownerName: 'Owner Ryu',
    prefix: '.',
    PROMO_TEXT: '\n\n*Ryu Experimental Bot* 🚀'
};
```

*Terima kasih telah menggunakan Ryu Experimental Bot!*