const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Help Menu")
    .setDescription("**Invites**\n``addbonus``, ``removebonus``, ``leaderboard``, ``profile``, ``resetinvite``\n**Ranks**\n``addrank``,``ranks``,``removerank``\n**Config**\n``config``\n**Other**\n``Vote``, ``Ping``, ``Developer``, ``Developer``\n\n**[Bot Invite](https://discord.gg/QKucPzYs5M)** - **[Support Server](https://discord.gg/QKucPzYs5M)**")
    .setTimestamp();
  const helpMessage = await message.channel.send(helpEmbed);
};

exports.config = {
  name: "help",
  guildOnly: true,
  aliases: [],
};
