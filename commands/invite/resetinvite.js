const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  // Get the mentioned user
  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("Error! You must mention a user!");
  }

  // Ask for confirmation before resetting the user's invite info
  const confirmEmbed = new Discord.MessageEmbed()
    .setTitle("Confirmation for Resetting Invite Info")
    .setDescription(`Are you sure you want to reset all the invite info for **${user.tag}**?`)
    .setColor("#ff0000")
    .setFooter("Click ✅ to confirm or ❌ to cancel.");

  const confirmMessage = await message.channel.send(confirmEmbed);
  await confirmMessage.react("✅"); // Green checkmark emoji
  await confirmMessage.react("❌"); // Red X emoji

  const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
  const collector = confirmMessage.createReactionCollector(filter, { time: 15000, max: 1 });

  collector.on("collect", async (reaction) => {
    if (reaction.emoji.name === "✅") {
      // Reset the user's invite info
      db.delete(`davet_${message.guild.id}_${user.id}`);
      db.delete(`bonus_${message.guild.id}_${user.id}`);
      db.delete(`cikis_${message.guild.id}_${user.id}`);

      const successEmbed = new Discord.MessageEmbed()
        .setTitle("Invite Info Reset")
        .setDescription(`All invite info for **${user.tag}** has been successfully reset.`)
        .setColor("#00ff00");

      return message.channel.send(successEmbed);
    } else {
      // Cancel the operation
      const cancelEmbed = new Discord.MessageEmbed()
        .setDescription(`Resetting invite info for **${user.tag}** has been cancelled.`)
        .setColor("#ff0000");

      return message.channel.send(cancelEmbed);
    }
  });

  collector.on("end", (collected, reason) => {
    if (reason === "time") {
      // Cancel the operation due to no reaction
      const timeoutEmbed = new Discord.MessageEmbed()
        .setTitle("Operation Cancelled")
        .setDescription(`Error! ime's up! Resetting invite info for **${user.tag}** has been cancelled.`)
        .setColor("#ff0000");
	  message.channel.send(timeoutEmbed);
	}
  });
};

exports.config = {
  name: "resetinvite",
  guildOnly: true,
  aliases: [],
};
