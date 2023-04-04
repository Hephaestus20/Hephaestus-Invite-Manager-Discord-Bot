const Discord = require("discord.js");
const ayarlar = require('../config.js');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "PLAYING", name: `Invite Manager | h+Help h+Config`}, status: 'online' })
};

