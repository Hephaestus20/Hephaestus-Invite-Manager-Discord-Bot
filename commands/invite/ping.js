const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  const pingEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setDescription(`Ping: `)
    .setTimestamp();

  message.channel.send(pingEmbed);
};

exports.config = {
  name: "ping",
  guildOnly: true,
  aliases: ["p"],
};
