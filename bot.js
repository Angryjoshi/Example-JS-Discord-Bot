// Import necessary libraries & files
const botConfig = require('./botConfig.json');
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client();

// Setup

bot.commands = new Discord.Collection();

// Read the commands folder to get the commands
fs.readdir("./commands/", (err, files) => {

    // Log any errors
        if(err) console.log(err);

    // Cut off the  .js part of the command so you don't have to do -commandName.js
        let jsfile = files.filter(f => f.split(".").pop() === "js");
    
    // Check if there is no commands, if so log that you cacn't find any commands
        if (jsfile.length <= 0) {
            console.log("Couldn't find commands.")
            return;
        }

    // Get each command and log it in console for debugging.
        jsfile.forEach((f, i)=> {
            let props = require(`./commands/${f}`);
            console.log(`${f} loaded!`);
            bot.commands.set(props.help.name, props);
        });
    })

 bot.on("message", message => {
    if (message.author.bot) return;

    // Define prefix variable from the bot configuration
    let prefix = botConfig.prefix;

    // If the message does not start with the prefix do not continue executing code (the command)
    if(!message.content.startsWith(prefix)) return;

    // Define necessary variables for executing the command
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandFile = bot.commands.get(cmd.slice(prefix.length));

    // Run the command
    if (commandFile) commandFile.run(bot,message,args);
})

// Start the bot
bot.login(botConfig.token);