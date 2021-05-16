const { Client, Collection } = require('discord.js');
const { TOKEN } = require('./config');
const { loadCommands, loadEvents } = require('./Utils/Loader.js')

const client = new Client();
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

client.settings = require('./config')

loadCommands(client);
loadEvents(client);

client.on('message', message => {
	if (message.content === 'Salut') {
		message.react('👋');
	}
});

client.on('message', message => {
	if (message.content === 'Hey') {
		message.react('👋');
	}
});

client.on('message', message => {
	if (message.content === 'yo') {
		message.react('👋');
	}
});

client.on('message', message => {
	if (message.content === 'salut') {
		message.react('👋');
	}
});

client.on('message', message => {
	if (message.content === 'hey') {
		message.react('👋');
	}
});

client.on('message', message => {
	if (message.content === 'Yo') {
		message.react('👋');
	}
});

client.login(TOKEN)