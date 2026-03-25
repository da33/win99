require('dotenv').config();
const axios = require('axios');

async function test() {
  try {
    const response = await axios.post(
      'https://api.minimaxi.com/anthropic/messages',
      {
        model: 'MiniMax-M2.7',
        max_tokens: 100,
        system: '你是客服助手',
        messages: [{ role: 'user', content: '你好' }]
      },
      {
        headers: {
          'x-api-key': process.env.MINIMAX_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('成功:', response.data);
  } catch (error) {
    console.error('錯誤:', error.response?.data || error.message);
  }
}

test();
