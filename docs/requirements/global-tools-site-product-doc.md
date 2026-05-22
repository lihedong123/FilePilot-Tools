# 全球工具类网站产品文档

## 1. 项目概述

项目名称暂定为 **FilePilot Tools**。

这是一个面向全球用户的在线工具类网站，第一阶段重点做 **图片工具** 和 **PDF 工具**。网站的核心目标不是做一个功能很杂的工具箱，而是先把高频文件处理场景做好，让用户打开页面后可以直接完成：上传文件、设置参数、处理文件、下载结果。

第一版主打方向：

- 图片压缩
- 图片格式转换
- 图片尺寸调整
- 图片转 PDF
- PDF 合并
- PDF 拆分
- PDF 转图片
- QR 码生成

核心卖点：

> 文件直接在浏览器本地处理，默认不上传到服务器。

这个卖点适合全球用户，因为合同、简历、证件照、作业、公司资料、截图等文件都有隐私顾虑。工具站如果能明确告诉用户“文件不离开你的设备”，会比普通转换工具更容易获得信任。

## 2. 产品定位

### 2.1 一句话定位

一个简单、快速、隐私友好的在线 PDF 和图片工具站。

英文表达：

> Free online PDF and image tools that process files directly in your browser.

中文表达：

> 免费在线 PDF 和图片工具，文件直接在浏览器里处理。

### 2.2 产品风格

产品风格要直接，不做复杂宣传页，不做过度动画。用户进入网站的目的通常很明确：处理一个文件。所以页面要把“选择文件”和“开始处理”放在最明显的位置。

视觉方向：

- 干净
- 轻量
- 专业
- 操作明确
- 移动端可用

不建议的方向：

- 首页大段品牌介绍
- 太多渐变和装饰
- 工具入口藏得太深
- 每个工具都要求登录
- 第一次使用就弹很多广告

## 3. 目标用户

### 3.1 核心用户

1. 学生

需要处理作业、论文、课件、截图、PDF 文件。

常见需求：

- 压缩图片
- 图片转 PDF
- PDF 拆分
- PDF 合并
- PDF 转图片

2. 办公人员

需要处理合同、报表、扫描件、简历、截图、文档附件。

常见需求：

- PDF 合并
- PDF 压缩
- 图片压缩
- 图片尺寸调整
- 图片格式转换

3. 内容创作者

需要处理封面图、社交媒体图片、电商图片、博客配图。

常见需求：

- 图片压缩
- 图片尺寸调整
- PNG 转 JPG
- JPG 转 WebP
- 批量处理图片

4. 开发者和站长

需要处理网站图片、二维码、图标、WebP、Base64 等内容。

常见需求：

- WebP 转换
- 图片压缩
- QR 码生成
- 图片尺寸调整
- Base64 编码解码

### 3.2 用户特点

- 不想学习复杂软件
- 不想下载安装工具
- 希望马上完成任务
- 对文件上传有一定顾虑
- 对广告能接受，但不能影响核心操作

## 4. 核心竞争点

### 4.1 本地处理

网站要明确展示：

- Your files stay on your device.
- No upload required for supported tools.
- Processing happens in your browser.

对应中文：

- 文件保留在你的设备上。
- 支持的工具不需要上传文件。
- 处理过程在浏览器中完成。

这不是装饰文案，而是产品信任点。建议在每个工具页的上传区域下方都显示一行简短说明。

### 4.2 打开即用

用户不需要注册账号就能使用第一版所有基础工具。

后续如果要做会员，可以限制高级能力，而不是限制基础能力。

适合放到会员里的能力：

- 更大的单文件体积
- 批量处理更多文件
- 无广告
- 处理历史
- 云端保存
- 更高级的压缩选项

### 4.3 页面轻

工具站非常吃加载速度。用户搜索进来后，如果页面加载慢，很容易直接离开。

要求：

- 首页首屏尽量少依赖大型库
- PDF 相关库按页面懒加载
- 图片处理库按工具页加载
- 不要在首页加载所有工具代码

## 5. 第一版功能范围

第一版不要做太大。建议先做 8 个工具。

| 优先级 | 工具 | 页面路径 | 说明 |
| --- | --- | --- | --- |
| P0 | 图片压缩 | `/image-compressor` | 最适合作为第一个主工具 |
| P0 | 图片格式转换 | `/image-converter` | JPG、PNG、WebP 互转 |
| P0 | 图片转 PDF | `/image-to-pdf` | 用户需求高，实现相对清晰 |
| P0 | PDF 合并 | `/merge-pdf` | 全球搜索量稳定 |
| P1 | PDF 拆分 | `/split-pdf` | 和 PDF 合并配套 |
| P1 | PDF 转图片 | `/pdf-to-images` | 需要 PDF 渲染能力 |
| P1 | 图片尺寸调整 | `/resize-image` | 内容创作者常用 |
| P2 | QR 码生成 | `/qr-code-generator` | 实现简单，适合补流量 |

## 6. 页面结构

### 6.1 首页

首页目标：

- 告诉用户这是做什么的
- 让用户快速进入工具
- 让搜索引擎理解网站结构

首页模块：

1. 顶部导航
2. 首屏工具入口
3. 热门工具列表
4. 分类工具列表
5. 隐私说明
6. 页脚

首页原型：

```text
┌────────────────────────────────────────────────────────┐
│ FilePilot Tools       Image Tools  PDF Tools  QR Code  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Free Online PDF & Image Tools                        │
│  Process files directly in your browser.              │
│                                                        │
│  [ Compress Image ] [ Convert Image ] [ Image to PDF ] │
│                                                        │
├────────────────────────────────────────────────────────┤
│ Popular Tools                                          │
│                                                        │
│ ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│ │ Compress Image │ │ Convert Image  │ │ Image to PDF │ │
│ │ Reduce size    │ │ JPG PNG WebP   │ │ Create PDF   │ │
│ └────────────────┘ └────────────────┘ └──────────────┘ │
│                                                        │
│ ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│ │ Merge PDF      │ │ Split PDF      │ │ Resize Image │ │
│ │ Combine files  │ │ Extract pages  │ │ Change size  │ │
│ └────────────────┘ └────────────────┘ └──────────────┘ │
│                                                        │
├────────────────────────────────────────────────────────┤
│ Your files stay on your device for browser tools.      │
└────────────────────────────────────────────────────────┘
```

### 6.2 工具详情页

所有工具页保持统一结构，减少用户学习成本。

工具页模块：

1. 顶部导航
2. 工具标题和一句说明
3. 上传区域
4. 参数设置区域
5. 操作按钮
6. 结果区域
7. 常见问题
8. 相关工具

图片压缩页原型：

```text
┌────────────────────────────────────────────────────────┐
│ FilePilot Tools       Image Tools  PDF Tools  QR Code  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Compress Image                                       │
│  Reduce image file size directly in your browser.     │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │                                                    │ │
│ │             Drag and drop images here              │ │
│ │                 or choose files                    │ │
│ │                                                    │ │
│ └────────────────────────────────────────────────────┘ │
│  Files are processed locally in your browser.          │
│                                                        │
│  Quality                                               │
│  [----------------------●--------] 80%                 │
│                                                        │
│  Output format                                         │
│  [ Same as original ] [ JPG ] [ PNG ] [ WebP ]         │
│                                                        │
│  [ Compress Images ]                                  │
│                                                        │
│  Result                                                │
│ ┌──────────────┬──────────────┬──────────────┬───────┐ │
│ │ File         │ Original     │ New size     │ Action│ │
│ ├──────────────┼──────────────┼──────────────┼───────┤ │
│ │ photo.jpg    │ 2.4 MB       │ 840 KB       │ Save  │ │
│ └──────────────┴──────────────┴──────────────┴───────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 6.3 分类页

分类页用于 SEO 和用户浏览。

建议分类：

- `/image-tools`
- `/pdf-tools`
- `/qr-code-generator`

图片工具分类页：

```text
┌────────────────────────────────────────────────────────┐
│ Image Tools                                            │
│ Convert, compress, resize, and create PDFs from images.│
│                                                        │
│ ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│ │ Compress Image │ │ Convert Image  │ │ Resize Image │ │
│ └────────────────┘ └────────────────┘ └──────────────┘ │
│ ┌────────────────┐                                     │
│ │ Image to PDF   │                                     │
│ └────────────────┘                                     │
└────────────────────────────────────────────────────────┘
```

## 7. 移动端设计

移动端用户也很多，尤其是学生和普通办公用户。移动端不要做复杂左右布局。

移动端规则：

- 顶部只保留 Logo 和菜单按钮
- 上传区域放在标题下方
- 工具设置单列展示
- 结果列表用卡片，不用宽表格
- 下载按钮要明显

移动端工具页原型：

```text
┌────────────────────────┐
│ FilePilot Tools   Menu │
├────────────────────────┤
│ Compress Image         │
│ Reduce image size in   │
│ your browser.          │
│                        │
│ ┌────────────────────┐ │
│ │ Choose Images      │ │
│ │ or drop files here │ │
│ └────────────────────┘ │
│                        │
│ Quality                │
│ [----------●-----] 80% │
│                        │
│ Output                 │
│ [ Same ] [ JPG ]       │
│ [ PNG  ] [ WebP ]      │
│                        │
│ [ Compress Images ]    │
│                        │
│ Result                 │
│ ┌────────────────────┐ │
│ │ photo.jpg          │ │
│ │ 2.4 MB -> 840 KB   │ │
│ │ [ Download ]       │ │
│ └────────────────────┘ │
└────────────────────────┘
```

## 8. 具体工具需求

### 8.1 图片压缩

页面路径：

`/image-compressor`

核心能力：

- 支持 JPG、PNG、WebP
- 支持多文件
- 可设置压缩质量
- 显示压缩前大小
- 显示压缩后大小
- 显示压缩比例
- 支持单个下载
- 支持全部下载

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| quality | 80 | 压缩质量 |
| outputFormat | same | 默认保持原格式 |
| maxWidth | empty | 第一版可以不显示 |
| maxHeight | empty | 第一版可以不显示 |

结果展示：

| 字段 | 说明 |
| --- | --- |
| fileName | 文件名 |
| originalSize | 原始大小 |
| compressedSize | 压缩后大小 |
| savedPercent | 节省比例 |
| action | 下载 |

边界情况：

- 文件不是图片时提示格式不支持
- 文件体积太大时提示浏览器可能处理较慢
- 压缩后比原图更大时，提示可降低质量或保持原文件

### 8.2 图片格式转换

页面路径：

`/image-converter`

核心能力：

- JPG 转 PNG
- PNG 转 JPG
- JPG 转 WebP
- PNG 转 WebP
- WebP 转 JPG
- WebP 转 PNG
- 支持批量转换

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| outputFormat | webp | 默认转 WebP |
| quality | 90 | 只对有损格式生效 |
| backgroundColor | white | PNG 转 JPG 时使用 |

重点说明：

PNG 有透明背景，转 JPG 时会丢失透明信息，所以要提供背景色设置。默认白色。

### 8.3 图片尺寸调整

页面路径：

`/resize-image`

核心能力：

- 按宽度调整
- 按高度调整
- 保持比例
- 自定义宽高
- 批量处理

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| width | empty | 目标宽度 |
| height | empty | 目标高度 |
| keepAspectRatio | true | 保持比例 |
| outputFormat | same | 保持原格式 |

边界情况：

- 只填宽度时，按比例计算高度
- 只填高度时，按比例计算宽度
- 宽高都填且保持比例开启时，以宽度优先

### 8.4 图片转 PDF

页面路径：

`/image-to-pdf`

核心能力：

- 多张图片生成一个 PDF
- 支持排序
- 支持页面方向
- 支持页面尺寸
- 支持边距设置
- 支持下载 PDF

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| pageSize | A4 | PDF 页面尺寸 |
| orientation | auto | 自动、竖向、横向 |
| margin | 10 | 页面边距，单位 mm |
| fitMode | contain | 图片完整放入页面 |

交互要求：

- 上传后显示图片缩略图
- 用户可以拖拽调整顺序
- 删除单张图片
- 点击生成 PDF

### 8.5 PDF 合并

页面路径：

`/merge-pdf`

核心能力：

- 上传多个 PDF
- 调整 PDF 顺序
- 合并为一个 PDF
- 下载结果

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| fileOrder | upload order | 默认上传顺序 |
| outputFileName | merged.pdf | 输出文件名 |

交互要求：

- 显示每个 PDF 文件名
- 显示每个 PDF 页数
- 支持拖拽排序
- 支持移除文件

### 8.6 PDF 拆分

页面路径：

`/split-pdf`

核心能力：

- 上传一个 PDF
- 选择页码范围
- 导出选中页面

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| pageRange | all | 默认全部页面 |
| splitMode | range | 按页码范围拆分 |

页码输入示例：

- `1-3`
- `2,4,6`
- `1-3,8,10-12`

### 8.7 PDF 转图片

页面路径：

`/pdf-to-images`

核心能力：

- 上传 PDF
- 选择输出格式
- 设置清晰度
- 每页导出为图片
- 支持全部下载

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| outputFormat | jpg | 输出 JPG 或 PNG |
| scale | 2 | 渲染清晰度 |
| pageRange | all | 页码范围 |

注意：

这个工具会比图片压缩更吃浏览器性能。第一版要限制单次处理页数，避免用户一次处理几百页导致浏览器卡住。

### 8.8 QR 码生成

页面路径：

`/qr-code-generator`

核心能力：

- 输入文字或链接
- 生成 QR 码
- 下载 PNG
- 支持颜色设置
- 支持尺寸设置

参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| content | empty | QR 内容 |
| size | 512 | 图片尺寸 |
| foreground | #111827 | 前景色 |
| background | #ffffff | 背景色 |

## 9. 技术方案

### 9.1 推荐技术栈

如果从零开始，建议使用：

- Vite
- Vue 3
- TypeScript
- Vue Router
- Pinia
- i18n
- CSS 变量或 UnoCSS

如果想更适合 SEO，也可以用：

- Nuxt 3

建议选择：

> 第一版用 Nuxt 3。

原因：

- 工具站需要 SEO
- 每个工具页都需要独立标题和描述
- 分类页和内容页更容易被搜索引擎收录
- 后续做多语言更方便

### 9.2 前端处理库建议

| 功能 | 推荐库 | 说明 |
| --- | --- | --- |
| PDF 创建和合并 | `pdf-lib` | 适合创建、合并、拆分 PDF |
| PDF 渲染 | `pdfjs-dist` | 适合 PDF 转图片 |
| 图片压缩 | Canvas API | 第一版可以直接用浏览器能力 |
| 图片转 PDF | `pdf-lib` | 把图片嵌入 PDF |
| QR 码 | `qrcode` | 生成 QR 码 |
| 拖拽排序 | `vuedraggable` | 图片和 PDF 排序 |
| 文件下载 | Blob + URL API | 浏览器原生能力 |

### 9.3 不建议第一版就做后端

第一版核心工具可以不做后端。

原因：

- 降低开发成本
- 降低服务器费用
- 更容易强调隐私
- 上线更快

后端适合后续做：

- 登录
- 会员
- 支付
- 使用次数统计
- 云端大文件处理
- 处理历史

### 9.4 项目目录建议

如果使用 Nuxt 3，可以按下面结构：

```text
D:\zhizhouAi\myproject
├── app.vue
├── nuxt.config.ts
├── package.json
├── pages
│   ├── index.vue
│   ├── image-compressor.vue
│   ├── image-converter.vue
│   ├── image-to-pdf.vue
│   ├── merge-pdf.vue
│   ├── split-pdf.vue
│   ├── pdf-to-images.vue
│   ├── resize-image.vue
│   └── qr-code-generator.vue
├── components
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── ToolCard.vue
│   ├── FileDropzone.vue
│   ├── ResultList.vue
│   └── LocalProcessingNotice.vue
├── composables
│   ├── useImageCompressor.ts
│   ├── useImageConverter.ts
│   ├── useImageToPdf.ts
│   ├── useMergePdf.ts
│   ├── useSplitPdf.ts
│   └── useDownloadFile.ts
├── utils
│   ├── fileSize.ts
│   ├── image.ts
│   ├── pdf.ts
│   └── pageRange.ts
└── locales
    ├── en.json
    ├── zh-CN.json
    ├── es.json
    ├── pt.json
    └── hi.json
```

## 10. 组件设计

### 10.1 AppHeader

用途：

- 展示 Logo
- 展示导航
- 移动端菜单

导航项：

- Image Tools
- PDF Tools
- QR Code

### 10.2 ToolCard

用途：

- 首页和分类页展示工具入口

字段：

| 字段 | 说明 |
| --- | --- |
| title | 工具名称 |
| description | 简短说明 |
| href | 工具链接 |
| icon | 图标 |

### 10.3 FileDropzone

用途：

- 所有需要上传文件的工具共用

能力：

- 点击选择文件
- 拖拽上传
- 显示支持格式
- 显示已选择文件
- 删除文件

注意：

这里的“上传”只是用户选择本地文件，不代表传到服务器。页面文案要避免让用户误会。

### 10.4 LocalProcessingNotice

用途：

- 显示本地处理说明

文案：

> Files are processed directly in your browser and are not uploaded to our server.

建议放在上传区域下面。

### 10.5 ResultList

用途：

- 展示处理结果

能力：

- 展示文件名
- 展示处理前后大小
- 展示状态
- 下载单个文件
- 下载全部文件

## 11. SEO 方案

### 11.1 URL 设计

URL 要短、清楚、包含关键词。

建议路径：

| 页面 | URL |
| --- | --- |
| 首页 | `/` |
| 图片工具 | `/image-tools` |
| PDF 工具 | `/pdf-tools` |
| 图片压缩 | `/image-compressor` |
| 图片格式转换 | `/image-converter` |
| 图片转 PDF | `/image-to-pdf` |
| 图片尺寸调整 | `/resize-image` |
| PDF 合并 | `/merge-pdf` |
| PDF 拆分 | `/split-pdf` |
| PDF 转图片 | `/pdf-to-images` |
| QR 码生成 | `/qr-code-generator` |

### 11.2 页面标题

| 页面 | Title |
| --- | --- |
| 首页 | Free Online PDF and Image Tools |
| 图片压缩 | Compress Image Online - Reduce Image Size in Browser |
| 图片格式转换 | Convert Image Online - JPG PNG WebP Converter |
| 图片转 PDF | Image to PDF Converter Online |
| PDF 合并 | Merge PDF Online - Combine PDF Files |
| PDF 拆分 | Split PDF Online - Extract PDF Pages |
| PDF 转图片 | PDF to Image Converter Online |
| QR 码生成 | QR Code Generator Online |

### 11.3 页面描述

图片压缩页示例：

> Compress JPG, PNG, and WebP images online. Reduce image file size directly in your browser without uploading files.

PDF 合并页示例：

> Merge multiple PDF files into one PDF online. Reorder files and combine them directly in your browser.

### 11.4 内容结构

每个工具页都要有这些内容：

- H1：工具名称
- 一句话说明
- 工具操作区
- 相关工具
- FAQ

FAQ 示例：

1. Are my files uploaded?
2. Is this tool free?
3. What file formats are supported?
4. Can I use it on mobile?
5. Why is processing slow for large files?

### 11.5 多语言 SEO

第一阶段先做英文。

第二阶段加：

- 简体中文：`/zh-cn`
- 西班牙语：`/es`
- 葡萄牙语：`/pt`
- 印地语：`/hi`

多语言页面例子：

```text
/image-compressor
/zh-cn/image-compressor
/es/image-compressor
/pt/image-compressor
/hi/image-compressor
```

每个语言版本要配置 `hreflang`。

## 12. 盈利方案

### 12.1 第一阶段：广告

适合工具站的广告位置：

- 工具操作区下方
- 结果区下方
- FAQ 上方
- 分类页工具列表中间

不建议：

- 上传按钮附近放干扰广告
- 下载按钮旁边放假按钮广告
- 首屏弹窗广告

原因很简单：工具站靠信任和复用，广告如果影响核心操作，用户会直接走。

### 12.2 第二阶段：会员

会员能力：

- 无广告
- 更大文件限制
- 批量处理更多文件
- 高级压缩选项
- 历史记录
- 云端保存

会员不建议太早做。先验证流量和工具使用频率。

### 12.3 第三阶段：API

如果网站有稳定流量，可以做开发者 API。

API 适合：

- 图片压缩 API
- PDF 合并 API
- 图片转 PDF API
- QR 码生成 API

这属于后期方向，不放进第一版。

## 13. 数据统计

第一版需要统计，但不要过度采集。

建议统计：

- 页面访问量
- 工具使用次数
- 点击处理按钮次数
- 下载结果次数
- 错误次数
- 文件类型
- 文件数量

不建议统计：

- 文件名
- 文件内容
- 文件正文
- 用户本地路径

隐私说明要明确：不收集用户文件内容。

## 14. 性能要求

### 14.1 首页

目标：

- 首屏快速展示
- 不加载 PDF 处理库
- 不加载图片处理重库
- 工具卡片静态渲染

### 14.2 工具页

目标：

- 进入页面后快速显示上传区域
- 用户选择文件后再加载处理逻辑
- 大文件处理时显示进度或处理中状态

### 14.3 文件处理限制建议

第一版可以设置前端限制：

| 类型 | 限制 |
| --- | --- |
| 图片单文件 | 20 MB |
| 图片批量数量 | 20 张 |
| PDF 单文件 | 50 MB |
| PDF 合并数量 | 10 个 |
| PDF 转图片页数 | 50 页 |

这些限制不是为了卡用户，而是为了避免浏览器卡死。

## 15. 隐私说明

每个工具页都应该有一句短说明：

> Files are processed in your browser and are not uploaded to our server.

隐私页要写清楚：

- 支持本地处理的工具不会上传文件
- 网站可能统计匿名使用数据
- 广告服务可能使用 Cookie
- 不读取用户文件内容
- 不保存用户文件

## 16. 错误提示

错误提示要直接。

示例：

| 场景 | 英文提示 |
| --- | --- |
| 文件格式不支持 | This file type is not supported. |
| 文件太大 | This file is too large for browser processing. |
| PDF 加载失败 | Failed to read this PDF file. |
| 图片读取失败 | Failed to read this image. |
| 没有选择文件 | Choose at least one file first. |
| 页码格式错误 | Enter a valid page range, such as 1-3 or 1,4,8. |

## 17. 视觉设计规范

### 17.1 颜色

建议使用克制的颜色：

```text
背景色：#f8fafc
页面主背景：#ffffff
主文字：#111827
次级文字：#6b7280
边框：#e5e7eb
主色：#2563eb
成功色：#16a34a
错误色：#dc2626
```

### 17.2 字体

英文：

```text
Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

中文：

```text
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif
```

### 17.3 间距

建议：

- 页面左右最大宽度：`1120px`
- 页面左右内边距：桌面 `24px`，移动端 `16px`
- 卡片间距：`16px`
- 区块上下间距：`48px`
- 按钮高度：`40px` 到 `44px`

### 17.4 组件风格

- 卡片圆角不要太大，建议 `8px`
- 按钮文字清楚
- 上传区域要大
- 状态提示要靠近操作区
- 不使用复杂阴影

## 18. 开发计划

### 18.1 第一周

目标：搭好项目和首页。

任务：

- 初始化 Nuxt 3 项目
- 配置基础布局
- 创建首页
- 创建工具卡片组件
- 创建顶部导航和页脚
- 配置基础 SEO

### 18.2 第二周

目标：完成图片工具。

任务：

- 图片压缩
- 图片格式转换
- 图片尺寸调整
- 图片转 PDF
- 文件选择组件
- 结果下载组件

### 18.3 第三周

目标：完成 PDF 工具。

任务：

- PDF 合并
- PDF 拆分
- PDF 转图片
- PDF 页码解析
- PDF 排序和删除

### 18.4 第四周

目标：上线前完善。

任务：

- 移动端适配
- SEO 文案
- FAQ
- 隐私页
- 错误提示
- 基础统计
- 部署上线

## 19. 验收标准

### 19.1 功能验收

- 首页能进入所有工具页
- 图片压缩能处理 JPG、PNG、WebP
- 图片转换能正常下载结果
- 图片转 PDF 能生成 PDF
- PDF 合并能按顺序合并
- PDF 拆分能按页码范围导出
- PDF 转图片能按页导出图片
- QR 码能生成并下载

### 19.2 页面验收

- 桌面端布局正常
- 移动端布局正常
- 上传区域清楚
- 处理按钮清楚
- 下载按钮清楚
- 错误提示能看懂

### 19.3 SEO 验收

- 每个工具页有独立 title
- 每个工具页有独立 description
- 每个工具页只有一个 H1
- 首页能链接到所有核心工具
- 分类页能链接到对应工具

### 19.4 隐私验收

- 本地处理工具不向服务器上传文件
- 页面文案明确说明本地处理
- 隐私页说明不保存用户文件

## 20. 上线方案

### 20.1 部署方式

第一版推荐静态部署。

可选平台：

- Vercel
- Netlify
- Cloudflare Pages

如果使用 Nuxt 3，可以生成静态站点：

```bash
npm run generate
```

### 20.2 域名建议

域名要短、好记、偏英文。

方向：

- `filepilot.tools`
- `quickfiletools.com`
- `browserfiletools.com`
- `clearfiletools.com`
- `snapfiletools.com`

建议优先选 `.com`，如果拿不到再考虑 `.tools`。

### 20.3 上线前检查

- Google Search Console
- Bing Webmaster Tools
- Sitemap
- robots.txt
- 页面 title
- 页面 description
- favicon
- 隐私政策
- 联系方式

## 21. 后续路线图

### 21.1 第二版

- 多语言
- 批量下载 ZIP
- 图片裁剪
- PDF 压缩
- PDF 加水印
- PDF 旋转
- Base64 编码解码

### 21.2 第三版

- 登录
- 无广告会员
- 云端大文件处理
- 处理历史
- 收藏常用工具

### 21.3 第四版

- 开发者 API
- Chrome 插件
- 桌面端小工具
- 团队版

## 22. 第一版最小可用版本

如果想最快上线，不要一开始做 8 个工具。可以先做 4 个：

1. 图片压缩
2. 图片格式转换
3. 图片转 PDF
4. PDF 合并

这 4 个工具覆盖面比较广，也适合做首页核心入口。

最小可用版本页面：

```text
D:\zhizhouAi\myproject
├── 首页
├── 图片压缩
├── 图片格式转换
├── 图片转 PDF
└── PDF 合并
```

上线后根据访问数据决定继续补哪些工具。

## 23. 建议的第一步

建议下一步直接在 `D:\zhizhouAi\myproject` 创建 Nuxt 3 项目，并先完成：

1. 首页
2. 顶部导航
3. 工具卡片
4. 图片压缩页
5. 图片转 PDF 页

先把这两个工具做通，再补 PDF 合并和图片格式转换。这样项目很快能跑起来，也能尽早验证页面和工具体验。
