const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'customers.json');

// 初始化資料庫
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ customers: [], orders: [] }));
  }
}

// 讀取資料
function readDB() {
  initDB();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

// 寫入資料
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// 儲存客戶
function saveCustomer(userId) {
  const db = readDB();
  const exists = db.customers.find(c => c.userId === userId);

  if (!exists) {
    db.customers.push({
      userId,
      createdAt: new Date().toISOString()
    });
    writeDB(db);
  }
}

// 新增訂單
function addOrder(userId, game, amount) {
  const db = readDB();
  db.orders.push({
    userId,
    game,
    amount,
    status: 'pending',
    createdAt: new Date().toISOString()
  });
  writeDB(db);
}

module.exports = { saveCustomer, addOrder };
