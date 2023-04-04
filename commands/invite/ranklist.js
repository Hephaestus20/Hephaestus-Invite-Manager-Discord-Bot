const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("You need to have the `Administrator` permission to use this command!");
  }

  const rolesWithInvites = [];

  // Loop through each role in the server
  message.guild.roles.cache.forEach((role) => {
    // Check if the role has an associated invite requirement
    const requiredInvites = db.get(`inviteRole_${message.guild.id}_${role.id}`);
    if (requiredInvites) {
      rolesWithInvites.push({
        role,
        requiredInvites
      });
    }
  });

  // Sort the roles based on their required invite count in ascending order
  rolesWithInvites.sort((a, b) => a.requiredInvites - b.requiredInvites);

  // Create an embed to display the sorted roles
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
