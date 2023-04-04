const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Developer Information")
    .setDescription(`
        Developer: **iHephaestus20#4307** <:hephaestus:1091415287762522254>

        If you want to get **premium** membership, contact __me__.

        Don't hesitate to report any __bugs__ or __issues__ you find!

        Discord.js Version: v12
      `)
    .setTimestamp();
  const helpMessage = await message.channel.send(helpEmbed);
};

exports.config = {
  name: "developer",
  guildOnly: true,
  aliases: [],
};
