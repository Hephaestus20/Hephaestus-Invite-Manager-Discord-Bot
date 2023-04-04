const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("You need to have the `Administrator` permission to use this command!");
  }

  const rolesWithInvites = [];


  message.guild.roles.cache.forEach((role) => {

    const requiredInvites = db.get(`inviteRole_${message.guild.id}_${role.id}`);
    if (requiredInvites) {
      rolesWithInvites.push({
        role,
        requiredInvites
      });
    }
  });


  rolesWithInvites.sort((a, b) => a.requiredInvites - b.requiredInvites);


  const embed = new Discord.MessageEmbed()
    .setTitle("Roles with Invite Requirements")
    .setColor("#00ff00");

  rolesWithInvites.forEach((roleWithInvite, index) => {
    embed.addField(
      `${index + 1}. ${roleWithInvite.role.name}`,
      `Required Invites: ${roleWithInvite.requiredInvites}`,
      true
    );
  });

  return message.channel.send(embed);
};

exports.config = {
  name: "rankslist",
  guildOnly: true,
  aliases: [],
};
