const db = require('./database');
const messages = require('./messages');

// 處理文字訊息
async function handleMessage(event, client) {
  if (event.message.type !== 'text') return;

  const userId = event.source.userId;
  const msg = event.message.text.toLowerCase().trim();

  // 儲存客戶資訊
  db.saveCustomer(userId);

  let replyMessage;

  // 數字選單
  if (msg === '1') {
    replyMessage = messages.getRegisterInfo();
  } else if (msg === '2') {
    replyMessage = messages.getPromotions();
  } else if (msg === '3') {
    replyMessage = messages.getAgentInfo();
  } else if (msg === '4') {
    replyMessage = messages.getGameGuide();
  }
  
  // 註冊相關
  else if (msg.includes('註冊') || msg.includes('怎麼玩') || msg.includes('連結') || 
           msg.includes('網址') || msg.includes('開始') || msg.includes('加入')) {
    replyMessage = messages.getRegisterInfo();
  }
  
  // 優惠活動
  else if (msg.includes('優惠') || msg.includes('活動')) {
    replyMessage = messages.getAllPromotions();
  } else if (msg.includes('首儲') || msg.includes('福利') || msg.includes('體驗金')) {
    replyMessage = messages.getPromotions();
  }
  
  // 代理招募
  else if (msg.includes('代理') || msg.includes('加盟') || msg.includes('賺錢') || 
           msg.includes('收入') || msg.includes('兼職') || msg.includes('副業') ||
           msg.includes('代理資料')) {
    replyMessage = messages.getAgentInfo();
  }
  
  // 遊戲攻略
  else if (msg.includes('攻略') || msg.includes('技巧') || msg.includes('教學')) {
    replyMessage = messages.getGameGuide();
  } else if (msg.includes('戰神賽特') || msg.includes('賽特')) {
    replyMessage = messages.getSethGuide();
  }
  
  // 出金問題
  else if (msg.includes('出金') || msg.includes('提款') || msg.includes('安全') || 
           msg.includes('詐騙') || msg.includes('黑網')) {
    replyMessage = messages.getWithdrawInfo();
  }
  
  // 客服
  else if (msg.includes('客服') || msg.includes('聯繫') || msg.includes('人工') ||
           msg.includes('真人客服') || msg.includes('線上客服')) {
    replyMessage = messages.getContactInfo();
  }
  
  // 歡迎訊息
  else if (msg.includes('你好') || msg.includes('哈囉') || msg.includes('hi') || 
           msg.includes('hello') || msg.includes('在嗎') || msg.includes('在不在')) {
    replyMessage = messages.getWelcomeMessage();
  }
  
  // 預設回覆
  else {
    replyMessage = messages.getDefaultMessage();
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [replyMessage]
  });
}

// 處理按鈕點擊（圖文選單）
async function handlePostback(event, client) {
  const data = event.postback.data;
  let replyMessage;

  switch(data) {
    case 'register':
      replyMessage = messages.getRegisterInfo();
      break;
    case 'promotion':
      replyMessage = messages.getPromotions();
      break;
    case 'agent':
      replyMessage = messages.getAgentInfo();
      break;
    case 'guide':
      replyMessage = messages.getGameGuide();
      break;
    default:
      replyMessage = messages.getDefaultMessage();
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [replyMessage]
  });
}

// 處理加入好友事件
async function handleFollow(event, client) {
  const userId = event.source.userId;
  db.saveCustomer(userId);

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [messages.getWelcomeMessage()]
  });
}

module.exports = { 
  handleMessage, 
  handlePostback,
  handleFollow 
};
