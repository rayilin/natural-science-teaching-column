// 翰林版三上自然〈植物的構造和生長〉教學簡報（SOIL × 動畫版）
// 21 頁；第 4、7、9、14 頁嵌入有旁白動畫（media/p04|p06|p08|p13.mp4）
const path = require("path");
const pptxgen = require("pptxgenjs");
const { makeDeck } = require("./deck_helpers");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.title = "植物的構造和生長";
pptx.author = "自然科學教學專欄";

const D = makeDeck(pptx, {
  theme: { bg: "121212", fg: "F2F0EA", accent: "FF7A1A" },
  mediaDir: path.join(__dirname, "media"),
  playHint: "▶ 點一下播放（含旁白，可隨時暫停）",
});
const { C, H, M, title, lightSlide, darkSlide, video } = D;

const A = "E8601A";       // 淺色頁用的深一階橘
const GREEN = "3F8F4A";
const TEAL = "0E7C7B";
const BLUE = "2C7FB8";
const GOLD = "B8860B";

function line(s, x1, y1, x2, y2, color, width) {
  s.addShape(pptx.ShapeType.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001,
    line: { color, width }, flipV: (y2 < y1) !== (x2 < x1),
  });
}

function pageNo(s, n, dark) {
  s.addText(`植物的構造和生長　${n}`, {
    x: 9.6, y: 7.08, w: 3.1, h: 0.28, fontFace: M, fontSize: 10,
    color: dark ? "6E6A62" : "8A857B", align: "right",
  });
}

function numDot(s, n, x, y, d = 0.46, fill = A, color = "FFFFFF") {
  s.addShape(pptx.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
  s.addText(String(n), { x, y: y - 0.01, w: d, h: d + 0.02, fontFace: H, fontSize: 16, bold: true,
    color, align: "center", valign: "middle" });
}

function pill(s, text, x, y, w, fill, color = "FFFFFF", size = 13) {
  s.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.42, rectRadius: 0.21, fill: { color: fill }, line: { color: fill } });
  s.addText(text, { x, y: y - 0.01, w, h: 0.44, fontFace: H, fontSize: size, bold: true, color, align: "center", valign: "middle" });
}

function infoCard(s, x, y, w, h, head, body, accent) {
  s.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: C.line, width: 1 } });
  s.addShape(pptx.ShapeType.rect, { x, y: y + 0.14, w: 0.07, h: h - 0.28, fill: { color: accent }, line: { color: accent } });
  s.addText(head, { x: x + 0.28, y: y + 0.15, w: w - 0.5, h: 0.42, fontFace: H, fontSize: 20, bold: true, color: C.ink });
  s.addText(body, { x: x + 0.28, y: y + 0.62, w: w - 0.52, h: h - 0.72, fontFace: M, fontSize: 14.5,
    color: "4A4A4A", valign: "top", lineSpacingMultiple: 1.15 });
}

// ═════════ 1 封面 ═════════
{
  const s = darkSlide(null);
  s.addText("翰林版自然科學・三年級上學期・第一單元", { x: 0.9, y: 1.35, w: 11.5, h: 0.5,
    fontFace: M, fontSize: 18, color: C.accent });
  s.addText("植物的構造和生長", { x: 0.9, y: 1.95, w: 11.8, h: 1.5, fontFace: H, fontSize: 78, bold: true, color: C.darkInk });
  s.addText("根・莖・葉・花・果實・種子", { x: 0.9, y: 3.55, w: 11.5, h: 0.7, fontFace: H, fontSize: 30, color: "D8D3C7" });
  line(s, 0.95, 4.55, 5.2, 4.55, C.accent, 4);
  s.addText("兩節課・80 分鐘・4 段動畫", { x: 0.9, y: 4.75, w: 6.5, h: 0.45, fontFace: M, fontSize: 16, color: "9A948A" });
  // 六個構造的小圓點
  const dots = ["根", "莖", "葉", "花", "果實", "種子"];
  dots.forEach((t, i) => {
    const x = 9.1 + (i % 3) * 1.3, y = 4.55 + Math.floor(i / 3) * 1.25;
    s.addShape(pptx.ShapeType.ellipse, { x, y, w: 1.0, h: 1.0, fill: { color: "1F1F1F" }, line: { color: i < 3 ? GREEN : C.accent, width: 2 } });
    s.addText(t, { x, y, w: 1.0, h: 1.0, fontFace: H, fontSize: 18, bold: true, color: C.darkInk, align: "center", valign: "middle" });
  });
  s.addNotes("開場：先問學生「植物有身體嗎？」再揭開標題。六個圓點先不解釋，留到第 3 頁。");
}

// ═════════ 2 問題引入 ═════════
{
  const s = lightSlide("問題引入");
  title(s, "這株植物，你認得幾個部位？", { size: 38 });

  // 左側植物示意
  const bx = 1.15, by = 4.85;
  s.addShape(pptx.ShapeType.rect, { x: 0.6, y: 5.3, w: 5.4, h: 1.5, fill: { color: "E4D9C6" }, line: { color: "D3C4AB" } });
  line(s, bx, by, bx, 2.5, GREEN, 8);
  s.addShape(pptx.ShapeType.ellipse, { x: bx - 1.15, y: 3.55, w: 1.1, h: 0.55, fill: { color: "6FBF5A" }, line: { color: "4C9A2A" }, rotate: -28 });
  s.addShape(pptx.ShapeType.ellipse, { x: bx + 0.05, y: 3.15, w: 1.1, h: 0.55, fill: { color: "6FBF5A" }, line: { color: "4C9A2A" }, rotate: 28 });
  s.addShape(pptx.ShapeType.ellipse, { x: bx - 0.28, y: 2.08, w: 0.56, h: 0.56, fill: { color: "FFB03A" }, line: { color: A, width: 1.5 } });
  s.addShape(pptx.ShapeType.ellipse, { x: bx + 0.32, y: 3.95, w: 0.5, h: 0.5, fill: { color: A }, line: { color: A } });
  for (let i = 0; i < 5; i++) {
    line(s, bx, 5.3, bx - 0.9 + i * 0.45, 6.62, GOLD, 3);
  }
  s.addText("？", { x: bx + 0.62, y: 1.85, w: 0.7, h: 0.7, fontFace: H, fontSize: 30, bold: true, color: A });
  s.addText("？", { x: bx - 1.55, y: 3.2, w: 0.7, h: 0.7, fontFace: H, fontSize: 30, bold: true, color: A });
  s.addText("？", { x: bx + 0.95, y: 4.15, w: 0.7, h: 0.7, fontFace: H, fontSize: 30, bold: true, color: A });
  s.addText("？", { x: bx + 0.25, y: 6.45, w: 0.7, h: 0.7, fontFace: H, fontSize: 30, bold: true, color: A });

  // 右側三個提問
  const qs = [
    ["這是什麼？", "先說出名稱"],
    ["它有什麼用？", "再想想功能"],
    ["如果沒有它？", "最後推論後果"],
  ];
  qs.forEach(([q, sub], i) => {
    const y = 2.15 + i * 1.45;
    s.addShape(pptx.ShapeType.roundRect, { x: 7.0, y, w: 5.6, h: 1.15, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: C.line, width: 1 } });
    numDot(s, i + 1, 7.25, y + 0.34);
    s.addText(q, { x: 7.95, y: y + 0.17, w: 4.4, h: 0.5, fontFace: H, fontSize: 23, bold: true, color: C.ink });
    s.addText(sub, { x: 7.95, y: y + 0.66, w: 4.4, h: 0.35, fontFace: M, fontSize: 14, color: "6A6A6A" });
  });
  s.addText("先讓學生自由說，教師只記錄、不糾正。", { x: 7.0, y: 6.45, w: 5.7, h: 0.4, fontFace: M, fontSize: 14, color: "7A756B" });
  pageNo(s, 2, false);
  s.addNotes("【引起動機 5 分】請 2–3 位學生上台指認。學生說錯也沒關係，先把所有答案寫在黑板上，後面再回頭修正。");
}

// ═════════ 3 六大構造總覽 ═════════
{
  const s = lightSlide("總概念");
  title(s, "六個基本構造", { size: 38 });
  const items = [
    ["根", "吸收水分與礦物質", "1"],
    ["莖", "支持植物、運送養分", "2"],
    ["葉", "製造植物需要的養分", "3"],
    ["花", "傳粉，產生種子", "4"],
    ["果實", "保護種子、幫助傳播", "5"],
    ["種子", "長成新的植物", "6"],
  ];
  items.forEach(([name, desc, n], i) => {
    const x = 0.6 + (i % 3) * 4.0, y = 1.95 + Math.floor(i / 3) * 2.05;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 3.72, h: 1.8, rectRadius: 0.14, fill: { color: "FFFFFF" }, line: { color: C.line, width: 1 } });
    numDot(s, n, x + 0.24, y + 0.24, 0.5, i < 3 ? GREEN : A);
    s.addText(name, { x: x + 0.88, y: y + 0.2, w: 2.6, h: 0.6, fontFace: H, fontSize: 25, bold: true, color: C.ink });
    s.addText(desc, { x: x + 0.26, y: y + 0.9, w: 3.2, h: 0.7, fontFace: M, fontSize: 15, color: "4A4A4A" });
  });
  s.addText("先記住名字和位置，功能等一下一個一個拆開來看。", { x: 0.65, y: 6.15, w: 11.8, h: 0.5, fontFace: M, fontSize: 17, color: "6A6A6A" });
  pageNo(s, 3, false);
  s.addNotes("【總覽 7 分】帶學生數 1–6，建立完整架構。可配合第 4 頁動畫。");
}

// ═════════ 4 🎬 六大構造動畫 ═════════
{
  const s = lightSlide("總概念・動畫");
  title(s, "植物的身體大搜查", { size: 36 });
  video(s, "p04", 0.6, 1.95, 8.0);
  const steps = [
    ["①", "根在土裡，莖往上長"],
    ["②", "葉子向著光，花開在頂端"],
    ["③", "果實和種子藏在花的身旁"],
  ];
  steps.forEach(([n, t], i) => {
    s.addText(n, { x: 9.0, y: 2.15 + i * 1.35, w: 0.5, h: 0.5, fontFace: H, fontSize: 22, bold: true, color: A });
    s.addText(t, { x: 9.55, y: 2.12 + i * 1.35, w: 3.35, h: 1.0, fontFace: M, fontSize: 17, color: C.ink, valign: "top" });
  });
  s.addText("六個構造，各司其職。", { x: 9.0, y: 6.15, w: 3.9, h: 0.5, fontFace: H, fontSize: 21, bold: true, color: A });
  pageNo(s, 4, false);
  s.addNotes("播放動畫（12 秒，含旁白）。邊播邊指：「這個是根、這個是莖……」。播完再請學生複誦一次六個名稱。");
}

// ═════════ 5 分類 ═════════
{
  const s = lightSlide("分類");
  title(s, "分成兩組，更好記", { size: 38 });
  // 營養器官
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 1.95, w: 5.9, h: 4.1, rectRadius: 0.16, fill: { color: "FFFFFF" }, line: { color: GREEN, width: 2 } });
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 1.95, w: 5.9, h: 0.95, rectRadius: 0.16, fill: { color: GREEN }, line: { color: GREEN } });
  s.addText("營養器官", { x: 0.9, y: 2.08, w: 3.4, h: 0.65, fontFace: H, fontSize: 26, bold: true, color: "FFFFFF" });
  s.addText("讓植物活下去", { x: 3.75, y: 2.2, w: 2.5, h: 0.5, fontFace: M, fontSize: 16, color: "EAF5E8", align: "right" });
  [["根", "吸水、固定"], ["莖", "支持、運送"], ["葉", "製造養分"]].forEach(([n, f], i) => {
    const y = 3.15 + i * 0.92;
    numDot(s, i + 1, 1.0, y + 0.08, 0.5, GREEN);
    s.addText(n, { x: 1.68, y: y, w: 1.4, h: 0.6, fontFace: H, fontSize: 24, bold: true, color: C.ink });
    s.addText(f, { x: 3.0, y: y + 0.06, w: 3.2, h: 0.5, fontFace: M, fontSize: 17, color: "4A4A4A" });
  });
  // 生殖器官
  s.addShape(pptx.ShapeType.roundRect, { x: 6.83, y: 1.95, w: 5.9, h: 4.1, rectRadius: 0.16, fill: { color: "FFFFFF" }, line: { color: A, width: 2 } });
  s.addShape(pptx.ShapeType.roundRect, { x: 6.83, y: 1.95, w: 5.9, h: 0.95, rectRadius: 0.16, fill: { color: A }, line: { color: A } });
  s.addText("生殖器官", { x: 7.13, y: 2.08, w: 3.4, h: 0.65, fontFace: H, fontSize: 26, bold: true, color: "FFFFFF" });
  s.addText("讓植物有下一代", { x: 9.98, y: 2.2, w: 2.5, h: 0.5, fontFace: M, fontSize: 16, color: "FFF0E6", align: "right" });
  [["花", "傳粉"], ["果實", "保護種子"], ["種子", "繁殖"]].forEach(([n, f], i) => {
    const y = 3.15 + i * 0.92;
    numDot(s, i + 4, 7.23, y + 0.08, 0.5, A);
    s.addText(n, { x: 7.91, y: y, w: 1.6, h: 0.6, fontFace: H, fontSize: 24, bold: true, color: C.ink });
    s.addText(f, { x: 9.35, y: y + 0.06, w: 3.1, h: 0.5, fontFace: M, fontSize: 17, color: "4A4A4A" });
  });
  s.addText("口訣：根莖葉顧自己，花果種子顧下一代。", { x: 0.65, y: 6.35, w: 11.8, h: 0.5, fontFace: H, fontSize: 19, bold: true, color: C.ink });
  pageNo(s, 5, false);
  s.addNotes("【關鍵頁】用「顧自己／顧下一代」幫助記憶。請學生用手比出 3 和 3。");
}

// ═════════ 6 根 ═════════
{
  const s = lightSlide("構造 1・根");
  title(s, "根：植物的嘴巴和爪子", { size: 36 });
  // 鬚根
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 2.0, w: 5.4, h: 2.35, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: C.line, width: 1 } });
  s.addText("鬚根", { x: 0.9, y: 2.15, w: 2.0, h: 0.45, fontFace: H, fontSize: 21, bold: true, color: GREEN });
  s.addText("像鬍鬚，一叢一叢（例：蔥、稻）", { x: 0.9, y: 2.6, w: 3.0, h: 0.6, fontFace: M, fontSize: 13.5, color: "5A5A5A" });
  for (let i = 0; i < 7; i++) {
    line(s, 4.55, 3.0, 3.85 + i * 0.22, 4.05, GOLD, 2.5);
  }
  // 軸根
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 4.55, w: 5.4, h: 2.05, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: C.line, width: 1 } });
  s.addText("軸根", { x: 0.9, y: 4.7, w: 2.0, h: 0.45, fontFace: H, fontSize: 21, bold: true, color: GOLD });
  s.addText("有一條明顯主根（例：蘿蔔、胡蘿蔔）", { x: 0.9, y: 5.15, w: 3.0, h: 0.6, fontFace: M, fontSize: 13.5, color: "5A5A5A" });
  s.addShape(pptx.ShapeType.roundRect, { x: 4.45, y: 4.95, w: 0.34, h: 1.3, rectRadius: 0.15, fill: { color: GOLD }, line: { color: GOLD } });
  line(s, 4.5, 5.55, 4.1, 5.9, GOLD, 2.5);
  line(s, 4.72, 5.75, 5.1, 6.05, GOLD, 2.5);

  // 右側功能
  const fns = [
    ["吸收", "水分與礦物質從根毛進入植物"],
    ["固定", "把植物牢牢抓住，不被風吹倒"],
    ["儲存", "有些根會儲存養分（如蘿蔔）"],
  ];
  fns.forEach(([h, b], i) => {
    const y = 2.05 + i * 1.5;
    numDot(s, i + 1, 6.5, y + 0.28, 0.46, GREEN);
    s.addText(h, { x: 7.12, y: y + 0.02, w: 2.0, h: 0.5, fontFace: H, fontSize: 21, bold: true, color: C.ink });
    s.addText(b, { x: 7.12, y: y + 0.52, w: 5.5, h: 0.5, fontFace: M, fontSize: 15, color: "4A4A4A" });
  });
  s.addShape(pptx.ShapeType.roundRect, { x: 6.45, y: 6.45, w: 6.2, h: 0.55, rectRadius: 0.1, fill: { color: "FFF0E6" }, line: { color: A, width: 1 } });
  s.addText("根毛又細又多，讓吸收表面積變大。", { x: 6.65, y: 6.52, w: 5.9, h: 0.4, fontFace: M, fontSize: 14.5, color: A });
  pageNo(s, 6, false);
  s.addNotes("拿出連根小植物讓學生觀察。提問：「把根剪掉會怎樣？」引導說出吸水與固定。");
}

// ═════════ 7 🎬 根吸水 ═════════
{
  const s = lightSlide("構造 1・動畫");
  title(s, "根怎麼吸水？", { size: 36 });
  video(s, "p06", 0.6, 1.95, 8.0);
  s.addText("看動畫，找三件事", { x: 9.0, y: 1.95, w: 3.9, h: 0.45, fontFace: H, fontSize: 20, bold: true, color: A });
  const qs = ["① 水從哪裡進入根？", "② 根毛有什麼作用？", "③ 水接下來往哪裡去？"];
  qs.forEach((q, i) => {
    s.addText(q, { x: 9.0, y: 2.55 + i * 0.95, w: 3.9, h: 0.8, fontFace: M, fontSize: 16.5, color: C.ink, valign: "top" });
  });
  s.addText("答案：根毛 → 根 → 莖 → 葉", { x: 9.0, y: 5.9, w: 3.9, h: 0.7, fontFace: H, fontSize: 17, bold: true, color: A });
  pageNo(s, 7, false);
  s.addNotes("播放動畫（12 秒，含旁白）。第一次完整播；第二次在 4 秒與 9 秒暫停，讓學生回答上面的三個問題。");
}

// ═════════ 8 莖 ═════════
{
  const s = lightSlide("構造 2・莖");
  title(s, "莖：植物的骨架和輸送管", { size: 34 });
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 1.95, w: 5.2, h: 2.2, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: C.line, width: 1 } });
  s.addText("草莖", { x: 0.9, y: 2.1, w: 2.0, h: 0.45, fontFace: H, fontSize: 21, bold: true, color: GREEN });
  s.addText("柔軟、容易彎曲（例：蔥、酢漿草）", { x: 0.9, y: 2.55, w: 4.4, h: 0.6, fontFace: M, fontSize: 13.5, color: "5A5A5A" });
  for (let i = 0; i < 4; i++) line(s, 1.15 + i * 0.9, 3.35, 1.5 + i * 0.9, 3.85, GREEN, 4);
  s.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 4.35, w: 5.2, h: 2.25, rectRadius: 0.12, fill: { color: "FFFFFF" }, line: { color: C.line, width: 1 } });
  s.addText("木莖", { x: 0.9, y: 4.5, w: 2.0, h: 0.45, fontFace: H, fontSize: 21, bold: true, color: GOLD });
  s.addText("堅硬、有樹皮（例：樟樹、榕樹）", { x: 0.9, y: 4.95, w: 4.4, h: 0.6, fontFace: M, fontSize: 13.5, color: "5A5A5A" });
  s.addShape(pptx.ShapeType.roundRect, { x: 1.2, y: 5.55, w: 0.5, h: 0.85, fill: { color: "8A5A2B" }, line: { color: "6B4420" } });
  s.addShape(pptx.ShapeType.ellipse, { x: 3.1, y: 5.5, w: 1.9, h: 0.9, fill: { color: "D9C7A7" }, line: { color: "8A5A2B", width: 2 } });
  s.addText("年輪", { x: 3.2, y: 5.72, w: 1.7, h: 0.4, fontFace: M, fontSize: 13, color: "6B4420", align: "center" });

  const fns = [
    ["支持", "把葉子和花撐高，爭取陽光"],
    ["運輸", "把水和養分送到植物全身"],
    ["節", "莖上長葉子的地方，會留下節"],
  ];
  fns.forEach(([h, b], i) => {
    const y = 2.0 + i * 1.5;
    numDot(s, i + 1, 6.35, y + 0.28, 0.46, TEAL);
    s.addText(h, { x: 6.97, y: y + 0.02, w: 2.2, h: 0.5, fontFace: H, fontSize: 21, bold: true, color: C.ink });
    s.addText(b, { x: 6.97, y: y + 0.52, w: 5.7, h: 0.5, fontFace: M, fontSize: 15, color: "4A4A4A" });
  });
  s.addText("小實驗：把芹菜泡在紅墨水中，看看哪個部位被染色了？", { x: 6.3, y: 6.5, w: 6.4, h: 0.5, fontFace: M, fontSize: 14, color: A });
  pageNo(s, 8, false);
  s.addNotes("展示事先泡過紅墨水的芹菜切面，讓學生看見莖內的通道。強調「節」的位置。");
}

// ═════════ 9 🎬 莖運輸 ═════════
{
  const s = lightSlide("構造 2・動畫");
  title(s, "莖裡的運輸通道", { size: 36 });
  video(s, "p08", 0.6, 1.95, 8.0);
  s.addText("兩種方向，兩種任務", { x: 9.0, y: 1.95, w: 3.9, h: 0.45, fontFace: H, fontSize: 20, bold: true, color: A });
  s.addText("水分往上", { x: 9.0, y: 2.7, w: 3.9, h: 0.5, fontFace: H, fontSize: 24, bold: true, color: BLUE });
  s.addText("從根吸上來，送到葉子", { x: 9.0, y: 3.2, w: 3.9, h: 0.7, fontFace: M, fontSize: 15.5, color: C.ink });
  s.addText("養分往下", { x: 9.0, y: 4.25, w: 3.9, h: 0.5, fontFace: H, fontSize: 24, bold: true, color: A });
  s.addText("葉子製造後，送到根和果實", { x: 9.0, y: 4.75, w: 3.9, h: 0.7, fontFace: M, fontSize: 15.5, color: C.ink });
  s.addText("莖＝高速公路", { x: 9.0, y: 5.9, w: 3.9, h: 0.5, fontFace: H, fontSize: 20, bold: true, color: TEAL });
  pageNo(s, 9, false);
  s.addNotes("播放動畫（12 秒，含旁白）。暫停在 6 秒，問：「藍色和橘色的點，方向有一樣嗎？」");
}

// ═════════ 10 葉 ═════════
{
  const s = lightSlide("構造 3・葉");
  title(s, "葉：植物的廚房", { size: 38 });
  // 葉片示意
  s.addShape(pptx.ShapeType.ellipse, { x: 1.0, y: 2.25, w: 4.3, h: 2.6, fill: { color: "6FBF5A" }, line: { color: "3F8F4A", width: 2 }, rotate: -12 });
  line(s, 1.25, 3.9, 4.95, 3.1, "2F6B1B", 3);
  for (let i = 0; i < 5; i++) {
    const t = 0.18 + i * 0.16;
    line(s, 1.25 + 3.7 * t, 3.9 - 0.8 * t, 1.25 + 3.7 * t + 0.35, 3.9 - 0.8 * t - 0.55, "2F6B1B", 1.5);
    line(s, 1.25 + 3.7 * t, 3.9 - 0.8 * t, 1.25 + 3.7 * t + 0.3, 3.9 - 0.8 * t + 0.55, "2F6B1B", 1.5);
  }
  line(s, 1.25, 3.9, 0.55, 4.4, "2F6B1B", 6);
  s.addText("葉片", { x: 3.0, y: 2.1, w: 1.6, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: "2F6B1B" });
  s.addText("葉脈", { x: 3.6, y: 4.55, w: 1.6, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: "2F6B1B" });
  s.addText("葉柄", { x: 0.35, y: 4.55, w: 1.4, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: "2F6B1B" });

  infoCard(s, 6.3, 1.95, 6.4, 1.7, "光合作用", "陽光 + 水 + 二氧化碳 → 養分 + 氧氣", GREEN);
  infoCard(s, 6.3, 3.8, 6.4, 1.45, "葉脈", "輸送水分，也撐住葉片（網狀脈／平行脈）", TEAL);
  infoCard(s, 6.3, 5.4, 6.4, 1.35, "葉形大不同", "仙人掌的針狀葉可以減少水分蒸散", GOLD);
  pageNo(s, 10, false);
  s.addNotes("三年級只說「製造養分」，不深入葉綠素與光反應。用廚房比喻：陽光當火、水當食材。");
}

// ═════════ 11 第一節小結 ═════════
{
  const s = darkSlide("第一節小結");
  s.addText("這三個，讓植物活下去", { x: 0.9, y: 1.2, w: 11.5, h: 0.8, fontFace: H, fontSize: 42, bold: true, color: C.darkInk });
  const items = [["根", "吸水", "吸收水分與礦物質"], ["莖", "運送", "支持並輸送水分養分"], ["葉", "製造", "行光合作用製造養分"]];
  items.forEach(([n, v, d], i) => {
    const x = 0.9 + i * 3.95;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 2.5, w: 3.55, h: 3.1, rectRadius: 0.16, fill: { color: "1E1E1E" }, line: { color: C.accent, width: 2 } });
    s.addText(n, { x, y: 2.72, w: 3.55, h: 0.8, fontFace: H, fontSize: 40, bold: true, color: C.darkInk, align: "center" });
    s.addText(v, { x, y: 3.55, w: 3.55, h: 0.7, fontFace: H, fontSize: 30, bold: true, color: C.accent, align: "center" });
    s.addText(d, { x: x + 0.25, y: 4.35, w: 3.05, h: 1.0, fontFace: M, fontSize: 15, color: "B9B4A9", align: "center" });
  });
  s.addText("合稱：營養器官", { x: 0.9, y: 5.95, w: 11.5, h: 0.7, fontFace: H, fontSize: 30, bold: true, color: C.darkInk, align: "center" });
  s.addNotes("【第一節收尾 3 分】全班齊念：根吸水、莖運送、葉製造。預告下一節要認識「顧下一代」的三個構造。");
}

// ═════════ 12 過渡 ═════════
{
  const s = darkSlide(null);
  s.addText("第二節", { x: 0.9, y: 1.6, w: 11.5, h: 0.6, fontFace: M, fontSize: 22, color: C.accent });
  s.addText("花・果實・種子", { x: 0.9, y: 2.2, w: 11.5, h: 1.2, fontFace: H, fontSize: 62, bold: true, color: C.darkInk });
  s.addText("植物活下來之後，然後呢？", { x: 0.9, y: 3.75, w: 11.5, h: 0.8, fontFace: H, fontSize: 30, color: "D8D3C7" });
  line(s, 0.95, 4.8, 4.6, 4.8, C.accent, 4);
  s.addText("這三個構造的任務不是讓自己活著，而是讓下一代出現。", { x: 0.9, y: 5.05, w: 10.5, h: 0.7, fontFace: M, fontSize: 18, color: "9A948A" });
  s.addNotes("【複習 3 分】先三秒回顧根莖葉，再抛出「然後呢？」。");
}

// ═════════ 13 花 ═════════
{
  const s = lightSlide("構造 4・花");
  title(s, "花：植物的繁殖工廠", { size: 36 });
  // 花示意
  const cx = 3.55, cy = 4.0;
  for (let i = 0; i < 6; i++) {
    const ang = (i * Math.PI) / 3;
    const px = cx + Math.sin(ang) * 0.72;
    const py = cy - Math.cos(ang) * 0.72;
    s.addShape(pptx.ShapeType.ellipse, { x: px - 0.33, y: py - 0.55, w: 0.66, h: 1.1,
      fill: { color: "FFB03A" }, line: { color: A, width: 1 }, rotate: i * 60 });
  }
  s.addShape(pptx.ShapeType.ellipse, { x: cx - 0.33, y: cy - 0.33, w: 0.66, h: 0.66, fill: { color: A }, line: { color: A } });
  s.addText("花瓣", { x: 0.55, y: 2.15, w: 1.4, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: A });
  s.addText("花萼", { x: 0.35, y: 5.15, w: 1.4, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: GREEN });
  s.addText("雄蕊", { x: 5.55, y: 2.6, w: 1.4, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: GOLD });
  s.addText("雌蕊", { x: 5.55, y: 5.0, w: 1.4, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: TEAL });
  line(s, 1.75, 2.4, cx - 0.05, cy - 1.1, A, 1.5);
  line(s, 1.55, 5.2, cx - 0.25, cy + 1.0, GREEN, 1.5);
  line(s, 5.5, 2.85, cx + 0.85, cy - 0.6, GOLD, 1.5);
  line(s, 5.5, 5.05, cx + 0.55, cy + 0.6, TEAL, 1.5);

  infoCard(s, 7.1, 1.95, 5.6, 1.55, "花瓣＋花萼", "保護花裡面的生殖構造，也吸引昆蟲", A);
  infoCard(s, 7.1, 3.65, 5.6, 1.55, "雄蕊＋雌蕊", "雄蕊的花粉傳到雌蕊，才會結出果實", GOLD);
  infoCard(s, 7.1, 5.35, 5.6, 1.35, "花是生殖器官", "花謝了不是結束，而是果實與種子的開始", TEAL);
  pageNo(s, 13, false);
  s.addNotes("拿朱槿或百合讓學生用鑷子找雄蕊、雌蕊。強調「花色和香味是為了吸引昆蟲」。");
}

// ═════════ 14 🎬 花→果實→種子 ═════════
{
  const s = lightSlide("構造 4・5・6・動畫");
  title(s, "從花到種子", { size: 36 });
  video(s, "p13", 0.6, 1.95, 8.0);
  s.addText("看動畫，注意三件事", { x: 9.0, y: 1.95, w: 3.9, h: 0.45, fontFace: H, fontSize: 20, bold: true, color: A });
  const qs = ["① 花謝了以後，哪個部位變大？", "② 種子藏在哪裡？", "③ 種子最後會變成什麼？"];
  qs.forEach((q, i) => {
    s.addText(q, { x: 9.0, y: 2.55 + i * 1.05, w: 3.9, h: 0.9, fontFace: M, fontSize: 16, color: C.ink, valign: "top" });
  });
  s.addText("花 → 果實 → 種子 → 新植物", { x: 9.0, y: 6.0, w: 3.9, h: 0.6, fontFace: H, fontSize: 16, bold: true, color: A });
  pageNo(s, 14, false);
  s.addNotes("播放動畫（15 秒，含旁白）。在 6 秒與 12 秒各暫停一次，讓學生預測下一個畫面。");
}

// ═════════ 15 果實 ═════════
{
  const s = lightSlide("構造 5・果實");
  title(s, "果實：種子的保護箱", { size: 36 });
  s.addShape(pptx.ShapeType.ellipse, { x: 0.85, y: 2.0, w: 1.5, h: 1.5, fill: { color: A }, line: { color: "C24E10", width: 2 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 1.85, y: 1.8, w: 0.75, h: 0.34, fill: { color: "5FB33F" }, line: { color: "3F8F4A" }, rotate: -30 });
  s.addShape(pptx.ShapeType.ellipse, { x: 1.25, y: 3.25, w: 0.3, h: 0.3, fill: { color: "D9B44A" }, line: { color: "8A6D1F" } });
  s.addShape(pptx.ShapeType.ellipse, { x: 1.65, y: 3.45, w: 0.3, h: 0.3, fill: { color: "D9B44A" }, line: { color: "8A6D1F" } });
  s.addText("番茄（果實）裡藏著種子", { x: 0.6, y: 4.0, w: 3.2, h: 0.5, fontFace: M, fontSize: 14, color: "5A5A5A" });

  infoCard(s, 4.3, 1.95, 3.0, 2.0, "保護", "果實包住種子，避免被撞壞、曬壞", A);
  infoCard(s, 4.3, 4.2, 3.0, 2.0, "傳播", "讓種子離媽媽遠一點，減少競爭", TEAL);
  infoCard(s, 7.6, 1.95, 5.1, 4.25, "果實怎麼旅行？", "風：蒲公英、楓樹\n水：椰子\n動物：鬼針草、漿果\n\n被吃掉、被帶走、被風吹走，都是幫種子找新家。", GOLD);
  pageNo(s, 15, false);
  s.addNotes("切開番茄／芭樂觀察種子位置。提醒：我們吃的水果多半是果實，但果實不等於水果（例如稻穀也是果實）。");
}

// ═════════ 16 種子 ═════════
{
  const s = lightSlide("構造 6・種子");
  title(s, "種子：下一株植物的起點", { size: 34 });
  // 種子剖面
  s.addShape(pptx.ShapeType.ellipse, { x: 1.0, y: 2.5, w: 2.8, h: 2.0, fill: { color: "D9B44A" }, line: { color: "8A6D1F", width: 2 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 1.45, y: 2.9, w: 1.9, h: 1.2, fill: { color: "F0DCA0" }, line: { color: "B8963F", width: 1 } });
  s.addText("種皮", { x: 1.05, y: 4.6, w: 1.2, h: 0.4, fontFace: H, fontSize: 16, bold: true, color: "8A6D1F" });
  s.addText("胚（下一代的小植物）", { x: 1.9, y: 3.35, w: 2.4, h: 0.4, fontFace: M, fontSize: 13, color: "6B5420" });
  s.addText("種子＝種皮＋胚＋養分", { x: 0.8, y: 5.25, w: 3.5, h: 0.5, fontFace: H, fontSize: 16, bold: true, color: C.ink });

  // 發芽三條件
  const conds = [["水", "泡水的棉花"], ["空氣", "透氣的土壤"], ["適溫", "室溫，不冰不熱"]];
  conds.forEach(([n, d], i) => {
    const x = 4.85 + i * 2.75;
    s.addShape(pptx.ShapeType.ellipse, { x, y: 2.35, w: 1.15, h: 1.15, fill: { color: i === 0 ? BLUE : i === 1 ? TEAL : A }, line: { color: "FFFFFF", width: 2 } });
    s.addText(n, { x, y: 2.55, w: 1.15, h: 0.75, fontFace: H, fontSize: 24, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
    s.addText(d, { x: x - 0.25, y: 3.6, w: 1.65, h: 0.6, fontFace: M, fontSize: 13, color: "5A5A5A", align: "center" });
  });
  s.addText("三個條件缺一不可", { x: 4.85, y: 4.45, w: 8.0, h: 0.5, fontFace: H, fontSize: 20, bold: true, color: C.ink });
  s.addText("想想看：把綠豆放在乾棉花、泡水棉花、冰箱裡，哪一個會發芽？為什麼？", { x: 4.85, y: 5.25, w: 7.8, h: 1.1, fontFace: M, fontSize: 15.5, color: "4A4A4A" });
  pageNo(s, 16, false);
  s.addNotes("發綠豆與黃豆讓學生觀察種皮與種臍。發芽實驗可作為課後延伸。");
}

// ═════════ 17 總整理 ═════════
{
  const s = lightSlide("整理");
  title(s, "六個構造，一次整理", { size: 36 });
  const head = { fill: { color: C.ink }, color: "FFFFFF", fontFace: H, fontSize: 16, bold: true, align: "center" };
  const cell = (t, color) => ({ text: t, options: { fontFace: M, fontSize: 15, color: color || C.ink, align: "center", valign: "middle" } });
  s.addTable([
    [{ text: "構造", options: head }, { text: "分類", options: head }, { text: "主要功能", options: head }, { text: "生活例子", options: head }],
    [cell("根", GREEN), cell("營養器官", GREEN), cell("吸收水分與礦物質、固定"), cell("蘿蔔、蔥")],
    [cell("莖", GREEN), cell("營養器官", GREEN), cell("支持、運輸水分與養分"), cell("芹菜、樟樹")],
    [cell("葉", GREEN), cell("營養器官", GREEN), cell("光合作用、製造養分"), cell("高麗菜、仙人掌")],
    [cell("花", A), cell("生殖器官", A), cell("傳粉、產生種子"), cell("朱槿、百合")],
    [cell("果實", A), cell("生殖器官", A), cell("保護種子、幫助傳播"), cell("番茄、蒲公英")],
    [cell("種子", A), cell("生殖器官", A), cell("繁殖下一代"), cell("綠豆、黃豆")],
  ], {
    x: 0.7, y: 1.95, w: 11.9, colW: [1.7, 2.5, 4.6, 3.1], rowH: 0.62,
    border: { type: "solid", pt: 1, color: C.line },
  });
  s.addText("看出來了嗎？前三列是「顧自己」，後三列是「顧下一代」。", { x: 0.7, y: 6.35, w: 11.9, h: 0.5, fontFace: M, fontSize: 16, color: "5A5A5A" });
  pageNo(s, 17, false);
  s.addNotes("【統整 8 分】發下分類表學習單，讓學生先自己填，再小組互查。");
}

// ═════════ 18 迷思澄清 ═════════
{
  const s = lightSlide("迷思澄清");
  title(s, "三個常見誤解", { size: 36 });
  const myths = [
    ["根只是把植物抓住", "根毛會吸收水分與礦物質"],
    ["莖只是一根柱子", "莖裡有通道，負責運送"],
    ["花只是好看", "花是生殖器官，會結成果實和種子"],
  ];
  myths.forEach(([bad, good], i) => {
    const y = 2.0 + i * 1.55;
    s.addShape(pptx.ShapeType.roundRect, { x: 0.7, y, w: 5.6, h: 1.3, rectRadius: 0.1, fill: { color: "F3EDE7" }, line: { color: "D9C7B8", width: 1 } });
    s.addText("✕", { x: 0.95, y: y + 0.3, w: 0.5, h: 0.6, fontFace: H, fontSize: 24, bold: true, color: "B03A2E" });
    s.addText(bad, { x: 1.55, y: y + 0.35, w: 4.5, h: 0.6, fontFace: M, fontSize: 17, color: "6A5A50" });
    s.addText("→", { x: 6.5, y: y + 0.35, w: 0.6, h: 0.6, fontFace: H, fontSize: 24, bold: true, color: A, align: "center" });
    s.addShape(pptx.ShapeType.roundRect, { x: 7.2, y, w: 5.4, h: 1.3, rectRadius: 0.1, fill: { color: "EAF5E8" }, line: { color: "B7D8B0", width: 1 } });
    s.addText("✓", { x: 7.42, y: y + 0.3, w: 0.5, h: 0.6, fontFace: H, fontSize: 22, bold: true, color: GREEN });
    s.addText(good, { x: 7.98, y: y + 0.35, w: 4.4, h: 0.6, fontFace: H, fontSize: 16, color: "2F5D2A" });
  });
  s.addText("看到「只是……」的說法，先停下來想一想。", { x: 0.7, y: 6.75, w: 11.8, h: 0.4, fontFace: M, fontSize: 15, color: "7A756B" });
  pageNo(s, 18, false);
  s.addNotes("每張卡先讓學生舉手判斷對錯，再翻出正確說法。可請學生補充自己的例子。");
}

// ═════════ 19 隨堂測驗 ═════════
{
  const s = lightSlide("隨堂測驗");
  title(s, "10 題，挑戰植物小達人", { size: 36 });
  s.addText("到教學網頁的「隨堂測驗」作答；也可以由老師抽題，口頭快問快答。", {
    x: 0.7, y: 1.9, w: 11.9, h: 0.5, fontFace: M, fontSize: 17, color: "5A5A5A",
  });
  for (let i = 0; i < 10; i++) {
    const x = 0.95 + (i % 5) * 2.35;
    const y = 2.85 + Math.floor(i / 5) * 1.75;
    s.addShape(pptx.ShapeType.ellipse, {
      x, y, w: 1.05, h: 1.05,
      fill: { color: i % 2 === 0 ? "EAF5E8" : "FFF0E6" },
      line: { color: i % 2 === 0 ? GREEN : A, width: 2 },
    });
    s.addText(String(i + 1), {
      x, y, w: 1.05, h: 1.05, fontFace: H, fontSize: 30, bold: true,
      color: i % 2 === 0 ? GREEN : A, align: "center", valign: "middle",
    });
  }
  s.addText("答對 8 題以上：植物小達人！", { x: 0.7, y: 6.5, w: 11.9, h: 0.45, fontFace: H, fontSize: 20, bold: true, color: C.ink });
  pageNo(s, 19, false);
  s.addNotes(
    "答案：1 根｜2 葉｜3 支持並運送｜4 陽光、水、空氣｜5 蘿蔔｜6 傳粉並產生種子｜" +
    "7 保護種子｜8 陽光｜9 花、果實、種子｜10 風。\n" +
    "用法：可用網頁的抽籤工具抽號碼，抽到的學生答一題；或用網頁測驗讓全班即時作答。"
  );
}

// ═════════ 20 行動 ═════════
{
  const s = darkSlide("行動");
  s.addText("換你當植物偵探", { x: 0.9, y: 1.1, w: 11.5, h: 0.9, fontFace: H, fontSize: 46, bold: true, color: C.darkInk });
  const tasks = [
    ["①", "找一株植物，畫下它的六個構造"],
    ["②", "觀察它的根，是鬚根還是軸根？"],
    ["③", "猜猜看：它的果實或種子怎麼旅行？"],
  ];
  tasks.forEach(([n, t], i) => {
    s.addText(n, { x: 0.9, y: 2.55 + i * 1.25, w: 0.6, h: 0.6, fontFace: H, fontSize: 26, bold: true, color: C.accent });
    s.addText(t, { x: 1.6, y: 2.5 + i * 1.25, w: 10.8, h: 0.8, fontFace: M, fontSize: 24, color: C.darkInk });
  });
  s.addText("完成後，用一句話向大家介紹你的植物。", { x: 0.9, y: 6.35, w: 11.5, h: 0.5, fontFace: M, fontSize: 17, color: "9A948A" });
  pageNo(s, 20, true);
  s.addNotes("【行動 5 分】可作為課後作業。句型提示：「這是＿＿，它的＿＿可以＿＿。」");
}

// ═════════ 21 總結 ═════════
{
  const s = darkSlide("總結");
  s.addText("帶走一句話", { x: 0.9, y: 1.15, w: 11.5, h: 0.55, fontFace: M, fontSize: 20, color: C.accent });
  s.addText("根吸水、莖運送、葉製造，", { x: 0.9, y: 1.9, w: 11.8, h: 0.85, fontFace: H, fontSize: 42, bold: true, color: C.darkInk });
  s.addText("花果種子繁衍下一代。", { x: 0.9, y: 2.8, w: 11.8, h: 0.85, fontFace: H, fontSize: 42, bold: true, color: C.darkInk });
  const chips = ["根", "莖", "葉", "花", "果實", "種子"];
  chips.forEach((t, i) => {
    const x = 0.9 + i * 1.95;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 4.4, w: 1.7, h: 0.72, rectRadius: 0.36, fill: { color: "1E1E1E" }, line: { color: i < 3 ? GREEN : C.accent, width: 2 } });
    s.addText(t, { x, y: 4.4, w: 1.7, h: 0.72, fontFace: H, fontSize: 19, bold: true, color: C.darkInk, align: "center", valign: "middle" });
  });
  s.addText("出口票：寫下一個構造＋它的功能。", { x: 0.9, y: 5.75, w: 11.5, h: 0.5, fontFace: M, fontSize: 17, color: "9A948A" });
  pageNo(s, 21, true);
  s.addNotes("【評量 3 分】發出口票小卡。全班齊念一次帶走一句話再下課。");
}

pptx.writeFile({ fileName: path.join(__dirname, "植物的構造和生長_教學簡報.pptx") })
  .then((f) => console.log("wrote", f));

