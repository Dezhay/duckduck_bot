const tmi = require('tmi.js');

const opts = {
    identity: {
        username: process.env.BOT_USERNAME, 
        password: process.env.OAUTH_TOKEN
    },
    channels: [ 
        process.env.CHANNEL_NAME
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();


function onMessageHandler (target, context, msg, self) {
    if (self) { return; } 

    const commandName = msg.trim();

    if (commandName === '!duck') {
        const duckOrGoose = randomize();
        if (duckOrGoose === 'duck') {
          client.say(target, `You're just a ${duckOrGoose} :)`);
        } else {
          client.say(target, `YOU ARE THE ${duckOrGoose}!`);
        }
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
}

function randomize () {
    const animalPin = ['duck', 'duck', 'duck', 'duck', 'duck', 'goose'];
    return animalPin[Math.floor(Math.random()*animalPin.length)];
}


function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}