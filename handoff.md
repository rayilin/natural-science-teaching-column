# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（L3）。

## ⏯️ 目前做到哪
完成第一份完整單元教材：**115-1 三上自然｜植物的構造和生長**（翰林版第一單元）。
含教案（Word 6 頁）、教學簡報（21 頁，第 4／7／9／14 頁為台灣中文女聲旁白動畫）、10 題互動測驗、整合教學網頁（簡報播放器＋測驗＋參考影片＋抽籤＋計時器），以及網頁最下方的**兩人即時配對搶答遊戲**。
教材已上線 GitHub Pages（repo 已設為公開）：<https://rayilin.github.io/natural-science-teaching-column/>

## 🌐 上線狀態（2026-10-23）
- 公開網址：<https://rayilin.github.io/natural-science-teaching-column/>
- 對戰頁：`…/battle.html`；教案與簡報在 `…/downloads/`（中文檔名正常）
- 發佈方式：`.github/workflows/pages.yml`（push main 自動發佈），會排除 `server.js`、`questions.json`、`start-battle.bat`、`package.json`，答案檔實測回 404
- 對戰後端改成可指向雲端：`教學網頁/battle-api.js` 的 `window.BATTLE_API`（空字串＝同網站／區網），`server.js` 已加 CORS（含 OPTIONS 204）
- 雲端部署檔已備好：`render.yaml`＋根目錄 `battle-server.js` 入口，**尚未在 Render 建立服務**（需要老師 GitHub 登入授權），建立後把網址填進 `battle-api.js` 即完成
- 詳細步驟：`教學網頁/部署與上線說明.md`

## 🧰 可重用的技能（2026-10-23 建立）
- `teaching-site`：把這份教材的整套流程變成技能（教案→簡報→旁白動畫→教學網頁→測驗→對戰→上線→驗收）
  - 位置：`C:\Users\rayi\.config\opencode\skills\teaching-site\`
  - `scripts/new_unit.js`：一鍵建新單元骨架（含對戰模板）
  - `scripts/check_site.js`：成品自動檢查（陣列格式、檔案存在、題庫 30 題、答案是否外洩）
  - `templates/`：index.html、battle.html、server.js、pages.yml、render.yaml 等可直接複製的版本
  - 用法：對 Agent 說「幫我做 <單元> 的教學網頁」就會自動觸發

## 🚦 目前狀態
- 教材資料夾：`115-1_三上自然_植物的構造和生長/`
  - `教案/教案_植物的構造和生長.docx`：6 頁，含「七、隨堂測驗（10 題）」與評量規準
  - `簡報/植物的構造和生長_教學簡報.pptx`：21 頁，四段動畫已換成有旁白版
  - `教學網頁/index.html`：主要交付檔；`slides/` 21 張圖、`media/` 4 段 mp4、`downloads/` 最新 docx＋pptx
  - `教學網頁/battle.html`：對戰頁（可獨立開，也可用 `?embed=1` 嵌入教學網頁）
  - `教學網頁/server.js`：區網配對伺服器（Node 內建模組，零 npm 依賴）
  - `教學網頁/questions.json`：30 題題庫（10 題舊題＋20 題植物生長新題）
  - `教學網頁/start-battle.bat`：老師一鍵啟動伺服器
  - `影片/plants/`：HyperFrames 四段動畫原始碼、`add_voice.py`、`deck/build_deck.js`
- 教學網頁已完成瀏覽器 QA：換頁、動畫播放、測驗計分／重測、抽籤不重複、計時器倒數
- 對戰已完成自動化測試：自動配對、搶答計分、答錯換手、10 題結算、再戰、斷線重連、15 秒後房間清除，全部通過
- 對戰 UI 已測：桌面與 390px 手機寬度無水平溢出、iframe 自動調整高度、獨立頁與嵌入模式正常
- `教學網頁/downloads` 與 `教案/`、`簡報/` 版本一致（pptx 均為 21 頁）

## 🎮 對戰玩法與操作
- 規則：兩人一室、隨機抽 10 題、每題 20 秒；先答對者 +1 並結束該題；答錯不扣分但該題鎖定，對手仍可答；兩人都錯或逾時則無人得分；最後比分高者勝，同分平手。
- 啟動：雙擊 `教學網頁/start-battle.bat`（或 `cd 教學網頁 && node server.js`），預設埠 8765。
- 老師：開 `http://localhost:8765/` 使用完整教學網頁，對戰區在頁面最下方。
- 學生：同一 Wi-Fi 開 `http://<老師電腦IP>:8765/battle.html`，輸入名字即自動配對。
- 伺服器啟動時會在主控台印出區網 IP 與學生入口；Windows 防火牆詢問時要允許 Node.js。
- `questions.json`、`server.js`、`start-battle.bat` 已封鎖靜態存取，答案不會下傳到作答前的瀏覽器。

## ➡️ 下一步
1. 在 Render 建 Blueprint（`render.yaml`）→ 取得 `https://plant-battle.onrender.com` → 填進 `教學網頁/battle-api.js` 的 `window.BATTLE_API` → push，線上對戰即完成
2. 上課前實測：單槍 16:9、動畫音量、抽籤名單改成班級座號
3. 用兩台真實平板／電腦跑一場完整對戰，確認校園 Wi-Fi 的 AP 隔離沒有擋住裝置互連
4. 課後把教學省思補進 docx 第十三節，並依回饋調整測驗題目
5. 若要改內容：重跑 `教案/make_lesson_plan.py` 或 `影片/plants/deck/build_deck.js`，完成後把 docx／pptx 重新複製到 `教學網頁/downloads`（push 後 Pages 會自動更新）

## ⚠️ 注意事項
- 一般教學網頁可用 `python -m http.server 8765` 開啟；但**對戰一定要用 `node server.js`**，否則頁面會顯示「先啟動對戰伺服器」
- 對戰伺服器沒有帳號與資料庫，重啟後所有房間與比分會清空；學生重新整理頁面視同離開房間
- 學生斷線有 15 秒寬限，期間題目倒數暫停；逾時房間關閉，對手回到大廳
- 簡報使用源石黑體（GenSekiGothic2 TW），**未內嵌**；別台電腦會退回系統字型
- 字型檔（約 29MB）與 `node_modules` 不進 repo；要重渲染動畫需先安裝字型並 `npm install`
- 動畫有旁白，播放前先確認音量；靜音版備份在 `影片/plants/deck/media/silent/`
- 學生資料只用座號，不出現姓名、聯絡方式或照片

## 🕐 最後更新
- 時間：2026-10-23 09:50
- 更新者：OpenCode（DeepSeek V4.1 Flash Free）@ DESKTOP-4475O68
- Git push：✅ 已推（e33481f Render 入口與上線說明；54a5707 Pages 部署與 CORS）
