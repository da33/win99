const db = require('./database');
const { getWelcomeMessage, getPriceList, getPromotions, getHowToOrder, getContactInfo } = require('./messages');

// 處理文字訊息
async function handleMessage(event, client) {
  if (event.message.type !== 'text') return;

  const userId = event.source.userId;
  const msg = event.message.text.toLowerCase();

  db.saveCustomer(userId);

  let replyText;

  if (msg.includes('價格') || msg.includes('價目') || msg.includes('多少錢')) {
    replyText = '💰 我們的價格超優惠！\n\n95折起，儲值越多折扣越多：\n• 1000以上 → 9折\n• 3000以上 → 85折\n\n想儲值哪款遊戲呢？';
  } else if (msg.includes('優惠') || msg.includes('活動') || msg.includes('促銷')) {
    replyText = '🎁 限時優惠來了！\n\n• 買1000送500（限前20名）\n• 首儲滿500送100\n\n要把握機會嗎？';
  } else if (msg.includes('如何') || msg.includes('怎麼') || msg.includes('訂購') || msg.includes('流程')) {
    replyText = '📝 超簡單4步驟：\n\n1️⃣ 告訴我遊戲名稱\n2️⃣ 說要儲多少\n3️⃣ 提供遊戲帳號\n4️⃣ 付款完成\n\n5-10分鐘就搞定！現在要開始嗎？';
  } else if (msg.includes('聯絡') || msg.includes('客服') || msg.includes('真人')) {
    replyText = '👋 我就是真人客服啊！\n\n服務時間：09:00-23:00\n有任何問題直接問我就好～';
  } else if (msg.includes('你好') || msg.includes('哈囉') || msg.includes('hi') || msg.includes('hello')) {
    replyText = '嗨！歡迎來到Win99遊戲代充 😊\n\n我們專做：原神、崩鐵、王者榮耀、絕區零\n\n想了解什麼呢？\n💰 價格\n🎁 優惠\n📝 訂購流程';
  } else {
    replyText = '我是Win99客服小幫手～\n\n你可以問我：\n• 價格多少\n• 有什麼優惠\n• 怎麼訂購\n\n或直接說要儲哪款遊戲！';
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
