# FilePilot Tools 第二版需求文档

## 1. 文档说明

本文档用于指导 `D:\zhizhouAi\myproject` 的第二版开发。

第一版已经完成基础工具站能力，重点是让用户可以打开页面、选择文件、处理文件、下载结果。第二版的目标不是重新设计网站，而是在第一版基础上补齐同类高流量网站已经验证过的功能和页面结构，让网站更容易被搜索到，也让用户在一次访问里能完成更多相关任务。

当前项目代码位置：

```text
D:\zhizhouAi\myproject
```

当前正式项目类型：

```text
Nuxt 3 + Vue 3 + TypeScript
```

当前已存在的主要页面：

| 页面 | 路径 |
| --- | --- |
| 首页 | `/` |
| 图片工具分类页 | `/image-tools` |
| PDF 工具分类页 | `/pdf-tools` |
| 图片压缩 | `/image-compressor` |
| 图片格式转换 | `/image-converter` |
| 图片转 PDF | `/image-to-pdf` |
| PDF 合并 | `/merge-pdf` |
| PDF 拆分 | `/split-pdf` |
| 图片尺寸调整 | `/resize-image` |
| QR Code 生成 | `/qr-code-generator` |

第二版仍然保持第一版的核心卖点：

```text
Files are processed directly in your browser.
```

中文表达：

```text
文件直接在浏览器中处理。
```

支持本地处理的功能，不要把用户文件上传到服务器。第二版可以增加统计，但统计只能记录页面访问、工具开始处理、处理成功或失败这类行为，不记录文件内容、文件名原文、文件正文、图片内容、PDF 内容。

## 2. 同类网站参考

下面这些网站是第二版规划的主要参考对象。这里参考的是功能结构、页面组织、SEO 思路和用户体验，不是照抄界面。

| 网站 | 具体网站地址 | 主要方向 | 对第二版的启发 |
| --- | --- | --- | --- |
| iLovePDF | `https://www.ilovepdf.com/` | PDF 全套工具 | PDF 工具要形成矩阵，不能只有合并和拆分；每个工具要有独立页面。 |
| Smallpdf | `https://smallpdf.com/` | PDF 全套工具 | 工具流程要短，页面要直接显示上传区、操作按钮和相关工具。 |
| Adobe Acrobat Online | `https://acrobat.adobe.com/` | PDF 官方工具 | PDF 转换、压缩、签名、保护这类需求很常见，适合作为后续扩展方向。 |
| PDF24 | `https://www.pdf24.org/` | PDF 工具集合 | 工具数量多，分类清晰，长尾工具可以带来稳定搜索流量。 |
| Sejda | `https://www.sejda.com/` | PDF 编辑和签名 | 编辑、签名、提取页面、旋转页面属于更深一层的 PDF 需求。 |
| PDF2Go | `https://www.pdf2go.com/` | PDF 转换和编辑 | PDF 转图片、图片转 PDF、PDF 压缩这些功能应当互相串联。 |
| iLoveIMG | `https://www.iloveimg.com/` | 图片压缩、转换、裁剪 | 图片工具要补齐裁剪、旋转、水印、去背景等高频场景。 |
| remove.bg | `https://www.remove.bg/` | 图片去背景 | 单点工具如果需求强，可以独立做成重点入口。 |
| FreeConvert | `https://www.freeconvert.com/` | 文件格式转换 | 格式转换页面要覆盖更多格式，并为每种转换组合建立可搜索页面。 |
| CloudConvert | `https://cloudconvert.com/` | 文件格式转换 | 格式组合很多，后续可以从图片格式扩展到文档格式。 |
| Convertio | `https://convertio.co/` | 文件格式转换 | 长尾格式转换适合用 SEO 页面承接流量。 |
| Online-Convert | `https://www.online-convert.com/` | 综合转换工具 | 工具分类页要清楚，用户可以按文件类型找工具。 |

## 3. 第二版目标

### 3.1 产品目标

第二版重点解决 5 件事：

1. 补齐更高搜索需求的 PDF 和图片工具。
2. 增加工具之间的关联入口，让用户处理完一个任务后能继续做下一步。
3. 增强 SEO 页面结构，让每个高频需求都有单独入口。
4. 接入基础访问统计，看清楚每天访问量、热门页面和工具使用情况。
5. 完善信任说明和隐私说明，继续强调本地处理。

### 3.2 不做的内容

第二版仍然不做这些内容：

| 不做内容 | 原因 |
| --- | --- |
| 登录注册 | 当前阶段不需要用户账号就能完成核心任务。 |
| 会员付费 | 先验证自然流量和工具使用情况，再决定是否商业化。 |
| 云端文件保存 | 会破坏“文件留在本地”的核心信任点。 |
| 后台文件处理 | 当前工具优先保持浏览器本地处理。 |
| 用户文件历史 | 会涉及文件隐私和存储责任。 |
| API 服务 | 第二版先做面向普通用户的网站，不做开发者服务。 |

## 4. 第二版功能总览

### 4.1 第二版 P0 功能

P0 是第二版必须优先完成的内容。

| 模块 | 功能 | 页面路径 | 参考网站 | 说明 |
| --- | --- | --- | --- | --- |
| PDF 工具 | PDF 压缩 | `/compress-pdf` | iLovePDF、Smallpdf、Adobe Acrobat Online、PDF24 | 搜索需求高，应放在首页和 PDF 分类页重点入口。 |
| PDF 工具 | PDF 转图片 | `/pdf-to-images` | iLovePDF、PDF2Go、PDF24 | 第一版文档里已经规划过，第二版需要落地。 |
| 图片工具 | 图片裁剪 | `/crop-image` | iLoveIMG | 图片工具基础能力，适合和尺寸调整放在一起。 |
| 图片工具 | 图片旋转 | `/rotate-image` | iLoveIMG | 实现成本较低，适合补全图片处理矩阵。 |
| 数据统计 | 基础访问统计 | 配置在 `D:\zhizhouAi\myproject\nuxt.config.ts` | Cloudflare Web Analytics、Google Analytics | 用于看日活、页面访问、工具使用趋势。 |
| SEO | sitemap 和 robots | `/sitemap.xml`、`/robots.txt` | 所有竞品 | 方便搜索引擎发现工具页。 |
| 页面结构 | 工具索引页 | `/tools` | PDF24、Online-Convert | 把所有工具按分类列出来，减少用户寻找成本。 |

### 4.2 第二版 P1 功能

P1 是第二版建议完成的内容。如果时间不够，可以放到第二版后半段。

| 模块 | 功能 | 页面路径 | 参考网站 | 说明 |
| --- | --- | --- | --- | --- |
| 图片工具 | 图片加水印 | `/watermark-image` | iLoveIMG | 内容创作者和电商用户会用。 |
| 图片工具 | 图片去背景 | `/remove-background` | remove.bg | 流量潜力高，但需要模型或第三方能力；如果无法本地处理，页面必须明确说明。 |
| 图片工具 | 图片转 Base64 | `/image-to-base64` | Online-Convert | 开发者和站长会用，实现简单。 |
| 图片工具 | Base64 转图片 | `/base64-to-image` | Online-Convert | 和图片转 Base64 配套。 |
| PDF 工具 | PDF 旋转页面 | `/rotate-pdf` | PDF24、Sejda | 常见办公场景。 |
| PDF 工具 | PDF 提取页面 | `/extract-pdf-pages` | Sejda、PDF24 | 和 PDF 拆分不同，强调从 PDF 中导出指定页面。 |
| PDF 工具 | PDF 添加页码 | `/add-page-numbers-to-pdf` | iLovePDF、PDF24 | 文档整理场景常见。 |
| SEO | 每个工具增加 FAQ | 各工具页 | Smallpdf、iLovePDF、PDF24 | 用于解释支持格式、是否上传文件、移动端是否可用。 |

### 4.3 第二版 P2 功能

P2 是后续扩展内容，不影响第二版上线。

| 模块 | 功能 | 页面路径 | 参考网站 | 说明 |
| --- | --- | --- | --- | --- |
| PDF 工具 | PDF 签名 | `/sign-pdf` | Adobe Acrobat Online、Sejda | 使用频率高，但交互复杂度更高。 |
| PDF 工具 | PDF 加密 | `/protect-pdf` | Smallpdf、iLovePDF、PDF24 | 需要清楚说明密码只在本地处理。 |
| PDF 工具 | PDF 解密 | `/unlock-pdf` | Smallpdf、iLovePDF、PDF24 | 只能处理用户知道密码的 PDF，不做破解。 |
| PDF 工具 | PDF 转 Word | `/pdf-to-word` | Smallpdf、Adobe Acrobat Online、iLovePDF | 浏览器本地高质量转换难度高，先不作为第二版核心。 |
| 文档转换 | Word 转 PDF | `/word-to-pdf` | Smallpdf、CloudConvert、Convertio | 需要额外解析能力，后续评估。 |
| 综合转换 | 更多格式转换 | `/convert` 和格式组合页 | FreeConvert、CloudConvert、Convertio | 可作为第三版方向。 |

## 5. 第二版工具需求

### 5.1 PDF 压缩

页面路径：

```text
/compress-pdf
```

优先级：

```text
P0
```

参考网站：

| 网站 | 地址 |
| --- | --- |
| iLovePDF | `https://www.ilovepdf.com/compress_pdf` |
| Smallpdf | `https://smallpdf.com/compress-pdf` |
| Adobe Acrobat Online | `https://acrobat.adobe.com/` |
| PDF24 | `https://www.pdf24.org/` |

用户目标：

用户希望把 PDF 文件变小，用于邮件上传、报名系统上传、合同附件上传、学校作业上传。

页面结构：

1. 标题：`Compress PDF`
2. 副标题：说明可以在浏览器中压缩 PDF。
3. 文件选择区：只允许选择 PDF。
4. 压缩等级：
   - Low compression
   - Medium compression
   - High compression
5. 处理按钮：`Compress PDF`
6. 结果区：显示原始大小、压缩后大小、节省比例、下载按钮。
7. FAQ：说明文件是否上传、支持多大文件、为什么有的 PDF 压缩不明显。
8. 相关工具：Merge PDF、Split PDF、PDF to Images、Image to PDF。

实现要求：

- 支持单个 PDF。
- 支持结果下载。
- 如果当前技术只能做有限压缩，需要在页面文案里说清楚“压缩效果取决于 PDF 内容”。
- 不要为了追求压缩效果把文件上传到第三方服务。

验收标准：

| 验收项 | 标准 |
| --- | --- |
| 文件限制 | 只能选择 PDF。 |
| 处理流程 | 选择文件后可以点击压缩。 |
| 结果展示 | 显示原始大小、新大小、节省比例。 |
| 下载 | 可以下载压缩后的 PDF。 |
| 隐私说明 | 上传区附近显示本地处理说明。 |
| 多语言 | 英文和中文文案都完整。 |

### 5.2 PDF 转图片

页面路径：

```text
/pdf-to-images
```

优先级：

```text
P0
```

参考网站：

| 网站 | 地址 |
| --- | --- |
| iLovePDF | `https://www.ilovepdf.com/pdf_to_jpg` |
| PDF2Go | `https://www.pdf2go.com/` |
| PDF24 | `https://www.pdf24.org/` |

用户目标：

用户希望把 PDF 每一页导出为图片，用于预览、发送、插入文档、上传到只支持图片的平台。

页面结构：

1. 标题：`PDF to Images`
2. 文件选择区：只允许选择 PDF。
3. 输出格式：
   - JPG
   - PNG
4. 页码范围：
   - All pages
   - Custom range
5. 图片质量：默认 90。
6. 处理按钮：`Convert PDF to Images`
7. 结果区：按页面列出图片，支持单张下载和全部下载。
8. 相关工具：Image to PDF、Split PDF、Compress PDF。

实现要求：

- 需要 PDF 渲染能力。
- 多页 PDF 要按页面顺序输出。
- 如果一次输出多张图片，第二版建议支持打包下载。
- 文件仍然本地处理。

验收标准：

| 验收项 | 标准 |
| --- | --- |
| 页码顺序 | 输出图片顺序和 PDF 页码一致。 |
| 格式选择 | JPG 和 PNG 至少支持一种，优先支持 JPG。 |
| 范围选择 | 支持全部页面，支持自定义范围更好。 |
| 下载 | 支持单张下载；多页时建议支持全部下载。 |
| 移动端 | 结果列表不能挤出屏幕。 |

### 5.3 图片裁剪

页面路径：

```text
/crop-image
```

优先级：

```text
P0
```

参考网站：

| 网站 | 地址 |
| --- | --- |
| iLoveIMG | `https://www.iloveimg.com/` |

用户目标：

用户希望裁掉图片多余区域，用于头像、证件照、封面图、社交媒体配图。

页面结构：

1. 标题：`Crop Image`
2. 文件选择区：支持 JPG、PNG、WebP。
3. 图片预览区。
4. 裁剪框。
5. 比例选项：
   - Free
   - 1:1
   - 4:3
   - 16:9
   - 3:4
6. 输出格式：
   - Same as original
   - JPG
   - PNG
   - WebP
7. 处理按钮：`Crop Image`
8. 结果区：预览和下载。

实现要求：

- 裁剪框在桌面端和移动端都能操作。
- 不需要增加复杂滤镜。
- 不需要做人脸识别或智能裁剪。

验收标准：

| 验收项 | 标准 |
| --- | --- |
| 图片预览 | 选择图片后能看到预览。 |
| 裁剪范围 | 用户能调整裁剪区域。 |
| 比例 | 至少支持自由裁剪和 1:1。 |
| 输出 | 下载图片尺寸和裁剪区域一致。 |

### 5.4 图片旋转

页面路径：

```text
/rotate-image
```

优先级：

```text
P0
```

参考网站：

| 网站 | 地址 |
| --- | --- |
| iLoveIMG | `https://www.iloveimg.com/` |

用户目标：

用户希望修正手机拍照、扫描件、截图方向。

页面结构：

1. 标题：`Rotate Image`
2. 文件选择区：支持 JPG、PNG、WebP。
3. 图片预览区。
4. 操作按钮：
   - Rotate left
   - Rotate right
   - Flip horizontal
   - Flip vertical
5. 输出格式选择。
6. 处理按钮：`Download Rotated Image`

实现要求：

- 支持多图批量处理。
- 每张图片可以单独设置旋转方向。
- 处理过程在浏览器中完成。

验收标准：

| 验收项 | 标准 |
| --- | --- |
| 旋转 | 支持左转和右转。 |
| 翻转 | 支持水平翻转和垂直翻转。 |
| 批量 | 支持多张图片。 |
| 下载 | 每张图片能单独下载。 |

### 5.5 工具索引页

页面路径：

```text
/tools
```

优先级：

```text
P0
```

参考网站：

| 网站 | 地址 |
| --- | --- |
| PDF24 | `https://www.pdf24.org/` |
| Online-Convert | `https://www.online-convert.com/` |
| FreeConvert | `https://www.freeconvert.com/` |

页面目标：

用户不一定知道工具在哪个分类里，所以需要一个完整工具索引页，把所有工具按类型列出来。

页面结构：

1. 页面标题：`All Tools`
2. 页面说明：一句话说明这里列出所有 PDF、图片和 QR 工具。
3. 工具分类：
   - Popular Tools
   - Image Tools
   - PDF Tools
   - QR Tools
4. 每个工具卡片包含：
   - 工具名称
   - 一句话说明
   - 图标
   - 链接
5. 页面底部显示本地处理说明。

验收标准：

| 验收项 | 标准 |
| --- | --- |
| 完整性 | 当前所有工具都有入口。 |
| 分类 | 图片、PDF、QR 分类清楚。 |
| 多语言 | 中文和英文都完整。 |
| SEO | 有独立 title 和 description。 |

## 6. SEO 需求

### 6.1 每个工具必须有独立 SEO 信息

每个工具页都要有独立：

- title
- description
- h1
- FAQ
- related tools

例如 PDF 压缩：

```text
Title: Compress PDF Online for Free | FilePilot Tools
Description: Compress PDF files directly in your browser. Reduce PDF size without uploading files to a server.
H1: Compress PDF
```

中文切换后页面内容要切换，但 URL 不需要在第二版做中文路径。

### 6.2 sitemap

第二版需要生成：

```text
/sitemap.xml
```

必须包含：

| 页面类型 | 示例 |
| --- | --- |
| 首页 | `/` |
| 分类页 | `/image-tools`、`/pdf-tools`、`/tools` |
| 工具页 | `/image-compressor`、`/compress-pdf` |

### 6.3 robots

第二版需要提供：

```text
/robots.txt
```

基础内容：

```text
User-agent: *
Allow: /
Sitemap: https://filepilottools.top/sitemap.xml
```

### 6.4 FAQ 结构

第二版每个重点工具页至少增加 3 个 FAQ：

| FAQ 类型 | 示例问题 |
| --- | --- |
| 隐私 | Are my files uploaded? |
| 格式 | Which file formats are supported? |
| 效果 | Why is my file not much smaller after compression? |
| 移动端 | Can I use this tool on my phone? |

中文也要完整：

| FAQ 类型 | 示例问题 |
| --- | --- |
| 隐私 | 我的文件会上传吗？ |
| 格式 | 支持哪些文件格式？ |
| 效果 | 为什么压缩后文件没有明显变小？ |
| 移动端 | 手机可以使用吗？ |

## 7. 数据统计需求

### 7.1 统计目标

第二版需要知道这些数据：

| 数据 | 用途 |
| --- | --- |
| 每天唯一访问者 | 看日活趋势。 |
| 每天页面访问量 | 看整体流量变化。 |
| 热门页面 | 判断哪些工具带来访问。 |
| 工具开始处理次数 | 判断用户是否真的使用工具。 |
| 工具处理成功次数 | 判断功能是否稳定。 |
| 工具处理失败次数 | 判断哪里需要修。 |

### 7.2 推荐接入方式

优先推荐：

```text
Cloudflare Web Analytics
```

原因：

- 当前域名 `https://filepilottools.top/` 已经走 Cloudflare。
- 可以直接看访问趋势。
- 不需要自己维护统计服务。

备选：

```text
Google Analytics 4
```

原因：

- 能看更细的页面来源和事件。
- 后续做广告投放或搜索分析更方便。

### 7.3 统计事件

第二版先只统计匿名事件。

| 事件名 | 触发时机 | 参数 |
| --- | --- | --- |
| `tool_file_selected` | 用户选择文件后 | `tool_key`、`file_count`、`file_type_group` |
| `tool_process_started` | 用户点击处理按钮 | `tool_key` |
| `tool_process_succeeded` | 处理成功后 | `tool_key`、`result_count` |
| `tool_process_failed` | 处理失败后 | `tool_key`、`error_type` |
| `tool_result_downloaded` | 用户下载结果 | `tool_key`、`result_count` |
| `language_changed` | 用户切换语言 | `language` |

不要统计：

| 禁止统计 | 原因 |
| --- | --- |
| 文件名原文 | 可能包含隐私。 |
| PDF 文本内容 | 属于用户文件内容。 |
| 图片内容 | 属于用户文件内容。 |
| 用户输入的完整 URL 或文本 | QR Code 页面可能输入敏感链接。 |
| 用户邮箱、手机号、姓名 | 当前站点不需要这些信息。 |

## 8. 页面体验优化

### 8.1 工具页统一体验

所有工具页继续使用统一结构：

1. 顶部导航。
2. 返回分类页链接。
3. 工具标题和说明。
4. 文件选择区。
5. 本地处理说明。
6. 参数设置区。
7. 处理按钮。
8. 结果区。
9. FAQ。
10. 相关工具。

这样做的原因是：用户一旦学会一个工具，使用其他工具时不需要重新理解页面。

### 8.2 结果区增强

第二版结果区需要比第一版更清楚：

| 内容 | 要求 |
| --- | --- |
| 原文件大小 | 有原始文件时显示。 |
| 新文件大小 | 处理成功后显示。 |
| 节省比例 | 压缩类工具必须显示。 |
| 输出格式 | 转换类工具必须显示。 |
| 单个下载 | 每个结果都有下载按钮。 |
| 全部下载 | 多文件处理时建议支持。 |

### 8.3 相关工具

每个工具页都要显示相关工具，不要让用户处理完就断掉。

| 当前工具 | 相关工具 |
| --- | --- |
| Compress Image | Resize Image、Convert Image、Image to PDF、Crop Image |
| Convert Image | Compress Image、Resize Image、Image to PDF、Image to Base64 |
| Image to PDF | PDF to Images、Merge PDF、Compress PDF |
| Merge PDF | Split PDF、Compress PDF、Rotate PDF |
| Split PDF | Merge PDF、Extract PDF Pages、PDF to Images |
| Compress PDF | Merge PDF、Split PDF、PDF to Images、Image to PDF |
| Crop Image | Resize Image、Rotate Image、Compress Image |
| Rotate Image | Crop Image、Resize Image、Convert Image |

## 9. 多语言需求

第二版继续支持：

```text
English
中文
```

新增页面、按钮、FAQ、错误提示、统计相关可见文案，都必须加入语言文件。

当前语言文件位置：

```text
D:\zhizhouAi\myproject\locales\en.json
D:\zhizhouAi\myproject\locales\zh-CN.json
```

新增文案不能只写在页面里，必须进入语言文件，避免切换语言时出现一半中文一半英文。

## 10. 技术实现要求

### 10.1 文件结构

新增页面建议放在：

```text
D:\zhizhouAi\myproject\pages
```

新增可复用逻辑建议放在：

```text
D:\zhizhouAi\myproject\composables
D:\zhizhouAi\myproject\utils
```

新增类型建议放在：

```text
D:\zhizhouAi\myproject\types
```

### 10.2 工具目录维护

新增工具必须同步维护：

```text
D:\zhizhouAi\myproject\composables\useToolCatalog.ts
D:\zhizhouAi\myproject\types\tool.ts
D:\zhizhouAi\myproject\components\ToolIcon.vue
D:\zhizhouAi\myproject\locales\en.json
D:\zhizhouAi\myproject\locales\zh-CN.json
```

原因是这些文件共同决定：

- 首页和分类页是否显示工具。
- 工具页是否能拿到标题和 SEO 文案。
- 图标是否能正常显示。
- 中英文是否能完整切换。

### 10.3 代码规则

新增或重写 `.vue`、`.ts`、`.js` 文件时：

- 使用 2 个空格缩进。
- `.vue` 文件里的 `<script>` 也使用 2 个空格缩进。
- 注释可以写得更详细，重点说明为什么这样处理。
- 不需要增加没有数据来源的兜底。
- 如果后续项目增加 `ob-block` 组件，新增页面需要按项目规则接入，方便排查页面来源。

### 10.4 性能要求

第二版工具变多后，不能把所有处理库都放到首页加载。

要求：

| 场景 | 要求 |
| --- | --- |
| 首页 | 不加载 PDF 渲染、PDF 编辑、图片裁剪等重逻辑。 |
| 分类页 | 只展示工具，不加载具体处理库。 |
| 工具页 | 只加载当前工具需要的库。 |
| PDF 渲染 | 只在 `/pdf-to-images` 等需要渲染 PDF 的页面加载。 |

## 11. 第二版上线范围建议

### 11.1 最小可上线范围

如果想快一点上线第二版，建议先做这些：

| 优先级 | 内容 |
| --- | --- |
| 1 | `/compress-pdf` |
| 2 | `/pdf-to-images` |
| 3 | `/crop-image` |
| 4 | `/rotate-image` |
| 5 | `/tools` |
| 6 | `sitemap.xml` |
| 7 | `robots.txt` |
| 8 | Cloudflare Web Analytics |
| 9 | 每个重点工具页 FAQ |

### 11.2 第二版后半段

最小范围上线后，再补：

| 优先级 | 内容 |
| --- | --- |
| 1 | `/watermark-image` |
| 2 | `/image-to-base64` |
| 3 | `/base64-to-image` |
| 4 | `/rotate-pdf` |
| 5 | `/extract-pdf-pages` |
| 6 | `/add-page-numbers-to-pdf` |
| 7 | 更完整的相关工具推荐 |

## 12. 验收标准

第二版完成后，需要按下面标准验收。

### 12.1 功能验收

| 验收项 | 标准 |
| --- | --- |
| 新增工具 | P0 工具页面都能访问。 |
| 文件处理 | 每个 P0 工具能完成选择、处理、下载。 |
| 本地处理说明 | 每个工具页上传区附近都有说明。 |
| 结果展示 | 结果区能显示处理结果和下载入口。 |
| 相关工具 | 每个工具页都有相关工具入口。 |
| 分类页 | `/tools`、`/image-tools`、`/pdf-tools` 都能找到新增工具。 |

### 12.2 多语言验收

| 验收项 | 标准 |
| --- | --- |
| 英文 | 新页面英文文案完整。 |
| 中文 | 新页面中文文案完整。 |
| 语言切换 | 切换语言后，标题、按钮、FAQ、结果提示同步切换。 |
| 路由跳转 | 切换语言后跳转页面，语言状态不丢失。 |

### 12.3 SEO 验收

| 验收项 | 标准 |
| --- | --- |
| title | 每个新增页面都有独立 title。 |
| description | 每个新增页面都有独立 description。 |
| h1 | 每个新增页面只有一个主要 h1。 |
| sitemap | `/sitemap.xml` 包含新增页面。 |
| robots | `/robots.txt` 指向 sitemap。 |
| FAQ | P0 工具页至少有 3 个 FAQ。 |

### 12.4 统计验收

| 验收项 | 标准 |
| --- | --- |
| 页面访问 | Cloudflare 或 GA4 能看到页面访问。 |
| 热门页面 | 能看到哪些工具页访问最多。 |
| 工具事件 | 至少能记录开始处理、处理成功、处理失败。 |
| 隐私 | 不记录文件内容、文件名原文、输入文本原文。 |

### 12.5 构建验收

开发完成后至少运行：

```text
npm run typecheck
npm run build
```

如果本机默认 Node 版本过低，使用之前验证过的 Node：

```text
D:\nvm\v24.15.0\node.exe
```

相关命令需要在项目目录执行：

```text
D:\zhizhouAi\myproject
```

## 13. 第二版实施顺序

建议按这个顺序开发：

1. 先补工具目录类型和语言文案。
2. 新增 `/tools` 工具索引页。
3. 新增 `/compress-pdf`。
4. 新增 `/pdf-to-images`。
5. 新增 `/crop-image`。
6. 新增 `/rotate-image`。
7. 给所有重点工具页补 FAQ。
8. 给所有工具页补相关工具推荐。
9. 增加 sitemap 和 robots。
10. 接入 Cloudflare Web Analytics。
11. 统一跑类型检查和构建。
12. 发布后在 Cloudflare 看页面访问和唯一访问者变化。

这样排的原因是：先让工具目录和语言体系能承载更多工具，再逐个补页面，最后补 SEO 和统计。否则先做页面，后面容易漏掉分类入口、语言文案、图标和 sitemap。
