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
