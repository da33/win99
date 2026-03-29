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

  // 快速流程：我要儲值
  if (msg.includes('我要儲值') || msg.includes('想儲值')) {
    replyText = '好的！儲值方式：\n\n💳 銀行轉帳（5千-10萬）\n🏪 超商（1千-2萬）\n💰 USDT（3千-2萬）\n💵 支付寶（1千-6千）\n\n通常1-5分鐘到帳\n\n需要詳細教學嗎？';
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: replyText }]
    });
  }

  // 快速流程：我要提款
  if (msg.includes('我要提款') || msg.includes('想提款')) {
    replyText = '提款前確認：\n\n✅ 完成實名認證了嗎？\n✅ 綁定銀行帳戶了嗎？\n✅ 達到1倍流水了嗎？\n\n都好了的話，3-5分鐘就能到帳\n每天第一次提款免手續費喔\n\n需要幫忙嗎？';
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: replyText }]
    });
  }

  // 轉接真人客服
  if (msg.includes('真人客服') || msg.includes('人工客服') || msg.includes('轉接') || 
      msg.includes('找客服') || msg.includes('線上客服') || msg.includes('聯繫客服')) {
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
    replyText = random(confused) + '\n\n你可以直接說：\n「我要儲值」\n「我要提款」\n「查看優惠」\n或點下方選單快速操作';
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
