const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (args[0] === "joinMessageChannel") {
    const channel = message.mentions.channels.first();

    if (!channel) return message.channel.send("You must specify a channel!");

    db.set(`davetkanal_${message.guild.id}`, channel.id);
    const embed = new Discord.MessageEmbed()
      .setTitle("Join Message Channel Set")
      .setDescription(`Join message channel has been successfully set.\n\n Channel Set\n ${channel}`)
      .setColor("GREEN");

    message.channel.send(embed);

  } else if (args[0] === "joinMessage") {
    const msg = args.slice(1).join(" ");
    if (!msg) return message.channel.send("You must provide a message! Example usage: `config joinMessage {memberMention} **Joined** Invited by {inviterName}! They have {numInvites} invites.`");

    db.set(`davetmesaj_${message.guild.id}`, msg);
    const embed = new Discord.MessageEmbed()
      .setTitle("Join Message Set")
      .setDescription(`Join message has been successfully set.\n\n Message Set\n ${msg}`)
      .setColor("GREEN");

    message.channel.send(embed);
  } else if (args[0] === "leaveMessageChannel") {
    const channel = message.mentions.channels.first();

    if (!channel) return message.channel.send("You must specify a channel!");

    db.set(`ayrilmakanal_${message.guild.id}`, channel.id);
    const embed = new Discord.MessageEmbed()
      .setTitle("Leave Message Channel Set")
      .setDescription(`Leave message channel has been successfully set.\n\n Channel Set\n ${channel}`)
      .setColor("GREEN");

    message.channel.send(embed);
  } else if (args[0] === "leaveMessage") {
    const msg = args.slice(1).join(" ");
    if (!msg) return message.channel.send("You must provide a message! Example usage: `config leaveMessage {memberMention} **Left** They were invited by {inviterName} with {numInvites} invites remaining.`");

    db.set(`ayrilmamesaj_${message.guild.id}`, msg);
    const embed = new Discord.MessageEmbed()
      .setTitle("Leave Message Set")
      .setDescription(`Leave message has been successfully set.\n\n Message Set\n ${msg}`)
      .setColor("GREEN");

    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Config Menu")
      .setDescription("Example Usage: **config joinMessage <msg>**\n``joinMessage``, ``joinMessageChannel``, ``leaveMessage``, ``leaveMessageChannel``")
      .setTimestamp();

    message.channel.send(embed);
  }

};

exports.config = {
  name: "config",
  guildOnly: true,
  aliases: [],
};
