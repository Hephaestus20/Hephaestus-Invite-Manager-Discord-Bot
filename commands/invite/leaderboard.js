const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  const data = [];

  const leaderboard = db.all().filter(data => data.ID.startsWith(`davet_${message.guild.id}_`)).sort((a, b) => {
    const aTotal = (db.get(`bonus_${message.guild.id}_${a.ID.split('_')[2]}`) || 0) + a.data - (db.get(`cikis_${message.guild.id}_${a.ID.split('_')[2]}`) || 0);
    const bTotal = (db.get(`bonus_${message.guild.id}_${b.ID.split('_')[2]}`) || 0) + b.data - (db.get(`cikis_${message.guild.id}_${b.ID.split('_')[2]}`) || 0);
    return bTotal - aTotal;
  }).slice(0, 10);

  for (let i = 0; i < leaderboard.length; i++) {
    const id = leaderboard[i].ID.split('_')[2];
    const user = await client.users.fetch(id);
    const davet = leaderboard[i].data;
    const cikanSayisi = db.get(`cikis_${message.guild.id}_${id}`) || 0;
    const bonus = db.get(`bonus_${message.guild.id}_${id}`) || 0;
    const sonuc = davet + bonus - cikanSayisi;
    data.push(`**${i + 1}.** **${user.tag}** — **${sonuc} invites** (**${davet}** entry, **${bonus}** bonus, **${cikanSayisi}** exit)`);
  }

  const embed = new Discord.MessageEmbed()
    .setColor("#7289DA")
    .setTitle(`Leaderboard`)
    .setDescription(`${data.join('\n')}`);

  message.channel.send(embed);
};

exports.config = {
  name: "leaderboard",
  guildOnly: true,
  aliases: [""],
};
