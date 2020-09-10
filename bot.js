delete require.cache[require.resolve("./modules/chatFilter.js")];
delete require.cache[require.resolve("./assets/bannedWords.json")];
delete require.cache[require.resolve("./auth.json")];
delete require.cache[require.resolve("./config.json")];

const Discord = require("discord.js");
const auth = require("./auth.json");

var config = require("./config.json");
var msgModule = require("./modules/chatFilter");
var utilModule = require("./modules/utils");
var adminModule = require("./modules/admin")
var musicController = require("./modules/music")

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Serving ${client.guilds.cache.size} guilds and ${client.users.cache.size} users!`);
});

client.on("message", async msg => {
    msgModule.checkBadWords(msg);
    if (msg.author.bot) return;

    let args = msg.content.split(" ");

    if (args[0][0] == config["prefix"]) {
        args[0] = args[0].substr(1);
        switch (args.shift()) {
            case "ping":
                utilModule.ping(msg);
                break;
            case "6teen":
                musicController.executeEgg(msg, "https://www.youtube.com/watch?v=Y_jby6F2H3k");
                break;
            case "himark":
                musicController.executeEgg(msg, "https://www.youtube.com/watch?v=zLhoDB-ORLQ");
                break;
            case "music":
                const action = args.shift();
                if (!action) {
                    msg.channel.send("Music help menu here soon");
                }
                switch (action.toLowerCase()) {
                    case "play":
                        musicController.execute(msg);
                        break;
                    case "stop":
                        musicController.stop(msg);
                        break;
                    case "skip":
                        musicController.skip(msg);
                        break;
                    default:
                        msg.channel.send("Invalid argument for command music.")
                        break;
                }
                break;
            case "banword":
            case "banwords":
                for (let i = 0; i < args.length; i++) {
                    msgModule.BanWord(args[i], msg);
                }
                break;
            case "reload":
                reload(args[0], msg)
                break;
            case "ban":
                adminModule.ban(msg);
                break;
            case "test":
                console.log(args[0]);
                break;
            case "purge":
                utilModule.purge(args[0], msg)
                break;
            default:
                msg.channel.send("Unknown Command.");
                break;
        }
    } else {
    }
});

function reload(moduleName, msg) {
    if (msg.member.hasPermission('ADMINISTRATOR'))
        if (!moduleName) {
            msg.channel.send("No module has been specified.");
            msg.channel.send("To reload all modules please use 'all' as argument.");
            return;
        }
    switch (moduleName.toLowerCase()) {
        case "command":
        case "commands":
            msg.channel.send("Reloading commands module.");
            msgModule = null;
            delete require.cache[require.resolve("./modules/commands.js")];
            msgModule = require("./modules/commands.js");
            msg.channel.send("Reload complete");
            break;
        case "admin":
            msg.channel.send("Reloading commands module.");
            adminModule = null;
            delete require.cache[require.resolve("./modules/admin.js")];
            adminModule = require("./modules/admin");
            msg.channel.send("Reload complete");
            break;
        case "util":
        case "utils":
            msg.channel.send("Reloading Utility module.");
            utilModule = null;
            delete require.cache[require.resolve("./modules/utils.js")];
            utilModule = require("./modules/utils.js");
            msg.channel.send("Reload complete");
            break;
        case "chatfilter":
            msg.channel.send("Reloading chat filter.");
            msgModule = null;
            delete require.cache[require.resolve("./modules/chatFilter.js")];
            msgModule = require("./modules/chatFilter.js");
            msg.channel.send("Reload complete");
            break;
        case "music":
            msg.channel.send("Reloading Music module.");
            musicController = null;
            delete require.cache[require.resolve("./modules/music.js")];
            musicController = require("./modules/music.js");
            msg.channel.send("Reload complete");
            break;

        case "config":
        case "configs":
            msg.channel.send("Reloading configs.");
            config = null;
            delete require.cache[require.resolve("./config.json")];
            config = require("./config.json");
            msg.channel.send("Reload complete");
            break;
        case "all":
            msg.channel.send("Reloading all modules.");
            config = null;
            delete require.cache[require.resolve("./config.json")];
            config = require("./config.json");
            msgModule = null;
            delete require.cache[require.resolve("./modules/message.js")];
            msgModule = require("./modules/chatFilter.js");
            msg.channel.send("Reload complete");

            break;

        default:
            msg.channel.send("Module name is invalid.");
            msg.channel.send("To reload all modules please use 'all' as argument.");
            break;
    }
}

client.login(auth["DiscordToken"]);
