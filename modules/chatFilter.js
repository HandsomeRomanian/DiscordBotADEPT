const fs = require("fs");

var bannedWords = require("../assets/bannedWords.json");



const checkBadWords = function (msg) {
    let words = msg.content.split(" ");
    for (const key in words) {
        if (bannedWords.includes(words[key].toLowerCase())) {
            msg.delete();
            //msg.channel.send("Message contains banned word: " + words[0])
        }
    }
}

const BanWord = async function (word, msg) {
    if (bannedWords.includes(word)) {
        msg.reply(word + " is already a banned word.")
    }
    else {
        bannedWords.push(word.toLowerCase());

        await fs.writeFile("./assets/bannedWords.json", JSON.stringify(bannedWords), out => {
            if (out != null) {
                msg.reply("Error while adding a word to banlist.");
                console.log(out);
                return;
            }
        })


        if (bannedWords.includes(word)) {
            msg.reply(word + " has been added to the list of banned words.");
        }
        else {
            msg.reply("Error while adding a word to banlist.")
        }
    }
}

module.exports = { checkBadWords, BanWord };
