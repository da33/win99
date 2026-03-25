// 歡迎訊息
function getWelcomeMessage() {
  return {
    type: 'text',
    text: '👋 歡迎！我是遊戲代充小幫手\n\n請選擇以下服務：\n💰 價格查詢\n🎁 優惠活動\n📝 如何訂購\n💬 聯絡客服\n\n直接輸入關鍵字即可！'
  };
}

// 價目表
function getPriceList() {
  return {
    type: 'text',
    text: '💰 代充價目表\n\n' +
          '📱 熱門遊戲：\n' +
          '• 原神：100台幣 = 95折\n' +
          '• 崩壞星穹鐵道：100台幣 = 95折\n' +
          '• 王者榮耀：100台幣 = 93折\n' +
          '• 絕區零：100台幣 = 95折\n\n' +
          '✨ 儲值越多折扣越多！\n' +
          '💎 1000以上：9折\n' +
          '💎 3000以上：85折\n\n' +
          '輸入「優惠」查看限時活動'
  };
}

// 優惠活動
function getPromotions() {
  return {
    type: 'text',
    text: '🎁 限時優惠活動\n\n' +
          '⚡ 本週特惠：\n' +
          '買1000送500（限前20名）\n\n' +
          '🎯 新客優惠：\n' +
          '首次儲值滿500送100\n\n' +
          '🔥 推薦好友：\n' +
          '好友下單你也得100點數\n\n' +
          '⏰ 活動倒數3天！\n' +
          '立即輸入「訂購」開始'
  };
}

// 訂購流程
function getHowToOrder() {
  return {
    type: 'text',
    text: '📝 訂購流程\n\n' +
          '1️⃣ 告訴我遊戲名稱\n' +
          '2️⃣ 告訴我儲值金額\n' +
          '3️⃣ 提供遊戲帳號資訊\n' +
          '4️⃣ 付款後截圖給我\n' +
          '5️⃣ 5-10分鐘完成代充\n\n' +
          '⚡ 快速、安全、保密\n' +
          '💯 已服務超過1000+玩家\n\n' +
          '現在就開始吧！'
  };
}

// 聯絡資訊
function getContactInfo() {
  return {
    type: 'text',
    text: '💬 聯絡客服\n\n' +
          '📱 LINE ID: @gamepay\n' +
          '⏰ 服務時間：09:00-23:00\n' +
          '⚡ 平均回覆時間：5分鐘內\n\n' +
          '有任何問題直接私訊我！\n' +
          '我們會盡快回覆您 😊'
  };
}

module.exports = {
  getWelcomeMessage,
  getPriceList,
  getPromotions,
  getHowToOrder,
  getContactInfo
};
