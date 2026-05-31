# way_to_overload

Lectures and knowledge for agent swarm learning — a collection of [OpenMAIC](https://github.com/) interactive courses on **emergence, self-organization, and complexity**: how structure arises from disordered, decentralized systems, from social insects to spin glasses.

## 课程列表

### 1. 涌现与非直接协同的奥秘

`course/涌现与非直接协同的奥秘/` — stigmergy（共识主动性 / 间接协同）：去中心化个体如何通过环境介导的信号自组织。10 个场景（3 讲义 + 7 互动）：

1. 社会性昆虫理论演化史
2. 独居蜂的流水线噩梦：刺激-反应链仿真
3. 白蚁筑拱：定量自组织的相变与分岔
4. 蜂巢拓扑 growth：定性规则与概率的选择
5. 极简格点蜂群算法（Lattice Swarm）实现
6. 蜂巢架构师：群落形态控制挑战
7. 数字信息素：路网优化与最短路径寻优仿真

### 2. 帕里西-自旋玻璃-RSB

`course/帕里西-自旋玻璃-RSB/` — 帕里西（Parisi）的核心贡献：自旋玻璃与「复本对称破缺」(replica symmetry breaking)，从原子尺度到行星尺度的无序与涨落规律。10 个场景（3 讲义 + 4 互动 + 3 quiz）：

1. 无序中的隐藏地图：从混乱到结构
2. 自旋玻璃：冻结的混沌
3. 复本分裂：同一系统的两条命运
4. 玻璃猎人：复本探险队
5. Parisi 的地图：序参量与等级宇宙
6. 从原子到行星：尺度缩放之旅
7. 涌现结构的家族树
8. 对称破缺建筑师
9. 涨落的节奏：老化与记忆
10. 你的下一张地图：无序之美

## 每门课的文件结构

| 路径 | 内容 |
|---|---|
| `manifest.json` | 课程全文：场景、内联互动 HTML、旁白脚本（OpenMAIC 导入用） |
| `audio/` | 旁白音频（OpenAI `echo` 声音） |
| `interactive/` | 互动 widget 的独立 HTML（便于阅读；内容也已内联在 manifest） |
| `*.pptx` | 幻灯片导出 |
| `voice-config.json` | TTS 声音分配（导入后需手动恢复，见下） |
| `restore-voices.js` | 浏览器 console 一键恢复声音脚本 |

## 在 OpenMAIC 中打开

1. 进入某门课目录，把 `manifest.json` 和 `audio/` 一起打包成 `.zip`：
   ```bash
   cd "course/<课程目录>"
   zip -r course.zip manifest.json audio
   ```
2. OpenMAIC 首页 → Import → 选这个 `.zip`
3. 导入后运行声音恢复（见下），否则实时讨论的角色声音会是默认 fallback

> `interactive/` 和 `*.pptx` 是给人阅读的附属导出，不需要放进导入 zip（互动 HTML 已内联在 manifest）。

## 恢复角色声音

OpenMAIC 的导出格式不携带 per-agent 声音配置，需手动恢复：

1. 在运行 OpenMAIC 的浏览器标签打开 DevTools Console
2. 粘贴并运行该课目录下 `restore-voices.js` 的内容
3. 刷新页面

声音分配：老师 `echo` · 显眼包 `nova` · 好奇宝宝 `alloy` · 思考者 `shimmer`。详见各课的 `voice-config.json`。

> 想了解 OpenMAIC 的存储/导出机制（为什么声音要手动恢复），见 [`docs/openmaic-mechanics.md`](docs/openmaic-mechanics.md)。

## License

[MIT](LICENSE) © 2026 spikezz
