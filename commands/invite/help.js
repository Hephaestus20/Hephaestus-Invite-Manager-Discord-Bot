const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Help Menu")
    .setDescription("**Invites**\n``addbonus``, ``removebonus``, ``leaderboard``, ``profile``, ``resetinvite``\n**Ranks**\n``addrank``,``ranks``,``removerank``\n**Config**\n``config``\n**Other**\n``Vote``, ``Ping``, ``Developer``, ``Developer``\n\n**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=1090684354990186627&permissions=8&scope=bot)** - **[Support Server](https://discord.gg/AZVm4V28xE)**")
    .setTimestamp();
  const helpMessage = await message.channel.send(helpEmbed);
};

exports.config = {
  name: "help",
  guildOnly: true,
  aliases: [],
};
