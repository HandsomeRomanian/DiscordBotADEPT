

const fs = require('fs')
let config = require("../config.json");
let channelName = config.VerificationChannel;

if (!channelName) {
    console.log("Creating verification channel entry in config file.");
    config.VerificationChannel = "ChangeHere";
    fs.writeFile("./config.json", JSON.stringify(config), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

const verify = function (msg) {
    let channel =  msg.channel;

    if (channel.name !== "verification") {
        msg.delete();
        msg.member.send("SVP envoyer le message de confirmation dans le bon channel.");
        return;
    }

    let roles = msg.guild.roles.cache;
    let Reseau = roles.find(role => role.name === "Reseau");
    let Prof = roles.find(role => role.name === "Enseignant(e)s");
    let Prog = roles.find(role => role.name === "Programmation");
    let DecBac = roles.find(role => role.name === "DECBAC");
    let Regular = roles.find(role => role.name === "Regular");

    if (msg.member.roles.cache.some(r => ["Reseau", "Programmation", "DECBAC", "Regular"].includes(r.name))) {
        msg.delete();
        return;
    }
    if (msg.member.roles.cache.some(r => ["Admins", "Membres de confiance"].includes(r.name))) {
        msg.delete();
        return;
    }

    students = null;
    delete require.cache[require.resolve("../assets/studentinfo.json")];
    var students = require("../assets/studentinfo.json");


    let args = msg.content.split(" ");
    args.shift();
    msg.delete();

    if (args.length != 1) {
        msg.reply("Veuillez ne fournir que votre matricule suite a la commande");
    } else {
        let student = students[args[0]];
        if (!student) {
            msg.channel.send("Unknown student");
        } else {
            if (student.programme === "420.BB") { //Reseau
                console.log("Res")
                msg.member.roles.add(Reseau);
                msg.member.roles.remove(Prof);
                msg.member.roles.remove(DecBac);
                msg.member.roles.remove(Prog);
            }
            else if (student.programme === "420.BA") { //Prog
                console.log("Prog")
                msg.member.roles.add(Prog);
                msg.member.roles.remove(Prof);
                msg.member.roles.remove(DecBac);
                msg.member.roles.remove(Reseau);

            }
            else if (student.programme === "420.B0") { //DEC BAC
                console.log("DEC BAC")
                msg.member.roles.add(DecBac);
                msg.member.roles.remove(Prof);
                msg.member.roles.remove(Prog);
                msg.member.roles.remove(Reseau);

            }
            else if (student.programme === "Prof") { //DEC BAC
                console.log("Prof : " + msg.member.displayName)
                msg.member.roles.add(DecBac);
                msg.member.roles.remove(Prof);
                msg.member.roles.remove(Prog);
                msg.member.roles.remove(Reseau);

            }
            else {
                console.log("autre")
                msg.member.roles.add(Regular);
                msg.member.roles.remove(DecBac);
                msg.member.roles.remove(Prog);
                msg.member.roles.remove(Reseau);
            }
            msg.member.send("Bienvenue " + student["name"] + "!");
            msg.member.setNickname(student.name);
        }
    }
};


module.exports = { verify };
