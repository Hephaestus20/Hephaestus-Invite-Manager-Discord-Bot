const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
// Checking if the user has enough permission to use the command
if (!message.member.hasPermission("ADMINISTRATOR")) {
return message.reply("You don't have enough permission to use this command!");
}

// Getting the tagged user
const user = message.mentions.users.first();
if (!user) {
return message.reply("You need to mention a user!");
}

// Getting and checking the bonus amount
const bonus = parseInt(args[1]);
if (isNaN(bonus)) {
return message.reply("You need to provide a number!");
}

// Updating the bonus amount in Quick.db
db.subtract(`bonus_${message.guild.id}_${user.id}`, bonus);

message.channel.send(`${bonus} bonus invite(s) removed from ${user}!`);
};

exports.config = {
name: "removebonus",
guildOnly: true,
aliases: [],
};