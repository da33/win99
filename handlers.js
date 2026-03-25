const db = require('./database');
const { getWelcomeMessage, getPriceList, getPromotions, getHowToOrder, getContactInfo } = require('./messages');

// 隨機選擇回覆
function randomReply(replies) {
  return replies[Math.floor(Math.random() * replies.length)];
}

// 處理文字訊息
async function handleMessage(event, client) {
  if (event.message.type !== 'text') return;

  const userId = event.source.userId;
  const msg = event.message.text.toLowerCase();

  db.saveCustomer(userId);

  let replyText;

  if (msg.includes('價格') || msg.includes('價目') || msg.includes('多少錢')) {
    replyText = randomReply([
      '💰 價格超划算的！95折起，儲越多折越多～\n1000以上9折，3000以上85折\n想儲哪款遊戲？',
      '嘿！我們折扣很優喔 💰\n基本95折，大額更便宜：\n• 1000+ → 9折\n• 3000+ → 85折\n要儲值嗎？',
      '價格的話～95折起跳！\n儲值金額越高折扣越好 💰\n1000以上9折，3000以上85折\n需要幫你算嗎？'
    ]);
  } else if (msg.includes('優惠') || msg.includes('活動') || msg.includes('促銷')) {
    replyText = randomReply([
      '🎁 現在超多優惠！\n買1000送500（限前20名）\n首儲滿500送100\n要不要試試？',
      '有啊有啊！限時活動 🎁\n• 買1000送500（快搶，只剩幾個名額）\n• 首儲500送100\n現在最划算！',
      '優惠多到爆 🎁\n1. 買1000送500（限量20名）\n2. 首儲滿500送100\n手腳要快喔～'
    ]);
  } else if (msg.includes('如何') || msg.includes('怎麼') || msg.includes('訂購') || msg.includes('流程')) {
    replyText = randomReply([
      '📝 超簡單4步驟：\n1. 告訴我遊戲\n2. 說金額\n3. 給帳號\n4. 付款\n5-10分鐘搞定！要開始嗎？',
      '很快的！📝\n跟我說遊戲名→金額→帳號→付款\n然後等5-10分鐘就好了\n現在要訂嗎？',
      '流程超簡單 📝\n講遊戲→講金額→給帳號→付錢\n大概5-10分鐘就充好了\n要試試看嗎？'
    ]);
  } else if (msg.includes('聯絡') || msg.includes('客服') || msg.includes('真人')) {
    replyText = randomReply([
      '👋 我就是真人啊！\n服務時間 09:00-23:00\n有問題直接問我～',
      '在在在！我是真人客服 👋\n早上9點到晚上11點都在\n什麼問題都可以問喔',
      '嘿我在這！真人客服 👋\n09:00-23:00 隨時為你服務\n需要什麼幫忙？'
    ]);
  } else if (msg.includes('你好') || msg.includes('哈囉') || msg.includes('hi') || msg.includes('hello')) {
    replyText = randomReply([
      '嗨！歡迎來Win99 😊\n專做：原神、崩鐵、王者、絕區零\n想了解價格還是優惠？',
      'Hi～我是Win99客服 😊\n原神/崩鐵/王者/絕區零 都能充\n需要什麼服務？',
      '哈囉！Win99遊戲代充 😊\n熱門遊戲都有做喔\n要問價格嗎？還是直接儲值？'
    ]);
  } else if (msg.includes('原神') || msg.includes('崩壞') || msg.includes('崩鐵') || msg.includes('王者') || msg.includes('絕區零')) {
    replyText = randomReply([
      '好的！要儲多少呢？\n我們有95折起的優惠喔 💰',
      '沒問題！想儲值多少金額？\n現在有買1000送500的活動 🎁',
      'OK！金額多少？\n告訴我後就能幫你處理了～'
    ]);
  } else {
    replyText = randomReply([
      '不好意思，我只能幫你處理遊戲代充喔～\n需要儲值嗎？',
      '我是專門負責遊戲代充的客服\n有要儲值的話跟我說！',
      '抱歉我只會遊戲代充相關的事\n要充值的話我很樂意幫忙 😊'
    ]);
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
