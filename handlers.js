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

  // 通用回覆 - 更自然的語氣
  if (msg.includes('你好') || msg.includes('哈囉') || msg.includes('hi') || msg.includes('hello')) {
    replyText = '嗨！有什麼可以幫你的嗎？';
  } else if (msg.includes('客服') || msg.includes('真人') || msg.includes('聯繫')) {
    replyText = '我在這邊喔，有問題直接問沒關係';
  } else if (msg.includes('謝謝') || msg.includes('感謝')) {
    replyText = '不客氣～還有其他問題嗎？';
  } else {
    replyText = '嗯...我好像沒聽懂你的意思\n\n你可以換個方式問問看，或是問我註冊、儲值、提款這些問題';
  }

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: replyText }]
  });
}

// 處理按鈕點擊
async function handlePostback(event, client) {
  const data = event.postback.data;
  let replyText = '收到了，稍等一下';

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: replyText }]
  });
}

module.exports = { handleMessage, handlePostback };
