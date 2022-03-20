//기본 사전세팅
const Discord = require('discord.js');
const Intents = Discord.Intents;
require('dotenv').config();
const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILD_MESSAGES,
	]
});

client.on("ready", () => {
  console.log(`${client.user.tag}로 로그인 완료!`);
  client.user.setActivity(`이모지 확대용 봇 | ${client.guilds.cache.size}개의 서버에서 일하는중`, {
    type: "PLAYING",
  });
});

process.on("unhandledRejection", (reason, p) => {
	console.log(`error: ${(reason)?.stack ?? util.inspect(reason)}`);
})

client.on("message", async (message) => {
	if(message.author.bot || message.reference || 
	   !String(message.content) || !/^<a?:.+?:\d+>$/.test(String(message.content))) 
		return;
  	await message.delete();

  	const link = message.content.includes("<a:") ? 
		`https://cdn.discordapp.com/emojis/${message.content.split(":")[2].split(">")[0]}.gif` :
		`https://cdn.discordapp.com/emojis/${message.content.split(":")[2].split(">")[0]}.png`;
	await message.channel.send(`**${message.member.displayName}** :\n`, {files: [link]});
});

client.on("guildCreate", async (guild) => {
  client.user.setActivity(`이모지 확대용 봇 | ${client.guilds.cache.size}개의 서버에서 일하는중`, {
    type: "PLAYING",
  });
  let teddypicker = await client.users.fetch('653157614452211712');
  teddypicker.send(`봇이 **${guild.name}** 서버에 추가됨`);
});

client.login(process.env.TOKEN);
