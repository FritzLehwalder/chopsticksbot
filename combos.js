let pos1 = 0
let pos2 = 0
let pos3 = 0
let pos4 = 0
let totalLength = 0
let totalMoves = 0

const fs = require(`fs`)
const CreateFiles = fs.createWriteStream('./output.json', {
    flags: 'a'
})
CreateFiles.write(`{\n`)

while(pos4 <= 4){
    pos1 += 1
    totalLength +=1
    if(pos1 == 5){
        pos2 += 1
        pos1 = 0
    }
    if(pos2 == 5){
        pos3 += 1
        pos2 = 0
    }
    if(pos3 == 5){
        pos4 += 1
        pos3 = 0
    }

    let moves = ``

    if(pos4 > 0 && pos2 > 0){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        iphand1 += aphand1
        if(iphand1 > 4) iphand1 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"**left hand** __attack__ opponent **left hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos4 > 0 && pos1 > 0){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        iphand2 += aphand1
        if(iphand2 > 4) iphand2 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"**left hand** __attack__ opponent **right hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos3 > 0 && pos2 > 0){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        iphand1 += aphand2
        if(iphand1 > 4) iphand1 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"**right hand** __attack__ opponent **left hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos3 > 0 && pos1 > 0){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        iphand2 += aphand2
        if(iphand2 > 4) iphand2 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"**right hand** __attack__ opponent **right hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos4 >= 1){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand1 -= 1;
        aphand2 += 1;
        if(aphand2 > 4) aphand2 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **1** from **left hand** to **right hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos4 >= 2){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand1 -= 2;
        aphand2 += 2;
        if(aphand2 > 4) aphand2 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **2** from **left hand** to **right hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos4 >= 3){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand1 -= 3;
        aphand2 += 3;
        if(aphand2 > 4) aphand2 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **3** from **left hand** to **right hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos4 == 4){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand1 -= 4;
        aphand2 += 4;
        if(aphand2 > 4) aphand2 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **4** from **left hand** to **right hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos3 >= 1){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand2 -= 1;
        aphand1 += 1;
        if(aphand1 > 4) aphand1 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **1** from **right hand** to **left hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos3 >= 2){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand2 -= 2;
        aphand1 += 2;
        if(aphand1 > 4) aphand1 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **2** from **right hand** to **left hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos3 >= 3){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand2 -= 3;
        aphand1 += 3;
        if(aphand1 > 4) aphand1 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **3** from **right hand** to **left hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }
    if(pos3 == 4){
        let aphand1 = pos4
        let aphand2 = pos3
        let iphand1 = pos2
        let iphand2 = pos1
        aphand2 -= 4;
        aphand1 += 4;
        if(aphand1 > 4) aphand1 -= 5;
        let gamestate = `${aphand1}${aphand2}${iphand1}${iphand2}`
        moves += `\"__transfer__ **4** from **right hand** to **left hand**\": \"${gamestate}\",\n`
        totalMoves += 1
    }


    let output = `${pos4}${pos3}${pos2}${pos1}`
    let start = new RegExp(/^00\d\d/g)
    let end = new RegExp(/^\d\d00/g)
    if(start.test(output)) moves = `\"no_moves available\": \"ip_wins\",\n`
    if(end.test(output)) moves = `\"no moves available\": \"ap_wins\",\n`
    
    moves = moves.slice(0, moves.length - 2)
    moves += `\n`
    if(output != 5000){
        if(output == 4444){
            CreateFiles.write(`\"${output}\": {\n${moves}}`+'\n')
        } else {
            CreateFiles.write(`\"${output}\": {\n${moves}},`+'\n')
        }
    }
    if(output == 5000){
        CreateFiles.write(`}`)
        console.log(`${totalMoves} total moves calculated for a total of ${totalLength} gamestates\nwith an average of ${totalMoves/totalLength} moves per gamestate`)
        console.log(`\noutput path: \"./output.json\"`)
    }
}