const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first() || message.member
	message.channel.send(new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setImage(member.user.displayAvatarURL({dynamic: true, size: 1024, format: 'png'}))
		.setTimestamp()
		.setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true})))
}
module.exports.help = {
	name: 'avatar',
	category: "informations",
	description: 'Donne les infos sur un utilisateur mensionné',
	cooldown: 5,
	aliases: ["pp", "pdp", "photo"]
}