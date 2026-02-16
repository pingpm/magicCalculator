#!/bin/bash

# 使用 ImageMagick 或其他工具从 SVG 生成 PNG
# 如果没有安装，可以在浏览器中打开 generate-icon.html 手动保存

if command -v convert &> /dev/null; then
    convert -background none icon.svg -resize 512x512 icon.png
    echo "图标已生成: icon.png"
else
    echo "请在浏览器中打开 generate-icon.html 并手动保存图标为 icon.png"
    echo "或者安装 ImageMagick: brew install imagemagick"
fi
