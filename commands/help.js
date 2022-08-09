const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("봇 사용법"),
	async execute(interaction){
		await interaction.reply("이모지 단 하나만 올리는 경우에만 확대해줌ㅋ\n안쓰려면 추방ㄱ");
	}
}
