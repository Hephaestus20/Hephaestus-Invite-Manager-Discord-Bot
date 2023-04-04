const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.js");
const fs = require("fs");
const db = require("quick.db");
require('./util/Loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();





fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);

  console.log(`${files.length} komut yüklenecek.`);

  files.forEach(f => {
    const stats = fs.lstatSync(`./commands/${f}`);

    if (stats.isDirectory()) {
      const nestedFiles = fs.readdirSync(`./commands/${f}/`);
      nestedFiles.forEach(nf => {
        let props = require(`./commands/${f}/${nf}`);
        console.log(`${props.config.name} loaded.`);

        client.commands.set(props.config.name, props);

        props.config.aliases.forEach(alias => {
          client.aliases.set(alias, props.config.name);
        });
      });
    } else {
      let props = require(`./commands/${f}`);
      console.log(`${props.config.name} loaded.`);

      client.commands.set(props.config.name, props);

      props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props.config.name);
      });
    }
  });
});



client.on("guildMemberRemove", async (member) => {
  const invites = await member.guild.fetchInvites();
  const invite = invites.find((inv) => inv.uses < inv.maxUses);
  if (invite) {
    const inviter = client.users.cache.get(invite.inviter.id);
    db.add(`cikis_${member.guild.id}_${inviter.id}`, 1);
    
    const channelID = db.get(`ayrilmakanal_${member.guild.id}`);
    if (channelID) {
      const channel = member.guild.channels.cache.get(channelID);
      if (channel) {
        const entryCount = db.get(`davet_${member.guild.id}_${inviter.id}`) || 0;
        const exitCount = db.get(`cikis_${member.guild.id}_${inviter.id}`) || 0;
        const bonusCount = db.get(`bonus_${member.guild.id}_${inviter.id}`) || 0;
        const totalInvites = entryCount + bonusCount - exitCount;
        
        const message = db.get(`ayrilmamesaj_${member.guild.id}`);
        const replacedMessage = message
          .replace("{memberMention}", member)
          .replace("{inviterName}", inviter.username)
          .replace("{numInvites}", totalInvites)
          .replace(/\\n/g, '\n');

        channel.send(replacedMessage);
      }
    }
  }
});


client.on("guildMemberAdd", async (member) => {
  const invites = await member.guild.fetchInvites();
  let invite;

  invites.forEach((inv) => {
    if (inv.uses < inv.maxUses) {
      invite = inv;
      return;
    }
  });

  if (invite) {
    const inviter = client.users.cache.get(invite.inviter.id);
    db.add(`davet_${member.guild.id}_${inviter.id}`, 1);

    const channelID = db.get(`davetkanal_${member.guild.id}`);
    if (channelID) {
      const channel = member.guild.channels.cache.get(channelID);
      if (channel) {
          const entryCount = db.get(`davet_${member.guild.id}_${inviter.id}`) || 0;
          const exitCount = db.get(`cikis_${member.guild.id}_${inviter.id}`) || 0;
          const bonusCount = db.get(`bonus_${member.guild.id}_${inviter.id}`) || 0;
          const totalInvites = entryCount + bonusCount - exitCount;
          const message = db.get(`davetmesaj_${member.guild.id}`);
        const replacedMessage = message
          .replace("{memberMention}", member)
          .replace("{inviterName}", inviter.username)
          .replace("{numInvites}", totalInvites)
          .replace(/\\n/g, '\n');

        channel.send(replacedMessage);
      }
    }
  }
});

client.on("guildMemberAdd", async (member) => {
  const roleID = "1091431264638226462"; // verilecek rolün ID'si
  const role = member.guild.roles.cache.get(roleID);
  if (!role) return console.error("Belirtilen rol bulunamadı.");

  try {
    await member.roles.add(role);
  } catch (err) {
    console.error(err);
  }
});

client.on('guildMemberAdd', async (member) => {
  const guild = member.guild;
  const user = member.user;

  const oldInvites = await db.get(`davet_${guild.id}_${user.id}`) || 0;
  const newInvites = await db.get(`davet_${guild.id}_${user.id}`) + await db.get(`bonus_${guild.id}_${user.id}`) || 0;
  const roles = guild.roles.cache;

  roles.forEach(async (role) => {
    const roleId = role.id;
    const requiredInvites = await db.get(`inviteRole_${guild.id}_${roleId}`);

 
    if (requiredInvites && newInvites >= requiredInvites) {
      try {

        await member.roles.add(roleId);

        const dmMessage = `Congratulations! You have completed the required ${requiredInvites} invites for the ${role.name} role.`;
        await user.send(dmMessage);

      } catch (error) {
        console.log(`${error}`);
      }
    }
  });
});



client.login(config.token);
