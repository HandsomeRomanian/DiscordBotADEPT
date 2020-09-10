
const get = function (msg) {
    const m = await msg.channel.send("Calculating!");
    m.edit(
        `Pong! Latency is ${m.createdTimestamp -
        msg.createdTimestamp}ms.`
    );
}

module.exports = { get };
