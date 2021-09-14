'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '23b6eedcef8ec6b2f40963ae1142d2f0',
    channelAccessToken:'O0lxThzsva0GjbmGw0oseJ1KXiLqwF6HdMa7907ID0urYG58BkdZDBQSJ4l990psN4e+EdEwRtfP4I8WOjjOQwqwsDueEWkHIodR5NrwwzKpq47xDuOQY85sappDtpGzPl406o+B+BZj2JzCn6mHhwdB04t89/1O/w1cDnyilFU'
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
console.log(`Server running at ${PORT}`);