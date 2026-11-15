# 可视化与检查回执

`learning-map.json` 由 `scripts/build-visualization.cjs` 从 `data.js` 生成。`meta.visual_preset` 当前为 `editorial`。

- 主站关系图是自定义的 `atlas.js` / `atlas.css`，直接读取完整数据；路径子集在 `MAP_DATA.paths`。
- 独立 Archify 成品为根目录 `archify-map.html`，读取六步建议阅读路径。
- `v08-check/` 对应本轮 Archify 成品的自动检查证据。查看其中 `artifact.sha256` 和成品字节是否一致。
- `v07-check/` 仅保存上版历史回执。它们不验证当前文件，旧版成品可从 Git 历史取得。

下次在同一成品路径重新 finalize 时，使用新的 `--out-dir`，保留此前证据。不手改生成 HTML。浏览器截图及人工视觉检查的说明见本轮验收包；自动回执中的 `visualReview: not-requested` 不等于没有另外检查主站截图。
