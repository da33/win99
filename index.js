require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const { handleMessage, handlePostback } = require('./handlers');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken
});

const app = express();

app.get('/webhook', (req, res) => {
  res.status(200).send('OK');
});

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    await Promise.all(events.map(event => {
      if (event.type === 'message') {
        return handleMessage(event, client);
      } else if (event.type === 'postback') {
        return handlePostback(event, client);
      }
    }));
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.get('/', (req, res) => {
  res.send('LINE Bot 運行中');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`伺服器運行在 port ${port}`);
});
