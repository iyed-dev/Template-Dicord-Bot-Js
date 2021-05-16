const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
	message.channel.send('Chargement...').then (async (msg) =>{
		msg.delete()
		message.channel.send(`🏓 La latence du bot est de ${msg.createdTimestamp - message.createdTimestamp}ms.`);
	})
}
module.exports.help = {
	name: 'ping',
	category: "misc",
	description: "Donne la latence du bot",
	cooldown: 5,
	aliases: ['ms'],
	usage: ''
}