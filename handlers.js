const db = require('./database');
const knowledgeBase = require('./rg-knowledge-base.json');

// 隨機回應變化
const greetings = [
  '在的，怎麼了？',
  '嗨，有什麼需要幫忙嗎？',
  '在喔，什麼事？',
  '你好～有問題嗎？'
];

const thanks = [
  '不會～',
  '沒事～',
  '不客氣',
  '還有其他問題嗎？'
];

const confused = [
  '欸...我沒太懂你的意思',
  '不好意思，可以說清楚一點嗎？',
  '嗯？你是想問什麼',
  '我有點不太懂，可以換個方式說嗎？'
];

// 隨機選擇
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

  let replyText;

  // 檢查是否要轉接真人
  if (msg.includes('真人客服') || msg.includes('人工客服') || msg.includes('轉接') || 
      msg.includes('找客服') || msg.includes('線上客服')) {
    replyText = '好的，幫你轉接\n\n請加LINE官方客服：\n👉 https://line.me/R/ti/p/@rg8888\n\n或直接點這裡聯繫我們';
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: replyText }]
    });
  }

  // 先從知識庫搜尋
  replyText = searchKnowledge(msg);

  if (replyText) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: replyText }]
    });
  }

  // 通用回覆
  if (msg.includes('你好') || msg.includes('哈囉') || msg.includes('hi') || 
      msg.includes('hello') || msg.includes('在嗎') || msg.includes('在不在')) {
    replyText = random(greetings);
  } else if (msg.includes('謝謝') || msg.includes('感謝') || msg.includes('thx') || msg.includes('thanks')) {
    replyText = random(thanks);
  } else if (msg.includes('官網') || msg.includes('網址') || msg.includes('連結')) {
    replyText = 'RG富遊官網：https://rg8888.net\n\n有問題再問我';
  } else {
    replyText = random(confused) + '\n\n你可以問我註冊、儲值、提款、遊戲、優惠這些\n或是要轉接真人客服也可以';
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
