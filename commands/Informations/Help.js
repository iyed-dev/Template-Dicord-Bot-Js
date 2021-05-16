const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands');

module.exports.run = (client, message, args) => {
	console.log(categoryList)
	if (!args.length) {
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.addField("Liste des commandes", `Voici une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${PREFIX}help <nom d'une commande>\``)
		
		for (const category of categoryList) {
			embed.addField(
				`${category}`,
				`${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
			);
		};
		return message.channel.send(embed);
	} else {
		
		const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
		if (!command) return message.reply("cette commande n'existe pas");
		
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`\`${command.help.name}\``)
			.addField("Description", `${command.help.description} (cooldown: ${command.help.cooldown} secs)`)
			.addField('Utilisation', command.help.usage ? `${PREFIX} ${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
		
		if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
		return message.channel.send(embed)
	}
};
module.exports.help = {
	name: "help",
	aliases: ["h"],
	category: "informations",
	description: 'Envoie la liste des commandes',
	cooldown: 5,
};