const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("You need to have the `Administrator` permission to use this command!");
  }

  const role = message.mentions.roles.first();
  const requiredInvites = parseInt(args[1]);

  if (!role || isNaN(requiredInvites)) {
    return message.reply("Please provide a valid role and a required number of invites. Usage: `addrank <@role> <required-invites>`");
  }

  // Save role information to the database
  db.set(`inviteRole_${message.guild.id}_${role.id}`, requiredInvites);

  const successEmbed = new Discord.MessageEmbed()
    .setTitle("Success!")
    .setDescription(`\`${role.name}\` role now requires ${requiredInvites} invites.`)
    .setColor("#00ff00");

  return message.channel.send(successEmbed);
};

exports.config = {
  name: "addrank",
  guildOnly: true,
  aliases: [],
};
