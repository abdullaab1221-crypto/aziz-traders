import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..", "public", "images");
const OUT = path.resolve(import.meta.dirname, "..", "reports");

const files = [];
for (const dir of fs.readdirSync(ROOT)) {
  const d = path.join(ROOT, dir);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d)) {
    if (/\.(jpg|jpeg|png)$/i.test(f)) files.push(`${dir}/${f}`);
  }
}
files.sort();
console.log(`${files.length} images`);

const lines = files.map((rel) => {
  const abs = path.join(ROOT, rel.replace(/\//g, path.sep));
  return `[void]$list.Add(@('${rel}','${abs.replace(/'/g, "''")}'))`;
});

const ps = `
Add-Type -AssemblyName System.Drawing
$list = New-Object System.Collections.ArrayList
${lines.join("\n")}
$cols = 5
$cellW = 360; $cellH = 280; $labelH = 24
$rows = [Math]::Max(1, [Math]::Ceiling($list.Count / $cols))
$bmp = New-Object System.Drawing.Bitmap(($cols*$cellW), ($rows*($cellH+$labelH)))
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(16,20,28))
$font = New-Object System.Drawing.Font("Consolas", 9)
$brush = [System.Drawing.Brushes]::White
for ($i = 0; $i -lt $list.Count; $i++) {
  $rel = $list[$i][0]; $abs = $list[$i][1]
  $col = $i % $cols; $row = [Math]::Floor($i / $cols)
  $x = $col * $cellW; $y = $row * ($cellH + $labelH)
  try {
    $img = [System.Drawing.Image]::FromFile($abs)
    $scale = [Math]::Min($cellW / $img.Width, $cellH / $img.Height)
    $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
    $dx = $x + [int](($cellW - $w) / 2); $dy = $y + [int](($cellH - $h) / 2)
    $g.DrawImage($img, $dx, $dy, $w, $h)
    $img.Dispose()
  } catch {
    $g.FillRectangle([System.Drawing.Brushes]::DarkRed, $x, $y, $cellW, $cellH)
    $g.DrawString("FAIL", $font, $brush, ($x+8), ($y+8))
  }
  $g.DrawString($rel, $font, $brush, ($x+4), ($y+$cellH+4))
}
$out = Join-Path '${OUT.replace(/'/g, "''")}' 'contact-sheet2.png'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "saved: $out ($($list.Count) images)"
`;

const tmp = path.join(process.env.TEMP || ".", "aziz-contact-sheet.ps1");
fs.writeFileSync(tmp, Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(ps, "utf16le")]));
const out = execFileSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", tmp], { encoding: "utf8" });
console.log(out);
