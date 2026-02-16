#!/bin/bash

echo "正在生成图标..."

if command -v convert &> /dev/null; then
    convert icon.svg -resize 512x512 icon.png
    convert icon.svg -resize 192x192 icon-192.png
    echo "✅ 图标已生成: icon.png 和 icon-192.png"
else
    echo "❌ 未找到 ImageMagick"
    echo ""
    echo "请选择以下方式之一："
    echo "1. 安装 ImageMagick: brew install imagemagick"
    echo "2. 在浏览器中打开 icon-generator.html 手动下载图标"
    echo ""
fi
