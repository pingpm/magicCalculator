# 快速开始指南

## 5 分钟上手魔术计算器

### 第一步：下载项目

**如果你有 Git：**
```bash
git clone <仓库地址>
cd magic-calculator
```

**如果没有 Git：**
- 下载 ZIP 文件并解压
- 打开终端/命令行，进入项目文件夹

### 第二步：生成图标（必须！）

**最简单的方法：**
1. 在浏览器中打开 `icon-generator.html`
2. 点击"下载 icon.png"按钮
3. 将文件保存到项目根目录（与 index.html 同级）
4. 完成！

**使用命令行（可选）：**
```bash
# 需要先安装 ImageMagick
brew install imagemagick

# 生成图标
./create-icon.sh
```

### 第三步：启动服务器

选择一种方式：

**A. 使用 Python（推荐，最简单）**
```bash
python3 -m http.server 8000
```
然后打开浏览器访问：http://localhost:8000

**B. 使用 Node.js**
```bash
npx serve
```
浏览器会自动打开，或访问显示的地址

**C. 使用 VS Code**
- 安装 Live Server 扩展
- 右键 index.html → Open with Live Server

### 第四步：测试功能

1. **设置目标数字**
   - 输入：`2162227`
   - 长按右上角 1 秒（屏幕会闪烁）
   - 按 `AC` 清空

2. **模拟表演**
   - 输入：`1106` + `88396` =
   - 显示：`89,502`
   - 快速点击右上角
   - 显示：`2,072,725`
   - 按 `=`
   - 显示：`2,162,227` ✨

### 第五步：部署到线上

**最简单的方式：**

1. 访问 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 "New Project"
4. 导入项目或拖拽文件夹
5. 点击 "Deploy"
6. 获得永久访问链接！

### 第六步：添加到 iPhone

1. 在 iPhone Safari 打开部署的网址
2. 点击底部分享按钮
3. 选择"添加到主屏幕"
4. 完成！现在看起来就像系统应用

---

## 常见问题

**Q: 添加到主屏幕时图标是空白的？**

A: 你需要先生成图标：
1. 在浏览器打开 `icon-generator.html`
2. 点击下载按钮
3. 保存 icon.png 到项目根目录
4. 重新部署或刷新页面

**Q: 我没有 Python 也没有 Node.js 怎么办？**

A: 最简单的方法：
1. 直接把项目上传到 Vercel（拖拽文件夹即可）
2. 或者安装 Python：https://www.python.org/downloads/

**Q: 如何在手机上测试？**

A: 
1. 启动本地服务器
2. 查看电脑 IP：`ipconfig getifaddr en0`（Mac）或 `ipconfig`（Windows）
3. 手机浏览器访问：`http://你的IP:8000`

**Q: 部署后如何更新？**

A: 
- 如果用 Git：修改后 `git push`，Vercel 自动更新
- 如果拖拽部署：重新拖拽文件夹即可

---

## 需要帮助？

- 查看完整文档：README.md
- 查看部署指南：DEPLOY.md
- 检查浏览器控制台（F12）查看调试信息

**现在开始你的魔术表演吧！** 🎩✨
