// Import necessary libraries
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    message.channel.send(`Pong! 🏓 **${bot.ping}ms**`); // Respond with a message saying "Pong! 🏓 {latency}ms"
}

module.exports.help = {
    name: 'ping' // Define the command name
}