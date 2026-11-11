# 三张活地图 · 老年人用药安全

> 课程大作业 · 人工智能前沿与创新（新生研讨课）
> 小组：第 44 组

## 项目简介

这是一个「三张活地图」学习平台，选题为「老年人用药安全与健康管理场景」。

通过实地调研发现老年人在日常吃药中面临的最大痛点（忘记吃药、看不清说明书、吃错药、记混药），并利用机器视觉技术（文字识别 OCR、药片图像识别）设计一套智能用药提醒与识别系统。

## 三个地图

- **领域地图**：机器视觉在用药安全中的知识、方法与工具
- **生态地图**：相关研究团队、工具与学习资源
- **认知地图**：分析方法、学习计划与认识变化

## 技术说明

- 纯静态网站，无前端构建步骤；入口 `index.html`，数据 `data.js`，视觉样式 `theme.css`
- 反馈功能：WorkBuddy 云服务共享数据库
- AI 解读能力：云服务免密钥大模型调用

## 如何修改

三张地图的条目、来源、关系与更新记录统一定义在 `data.js` 的 `window.MAP_DATA` 中，保留原条目 ID 与历史。

## 公开访问

https://three-livemaps-78529.app.workbuddy.host/?sharecode=MWQUXJHQ5C


## v0.7 本地验收版本

新增 4 个条目，共 18 个，保留原 14 个 ID、31 处关联与六条历史。现共 44 处关联。提供三图检索与分类、原始来源及学习状态、节点定位地址（如 `#domain?entry=d-ocr`）。新增评测、人工核对、OCR 对照计划与 PaddleOCR 资料；计划没有执行结果。

可视化页由 Archify 生成 6 节点阅读路径。点选图中节点后，在图下点击详情入口；也可使用图下索引。箭头表示建议阅读顺序，不是临床决策或已验证的工作流程。

### 预览

直接用浏览器打开 `index.html`。部分浏览器限制本地文件 iframe 跨文档联动，届时使用图下索引，或在本目录运行 `python -m http.server 8768 --bind 127.0.0.1` 后访问 `http://127.0.0.1:8768/`。本机预览不是线上发布。普通浏览者无需安装 Archify 或 Node。

### 更新与验证

1. 修改 `data.js`；图中节点和阅读顺序在 `visualization` 内定义。
2. 运行 `node scripts/build-visualization.cjs`，生成 `visualizations/learning-map.json`。
3. 在本项目目录执行 `node <Archify安装路径>/bin/archify.mjs finalize architecture visualizations/learning-map.json archify-map.html --quality showcase --json`。再次渲染同一成品时，按 Archify 说明使用新的检查输出目录。不手改生成 HTML。
4. 运行 `node tests/verify.cjs`，检查实际浏览器操作。

生成器会检查图的关系存在于卡片数据中。发布时须一同上传入口、数据、样式和生成图，不能只更新首页。MIT 许可见 `ARCHIFY-LICENSE.txt`。

保留原 WorkBuddy 云服务，反馈不在项目文件中。本轮未调用真实模型或写入反馈，真实服务与权限仍需原环境检查。课程覆盖和年级、调研原记录与识别效果待组员核实。用户已验收通过，v0.7 与基础修复 v0.6.1 一同提交推送，待组长审核发布原网站。
