require('dotenv').config();
const axios = require('axios');

async function test() {
  try {
    const response = await axios.post(
      'https://api.minimax.chat/v1/text/chatcompletion_v2',
      {
        model: 'abab6.5s-chat',
        tokens_to_generate: 100,
        messages: [
          { role: 'system', content: '你是客服' },
          { role: 'user', content: '你好' }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.MINIMAX_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('成功:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('錯誤:', error.response?.data || error.message);
  }
}

test();
