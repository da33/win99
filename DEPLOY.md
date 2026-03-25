# Zeabur 部署教學

## 步驟 1：準備 Git Repository

```bash
cd line-bot-game-topup
git init
git add .
git commit -m "Initial commit"
```

## 步驟 2：推送到 GitHub

1. 到 GitHub 建立新 repository
2. 推送程式碼：
```bash
git remote add origin https://github.com/你的帳號/你的repo.git
git push -u origin main
```

## 步驟 3：部署到 Zeabur

1. 前往 [Zeabur](https://zeabur.com)
2. 登入並建立新專案
3. 選擇「從 GitHub 部署」
4. 選擇你的 repository

## 步驟 4：設定環境變數

在 Zeabur 專案設定中加入：
- `LINE_CHANNEL_ACCESS_TOKEN` = 你的 token
- `LINE_CHANNEL_SECRET` = 你的 secret
- `PORT` = 3000

## 步驟 5：取得網址並設定 Webhook

1. 部署完成後，Zeabur 會給你一個網址（例如：`https://xxx.zeabur.app`）
2. 到 LINE Developers Console
3. 設定 Webhook URL：`https://xxx.zeabur.app/webhook`
4. 啟用 Webhook

完成！🎉
