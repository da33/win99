#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RG富遊網站爬蟲腳本
需要安裝: pip install playwright
然後執行: playwright install chromium
"""

from playwright.sync_api import sync_playwright
import json
import time

def scrape_rg_website(username, password):
    with sync_playwright() as p:
        # 啟動瀏覽器
        browser = p.chromium.launch(headless=False)  # headless=False 可以看到過程
        page = browser.new_page()
        
        try:
            # 訪問網站
            print("正在訪問網站...")
            page.goto("https://rggo5269.com/#/")
            time.sleep(3)
            
            # 這裡需要根據實際登入頁面調整選擇器
            print("正在登入...")
            # page.fill('input[name="username"]', username)  # 根據實際調整
            # page.fill('input[name="password"]', password)  # 根據實際調整
            # page.click('button[type="submit"]')  # 根據實際調整
            
            # 等待登入完成
            time.sleep(5)
            
            # 抓取內容
            print("正在抓取內容...")
            content = page.content()
            
            # 保存到文件
            with open('rg_website_content.html', 'w', encoding='utf-8') as f:
                f.write(content)
            
            print("內容已保存到 rg_website_content.html")
            
        except Exception as e:
            print(f"錯誤: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    # 使用方式
    # scrape_rg_website("你的帳號", "你的密碼")
    print("請修改腳本中的登入選擇器後再執行")
