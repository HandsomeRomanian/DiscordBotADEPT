
const ping = async function (msg) {
    const m = await msg.channel.send("Calculating!");
    m.edit(
        `Pong! Latency is ${m.createdTimestamp -
        msg.createdTimestamp}ms.`
    );
}

const purge = function (count,msg) {

    if (isNaN(count)) {
        msg.channel.send("Number is invalid.");
        return;
    }
    if (count <= 99) {
        let messagecount = parseInt(count) + 1;
        msg.channel.messages
            .fetch({ limit: messagecount })
            .then(messages => msg.channel.bulkDelete(messages));

    }
    else {
        let y = Math.trunc(count / 100);
        for (let i = 0; i < y; i++) {
            msg.channel.messages
                .fetch({ limit: messagecount })
                .then(messages => msg.channel.bulkDelete(messages));
        }
        msg.channel.messages
            .fetch({ limit: count % 100 })
            .then(messages => msg.channel.bulkDelete(count % 100));
    }

}
module.exports = { ping, purge };
