const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || message.author;


  const entryCount = db.get(`davet_${message.guild.id}_${user.id}`) || 0;
  

  const exitCount = db.get(`cikis_${message.guild.id}_${user.id}`) || 0;
  

  const bonusCount = db.get(`bonus_${message.guild.id}_${user.id}`) || 0;
  
  const totalInvites = entryCount + bonusCount - exitCount;

 
  const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag)
    .setColor("#7289DA")
    .setDescription(`**${totalInvites}** Invites (**${entryCount}** Entry, **${exitCount}** Exit, **${bonusCount}** Bonus)`)

  message.channel.send(embed);
};

exports.config = {
  name: "profile",
  guildOnly: true,
  aliases: [""],
};
