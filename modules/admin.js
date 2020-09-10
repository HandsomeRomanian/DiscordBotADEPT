

const ban = function (msg) {
    if (!msg.member.hasPermission('BAN_MEMBERS')) {
        msg.channel.send("You do not have permission to ban a user.");
        return;
    }
    if (!msg.mentions.users.size) {
        msg.reply("You must specify a user you want to ban.");
    }
    let member = msg.mentions.users.first();
    member.send("You have been banned from " + msg.guild.name);
    member.ban();

}





module.exports = { ban };
