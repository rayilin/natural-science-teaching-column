# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（L3）。

## ⏯️ 目前做到哪
完成第一份完整單元教材：**115-1 三上自然｜植物的構造和生長**（翰林版第一單元）。
含教案（Word 6 頁）、教學簡報（21 頁，第 4／7／9／14 頁為台灣中文女聲旁白動畫）、10 題互動測驗、整合教學網頁（簡報播放器＋測驗＋參考影片＋抽籤＋計時器）。

## 🚦 目前狀態
- 教材資料夾：`115-1_三上自然_植物的構造和生長/`
  - `教案/教案_植物的構造和生長.docx`：6 頁，含「七、隨堂測驗（10 題）」與評量規準
  - `簡報/植物的構造和生長_教學簡報.pptx`：21 頁，四段動畫已換成有旁白版
  - `教學網頁/index.html`：主要交付檔；`slides/` 21 張圖、`media/` 4 段 mp4、`downloads/` 最新 docx＋pptx
  - `影片/plants/`：HyperFrames 四段動畫原始碼、`add_voice.py`、`deck/build_deck.js`
- 網頁已完成瀏覽器 QA：換頁、動畫播放、測驗計分／重測、抽籤不重複、計時器倒數
- `教學網頁/downloads` 與 `教案/`、`簡報/` 版本一致（pptx 均為 21 頁）
- 尚未 commit（整個單元資料夾仍為 untracked）

## ➡️ 下一步
1. `git add` ＋ commit ＋ push 本次單元（`.gitignore` 已排除 node_modules、字型、renders、thumbs、silent）
2. 上課前實測：單槍 16:9、動畫音量、抽籤名單改成班級座號
3. 課後把教學省思補進 docx 第十三節，並依回饋調整測驗題目

## ⚠️ 注意事項
- 網頁建議用 `python -m http.server 8765` 開啟（工作目錄 `教學網頁`）；直接雙擊 index.html 也可，但部分瀏覽器對本機 mp4 較嚴格
- 簡報使用源石黑體（GenSekiGothic2 TW），**未內嵌**；別台電腦會退回系統字型
- 字型檔（約 29MB）與 `node_modules` 不進 repo；要重渲染動畫需先安裝字型並 `npm install`
- 動畫有旁白，播放前先確認音量；靜音版備份在 `影片/plants/deck/media/silent/`
- 學生資料只用座號，不出現姓名、聯絡方式或照片

## 🕐 最後更新
- 時間：2026-10-22 22:52
- 更新者：OpenCode（DeepSeek V4.1 Flash Free）@ DESKTOP-4475O68
- Git push：待推
