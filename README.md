# 三张活地图 · 老年人用药安全

> 课程大作业 · 人工智能前沿与创新（新生研讨课）
> 小组：第 44 组

## 项目简介

这是一个「三张活地图」学习平台，选题为「老年人用药安全与健康管理场景」。

围绕文字识别（OCR）、药片外观分类、评测与人工核对，记录知识、工具和学习计划。原稿中调研与认识转变的摘要保留提供者归属，原记录仍待组内确认；本站尚非实际用药识别产品。

## 三个地图

- **领域地图**：机器视觉在用药安全中的知识、方法与工具
- **生态地图**：相关研究团队、工具与学习资源
- **认知地图**：分析方法、学习计划与认识变化

## 技术说明

- 纯静态网站，无前端构建步骤；入口 `index.html`，数据 `data.js`；基础样式 `theme.css`、主题 `fieldnotes.css`，自定义关系图 `atlas.js` / `atlas.css`
- 反馈功能：WorkBuddy 云服务共享数据库
- AI 解读能力：云服务免密钥大模型调用

## 如何修改

三张地图的条目、来源、关系与更新记录统一定义在 `data.js` 的 `window.MAP_DATA` 中，保留原条目 ID 与历史。

## 公开访问

https://three-livemaps-78529.app.workbuddy.host/?sharecode=MWQUXJHQ5C


## v0.8 第二次更新（用户验收通过）

基于已合并的 v0.7（master / bac0e50），在 `codex/second-update` 分支实现。用户已于 2026-11-15 验收通过并授权提交推送；主分支合并与原网站发布由组长安排。

- 26 个节点（领域 12、生态 7、认知 7）、87 条有向参考关系、7 项官方资料入口。双向引用分别计数，图上线条按节点对合并，方向与理由在旁栏列出。
- 新增图像采集、检测与识别、分组划分、分类混淆、scikit-learn、WAI、错误复盘、证据检查八项；保留上版 18 个 ID、44 条关联及八条版本历史。
- 「安心识药」主题：暖纸色、深绿、陶土色，原创 SVG 药瓶与核对便笺；示意标签不含真实处方。
- 自定义关系图复用 `data.js`：三条阅读路径、全节点视图、全局搜索、节点与来源卡片联动、进入/指向关系说明。窄屏图内横向滑动；文字关联入口支持键盘浏览。
- 独立 Archify 六步流程版保留在折叠区，采用 editorial 样式，可另开全屏浏览；安装版支持 classic / signal-flow / blueprint / editorial 四种样式，本轮没有升级插件。

所有节点都可从 `d-intro` 沿参考链接到达，没有断链、重复指向或无进入链接的条目。这是知识导航检查，不证明实践与技术效果。采集、对照和复盘仍未执行；生态地图目前偏工具资源，真实参与者、代表项目与需求方仍需后续调查。

### 本地预览与交付

双击 `index.html` 即可浏览主站与自定义地图；使用本地服务器可获得完整的 Archify 图文联动。运行 `python -m http.server 8769 --bind 127.0.0.1`，再访问 `http://127.0.0.1:8769/`。

部署原网站时须同时上传：`index.html`、`data.js`、`theme.css`、`fieldnotes.css`、`atlas.css`、`atlas.js`、`archify-map.html` 和 `ARCHIFY-LICENSE.txt`。不要改动原 WorkBuddy 云服务配置。正式发布仍由组长安排。

### 数据与验证

`data.js` 中 `maps` / `sources` 是卡片与两种地图的数据来源，`paths` 定义自定义图的阅读子集，`visualization` 定义 Archify 六步阅读顺序。不要维护另一份事实数据。

运行 `node tests/verify.cjs` 与 `node tests/second-update.cjs` 检查旧节点、关联、历史、来源、可达性与路径。`tests/browser.cjs` 为可选 Playwright 浏览器检查：需自备 Playwright 和可运行浏览器，可通过 `PLAYWRIGHT_MODULE`、`QA_BROWSER_CHANNEL`、`QA_URL`、`QA_OUTPUT` 指定环境。它会在测试浏览器中屏蔽云 SDK，不能作为真实云服务的验证。

重新生成 Archify：先运行 `node scripts/build-visualization.cjs`，再按下方 finalize 命令生成。v0.8 自动检查回执在 `visualizations/v08-check/`；历史回执在 `visualizations/v07-check/`，仅对应旧版字节。生成的 HTML 不手工改动。

## v0.7 历史更新（已合并）

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
