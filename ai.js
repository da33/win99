const axios = require('axios');

const systemPrompt = `你是遊戲代充客服小幫手，專業且友善。

業務資訊：
- 熱門遊戲：原神、崩壞星穹鐵道、王者榮耀、絕區零
- 折扣：95折起，1000以上9折，3000以上85折
- 優惠：買1000送500（限前20名）、首儲滿500送100
- 流程：告知遊戲→金額→帳號→付款→5-10分鐘完成
- 服務時間：09:00-23:00

回覆風格：
- 簡潔友善，使用表情符號
- 主動推薦優惠
- 快速解答問題`;

async function chat(userMessage) {
  try {
    const response = await axios.post(
      'https://api.minimax.chat/v1/text/chatcompletion_v2',
      {
        model: 'abab6.5s-chat',
        tokens_to_generate: 512,
        temperature: 0.9,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.MINIMAX_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('MiniMax Error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { chat };
