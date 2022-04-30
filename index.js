const Discord = require('discord.js');
const fs = require(`fs`);
const { isNumberObject } = require('util/types');
const Intents = Discord.Intents
const MessageActionRow = Discord.MessageActionRow
const MessageButton = Discord.MessageButton
const MessageEmbed = Discord.MessageButton
const bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
require(`dotenv-flow`).config();
const CreateFiles = fs.createWriteStream('./log.txt', {
    flags: 'a'
})
const combos = require(`./output.json`)
const emojis = [`0️⃣`, `1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`]

bot.on('ready', async () => {
    console.log(`  - ${bot.user.username} is now online.`);
    CreateFiles.write(`[INFO] - ${bot.user.username} is online.`+'\n')
    const activity = `chopsticks`
    bot.user.setStatus(`online`)
    bot.user.setActivity(activity, {type:"PLAYING"})
	setInterval(function(){
        bot.user.setActivity(activity, {type:"PLAYING"})
    }, Math.floor(60000*60*12));

    /*let gen = await bot.channels.fetch(`969989735894368256`)
    const embed = new Discord.MessageEmbed;
    embed.setColor(`#44EE2D`)
    embed.setTitle(`Please verify you're human.`)
    embed.setDescription(`Please click the ✅ emoji below **to gain access to the Chopsticks Discord server.**`)
    gen.send({embeds: [embed]})*/
    //verfication system
    let wchan = `969989735894368256`;
    let wmsg = `969991318388473916`
    let wguild = `967333642437283860`
    bot.channels.fetch(wchan)
    .then(async channel => {
        channel.messages.fetch(wmsg).then(message => {
            let filter = (reaction, user) => reaction.emoji.name === `✅`
            collector = message.createReactionCollector(filter);
            collector.on(`collect`, async (reaction, user) => {
                let guild = bot.guilds.cache.get(wguild)
                let member = guild.members.cache.get(user.id)
                member.roles.add(`969954346135584808`)
                let gen = await bot.channels.fetch(`967333642907041814`)
                gen.send(`**<@${user.id}> has just verified!** Please welcome them to ${message.guild.name}! :chopsticks: Be sure to read up on the rules in <#969987824889790485>, and check out<#969971330235658360>`)
                CreateFiles.write(`[LOG] - {${user.tag}} [${user.id}] verified.`+'\n')
            })
        })
    })
});

bot.on('error', (error) => {
    CreateFiles.write(JSON.stringify(`[ERROR] - ${error.message}`)+'\n')
    console.log(error.error)
    console.log(error.message)
});

bot.on('messageCreate', async message => {
    let messageArray = message.content.split(/\s+/g);
    let args = messageArray.slice(1);
    let command = messageArray[0]
    if(command == `.play`){
        if(message.mentions.users.first()){
            playGame(message, args);
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
        embed.setColor(`#44EE2D`)
        embed.setTitle(`Possible Moves:`)
        embed.setFooter({
            text: `GAMESTATE: ${args[0][0]}${args[0][1]}${args[0][2]}${args[0][3]}`
        })
        message.channel.send({embeds: [embed]})
    }
    if(command == `.help`){
        message.channel.send(`\`\`\`.play @user [idle_time]\n.gamestate (gamestate_number)\n.help\n\n() - required\n[] - optional\`\`\``)
    }
});

bot.login(process.env.TOKEN)

//0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣

async function playGame(message, args){
    // init variables
    let gameID = Math.floor((Math.random() * 9999) + 1000)
    let gameEnd = false;
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

    CreateFiles.write(`[${gameID}] - Game started, starting player: ${ap.username}`+'\n')

    while(!gameEnd){
            //init message
            let idleTime = 120000;
            if(args[1]){
                if(!Number(args[1]) || Number(args[0]) >= 0) return message.reply(`Idle time is an invalid number.`)
                idleTime = Number(args[1])*1000;
            } 
            let embed = new Discord.MessageEmbed;
            embed.setColor(`#44EE2D`)
            embed.addField(`${ip.tag}`, ` right: ${ip.hand2[1]}   left: ${ip.hand1[1]}\n\n  left: ${ap.hand1[1]}   right: ${ap.hand2[1]}`)
            embed.addField(`${ap.tag}`, `*It is ${ap.username}'s turn.*`)
            //message logic
            CreateFiles.write(`[${gameID}] - ${ap.hand1[0]}${ap.hand2[0]}${ip.hand1[0]}${ip.hand2[0]}`+'\n')
            let gamestate = combos[`${ap.hand1[0]}${ap.hand2[0]}${ip.hand1[0]}${ip.hand2[0]}`]
            let pMoves = Object.keys(gamestate);
            let mStates = Object.values(gamestate);

            let cont = true;
            if(mStates[0] == `ip_wins`){
                message.channel.send(`[${gameID}] **${ip.username} wins!**`)
                CreateFiles.write(`[${gameID}] - ${ip.username} wins!`+'\n')
                cont = false
                gameEnd = true;
            } 
            if(mStates[0] == `ap_wins`) {
                message.channel.send(`[${gameID}] **${ap.username} wins!**`)
                CreateFiles.write(`[${gameID}] - ${ap.username} wins!`+'\n')
                cont = false
                gameEnd = true;
            }
            //add functionality
            if(cont){
                let msg_2 = message.channel.send({embeds: [embed]})
                let moveString = ``;
                for(let move in pMoves){
                    moveString+=`**[${emojis[move]}]** - ${pMoves[move]}\n`
                }
                moveString+=`**[❌]** - **END GAME**\n`

                embed = new Discord.MessageEmbed;
                embed.setColor(`#44EE2D`)
                embed.addField(`Possible Moves:`, ` ${moveString.toLocaleUpperCase()}`)
                embed.setFooter({
                    text: `gameID: ${gameID}\ngamestate : ${ap.hand1[0]}${ap.hand2[0]}${ip.hand1[0]}${ip.hand2[0]}`
                })

                let msg = await message.channel.send({embeds: [embed]})
                await addEmojis(msg, pMoves)
                const filter = (reaction, user) => (emojis.includes(reaction.emoji.name) || reaction.emoji.name == `❌`) && user.id === ap.id;
                await msg.awaitReactions({filter, max : 1, idle: idleTime})
                 .then(async collected => {
                    let reaction = collected.first().emoji.name;
                    if(reaction == `❌`){
                        gameEnd = true;
                        await msg.delete()
                        message.channel.send(`[${gameID}] *${ap.username} forfeits.*`)
                        CreateFiles.write(`[${gameID}] - ${ap.username} forfeits.`+'\n')
                    } else {
                    let num;
                    for(move in pMoves){
                        if(reaction == emojis[move]) num = Number(move);
                    }
                    gamestate = mStates[num]
                    ap.hand1 = setHand(gamestate[0])
                    ap.hand2 = setHand(gamestate[1])
                    ip.hand1 = setHand(gamestate[2])
                    ip.hand2 = setHand(gamestate[3])
                    let temp = ap;
                    ap = ip
                    ip = temp
                    await msg.delete()
                    }
                })
                 .catch(async err => {
                    await msg.delete()
                    message.channel.send(`[${gameID}] *skipping ${ap.username}'s turn, waited ${idleTime/1000} seconds.*`)
                    CreateFiles.write(`[${gameID}] - skipping ${ap.username}'s turn, waited ${idleTime/1000} seconds.`+'\n')
                    let temp = ap;
                    ap = ip
                    ip = temp
                })
            }
    }
}

function setHand(num){
    let emoji = ``
    if(num == 1) emoji = `1️⃣`
    if(num == 2) emoji = `2️⃣`
    if(num == 3) emoji = `3️⃣`
    if(num == 4) emoji = `4️⃣`
    if(num == 0) emoji = `0️⃣`
    return [num, emoji]
}

async function addEmojis(msg, pMoves){
        for(let move in pMoves){
            if(pMoves[move] != (null || undefined)) await msg.react(emojis[move])
            if(move == pMoves.length-1){
                await msg.react(`❌`)
                return Promise.resolve();
            }
        }
        
}