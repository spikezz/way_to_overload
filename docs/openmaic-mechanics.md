# OpenMAIC 课程机制笔记

使用本仓库课程（导入、恢复声音）时有用的一些 OpenMAIC 内部机制。代码路径相对 OpenMAIC 源码根目录。

## 双存储

- **IndexedDB `MAIC-Database` 是权威数据源**，页面加载时先读它。
- `data/classrooms/<id>.json` 只是镜像/回退；加载后会被 IndexedDB **覆盖**（日志 "Mirrored to server"）——所以直接手改这个 JSON 没用。
- 音频 blob 要么在 IndexedDB `audioFiles`（客户端），要么在磁盘 `data/classrooms/<id>/audio/` 配 `audioUrl`（服务端）。播放优先 `audioUrl`，否则查 IndexedDB；都没有就静默跳过，**不会自动重新生成**。
- 互动 widget = 完整 HTML/JS 内联在 `scene.content.html`，通过 iframe `srcDoc` 渲染。

## 两条生成路径，UI 里没有切换开关

- **编辑器流程**（`generation-preview`）→ TTS 永远走客户端、存 IndexedDB、只用老师声音。
- **服务端流程**（`generateTTSForClassroom` → 写磁盘 + `audioUrl`，能扛浏览器清数据、可移植）只在"全自动新建课程"管线 `/api/generate-classroom` 里被调用，而**没有任何前端按钮触发它**。
- 结论：无法通过 UI 把一门已用编辑器生成的课"升级"成服务端音频。

## 导出/导入两端都丢 voiceConfig

`.maic.zip` 的导出和导入**都不携带 per-agent 声音配置**：

- 导出（`lib/export/use-export-classroom.ts`）只含生成的/自定义 agent（**不含内置 default-\* agent**），且从不写 `voiceConfig` 字段。
- 导入（`lib/import/use-import-classroom.ts`）只读 name/role/persona/avatar/color/priority，**从不读 voiceConfig**。

per-agent 的讨论声音只活在浏览器 localStorage `agent-registry-storage.state.agents[id].voiceConfig`；全局旁白/老师声音在 `settings-storage.state.ttsVoice`。要随课程分享声音，必须**单独导出**这些值——本仓库的做法见 [`../course/涌现与非直接协同的奥秘/voice-config.json`](../course/涌现与非直接协同的奥秘/voice-config.json) 与 [`restore-voices.js`](../course/涌现与非直接协同的奥秘/restore-voices.js)。OpenAI 声音的 `providerId` = `openai-tts`。

## 旁白只用单一声音

- 幻灯片旁白始终用一个全局声音；多角色声音只发生在**互动课堂的实时讨论**（`use-discussion-tts`，现场生成、不落盘）。
- 内置 default agent 的 `voiceConfig` 在部分 OpenMAIC 版本里会被 registry-store 的 merge 逻辑在每次刷新时重置——若刷新后声音回退到 fallback，说明你的 OpenMAIC 缺少 default-agent voiceConfig 持久化修复。
