const { franceking } = require('../main');
const axios = require('axios');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const yts = require('yt-search');
const fg = require('api-dylux');

module.exports = [
  {
    name: 'attp',
    get flashOnly() {
  return franceking();
},
    aliases: ['attp-sticker'],
    description: 'Converts text into an ATTP sticker.',
    category: 'User',
    execute: async (king, msg, args, fromJid) => {
      const text = args.join(" ");
      if (!text) return await king.sendMessage(fromJid, { text: 'Please provide the text to convert into a sticker!' }, { quoted: msg });

      const gifUrl = `https://raganork-api.onrender.com/api/attp?text=${encodeURIComponent(text)}&apikey=with_love_souravkl11`;

      try {
        const packname = msg.pushName || 'FLASH-MD';
        const stickerMess = new Sticker(gifUrl, {
          pack: packname,
          author: 'FLASH-MD',
          type: StickerTypes.FULL,
          categories: ['🤩', '🎉'],
          id: '12345',
          quality: 40,
          background: 'transparent',
        });

        const stickerBuffer = await stickerMess.toBuffer();
        await king.sendMessage(fromJid, {
          sticker: stickerBuffer,
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      } catch {
        await king.sendMessage(fromJid, {
          text: 'Error while creating that sticker. Please try again.',
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      }
    }
  },
  {
    name: 'stickersearch',
    get flashOnly() {
  return franceking();
},
    aliases: ['stsearch', 'stickerfind'],
    description: 'Search and create stickers from Tenor GIFs.',
    category: 'Search',
    execute: async (king, msg, args, fromJid) => {
      const search = args.join(' ');
      if (!search) return await king.sendMessage(fromJid, {
        text: 'Insert the type of stickers you want!',
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363238139244263@newsletter',
            newsletterName: 'FLASH-MD',
            serverMessageId: -1
          }
        }
      }, { quoted: msg });

      try {
        const res = await axios.get(`https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(search)}&key=AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c&client_key=my_project&limit=5&media_filter=gif`);
        const gifs = res.data.results;

        for (let gif of gifs) {
          const sticker = new Sticker(gif.media_formats.gif.url, {
            pack: msg.pushName || 'FLASH-MD',
            author: 'FLASH-MD',
            type: StickerTypes.FULL,
            quality: 60,
            background: 'transparent',
          });

          const buffer = await sticker.toBuffer();
          await king.sendMessage(fromJid, {
            sticker: buffer,
            contextInfo: {
              forwardingScore: 1,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363238139244263@newsletter',
                newsletterName: 'FLASH-MD',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });
        }
      } catch {
        await king.sendMessage(fromJid, {
          text: 'Error searching for stickers.',
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      }
    }
  },
  {
    name: 'weather',
    get flashOnly() {
  return franceking();
},
    aliases: ['climate'],
    description: 'Get the current weather for a specific location.',
    category: 'Search',
    execute: async (king, msg, args, fromJid) => {
      const location = args.join(' ');
      if (!location) return await king.sendMessage(fromJid, {
        text: 'Give me a location to check the weather.',
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363238139244263@newsletter',
            newsletterName: 'FLASH-MD',
            serverMessageId: -1
          }
        }
      }, { quoted: msg });

      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: location,
            units: 'metric',
            appid: '060a6bcfa19809c2cd4d97a212b19273',
            language: 'en'
          }
        });

        const data = res.data;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const rain = data.rain ? data.rain['1h'] : 0;

        const text = `❄️ *Weather in ${data.name}, ${data.sys.country}*

🌡️ *Temperature:* ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)
📉 *Min:* ${data.main.temp_min}°C  📈 *Max:* ${data.main.temp_max}°C
📝 *Condition:* ${data.weather[0].description}
💧 *Humidity:* ${data.main.humidity}%
🌬️ *Wind:* ${data.wind.speed} m/s
☁️ *Cloudiness:* ${data.clouds.all}%
🌧️ *Rain (last hour):* ${rain} mm
🌄 *Sunrise:* ${sunrise}
🌅 *Sunset:* ${sunset}
🧭 *Coordinates:* ${data.coord.lat}, ${data.coord.lon}

*°Powered by FLASH-MD*`;

        await king.sendMessage(fromJid, {
          text,
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      } catch {
        await king.sendMessage(fromJid, {
          text: 'Failed to fetch weather data.',
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      }
    }
  },
  {
    name: 'yts',
    get flashOnly() {
  return franceking();
},
    aliases: ['ytsearch'],
    description: 'Searches YouTube videos by keyword.',
    category: 'Search',
    execute: async (king, msg, args, fromJid) => {
      const query = args.join(' ');
      if (!query) return await king.sendMessage(fromJid, {
        text: 'What do you want to search for?',
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363238139244263@newsletter',
            newsletterName: 'FLASH-MD',
            serverMessageId: -1
          }
        }
      }, { quoted: msg });

      try {
        const info = await yts(query);
        const videos = info.videos.slice(0, 10);

        let text = `*YouTube Search Results for:* _${query}_\n\n`;
        for (let i = 0; i < videos.length; i++) {
          text += `*${i + 1}. ${videos[i].title}*\n`;
          text += `📺 Channel: ${videos[i].author.name}\n`;
          text += `⏱ Duration: ${videos[i].timestamp}\n`;
          text += `🔗 Link: ${videos[i].url}\n\n`;
        }

        await king.sendMessage(fromJid, {
          image: { url: videos[0].thumbnail },
          caption: text + '*Powered by FLASH-MD*',
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
            }
        }, { quoted: msg });
      } catch {
        await king.sendMessage(fromJid, {
          text: 'Error occurred while searching YouTube.',
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      }
    }
  },
  {
    name: 'ytmp4',
    get flashOnly() {
  return franceking();
},
    aliases: [],
    description: 'Downloads a YouTube video.',
    category: 'Download',
    execute: async (king, msg, args, fromJid) => {
      const url = args[0];
      if (!url) return await king.sendMessage(fromJid, {
        text: 'Insert a YouTube link.',
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363238139244263@newsletter',
            newsletterName: 'FLASH-MD',
            serverMessageId: -1
          }
        }
      }, { quoted: msg });

      try {
        const result = await fg.yta(url);
        await king.sendMessage(fromJid, {
          video: { url: result.dl_url },
          caption: `*🎬 Title:* ${result.title}\n*🔗 Source:* ${url}\n\n_Powered by FLASH-MD_`,
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      } catch {
        await king.sendMessage(fromJid, {
          text: 'Error downloading video.',
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      }
    }
  },
  {
    name: 'ytmp3',
    get flashOnly() {
  return franceking();
},
    aliases: [],
    description: 'Downloads audio from a YouTube video.',
    category: 'Download',
    execute: async (king, msg, args, fromJid) => {
      const url = args[0];
      if (!url) return await king.sendMessage(fromJid, {
        text: 'Insert a YouTube link.',
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363238139244263@newsletter',
            newsletterName: 'FLASH-MD',
            serverMessageId: -1
          }
        }
      }, { quoted: msg });

      try {
        const result = await fg.yta(url);
        await king.sendMessage(fromJid, {
          audio: { url: result.dl_url },
          mimetype: 'audio/mp4',
          fileName: result.title,
          ptt: false,
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      } catch {
        await king.sendMessage(fromJid, {
          text: 'Error downloading audio.',
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: 'FLASH-MD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      }
    }
  }
];
