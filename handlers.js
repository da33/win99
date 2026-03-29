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
  if (msg.includes('你好') || msg.includes('哈囉') || msg.includes('hi') || msg.includes('hello') || msg.includes('在嗎')) {
    replyText = '在的，有什麼需要幫忙嗎？';
  } else if (msg.includes('客服') || msg.includes('真人') || msg.includes('人工')) {
    replyText = '我就是真人客服喔，有問題直接問沒關係';
  } else if (msg.includes('謝謝') || msg.includes('感謝') || msg.includes('thx')) {
    replyText = '不會～還有其他問題隨時問';
  } else if (msg.includes('官網') || msg.includes('網址') || msg.includes('連結')) {
    replyText = 'RG富遊官網：https://rg8888.net\n\n有問題再問我';
  } else {
    replyText = '我沒太懂你的意思欸\n\n你可以問我註冊、儲值、提款、遊戲、優惠這些\n或是換個方式問問看';
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: replyText }]
  });
}

// 處理按鈕點擊
async function handlePostback(event, client) {
  const data = event.postback.data;
  let replyText = '收到，稍等';

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: replyText }]
  });
}

module.exports = { handleMessage, handlePostback };
