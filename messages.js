// 富遊娛樂城 Line@ 自動回覆內容
// @waterboy_rix 專用

const PROMOTION_LINK = 'https://rggo5269.com/#/ag/win99';
const FUYOU_SERVICE = 'https://lin.ee/jefEdJy';

// 歡迎訊息
function getWelcomeMessage() {
  return {
    type: 'text',
    text: '🎰 歡迎來到富遊娛樂城！\n\n' +
          '我是 @waterboy_rix 的專屬客服\n' +
          '很高興為您服務！\n\n' +
          '🎁 新手福利：\n' +
          '• 註冊送$168體驗金\n' +
          '• 首儲1000送1000\n' +
          '• 100%保證出金\n\n' +
          '請選擇您需要的服務：\n' +
          '1️⃣ 立即註冊\n' +
          '2️⃣ 新手福利\n' +
          '3️⃣ 代理招募\n' +
          '4️⃣ 遊戲攻略\n\n' +
          '直接回覆數字即可！'
  };
}

// 1. 立即註冊
function getRegisterInfo() {
  return {
    type: 'text',
    text: '🎰 富遊娛樂城註冊超簡單！\n\n' +
          '📱 註冊步驟：\n' +
          '1️⃣ 點擊連結：' + PROMOTION_LINK + '\n' +
          '2️⃣ 填寫基本資料\n' +
          '3️⃣ 完成手機驗證\n' +
          '4️⃣ 立即領取$168體驗金\n\n' +
          '🎁 首次儲值還送1000！\n\n' +
          '有問題隨時問我 💬'
  };
}

// 2. 新手福利
function getPromotions() {
  return {
    type: 'text',
    text: '🎁 富遊新手福利超豐富！\n\n' +
          '💰 註冊禮：\n' +
          '• 免費體驗金 $168\n' +
          '• 無需存款即可領取\n\n' +
          '💎 首儲禮：\n' +
          '• 首儲1000送1000\n' +
          '• 100%回饋\n\n' +
          '🎰 額外福利：\n' +
          '• 100次免費旋轉\n' +
          '• VIP快速通道\n' +
          '• 天天簽到領獎金\n\n' +
          '立即註冊：' + PROMOTION_LINK + '\n\n' +
          '想了解更多優惠？\n' +
          '回覆「優惠」查看完整活動！'
  };
}

// 3. 代理招募
function getAgentInfo() {
  return {
    type: 'text',
    text: '💰 富遊代理招募中！\n\n' +
          '📊 收益模式：\n' +
          '• 玩家充值抽成 5-15%\n' +
          '• 團隊發展獎金\n' +
          '• 月入10萬+不是夢\n\n' +
          '✅ 富遊優勢：\n' +
          '• 台灣最大娛樂城\n' +
          '• 出金穩定有保障\n' +
          '• 玩家信任度最高\n\n' +
          '🎓 我們提供：\n' +
          '• 完整培訓課程\n' +
          '• 推廣素材包\n' +
          '• 一對一輔導\n' +
          '• 團隊支持\n\n' +
          '想了解詳情？\n' +
          '回覆「代理資料」我私訊你！'
  };
}

// 4. 遊戲攻略
function getGameGuide() {
  return {
    type: 'text',
    text: '🎮 富遊熱門遊戲攻略\n\n' +
          '🔥 戰神賽特：\n' +
          '• 能量條半滿時加注\n' +
          '• 聖甲蟲出現抓緊機會\n' +
          '• 覺醒模式全力衝刺\n\n' +
          '🐉 魔龍傳奇：\n' +
          '• 觀察出分週期\n' +
          '• 小額測試水溫\n' +
          '• 見好就收\n\n' +
          '🃏 真人百家樂：\n' +
          '• 看路法運用\n' +
          '• 資金管理\n' +
          '• 情緒控制\n\n' +
          '想要更詳細的攻略？\n' +
          '回覆遊戲名稱，我教你！\n\n' +
          '立即體驗：' + PROMOTION_LINK
  };
}

// 戰神賽特專項攻略
function getSethGuide() {
  return {
    type: 'text',
    text: '🔥 戰神賽特爆分攻略\n\n' +
          '📌 3大必學技巧：\n' +
          '1️⃣ 能量條半滿時加注\n' +
          '2️⃣ 聖甲蟲出現抓緊機會\n' +
          '3️⃣ 覺醒模式全力衝刺\n\n' +
          '💡 選台技巧：\n' +
          '• 觀察倍數球頻率\n' +
          '• 小額測試水溫\n' +
          '• 抓住免費遊戲\n\n' +
          '🎰 遊戲特色：\n' +
          '• 最高81,000倍大獎\n' +
          '• 96.89%超高回報率\n' +
          '• 覺醒模式超刺激\n\n' +
          '立即試玩：' + PROMOTION_LINK + '\n\n' +
          '關注我的 Threads @waterboy_rix\n' +
          '更多攻略持續更新！'
  };
}

// 出金保證
function getWithdrawInfo() {
  return {
    type: 'text',
    text: '💰 富遊100%保證出金！\n\n' +
          '✅ 出金速度：\n' +
          '• 正常情況：5分鐘內到帳\n' +
          '• 超過30分鐘：立即補償\n\n' +
          '🔒 安全保障：\n' +
          '• 2025台灣娛樂城第一名\n' +
          '• 50+網紅實測推薦\n' +
          '• 過億資本額保障\n' +
          '• 合法牌照認證\n\n' +
          '📊 出金記錄：\n' +
          '• 每筆交易可查詢\n' +
          '• 透明公開\n' +
          '• 絕不拖延\n\n' +
          '不用擔心黑網詐騙！\n' +
          '富遊是最值得信賴的平台\n\n' +
          '立即加入：' + PROMOTION_LINK
  };
}

// 完整優惠活動
function getAllPromotions() {
  return {
    type: 'text',
    text: '🎁 富遊完整優惠活動\n\n' +
          '💎 新手專區：\n' +
          '• 註冊送$168\n' +
          '• 首儲1000送1000\n\n' +
          '📅 每日活動：\n' +
          '• 天天簽到領獎金\n' +
          '• 幸運轉盤抽獎\n\n' +
          '💰 返水活動：\n' +
          '• 電子遊戲返水\n' +
          '• 真人百家返水\n' +
          '• 體育投注返水\n' +
          '• 無上限回饋\n\n' +
          '👑 VIP特權：\n' +
          '• 專屬優惠\n' +
          '• 更高返水\n' +
          '• 快速出金\n' +
          '• 專屬客服\n\n' +
          '⏰ 限時活動：\n' +
          '• 週末加碼\n' +
          '• 節日特惠\n' +
          '• 不定期驚喜\n\n' +
          '立即參加：' + PROMOTION_LINK
  };
}

// 聯絡客服
function getContactInfo() {
  return {
    type: 'text',
    text: '💬 聯繫客服\n\n' +
          '🤖 Line@ 客服（我）：\n' +
          '• 24小時自動回覆\n' +
          '• 常見問題即時解答\n\n' +
          '👤 富遊官方客服：\n' +
          '• Line：' + FUYOU_SERVICE + '\n' +
          '• 24/7 真人客服\n' +
          '• 專業快速\n\n' +
          '📱 推廣專員（我）：\n' +
          '• Threads：@waterboy_rix\n' +
          '• Instagram：@waterboy_rix\n' +
          '• 遊戲攻略、代理諮詢\n\n' +
          '有任何問題隨時問我！'
  };
}

// 預設回覆
function getDefaultMessage() {
  return {
    type: 'text',
    text: '您好！我是富遊娛樂城客服 🎰\n\n' +
          '請告訴我您需要：\n' +
          '1️⃣ 立即註冊\n' +
          '2️⃣ 新手福利\n' +
          '3️⃣ 代理招募\n' +
          '4️⃣ 遊戲攻略\n\n' +
          '或直接輸入關鍵字：\n' +
          '• 註冊、連結\n' +
          '• 優惠、活動\n' +
          '• 代理、賺錢\n' +
          '• 攻略、技巧\n' +
          '• 出金、安全\n\n' +
          '我會立即為您服務！💬'
  };
}

module.exports = {
  getWelcomeMessage,
  getRegisterInfo,
  getPromotions,
  getAgentInfo,
  getGameGuide,
  getSethGuide,
  getWithdrawInfo,
  getAllPromotions,
  getContactInfo,
  getDefaultMessage
};
