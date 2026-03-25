const db = require('./database');
const { getWelcomeMessage, getPriceList, getPromotions, getHowToOrder, getContactInfo } = require('./messages');

// 處理文字訊息
async function handleMessage(event, client) {
  if (event.message.type !== 'text') return;

  const userId = event.source.userId;
  const userMessage = event.message.text.toLowerCase();

  // 儲存客戶資料
  db.saveCustomer(userId);

  let replyMessage;

  // 關鍵字自動回覆
  if (userMessage.includes('價格') || userMessage.includes('價目')) {
    replyMessage = getPriceList();
  } else if (userMessage.includes('優惠') || userMessage.includes('活動')) {
    replyMessage = getPromotions();
  } else if (userMessage.includes('如何') || userMessage.includes('怎麼') || userMessage.includes('訂購')) {
    replyMessage = getHowToOrder();
  } else if (userMessage.includes('聯絡') || userMessage.includes('客服')) {
    replyMessage = getContactInfo();
  } else {
    replyMessage = getWelcomeMessage();
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [replyMessage]
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
