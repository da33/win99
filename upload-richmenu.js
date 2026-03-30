require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

// 建立圖文選單
async function createRichMenu() {
  const richMenuData = {
    size: {
      width: 2500,
      height: 1686
    },
    selected: true,
    name: "RG富遊快捷選單",
    chatBarText: "點我開始",
    areas: [
      {
        bounds: { x: 0, y: 0, width: 1250, height: 843 },
        action: {
          type: "uri",
          label: "立即註冊領168",
          uri: "https://rg8888.net"
        }
      },
      {
        bounds: { x: 1250, y: 0, width: 1250, height: 843 },
        action: {
          type: "message",
          label: "我要儲值",
          text: "我要儲值"
        }
      },
      {
        bounds: { x: 0, y: 843, width: 833, height: 843 },
        action: {
          type: "message",
          label: "我要提款",
          text: "我要提款"
        }
      },
      {
        bounds: { x: 833, y: 843, width: 834, height: 843 },
        action: {
          type: "message",
          label: "查看優惠",
          text: "有什麼優惠"
        }
      },
      {
        bounds: { x: 1667, y: 843, width: 833, height: 843 },
        action: {
          type: "message",
          label: "聯繫客服",
          text: "真人客服"
        }
      }
    ]
  };

  try {
    const response = await axios.post(
      'https://api.line.me/v2/bot/richmenu',
      richMenuData,
      {
        headers: {
          'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ 圖文選單建立成功！');
    console.log('Rich Menu ID:', response.data.richMenuId);
    return response.data.richMenuId;
  } catch (error) {
    console.error('❌ 建立失敗:', error.response?.data || error.message);
    throw error;
  }
}


// 上傳圖片到圖文選單
async function uploadImage(richMenuId, imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    
    const response = await axios.post(
      `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`,
      imageBuffer,
      {
        headers: {
          'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'image/png'
        }
      }
    );

    console.log('✅ 圖片上傳成功！');
    return true;
  } catch (error) {
    console.error('❌ 圖片上傳失敗:', error.response?.data || error.message);
    throw error;
  }
}

// 設定為預設選單
async function setDefaultRichMenu(richMenuId) {
  try {
    await axios.post(
      `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        }
      }
    );

    console.log('✅ 已設定為預設選單！');
    return true;
  } catch (error) {
    console.error('❌ 設定預設選單失敗:', error.response?.data || error.message);
    throw error;
  }
}


// 主函數
async function main() {
  console.log('🚀 開始上傳圖文選單...\n');

  try {
    // 1. 建立圖文選單
    const richMenuId = await createRichMenu();
    
    // 2. 上傳圖片（如果有圖片的話）
    const imagePath = './richmenu-image.png';
    if (fs.existsSync(imagePath)) {
      await uploadImage(richMenuId, imagePath);
    } else {
      console.log('⚠️  找不到圖片檔案，請先準備 richmenu-image.png (2500x1686px)');
    }
    
    // 3. 設定為預設選單
    await setDefaultRichMenu(richMenuId);
    
    console.log('\n✅ 全部完成！');
    console.log(`Rich Menu ID: ${richMenuId}`);
    
  } catch (error) {
    console.error('\n❌ 執行失敗');
    process.exit(1);
  }
}

// 執行
if (require.main === module) {
  main();
}

module.exports = { createRichMenu, uploadImage, setDefaultRichMenu };
