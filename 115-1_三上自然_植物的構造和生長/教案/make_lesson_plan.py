# -*- coding: utf-8 -*-
"""產生「植物的構造和生長」教案 .docx"""
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

DOC_PATH = r"C:\Users\rayi\Documents\自然科學教學專欄\115-1_三上自然_植物的構造和生長\教案\教案_植物的構造和生長.docx"

doc = Document()

# 版面
for s in doc.sections:
    s.top_margin = Cm(2)
    s.bottom_margin = Cm(2)
    s.left_margin = Cm(2.2)
    s.right_margin = Cm(2.2)

# 預設字型
style = doc.styles["Normal"]
style.font.name = "微軟正黑體"
style.font.size = Pt(11)
style.element.rPr.rFonts.set(qn("w:eastAsia"), "微軟正黑體")
style.paragraph_format.space_after = Pt(4)
style.paragraph_format.line_spacing = 1.25


def set_font(run, size=11, bold=False, color=None, name="微軟正黑體"):
    run.font.name = name
    run.font.size = Pt(size)
    run.font.bold = bold
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    if color:
        run.font.color.rgb = RGBColor.from_string(color)


def para(text="", size=11, bold=False, align=None, space_before=0, space_after=4, color=None):
    p = doc.add_paragraph()
    if align:
        p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    r = p.add_run(text)
    set_font(r, size, bold, color)
    return p


def heading(text, size=14):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run(text)
    set_font(r, size, True, "1F4E4A")
    # 左側色條
    pPr = p._p.get_or_add_pPr()
    pbdr = OxmlElement("w:pBdr")
    left = OxmlElement("w:left")
    left.set(qn("w:val"), "single")
    left.set(qn("w:sz"), "18")
    left.set(qn("w:space"), "6")
    left.set(qn("w:color"), "0E7C7B")
    pbdr.append(left)
    pPr.append(pbdr)
    return p


def bullet(text, size=11, bold_prefix=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(3)
    if bold_prefix:
        r = p.add_run(bold_prefix)
        set_font(r, size, True)
    r = p.add_run(text)
    set_font(r, size)
    return p


def shade(cell, color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), color)
    tcPr.append(shd)


def cell_text(cell, text, size=10, bold=False, align=None, color=None):
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    if align:
        p.alignment = align
    r = p.add_run(text)
    set_font(r, size, bold, color)


def make_table(headers, rows, widths=None, header_fill="0E7C7B", font_size=10):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    hdr = table.rows[0].cells
    for i, h in enumerate(headers):
        cell_text(hdr[i], h, font_size, True, WD_ALIGN_PARAGRAPH.CENTER, "FFFFFF")
        shade(hdr[i], header_fill)
    for row in rows:
        cells = table.add_row().cells
        for i, val in enumerate(row):
            cell_text(cells[i], str(val), font_size)
    if widths:
        tbl = table._tbl
        tblPr = tbl.tblPr
        layout = OxmlElement("w:tblLayout")
        layout.set(qn("w:type"), "fixed")
        tblPr.append(layout)
        for i, w in enumerate(widths):
            table.columns[i].width = Cm(w)
            for cell in table.columns[i].cells:
                cell.width = Cm(w)
    # 列不跨頁；表頭重複
    for idx, row in enumerate(table.rows):
        trPr = row._tr.get_or_add_trPr()
        cant = OxmlElement("w:cantSplit")
        trPr.append(cant)
        if idx == 0:
            th = OxmlElement("w:tblHeader")
            trPr.append(th)
    return table


# ── 標題 ──────────────────────────────────────────────
para("嘉義縣＿＿國小 115 學年度（上學期）教學教案", 11, False, WD_ALIGN_PARAGRAPH.CENTER, color="666666")
para("植物的構造和生長", 22, True, WD_ALIGN_PARAGRAPH.CENTER, 4, 2, "0E4C4A")
para("翰林版 自然科學 三年級上學期 第一單元", 12, False, WD_ALIGN_PARAGRAPH.CENTER, 0, 10, "555555")

# ── 一、基本資料 ──────────────────────────────────────
heading("一、基本資料")
make_table(
    ["項目", "內容", "項目", "內容"],
    [
        ["領域／科目", "自然科學", "教學年級", "國小三年級"],
        ["版本／單元", "翰林版 三上 第一單元\n植物的構造和生長", "教學節數", "2 節（80 分鐘）"],
        ["教學者", "＿＿＿＿＿", "教學日期", "＿＿年＿＿月＿＿日"],
        ["教學重點", "植物的六大構造、分類、特徵與功能", "教學資源", "教學簡報 21 頁（含 4 段旁白動畫）、教學網頁、植物實物、學習單"],
    ],
    widths=[3.2, 5.3, 2.8, 5.3],
)

# ── 二、設計理念 ──────────────────────────────────────
heading("二、設計理念")
para(
    "三年級學生對植物並不陌生，但多半停留在「看過」的層次，能用來描述與比較的詞彙有限。"
    "本單元把植物比喻成一座「會自己運作的工廠」：根是進料口、莖是輸送管、葉是製造車間、"
    "花是生產線、果實是保護箱、種子是下一座工廠的藍圖。透過實物觀察、動畫演示與分類操作，"
    "讓學生從「認得」進一步到「說得出功能」，並能將六大構造分成營養器官與生殖器官兩組。"
)

# ── 三、學習重點 ──────────────────────────────────────
heading("三、學習重點（108 課綱）")
para("【學習表現】", 11, True, space_before=2)
bullet("能在指導下觀察日常生活現象的規律性，並運用想像力與好奇心，了解及描述自然環境的現象。（ti-Ⅱ-1）")
bullet("能從日常經驗、學習活動、自然環境進行觀察，進而能察覺問題。（po-Ⅱ-1）")
bullet("能運用簡單分類、製作圖表等方法，整理已有的資訊或數據。（pa-Ⅱ-1）")
bullet("保持對自然現象的好奇心，透過不斷提問、探索與實作，感受發現的樂趣。（ai-Ⅱ-1）")
para("【學習內容】", 11, True, space_before=6)
bullet("植物的構造與功能：根、莖、葉、花、果實、種子。（INb-Ⅱ-6）")
bullet("植物的生長與繁殖：種子發芽、開花結果。（INb-Ⅱ-7）")

# ── 四、學習目標 ──────────────────────────────────────
heading("四、學習目標")
goals = [
    "能正確指認並說出植物六大構造的名稱：根、莖、葉、花、果實、種子。",
    "能將六大構造分成「營養器官」（根、莖、葉）與「生殖器官」（花、果實、種子）兩類。",
    "能說明各構造的主要功能：根吸收水分與礦物質、莖運輸與支持、葉製造養分、花／果實／種子繁衍後代。",
    "能觀察並比較生活中植物構造的差異，例如鬚根與軸根、草莖與木莖。",
    "能以分類表整理所學，並用一句話說明任一構造的功能。",
]
for i, g in enumerate(goals, 1):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(f"{i}. ")
    set_font(r, 11, True, "0E7C7B")
    r = p.add_run(g)
    set_font(r, 11)

# ── 五、教材與教具 ────────────────────────────────────
heading("五、教材與教具")
make_table(
    ["類別", "內容"],
    [
        ["數位教材", "教學簡報 21 頁（第 4、7、9、14 頁為有旁白動畫，每段 12–15 秒）＋教學網頁（簡報播放、10 題測驗、抽籤、計時器）"],
        ["植物實物", "連根小盆栽或雜草（根）、芹菜或康乃馨（莖）、各式葉片、朱槿或百合（花）、番茄或芭樂（果實）、綠豆與黃豆（種子）"],
        ["觀察工具", "放大鏡、透明杯、紅墨水（莖的染色觀察）、小刀（教師操作）"],
        ["學習單", "「植物六大構造分類表」學習單、出口票小卡"],
        ["圖卡", "六大構造圖卡、營養器官／生殖器官分類板"],
    ],
    widths=[3.2, 13.4],
)

# ── 六、教學流程 ──────────────────────────────────────
heading("六、教學流程")

para("第一節｜植物的身體：根、莖、葉（40 分鐘）", 12, True, space_before=6, color="0E7C7B")
make_table(
    ["時間", "教學活動與步驟", "教學重點", "教具／媒體", "評量"],
    [
        ["5 分\n引起動機",
         "1. 展示校園植物照片，問：「這株植物你認得哪些部位？」\n"
         "2. 請 2–3 位學生上台指認，教師先把學生說的部位寫在黑板。\n"
         "3. 提問：「植物和動物一樣有身體嗎？它的身體由哪些部分組成？」",
         "喚起舊經驗，製造認知缺口", "校園植物照片、黑板", "口頭發表"],
        ["7 分\n六大構造",
         "1. 播放簡報第 3 頁，帶學生數出六個構造：根、莖、葉、花、果實、種子。\n"
         "2. 播放第 4 頁動畫（12 秒），六個構造依序亮起，學生跟著複誦。\n"
         "3. 說明今天先認識「讓植物活下去」的三個構造。",
         "建立完整架構，先見林再見樹", "簡報 p3–p4、圖卡", "口頭複誦"],
        ["10 分\n根",
         "1. 發下帶根的小植物，用放大鏡觀察根的外形。\n"
         "2. 介紹鬚根（像鬍鬚，如蔥）與軸根（有一條主根，如蘿蔔）。\n"
         "3. 播放第 7 頁動畫（12 秒）：水分與礦物質經根毛進入根部。\n"
         "4. 提問：「如果把根剪掉，植物會怎樣？」引導說出吸收功能。",
         "根：固定植物、吸收水分與礦物質；根毛增加吸收面積", "小植物、放大鏡、簡報 p7", "觀察紀錄、口頭問答"],
        ["10 分\n莖",
         "1. 觀察芹菜莖的外形：節、葉痕；分辨草莖（柔軟）與木莖（堅硬）。\n"
         "2. 教師展示事先泡過紅墨水的芹菜切面，讓學生看見染色的通道。\n"
         "3. 播放第 9 頁動畫（12 秒）：水從莖往上運送到葉。\n"
         "4. 歸納：莖有支持與運輸兩種功能。",
         "莖：支持植物、運輸水分與養分", "芹菜、紅墨水、美工刀（教師）、簡報 p9", "觀察紀錄、小組討論"],
        ["5 分\n葉",
         "1. 觀察葉片：葉片、葉脈、葉柄三個部分。\n"
         "2. 說明葉是「製造養分」的地方，需要陽光、水和空氣。\n"
         "3. 比較不同植物的葉形與葉脈（網狀脈／平行脈）。",
         "葉：行光合作用、製造植物需要的養分", "各式葉片、簡報 p10", "口頭問答"],
        ["3 分\n小結",
         "1. 全班一起說一次：根吸水、莖運送、葉製造養分。\n"
         "2. 預告：這三個構造合稱「營養器官」，下一節還要認識三個「生殖器官」。",
         "收攏第一節，埋下第二節伏筆", "簡報 p11", "出口票（口頭）"],
    ],
    widths=[2.0, 7.4, 3.4, 2.2, 1.6],
    font_size=9,
)

doc.add_page_break()

para("第二節｜花、果實、種子與統整（40 分鐘）", 12, True, space_before=0, color="0E7C7B")
make_table(
    ["時間", "教學活動與步驟", "教學重點", "教具／媒體", "評量"],
    [
        ["3 分\n複習",
         "1. 三秒回顧：教師指圖卡，學生說出名稱與功能。\n"
         "2. 提問：「植物活下來之後，接下來要做什麼？」引出繁衍後代。",
         "銜接兩節課", "圖卡、簡報 p12", "口頭搶答"],
        ["8 分\n花",
         "1. 觀察朱槿或百合：花瓣、花萼、雄蕊、雌蕊。\n"
         "2. 說明花是生殖器官：雄蕊的花粉傳到雌蕊，才會結果實、長種子。\n"
         "3. 強調花不只是「好看」，好看是為了吸引昆蟲幫忙傳粉。",
         "花：生殖器官，負責傳粉與產生種子", "花朵實物、鑷子、簡報 p13", "觀察、口頭問答"],
        ["4 分\n動畫統整",
         "播放第 14 頁動畫（15 秒）：花謝後子房膨大成果實，果實裡有種子。\n"
         "播放時暫停兩次，問：「現在變成什麼？」「種子藏在哪裡？」",
         "建立「花→果實→種子」的連續概念", "簡報 p14", "口頭預測"],
        ["7 分\n果實",
         "1. 切開番茄／芭樂，觀察果實與種子的位置。\n"
         "2. 說明果實的功能：保護種子、協助種子傳播（風、水、動物）。\n"
         "3. 舉例：蒲公英靠風、椰子靠水、鬼針草靠動物。",
         "果實：保護種子、幫助傳播", "番茄、芭樂、小刀（教師）、簡報 p15", "觀察紀錄"],
        ["7 分\n種子",
         "1. 觀察綠豆與黃豆：種皮、外形、種臍。\n"
         "2. 說明種子裡有胚，發芽需要水、空氣和適宜的溫度。\n"
         "3. 情境判斷：「把綠豆放在冰箱、乾棉花、泡水棉花，哪一個會發芽？」",
         "種子：繁殖下一代；發芽需要水、空氣、適溫", "綠豆、黃豆、棉花、簡報 p16", "預測與說明"],
        ["6 分\n分類統整",
         "1. 完成「六大構造分類表」學習單：營養器官 vs 生殖器官。\n"
         "2. 迷思澄清（簡報 p18）：根只抓土？莖只是柱子？花只是好看？\n"
         "3. 小組互查，教師巡堂修正。",
         "把零散知識組織成可提取的結構", "學習單、簡報 p17–p18", "學習單評分"],
        ["5 分\n測驗與總結",
         "1. 隨堂測驗（簡報 p19）：學生到教學網頁作答 10 題，立即看分數與解析。\n"
         "2. 出口票：寫下「今天學到的一個構造＋它的功能」。\n"
         "3. 全班齊念帶走一句話：「根吸水、莖運送、葉製造，花果種子繁衍下一代。」",
         "確認學習遷移，收束單元", "教學網頁、出口票小卡、簡報 p21", "測驗分數、出口票"],
    ],
    widths=[2.0, 7.4, 3.4, 2.2, 1.6],
    font_size=9,
)

# ── 七、隨堂測驗 ──────────────────────────────────────
heading("七、隨堂測驗（10 題）")
para(
    "使用時機：第二節「分類統整」之後，或作為課後複習。可到教學網頁即時作答（自動計分與解析），"
    "也可列印紙本；教師可搭配網頁的抽籤工具抽號碼，抽到的學生回答一題。",
    10.5,
)
make_table(
    ["題號", "題目與選項", "答案", "解析"],
    [
        ["1", "植物用哪一個構造吸收水分和礦物質？\n(A) 根　(B) 莖　(C) 葉　(D) 花", "A", "根毛可增加吸收表面積。"],
        ["2", "下列哪一個屬於「營養器官」？\n(A) 花　(B) 果實　(C) 葉　(D) 種子", "C", "根、莖、葉合稱營養器官。"],
        ["3", "莖的主要功能是什麼？\n(A) 製造養分　(B) 吸收水分\n(C) 支持植物並運送養分　(D) 保護種子", "C", "莖有支持與運輸兩種功能。"],
        ["4", "葉子製造養分需要哪些條件？\n(A) 陽光、水、空氣　(B) 土壤、石頭、水\n(C) 月光、糖、鹽　(D) 風、沙、雨", "A", "光合作用需要陽光、水與二氧化碳。"],
        ["5", "下列哪一種植物的根是「軸根」？\n(A) 蔥　(B) 稻　(C) 蘿蔔　(D) 玉米", "C", "蘿蔔有一條明顯的主根。"],
        ["6", "花的主要功能是什麼？\n(A) 吸收水分　(B) 製造養分\n(C) 傳粉並產生種子　(D) 固定植物", "C", "花是生殖器官。"],
        ["7", "果實的主要功能是什麼？\n(A) 保護種子　(B) 吸收水分\n(C) 製造養分　(D) 支持植物", "A", "果實保護種子，也幫助傳播。"],
        ["8", "種子發芽不需要下列哪一項？\n(A) 水　(B) 空氣　(C) 適宜的溫度　(D) 陽光", "D", "發芽需要水、空氣與適溫；陽光不是必要條件。"],
        ["9", "下列哪一組全部都是生殖器官？\n(A) 根、莖、葉　(B) 花、果實、種子\n(C) 根、花、種子　(D) 莖、葉、果實", "B", "花、果實、種子與繁衍有關。"],
        ["10", "蒲公英的種子主要靠什麼傳播？\n(A) 風　(B) 水　(C) 動物的皮毛　(D) 自己走", "A", "蒲公英的種子有絨毛，可隨風飛。"],
    ],
    widths=[1.3, 8.6, 1.2, 5.5],
    font_size=9,
)

# ── 八、迷思澄清 ──────────────────────────────────────
heading("八、常見迷思與澄清")
make_table(
    ["學生常見想法", "為什麼會這樣想", "教學澄清"],
    [
        ["根只是把植物抓住，不喝水", "根埋在土裡看不到，課本圖片常只畫外形", "用染色水實驗與動畫，讓「吸水」變成看得見的過程；根毛增加吸收面積。"],
        ["莖只是一根柱子", "莖的外觀看起來只是支撐", "切開泡過紅墨水的芹菜，看見莖內的運輸通道；連結「水為什麼會跑到葉子」。"],
        ["花只是好看，跟繁殖無關", "花的美感經驗太強烈", "從「花謝了之後去哪裡」追問，帶到果實與種子；說明花色與香味是為了吸引傳粉者。"],
        ["果實就是我們吃的水果", "生活經驗把果實等同於水果", "用番茄、芭樂說明果實是「保護種子的構造」；不是所有果實都好吃。"],
        ["種子只要種下去就會發芽", "缺乏失敗經驗", "設計三種條件（乾、泡水、冰箱）讓學生預測與驗證，歸納發芽三條件。"],
    ],
    widths=[4.2, 5.4, 7.0],
    font_size=9,
)

# ── 八、評量 ──────────────────────────────────────────
heading("九、評量設計")
make_table(
    ["評量方式", "時機", "對應學習目標", "規準"],
    [
        ["口頭問答", "各活動進行中", "目標 1、3", "能說出構造名稱與至少一項功能"],
        ["觀察紀錄", "根、莖、果實、種子活動", "目標 4", "能記錄外形特徵與觀察到的現象"],
        ["分類表學習單", "第二節統整", "目標 2、5", "六項全部歸類正確，且能寫出功能"],
        ["隨堂測驗（10 題）", "第二節末（教學網頁）", "目標 1–3", "答對 8 題以上；錯題能說出正確概念"],
        ["出口票", "第二節結束", "目標 3、5", "能用完整句子寫出一個構造的功能"],
    ],
    widths=[3.4, 4.0, 3.6, 5.6],
    font_size=9,
)

# ── 九、差異化 ────────────────────────────────────────
heading("十、差異化與支援")
bullet("需要協助的學生：提供圖卡配對與句型提示（「＿＿可以＿＿」），允許以指認代替口述。", bold_prefix="")
bullet("學有餘力的學生：比較兩種植物的根、莖、葉差異，並嘗試推測功能與環境的關係。")
bullet("實物操作時採異質分組，讓學生輪流擔任觀察員、記錄員與發表員。")

# ── 十、課後延伸 ──────────────────────────────────────
heading("十一、課後延伸")
bullet("綠豆發芽觀察：連續五天記錄發芽情形，拍照上傳班級相簿。")
bullet("校園植物尋寶：找出三種不同的根或葉，畫下來並標註名稱。")
bullet("到教學網頁完成「隨堂測驗」10 題，挑戰滿分，並把錯題的解析抄進筆記。")
bullet("家庭訪問：訪問家人「你最喜歡吃植物的哪個部位？」（根／莖／葉／花／果實／種子），統計並做成簡易長條圖。")

# ── 十一、板書 ────────────────────────────────────────
heading("十二、板書規劃")
para(
    "植物的構造和生長\n"
    "營養器官：根（吸水）→ 莖（運送）→ 葉（製造養分）\n"
    "生殖器官：花（傳粉）→ 果實（保護）→ 種子（繁殖）\n"
    "帶走一句話：根吸水、莖運送、葉製造，花果種子繁衍下一代。",
    11,
)

# ── 十二、省思 ────────────────────────────────────────
heading("十三、教學省思（課後填寫）")
for _ in range(4):
    p = doc.add_paragraph("＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿")
    p.paragraph_format.space_after = Pt(14)
    for r in p.runs:
        set_font(r, 11, False, "B9B4A9")

doc.save(DOC_PATH)
print("saved:", DOC_PATH)


