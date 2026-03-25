# LINE@ 遊戲代充客服系統

## 功能特色

✅ 關鍵字自動回覆（價格、優惠、訂購、客服）
✅ 圖文選單支援
✅ 客戶資料庫
✅ 訂單管理系統

## 安裝步驟

### 1. 安裝依賴
```bash
npm install
```

### 2. 設定 LINE Bot

前往 [LINE Developers Console](https://developers.line.biz/console/)

1. 建立 Messaging API Channel
2. 取得 Channel Secret
3. 取得 Channel Access Token
4. 設定 Webhook URL: `https://你的網址/webhook`

### 3. 環境變數設定

複製 `.env.example` 為 `.env`：
```bash
cp .env.example .env
```

填入你的 LINE Bot 資訊：
```
LINE_CHANNEL_ACCESS_TOKEN=你的token
LINE_CHANNEL_SECRET=你的secret
PORT=3000
```

### 4. 啟動服務

```bash
npm start
```

開發模式（自動重啟）：
```bash
npm run dev
```

## 部署建議

### 免費方案：
- **Render.com**（推薦）
- **Railway.app**
- **Fly.io**

### 設定圖文選單

在 LINE Official Account Manager 後台設定：
1. 進入「圖文選單」
2. 建立 4 個按鈕：
   - 💰 價格查詢 → postback: `price`
   - 🎁 優惠活動 → postback: `promotion`
   - 📝 如何訂購 → postback: `order`
   - 💬 聯絡客服 → postback: `contact`

## 自訂內容

修改 `messages.js` 來調整：
- 價目表
- 優惠活動
- 聯絡資訊

## 客戶資料

所有客戶和訂單資料儲存在 `customers.json`
