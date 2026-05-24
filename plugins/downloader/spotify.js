/**
 * @project    : Spotify Downloader
 * @author     : Kayllano Aveline  👨💻
 * @description: Nggakk usah nnya lagii 
 * Website     : xalixia.biz.id
 **/

const axios = require("axios");
const fs = require("fs");
const path = require("path");

class SpotifyDownloader {
  constructor() {
    this.baseURL = "https://spotisoft.com";
    this.cookieStr = "";
    this.csrfToken = "";
  }

  async initialize() {
    const response = await axios.get(this.baseURL, {
      headers: this._getBaseHeaders(),
      maxRedirects: 5
    });

    const cookies = response.headers["set-cookie"] || [];
    
    for (const cookie of cookies) {
      const cookiePart = cookie.split(";")[0];
      this.cookieStr += (this.cookieStr ? "; " : "") + cookiePart;
      
      if (cookiePart.startsWith("__Host-authjs.csrf-token=")) {
        this.csrfToken = decodeURIComponent(
          cookiePart.replace("__Host-authjs.csrf-token=", "")
        );
      }
    }

    return this.csrfToken;
  }

  _getBaseHeaders() {
    return {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36"
    };
  }

  _getActionHeaders() {
    return {
      ...this._getBaseHeaders(),
      "accept": "text/x-component",
      "content-type": "text/plain;charset=UTF-8",
      "cookie": this.cookieStr,
      "next-action": "40016c43901dcc7fd55eca719fdb2c4944ab434fdb",
      "next-router-state-tree": "%5B%22%22%2C%7B%22children%22%3A%5B%5B%22locale%22%2C%22en%22%2C%22d%22%2Cnull%5D%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%2C0%5D%7D%2Cnull%2Cnull%2C0%5D%7D%2Cnull%2Cnull%2C16%5D",
      "origin": this.baseURL,
      "referer": this.baseURL + "/"
    };
  }

  async searchTrack(spotifyUrl) {
    if (!this.csrfToken) await this.initialize();

    const response = await axios.post(
      this.baseURL,
      [spotifyUrl],
      { headers: this._getActionHeaders() }
    );

    const lines = response.data.split("\n");
    let trackData = null;

    for (const line of lines) {
      if (line.startsWith("1:") && line.includes('"success":true')) {
        try {
          trackData = JSON.parse(line.substring(2));
          break;
        } catch (e) {
          continue;
        }
      }
    }

    if (!trackData?.success) {
      throw new Error("Failed to fetch track data");
    }

    return trackData;
  }

  async downloadTrack(spotifyUrl, outputPath = null) {
    const trackResult = await this.searchTrack(spotifyUrl);
    const { data: track, token } = trackResult;

    const downloadPayload = {
      url: spotifyUrl,
      token: token,
      quality: "128",
      branding: "SpotiSoft",
      title: track.name,
      artist: track.artists?.join(", ") || "",
      imageUrl: track.image || ""
    };

    const response = await axios.post(
      `${this.baseURL}/api/proxy/download`,
      downloadPayload,
      {
        headers: {
          "accept": "*/*",
          "content-type": "application/json",
          "cookie": this.cookieStr,
          "origin": this.baseURL,
          "referer": this.baseURL + "/",
          "user-agent": this._getBaseHeaders()["user-agent"]
        },
        responseType: "arraybuffer"
      }
    );

    const sanitizedArtist = (track.artists?.[0] || "Unknown")
      .replace(/[<>:"/\\|?*]/g, "");
    const sanitizedTitle = (track.name || "track")
      .replace(/[<>:"/\\|?*]/g, "");
    const fileName = `${sanitizedArtist} - ${sanitizedTitle}.mp3`;
    const savePath = outputPath || path.resolve(fileName);

    fs.writeFileSync(savePath, Buffer.from(response.data));

    return {
      success: true,
      name: track.name,
      artist: track.artists?.join(", "),
      artistList: track.artists,
      album: track.album,
      cover: track.image,
      duration: track.duration,
      durationFormatted: this._formatDuration(track.duration),
      spotifyUrl: track.spotifyUrl,
      outputPath: savePath,
      fileSize: response.data.length
    };
  }

  _formatDuration(ms) {
    if (!ms) return "00:00";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

module.exports = {
    name: 'spotify',
    command: ['spotify', 'spotydl'],
    category: 'downloader',
    description: 'Mengunduh lagu dari Spotify menggunakan tautan track',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;

        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan URL track Spotify yang ingin diunduh!\nContoh: *.spotify https://open.spotify.com/track/09eWF5r8kasfOEp8RFRQLv*' }, { quoted: m });
        }

        try {
            await sock.sendMessage(jid, { text: '⏳ Sedang mencari dan mengunduh trek Spotify, mohon tunggu...' }, { quoted: m });

            const downloader = new SpotifyDownloader();
            
            const tempDir = path.join(__dirname, '../../temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }
            
            const savePath = path.join(tempDir, `spotify_${Date.now()}.mp3`);
            const result = await downloader.downloadTrack(text.trim(), savePath);

            if (result.success) {
                // Send metadata cover image
                await sock.sendMessage(jid, {
                    image: { url: result.cover },
                    caption: `🎶 *Spotify Downloader*\n\n📌 *Judul:* ${result.name}\n👤 *Artis:* ${result.artist}\n💿 *Album:* ${result.album}\n⏱️ *Durasi:* ${result.durationFormatted}\n📦 *Ukuran:* ${(result.fileSize / 1024 / 1024).toFixed(2)} MB\n\nSedang mengirimkan file audio...`
                }, { quoted: m });

                // Send audio file
                await sock.sendMessage(jid, {
                    audio: fs.readFileSync(savePath),
                    mimetype: 'audio/mp4',
                    fileName: `${result.artist} - ${result.name}.mp3`
                }, { quoted: m });

                // Clean up temp file
                fs.unlinkSync(savePath);
            } else {
                throw new Error('Gagal memproses download lagu.');
            }
        } catch (err) {
            console.error('Spotify Downloader Error:', err);
            await sock.sendMessage(jid, { text: `❌ Terjadi kesalahan: ${err.message}` }, { quoted: m });
        }
    }
};
