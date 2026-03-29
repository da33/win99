const db = require('./database');
const knowledgeBase = require('./rg-knowledge-base.json');

// 從知識庫搜尋答案
function searchKnowledge(msg) {
  let bestMatch = null;
  let bestScore = 0;

  for (const faq of knowledgeBase.faqs) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (msg.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq.answer;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

// 處理文字訊息
async function handleMessage(event, client) {
  if (event.message.type !== 'text') return;

  const userId = event.source.userId;
  const msg = event.message.text.toLowerCase();

  db.saveCustomer(userId);

  // 先從知識庫搜尋
  let replyText = searchKnowledge(msg);

  if (replyText) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: replyText }]
    });
  }

  // 通用回覆
  if (msg.includes('你好') || msg.includes('哈囉') || msg.includes('hi') || msg.includes('hello')) {
    replyText = '你好！我是富遊客服，有什麼可以幫你的嗎？';
  } else if (msg.includes('客服') || msg.includes('真人') || msg.includes('聯繫')) {
    replyText = '我就是真人客服喔！有任何問題都可以直接問我 😊';
  } else {
    replyText = '不好意思，我沒有完全理解你的問題。\n\n你可以問我：\n• 如何註冊\n• 怎麼儲值\n• 提款問題\n• 優惠活動\n• 遊戲相關\n\n或直接描述你遇到的問題';
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: replyText }]
  });
}

// 處理按鈕點擊
async function handlePostback(event, client) {
  const data = event.postback.data;

  let replyText = '收到你的請求了，請稍等';

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: replyText }]
  });
}

module.exports = { handleMessage, handlePostback };
