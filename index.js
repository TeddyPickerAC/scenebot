//기본 사전세팅
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

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
	if(message.author.bot) return;
  if(message.reference) return;
  if(message.content.startsWith("./존나팸")) {
    setTimeout(() => {message.channel.send('슨...........상................이.................때.........................리........................지.............................마....');}, 5000);
  }else if(message.content.startsWith("sceneinvite")){
    message.channel.send("씬 초대 링크 : https://discord.com/api/oauth2/authorize?client_id=887415276117827665&permissions=343597394944&scope=bot");
    return;
  }
  const input = String(message.content);
	const link = await makeemojilink(input);
	if(link){
  	await message.delete();
  	await message.channel.send(`**${message.member.displayName}** :\n`, {files: [`${link}`]});
	}
});

function makeemojilink(input){
  if(input.match(/<a:.+?:\d+>|<:.+?:\d+>/g) && input.startsWith("<") && input.charAt(input.length-1) == '>'){ //단순 이모지 전송일때
    if(input.split(":").length > 3 
      || (!input[0] == '<' && input[input.length-1] == '>')
      || input.split("<").length > 2) return;
    const id = input.split(":")[2].split(">")[0];
    let link = ``;
    if(input.includes("<a:")) {
      link = `https://cdn.discordapp.com/emojis/${id}.gif`;
    }else{
      link = `https://cdn.discordapp.com/emojis/${id}.png`;
    }
		return link;
	}
}

client.on("guildCreate", async (guild) => {
  client.user.setActivity(`이모지 확대용 봇 | ${client.guilds.cache.size}개의 서버에서 일하는중`, {
    type: "PLAYING",
  });
  let teddypicker = await client.users.fetch('653157614452211712');
  teddypicker.send(`봇이 **${guild.name}** 서버에 추가됨`);
});

client.login(process.env.TOKEN);
