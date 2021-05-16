const { MessageEmbed } = require("discord.js");
const { allbotlogs } = require('../../config')
module.exports = (client, message) => {
	const user = message.author;
	if (user.bot) return;
	
	const embed = new MessageEmbed()
		.setAuthor(`${user.username} (${user.id})`, user.avatarURL())
		.setColor("BLUE")
		.setDescription(`Action: \`Mp reçu\`\nDe: <@${user.id}>\n Contenu: \`${message.content}\``)
		.setThumbnail(user.avatarURL())
		.setTimestamp()
		.setFooter(message.author.username, message.author.avatarURL())
	
	client.channels.cache.get(allbotlogs).send(embed);
}
