const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");
const custom_env = require("custom-env").env('staging');

const login_email = process.env.login_email;
const login_password = process.env.login_password;

const UNICODE_THUMBDOWN = "\uD83D\uDC4E";

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const obj = {email: login_email, password: login_password};
login(obj, (err, api) => {
    if(err) return console.error(err);

    // Logged in!
    api.listenMqtt((err, message) => {
        if (message.senderID == 1364550358) {
            api.setMessageReaction(UNICODE_THUMBDOWN, message.messageID, (err) => {
                if (err) return console.error(err);
            });
        }
    });
});