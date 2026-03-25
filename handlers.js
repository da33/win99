const db = require('./database');
const { chat } = require('./ai');

// 處理文字訊息
async function handleMessage(event, client) {
  if (event.message.type !== 'text') return;

  const userId = event.source.userId;
  const userMessage = event.message.text;

  // 儲存客戶資料
  db.saveCustomer(userId);

  try {
    // 使用 AI 生成回覆
    const aiResponse = await chat(userMessage);

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: aiResponse }]
    });
  } catch (error) {
    console.error('AI Error:', error);
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: '抱歉，系統忙碌中，請稍後再試 🙏' }]
    });
  }
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
