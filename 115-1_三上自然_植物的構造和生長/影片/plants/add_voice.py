# -*- coding: utf-8 -*-
"""為 4 段動畫加入台灣中文女聲旁白（edge-tts），輸出有聲版 mp4。"""
import subprocess, json, os, sys
from pathlib import Path

BASE = Path(r"C:\Users\rayi\Documents\自然科學教學專欄\115-1_三上自然_植物的構造和生長\影片\plants")
MEDIA = BASE / "deck" / "media"
SILENT = MEDIA / "silent"
SILENT.mkdir(exist_ok=True)
TMP = BASE / "voice_tmp"
TMP.mkdir(exist_ok=True)

VOICE = "zh-TW-HsiaoChenNeural"

clips = {
    "p04": ("植物有六個基本構造：根、莖、葉、花、果實和種子。它們各有各的工作，一起讓植物活下去。", 12.0),
    "p06": ("根藏在土裡。根毛又細又多，可以增加吸收面積；水分和礦物質，就是從根毛進入植物的。", 12.0),
    "p08": ("莖像植物的骨架，把葉子撐高。莖裡還有運輸通道，把水分往上送，也把養分送到全身。", 12.0),
    "p13": ("花是植物的生殖器官。花謝了以後，子房會慢慢長成果實，果實裡藏著種子；種子掉進土裡，就會長出新的植物。", 15.0),
}


def run(args):
    p = subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if p.returncode != 0:
        print("ERR", args, p.stderr[-800:])
        sys.exit(1)
    return p


def dur(path):
    p = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=nw=1:nk=1", str(path)])
    return float(p.stdout.strip())


for name, (text, video_len) in clips.items():
    txt = TMP / f"{name}.txt"
    txt.write_text(text, encoding="utf-8")
    mp3 = TMP / f"{name}.mp3"
    print(f"[{name}] TTS ...")
    run(["edge-tts", "--voice", VOICE, "--file", str(txt), "--write-media", str(mp3)])
    d = dur(mp3)
    print(f"  旁白 {d:.2f}s / 影片 {video_len}s")

    # 備份靜音版
    silent_src = MEDIA / f"{name}.mp4"
    if silent_src.exists() and not (SILENT / f"{name}.mp4").exists():
        subprocess.run(["copy", str(silent_src), str(SILENT / f"{name}.mp4")], shell=True,
                       capture_output=True)

    # 旁白太長就稍微加速（最多 1.25 倍）
    tempo = 1.0
    avail = video_len - 0.5
    if d > avail:
        tempo = min(d / avail, 1.25)
    af = f"atempo={tempo:.4f}," if tempo > 1.001 else ""
    af += "adelay=350|350,apad"

    out = MEDIA / f"{name}_voice.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error",
         "-i", str(silent_src), "-i", str(mp3),
         "-filter_complex", f"[1:a]{af}[a]",
         "-map", "0:v", "-map", "[a]",
         "-c:v", "copy", "-c:a", "aac", "-b:a", "128k",
         "-t", f"{video_len}", str(out)])
    print(f"  -> {out.name}  tempo={tempo:.3f}  final={dur(out):.2f}s")

print("done")
