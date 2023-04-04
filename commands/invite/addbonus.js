const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

 
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("You don't have enough permission to use this command!");
  }


  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("You must tag a user!");
  }


  const bonus = parseInt(args[1]);
  if (isNaN(bonus)) {
    return message.reply("You must enter a number!");
  }


  db.add(`bonus_${message.guild.id}_${user.id}`, bonus);


  const bonusEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Bonus Added")
    .setDescription(`${user} has been awarded ${bonus} bonus invites!`);
  
  message.channel.send(bonusEmbed);
};

exports.config = {
  name: "addbonus",
  guildOnly: true,
  aliases: [],
};
