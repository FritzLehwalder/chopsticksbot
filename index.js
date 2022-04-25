const Discord = require('discord.js');
const fs = require(`fs`)
const Intents = Discord.Intents
const MessageActionRow = Discord.MessageActionRow
const MessageButton = Discord.MessageButton
const MessageEmbed = Discord.MessageButton
const bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require(`dotenv-flow`).config();
const CreateFiles = fs.createWriteStream('./log.txt', {
    flags: 'a'
})
const combos = require(`./output.json`)

bot.on('ready', async () => {
    console.log(`  - ${bot.user.username} is now online.`);
    CreateFiles.write(JSON.stringify(`[INFO] - ${bot.user.username} is online.`)+'\n')
    const activity = `chopsticks`
    bot.user.setStatus(`online`)
    bot.user.setActivity(activity, {type:"PLAYING"})
	setInterval(function(){
        bot.user.setActivity(activity, {type:"PLAYING"})
    }, Math.floor(60000*60*12));
});

bot.on('error', (error) => {
    CreateFiles.write(JSON.stringify(`[ERROR] - ${error.message}`)+'\n')
    console.log(error.error)
    console.log(error.message)
});

//setHand() usage
//author.hand1 = [1, `1️⃣`]
//     ---
//author.hand1 = setHand(4)
//     VVV
//author.hand1 = [4, `4️⃣`]

function setHand(num){
    let emoji = ``
    if(num == 1) emoji = `1️⃣`
    if(num == 2) emoji = `2️⃣`
    if(num == 3) emoji = `3️⃣`
    if(num == 4) emoji = `4️⃣`
    if(num == 0) emoji = `0️⃣`
    return [num, emoji]
}

function moves(p1, p2){
    p1Hand1 = p1.hand1
    p1Hand2 = p1.hand2
    p2Hand1 = p2.hand1
    p2Hand2 = p2.hand2
}

//0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣

bot.on('messageCreate', async message => {
    let messageArray = message.content.split(/\s+/g);
    let args = messageArray.slice(1);
    let command = messageArray[0]
    if(command == `.play`){
        let embed = new Discord.MessageEmbed;
        embed.setColor(`#ffb91b`)
        if(message.mentions.users.first()){
            // init user variables
            let ap;
            let ip;    
            let random = Math.floor((Math.random() * 2) + 1)
            if(random == 2){
                ap = message.mentions.users.first();
                ip = message.author
            } else {
                ap = message.author;
                ip = message.mentions.users.first()
            }
            ap.hand1 = [1, `1️⃣`]
            ap.hand2 = [1, `1️⃣`]
            ip.hand1 = [1, `1️⃣`]
            ip.hand2 = [1, `1️⃣`] 

            //init message
            embed.addField(`${ip.tag}`, ` right: ${ip.hand2[1]}   left: ${ip.hand1[1]}\n\n  left: ${ap.hand1[1]}   right: ${ap.hand2[1]}`)
            embed.addField(`${ap.tag}`, `*It is ${ap.username}'s turn.*`)

            //message logic
            let gamestate = combos[`${ap.hand1[0]}${ap.hand2[0]}${ip.hand1[0]}${ip.hand2[0]}`]
            let pMoves = Object.keys(gamestate)
            let mStates = Object.values(gamestate)

            //add functionality
            message.channel.send({embeds: [embed]})
            let moveString = ``;
            for(let move in pMoves){
                moveString+=`[${move}] ${pMoves[move]}\n`
            }

            embed = new Discord.MessageEmbed;
            embed.setColor(`#ffb91b`)
            embed.addField(`Possible Moves:`, `${moveString}`)

            message.channel.send({embeds: [embed]})
           
        } else {
            message.reply(`Mention a user to play against.`)
        }
    }
    if(command == `.gamestate`){
        if(args[1] || args[0][4]) return message.reply(`To many numbers!`)
        if(!args[0][3]) return message.reply(`Not enough numbers!`)
        let embed = new Discord.MessageEmbed;
        let gamestate = combos[`${args[0][0]}${args[0][1]}${args[0][2]}${args[0][3]}`]
        let pMoves = Object.keys(gamestate)
        let mStates = Object.values(gamestate)
        for(let move in pMoves){
            embed.addField(`${pMoves[move].toLocaleUpperCase()}`, `*resulting gamestate: ${mStates[move]}*`)
        }
        embed.setColor(`#ffb91b`)
        embed.setTitle(`Possible Moves:`)
        embed.setFooter(`GAMESTATE: ${args[0][0]}${args[0][1]}${args[0][2]}${args[0][3]}`)
        message.channel.send({embeds: [embed]})
    }
});

bot.login(process.env.TOKEN)