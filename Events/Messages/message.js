const { Collection } = require('discord.js');
const { PREFIX } = require('../../config');

module.exports = (client, message) => {
	if (message.channel.type === 'dm') return client.emit('directMessage', message);
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	
	const args = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const user = message.mentions.users.first();
	
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
	if (!command) return message.channel.send("Cette commande n'existe pas");
	
	if (!client.cooldowns.has(command.help.name)) {
		client.cooldowns.set(command.help.name, new Collection());
	};
	
	const timeNow = Date.now();
	const tStamps = client.cooldowns.get(command.help.name);
	const cdAmout = (command.help.cooldown || 5) * 1000;
	
	if (tStamps.has(message.author.id)) {
		const cdExpirationTime = tStamps.get(message.author.id) + cdAmout;
		
		if (timeNow < cdExpirationTime) {
			timeLeft = (cdExpirationTime - timeNow) / 1000;
			return message.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\``)
		}
	}
	
	tStamps.set(message.author.id, timeNow);
	setTimeout(() => tStamps.delete(message.author.id), cdAmout);
	command.run(client, message, args);
}