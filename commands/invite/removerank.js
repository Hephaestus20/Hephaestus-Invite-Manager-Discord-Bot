const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("You need to have the `Administrator` permission to use this command!");
  }

  const role = message.mentions.roles.first();

  if (!role) {
    return message.reply("Please mention a role to remove. Usage: `removerank <@role>`");
  }

  // Check if the role exists in the database
  if (!db.get(`inviteRole_${message.guild.id}_${role.id}`)) {
    return message.reply(`${role.name} is not a valid invite role!`);
  }

  // Remove role information from the database
  db.delete(`inviteRole_${message.guild.id}_${role.id}`);

  const successEmbed = new Discord.MessageEmbed()
    .setTitle("Success!")
    .setDescription(`\`${role.name}\` role has been removed from invite roles.`)
    .setColor("#00ff00");

  return message.channel.send(successEmbed);
};

exports.config = {
  name: "removerank",
  guildOnly: true,
  aliases: [],
};
