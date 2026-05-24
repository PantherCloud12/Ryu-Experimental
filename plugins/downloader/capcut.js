const axios = require("axios");

async function capcutDownload(videoUrl) {
  if (!videoUrl) throw new Error("URL CapCut tidak boleh kosong");

  const headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://snapvideotools.com",
    "referer": "https://snapvideotools.com/capcut-downloader",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
  };

  const requestBody = {
    text: videoUrl
  };

  try {
    const response = await axios.post(
      "https://snapvideotools.com/api/snap",
      requestBody,
      { headers: headers }
    );

    const data = response.data;

    if (data.code !== 0 || !data.data) {
      throw new Error(data.message || "Gagal mengunduh dari CapCut");
    }

    const mediaUrls = data.data.mediaUrls || [];
    
    const medias = mediaUrls.map((m, index) => ({
      quality: index === 0 ? "HD" : `video_${index + 1}`,
      url: m.url,
      type: m.type,
      suffix: m.suffix,
      size: m.size,
      has_watermark: index > 0
    }));

    const withoutWatermark = medias.filter(m => !m.has_watermark);
    const withWatermark = medias.filter(m => m.has_watermark);

    return {
      code: 200,
      timestamp: Date.now(),
      data: {
        title: data.data.title || null,
        thumbnail: data.data.cover || null,
        source: data.data.platformName || "CapCut",
        platformKey: data.data.platformKey || "capcut",
        medias: medias,
        no_watermark: withoutWatermark.length > 0 ? withoutWatermark[0].url : null,
        no_watermark_list: withoutWatermark,
        watermark: withWatermark.length > 0 ? withWatermark[0].url : null,
        watermark_list: withWatermark,
        best_video: withoutWatermark.length > 0 ? withoutWatermark[0].url : (medias[0]?.url || null),
        all_videos: mediaUrls.map(m => m.url)
      }
    };
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

module.exports = {
    name: 'capcut',
    command: ['capcut', 'cc', 'ccdl'],
    category: 'downloader',
    description: 'Mengunduh video CapCut tanpa watermark',
    isGroup: false,
    isAdmin: false,
    isBotAdmin: false,
    execute: async (sock, m, { text }) => {
        const jid = m.key.remoteJid;

        if (!text) {
            return await sock.sendMessage(jid, { text: '❌ Masukkan URL video/template CapCut yang ingin diunduh!\nContoh: *.capcut https://www.capcut.com/template-detail/7641405062509514001...*' }, { quoted: m });
        }

        try {
            await sock.sendMessage(jid, { text: '⏳ Sedang mengunduh video CapCut, mohon tunggu...' }, { quoted: m });
            
            const result = await capcutDownload(text.trim());

            if (result.code === 200 && result.data.best_video) {
                await sock.sendMessage(jid, {
                    video: { url: result.data.best_video },
                    caption: `🎬 *CapCut Downloader*\n\n📌 *Judul:* ${result.data.title || 'CapCut Video'}\n🌐 *Platform:* ${result.data.source}\n\nTerima kasih telah menggunakan bot! ✨`
                }, { quoted: m });
            } else {
                throw new Error('Gagal mendapatkan url video download.');
            }
        } catch (err) {
            console.error('CapCut Downloader Error:', err);
            await sock.sendMessage(jid, { text: `❌ Terjadi kesalahan: ${err.message}` }, { quoted: m });
        }
    }
};
