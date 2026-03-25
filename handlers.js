const db = require('./database');
const { getWelcomeMessage, getPriceList, getPromotions, getHowToOrder, getContactInfo } = require('./messages');
const { chat } = require('./ai');

// 處理文字訊息
async function handleMessage(event, client) {
  if (event.message.type !== 'text') return;

  const userId = event.source.userId;
  const userMessage = event.message.text;

  db.saveCustomer(userId);

  let replyText;

  try {
    replyText = await chat(userMessage);
  } catch (error) {
    console.error('AI 錯誤:', error);
    replyText = '抱歉，我現在有點忙，請稍後再試 😅';
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: replyText }]
  });
}

// 處理按鈕點擊
async function handlePostback(event, client) {
  const data = event.postback.data;
  const userId = event.source.userId;

  let replyMessage;

  if (data === 'price') {
    replyMessage = getPriceList();
  } else if (data === 'promotion') {
    replyMessage = getPromotions();
  } else if (data === 'order') {
    replyMessage = getHowToOrder();
  } else if (data === 'contact') {
    replyMessage = getContactInfo();
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [replyMessage]
  });
}

module.exports = { handleMessage, handlePostback };
