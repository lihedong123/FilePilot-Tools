# FilePilot Tools 需求文档

## 1. 文档说明

### 1.1 文档目的

本文档根据当前原型整理，用于指导后续正式开发。

原型来源：

```text
D:\zhizhouAi\myproject\prototype\index.html
```

已有产品方向文档：

```text
D:\zhizhouAi\myproject\global-tools-site-product-doc.md
```

已有开发规范文档：

```text
D:\zhizhouAi\myproject\development-guidelines.md
```

本文档重点说明：

- 页面要做什么
- 每个功能怎么操作
- 用户看到什么内容
- 处理结果怎么展示
- 哪些地方需要真实实现
- 哪些地方现在只是原型模拟
- 移动端和多语言要满足什么要求
- 开发完成后按什么标准验收

### 1.2 项目名称

暂定项目名称：

```text
FilePilot Tools
```

后续如果修改项目名称，需要同步修改：

- 页面顶部品牌名称
- 浏览器标题
- 首页标题或相关说明
- 页脚文案
- 中英文语言包
- SEO 标题和描述

### 1.3 原型范围

当前原型是单文件原型，不是正式项目结构。

原型文件：

```text
D:\zhizhouAi\myproject\prototype\index.html
```

原型中包含 5 个页面状态：

| 页面 | 原型状态 | 后续正式页面建议 |
| --- | --- | --- |
| 首页 | 已有 | `/` |
| 图片压缩页 | 已有 | `/image-compressor` |
| 图片转换页 | 已有 | `/image-converter` |
| 图片转 PDF 页 | 已有 | `/image-to-pdf` |
| PDF 合并页 | 已有 | `/merge-pdf` |

原型中首页还展示了 2 个后续工具入口：

| 工具 | 当前状态 | 后续正式页面建议 |
| --- | --- | --- |
| PDF 拆分 | 首页卡片已有，详情页未做 | `/split-pdf` |
| 图片尺寸调整 | 首页卡片已有，详情页未做 | `/resize-image` |

## 2. 产品定位

### 2.1 一句话说明

英文：

```text
Free online PDF and image tools that process files directly in your browser.
```

中文：

```text
免费在线 PDF 和图片工具，文件直接在浏览器里处理。
```

### 2.2 产品目标

第一版目标是做一个简单、快速、隐私友好的在线文件处理网站。

用户打开页面后，应该能很快完成这些事情：

1. 找到要用的工具。
2. 选择本地文件。
3. 设置必要参数。
4. 点击处理按钮。
5. 查看结果。
6. 下载处理后的文件。

### 2.3 核心卖点

核心卖点是：

```text
文件直接在浏览器中处理，不会上传到服务器。
```

英文文案：

```text
Files are processed directly in your browser and are not uploaded to our server.
```

这个文案必须靠近文件选择区域展示，不要只放在页脚或隐私页里。

### 2.4 第一版不做的内容

第一版不做：

- 登录
- 注册
- 会员
- 支付
- 云端保存
- 文件处理历史
- 后台文件处理
- 用户文件上传保存
- 开发者 API

原因：

第一版先把工具操作流程做通。用户能打开页面、处理文件、下载结果，比先做复杂账号体系更重要。

## 3. 用户和使用场景

### 3.1 目标用户

| 用户类型 | 典型需求 |
| --- | --- |
| 学生 | 压缩作业图片、截图转 PDF、合并 PDF 资料 |
| 办公人员 | 合并合同 PDF、转换图片格式、压缩附件 |
| 内容创作者 | 压缩图片、转换 WebP、调整图片体积 |
| 普通手机用户 | 快速把图片整理成 PDF，或减小图片大小后发送 |

### 3.2 用户使用特点

用户通常不是来浏览内容的，而是来处理文件的。

所以页面要满足：

- 首屏能看到工具入口或文件选择区域。
- 按钮文案直接说明动作。
- 参数不要过多。
- 结果区要清楚显示下载按钮。
- 不要在核心操作前强制登录。
- 不要用广告遮挡上传、处理、下载按钮。

## 4. 页面总结构

### 4.1 顶部导航

顶部导航在所有页面展示。

桌面端内容：

| 区域 | 内容 | 要求 |
| --- | --- | --- |
| 品牌区 | FilePilot Tools | 点击后回到首页 |
| 导航区 | Home、Image Tools、PDF Tools、QR Code | 顶部导航需要提供对应入口；QR Code 进入二维码生成页 |
| 语言切换 | EN、中文 | 可切换全站文案 |

移动端要求：

- 不要让导航挤压主体内容。
- 如果正式项目工具更多，移动端可以改为菜单按钮。
- 品牌名称和语言切换必须保留。

### 4.2 页脚

页脚展示：

- FilePilot Tools prototype
- Browser-first PDF and image tools

正式项目可以改为：

- 品牌名称
- 隐私政策
- 联系方式
- 工具分类链接

## 5. 首页需求

### 5.1 页面目标

首页要解决 3 件事：

1. 告诉用户这是一个 PDF 和图片工具站。
2. 让用户快速进入常用工具。
3. 传达文件本地处理的信任点。

### 5.2 首屏内容

首屏左侧内容：

| 元素 | 英文文案 | 中文文案 |
| --- | --- | --- |
| 状态提示 | Browser-first file tools | 优先在浏览器处理文件 |
| 主标题 | Free Online PDF & Image Tools | 免费在线 PDF 和图片工具 |
| 说明 | Process files directly in your browser. Compress images, convert formats, create PDFs, and finish common file tasks without installing extra software. | 文件直接在浏览器里处理。你可以压缩图片、转换格式、创建 PDF，并快速完成常见文件处理任务，不需要安装额外软件。 |

首屏按钮：

| 按钮 | 点击目标 |
| --- | --- |
| Compress Image / 图片压缩 | 进入图片压缩页 |
| Convert Image / 图片转换 | 进入图片转换页 |
| Image to PDF / 图片转 PDF | 进入图片转 PDF 页 |

### 5.3 首页右侧快速面板

右侧快速面板用于展示“图片压缩”的示例。

内容包括：

- Fast image compression / 快速图片压缩
- Choose files, tune quality, download smaller images. / 选择文件，调整质量，下载更小的图片。
- Local / 本地处理
- Drop images here / 把图片拖到这里
- JPG、PNG、WebP 预览
- 示例文件结果

注意：

当前右侧快速面板只是展示效果，不承担真实上传处理能力。正式开发时可以保留为视觉展示，也可以改成可操作入口，但不要让用户误以为这里已经完成处理。

### 5.4 常用工具列表

首页展示 6 个工具卡片。

| 工具 | 英文标题 | 中文标题 | 点击要求 |
| --- | --- | --- | --- |
| 图片压缩 | Compress Image | 图片压缩 | 进入图片压缩页 |
| 图片转换 | Convert Image | 图片转换 | 进入图片转换页 |
| 图片转 PDF | Image to PDF | 图片转 PDF | 进入图片转 PDF 页 |
| PDF 合并 | Merge PDF | PDF 合并 | 进入 PDF 合并页 |
| PDF 拆分 | Split PDF | PDF 拆分 | 第一版可以先展示，后续补详情页 |
| 图片尺寸调整 | Resize Image | 图片尺寸调整 | 第一版可以先展示，后续补详情页 |

卡片要求：

- 整个卡片可点击。
- 图标使用线性图标。
- 标题直接写工具名称。
- 描述只写一句，说明工具能做什么。
- 卡片样式保持白底、细边框、8px 左右圆角。

### 5.5 首页信任说明

首页工具列表下方展示：

英文：

```text
Files are processed directly in your browser for supported tools. This prototype shows the intended product message and page structure before building the real processing logic.
```

中文：

```text
支持的工具会直接在浏览器中处理文件。这个原型先确认产品信息和页面结构，后面再接入真实处理逻辑。
```

正式项目上线时，第二句可以去掉原型说明，改成正式隐私说明。

## 6. 图片压缩页需求

### 6.1 页面路径

正式页面建议：

```text
/image-compressor
```

### 6.2 页面目标

用户选择 JPG、PNG、WebP 图片后，通过质量参数减小图片体积，并下载处理后的图片。

### 6.3 页面结构

页面从上到下包括：

1. 返回全部工具按钮。
2. 工具标题。
3. 工具说明。
4. 文件选择区域。
5. 本地处理说明。
6. 结果区。
7. 压缩设置区。
8. 处理按钮。
9. 相关工具。

桌面端当前原型是左右布局：

- 左侧：文件选择区和结果区。
- 右侧：压缩设置区和处理按钮。

移动端改为单列展示。

### 6.4 标题和说明

标题：

```text
Compress Image
```

中文：

```text
图片压缩
```

说明：

英文：

```text
Reduce image file size directly in your browser. This prototype uses sample output to confirm the interface before real compression is added.
```

中文：

```text
直接在浏览器里减小图片体积。这个原型先用模拟结果确认界面，后面再加入真实压缩功能。
```

正式项目上线时，需要去掉“prototype / 原型”相关表达。

### 6.5 文件选择

支持方式：

- 点击按钮选择图片。
- 拖拽图片到上传区域。

支持格式：

| 格式 | 是否支持 |
| --- | --- |
| JPG / JPEG | 支持 |
| PNG | 支持 |
| WebP | 支持 |
| GIF | 第一版不支持 |
| SVG | 第一版不支持 |

选择文件后，页面要保存用户选择的文件列表，并准备处理。

### 6.6 本地处理说明

文件选择区域下方必须展示：

```text
Files are processed directly in your browser and are not uploaded to our server.
```

中文：

```text
文件直接在浏览器中处理，不会上传到服务器。
```

### 6.7 压缩设置

设置区标题：

```text
Compression Settings
```

中文：

```text
压缩设置
```

参数：

| 参数 | 原型默认值 | 正式默认值 | 要求 |
| --- | --- | --- | --- |
| Quality / 质量 | 76% | 80% 或沿用 76% | 用滑块调整，实时显示百分比 |
| Output format / 输出格式 | Same | Same | 可选 Same、JPG、PNG、WebP |

说明：

- Same 表示保持原格式。
- JPG 和 WebP 可以根据质量参数压缩。
- PNG 压缩能力受浏览器能力影响，正式开发时要明确处理方式。

### 6.8 处理按钮

按钮文案：

```text
Compress Images
```

中文：

```text
压缩图片
```

按钮点击后：

1. 如果没有选择文件，提示用户先选择图片。
2. 如果已经选择文件，开始压缩。
3. 处理中显示状态。
4. 处理完成后展示结果区。

### 6.9 结果区

桌面端使用表格展示。

字段：

| 字段 | 说明 |
| --- | --- |
| File / 文件 | 文件名 |
| Original / 原大小 | 压缩前大小 |
| New size / 新大小 | 压缩后大小 |
| Saved / 节省 | 节省比例 |
| Action / 操作 | 下载按钮 |

移动端使用卡片展示，不使用横向很宽的表格。

每条结果卡片展示：

- 文件名
- 原大小到新大小
- 节省比例
- 下载按钮

### 6.10 当前原型逻辑说明

当前 `D:\zhizhouAi\myproject\prototype\index.html` 里的图片压缩结果是模拟的。

模拟逻辑：

- 根据选择文件的原始大小计算一个模拟压缩后大小。
- 根据质量值计算模拟节省比例。
- 不会真正生成压缩后的图片文件。
- 下载按钮只是结果展示，不具备真实下载能力。

正式开发必须替换为真实图片压缩逻辑。

### 6.11 边界情况

| 场景 | 页面处理 |
| --- | --- |
| 未选择文件就点击压缩 | 提示先选择图片 |
| 选择了非图片文件 | 提示文件格式不支持 |
| 单文件过大 | 提示浏览器处理可能较慢 |
| 压缩失败 | 展示失败原因，允许用户重新处理 |
| 压缩后比原文件更大 | 提示可以降低质量或保留原文件 |

## 7. 图片转换页需求

### 7.1 页面路径

正式页面建议：

```text
/image-converter
```

### 7.2 页面目标

用户选择 JPG、PNG、WebP 图片后，默认转换为 PNG，也可以选择保持原格式或转为 JPG、WebP，并下载结果。

### 7.3 页面结构

页面包括：

1. 返回全部工具按钮。
2. 工具标题。
3. 工具说明。
4. 文件选择区域。
5. 本地处理说明。
6. 结果预览区。
7. 转换设置区。
8. 转换按钮。

### 7.4 标题和说明

标题：

```text
Convert Image
```

中文：

```text
图片转换
```

说明：

英文：

```text
Convert JPG, PNG, and WebP images in your browser. This prototype shows the final tool layout before real conversion is connected.
```

中文：

```text
在浏览器里转换 JPG、PNG 和 WebP 图片。这个原型先展示最终工具布局，后面再接入真实转换功能。
```

正式项目上线时，需要去掉原型说明。

### 7.5 支持格式

输入格式：

| 格式 | 是否支持 |
| --- | --- |
| JPG / JPEG | 支持 |
| PNG | 支持 |
| WebP | 支持 |

输出格式：

| 格式 | 是否支持 |
| --- | --- |
| Same | 支持 |
| JPG | 支持 |
| PNG | 支持 |
| WebP | 支持 |

### 7.6 转换设置

设置区标题：

```text
Conversion Settings
```

中文：

```text
转换设置
```

参数：

| 参数 | 默认值 | 要求 |
| --- | --- | --- |
| Target format / 目标格式 | PNG | 可选 Same、JPG、PNG、WebP |

后续可以增加：

| 参数 | 默认值 | 用途 |
| --- | --- | --- |
| Quality / 质量 | 90% | JPG、WebP 输出时使用 |
| Background color / 背景色 | #ffffff | PNG 转 JPG 时填充透明区域 |

### 7.7 结果预览

当前原型中结果预览区固定展示两条示例：

- photo-large.jpg，将转换为 PNG。
- graphic.png，需要透明背景时保留 PNG。

正式开发时，结果预览要根据用户选择的真实文件生成。

结果区至少展示：

- 文件名
- 原始格式
- 目标格式
- 处理状态
- 下载按钮

### 7.8 边界情况

| 场景 | 页面处理 |
| --- | --- |
| PNG 转 JPG 且图片有透明背景 | 使用背景色填充透明区域 |
| WebP 浏览器兼容问题 | 如果浏览器无法处理，给出明确提示 |
| 转换格式和原格式相同 | 可以直接生成同格式结果，也可以提示无需转换 |
| 批量转换中部分失败 | 成功的允许下载，失败的显示原因 |

## 8. 图片转 PDF 页需求

### 8.1 页面路径

正式页面建议：

```text
/image-to-pdf
```

### 8.2 页面目标

用户选择一张或多张图片，调整顺序和 PDF 页面参数后，生成一个 PDF 文件。

### 8.3 页面结构

页面包括：

1. 返回全部工具按钮。
2. 工具标题。
3. 工具说明。
4. 图片选择区域。
5. 本地处理说明。
6. 图片顺序预览。
7. PDF 设置区。
8. 生成 PDF 按钮。

### 8.4 标题和说明

标题：

```text
Image to PDF
```

中文：

```text
图片转 PDF
```

说明：

英文：

```text
Turn selected images into one PDF. The prototype shows ordering, page settings, and the final download area.
```

中文：

```text
把选中的图片合成一个 PDF。这个原型展示排序、页面设置和最终下载区域。
```

正式项目上线时，需要去掉原型说明。

### 8.5 图片选择

支持：

- 选择单张图片。
- 选择多张图片。
- 拖拽图片。

支持格式：

- JPG / JPEG
- PNG
- WebP

选择后显示图片列表。

### 8.6 图片顺序

当前原型结果区展示图片顺序示例。

正式开发要求：

- 显示每张图片的缩略图。
- 显示文件名。
- 显示页码顺序。
- 支持拖拽排序。
- 支持删除单张图片。

### 8.7 PDF 设置

设置区标题：

```text
PDF Settings
```

中文：

```text
PDF 设置
```

参数：

| 参数 | 默认值 | 要求 |
| --- | --- | --- |
| Page size / 页面尺寸 | A4 | 第一版可先支持 A4 |
| Orientation / 方向 | Auto | 可选 Auto、Portrait、Landscape |

后续可以增加：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| Margin / 边距 | 10mm | 控制图片到页面边缘的距离 |
| Fit mode / 适配方式 | contain | 图片完整显示在页面内 |
| Output name / 输出文件名 | images.pdf | 用户可自定义 |

### 8.8 生成 PDF

按钮文案：

```text
Create PDF
```

中文：

```text
生成 PDF
```

点击后：

1. 检查是否已选择图片。
2. 按当前顺序读取图片。
3. 根据页面尺寸和方向生成 PDF。
4. 生成完成后展示下载按钮。

### 8.9 边界情况

| 场景 | 页面处理 |
| --- | --- |
| 没有选择图片 | 提示先选择图片 |
| 图片读取失败 | 显示失败文件和原因 |
| 图片太大 | 提示可能处理较慢 |
| 方向为 Auto | 根据图片宽高自动判断页面方向 |
| 图片数量较多 | 显示处理进度 |

## 9. PDF 合并页需求

### 9.1 页面路径

正式页面建议：

```text
/merge-pdf
```

### 9.2 页面目标

用户选择多个 PDF 文件，调整顺序后，合并为一个 PDF 并下载。

### 9.3 页面结构

页面包括：

1. 返回全部工具按钮。
2. 工具标题。
3. 工具说明。
4. PDF 文件选择区域。
5. 本地处理说明。
6. PDF 顺序列表。
7. 合并设置区。
8. 合并按钮。

### 9.4 标题和说明

标题：

```text
Merge PDF
```

中文：

```text
PDF 合并
```

说明：

英文：

```text
Combine multiple PDF files into one document. This prototype shows file order, merge settings, and the download result.
```

中文：

```text
把多个 PDF 文件合并成一个文档。这个原型展示文件顺序、合并设置和下载结果。
```

正式项目上线时，需要去掉原型说明。

### 9.5 文件选择

支持：

- 选择多个 PDF 文件。
- 拖拽多个 PDF 文件。

只支持：

```text
.pdf
```

### 9.6 PDF 顺序列表

当前原型固定展示两条示例：

- contract.pdf
- appendix.pdf

正式开发要求：

- 展示每个 PDF 文件名。
- 展示每个 PDF 页数。
- 展示当前顺序编号。
- 支持拖拽排序；为了键盘和移动端操作，也可以保留上移、下移按钮。
- 支持删除单个 PDF。

### 9.7 合并设置

设置区标题：

```text
Merge Settings
```

中文：

```text
合并设置
```

参数：

| 参数 | 默认值 | 要求 |
| --- | --- | --- |
| Output name / 输出文件名 | merged.pdf | 可编辑 |
| File order / 文件顺序 | Upload order | 默认按上传顺序 |

顺序选项：

| 选项 | 说明 |
| --- | --- |
| Upload order / 上传顺序 | 按用户选择或拖入顺序排列 |
| Drag to reorder / 拖拽调整顺序 | 用户手动调整 |

### 9.8 合并按钮

按钮文案：

```text
Merge PDF Files
```

中文：

```text
合并 PDF 文件
```

点击后：

1. 检查是否至少选择 2 个 PDF 文件。
2. 按当前顺序读取 PDF。
3. 合并所有页面。
4. 生成一个 PDF 文件。
5. 展示下载按钮。

### 9.9 边界情况

| 场景 | 页面处理 |
| --- | --- |
| 只选择 1 个 PDF | 提示至少选择 2 个 PDF |
| 文件不是 PDF | 提示格式不支持 |
| PDF 读取失败 | 显示失败文件和原因 |
| PDF 有密码 | 提示暂不支持加密 PDF |
| 文件数量过多 | 提示浏览器处理可能较慢 |

## 10. 后续工具需求

### 10.1 PDF 拆分

当前首页已有入口，详情页未做。

正式路径建议：

```text
/split-pdf
```

核心需求：

- 上传一个 PDF。
- 输入页码范围。
- 导出指定页面为新 PDF。

页码范围示例：

```text
1-3
2,4,6
1-3,8,10-12
```

基本参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| pageRange | all | 默认全部页面 |
| splitMode | range | 按页码范围导出 |
| outputName | split.pdf | 输出文件名 |

### 10.2 图片尺寸调整

当前首页已有入口，详情页未做。

正式路径建议：

```text
/resize-image
```

核心需求：

- 上传图片。
- 输入目标宽度。
- 输入目标高度。
- 可选择是否保持比例。
- 下载调整后的图片。

基本参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| width | 空 | 目标宽度 |
| height | 空 | 目标高度 |
| keepAspectRatio | true | 保持比例 |
| outputFormat | same | 保持原格式 |

规则：

- 只填宽度时，根据原图比例计算高度。
- 只填高度时，根据原图比例计算宽度。
- 宽高都填且保持比例开启时，以宽度为准。

### 10.3 QR 码生成

正式路径：

```text
/qr-code-generator
```

核心需求：

- 输入文字或链接。
- 上传 JPG、PNG、WebP 图片，先在浏览器里压缩成二维码可承载的小图内容，再生成二维码。
- 设置二维码尺寸。
- 设置前景色。
- 设置背景色。
- 设置留白。
- 生成二维码预览。
- 下载 PNG 图片。

基本参数：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| inputMode | text | 输入方式，支持文字/链接和图片 |
| content | `https://filepilot.tools` | 二维码内容 |
| imageFile | 无 | 用户上传的图片文件 |
| imageContent | 无 | 压缩后写入二维码的图片 Data URL |
| size | 512 | 输出图片尺寸，单位 px |
| foreground | `#111827` | 二维码前景色 |
| background | `#ffffff` | 二维码背景色 |
| margin | 2 | 二维码留白 |

交互要求：

- 内容为空时不能生成，提示用户先输入文字或链接。
- 图片模式下没有选择图片时不能生成，提示用户先选择图片。
- 图片选择后显示文件名和文件大小，支持移除后重新选择。
- 图片读取为浏览器本地内容后，先压缩为小图内容再生成二维码，不上传到服务器。
- 图片压缩后仍超过单个二维码容量时，需要提示用户换更小或更简单的图片。
- 修改内容、尺寸或颜色后，旧预览失效，需要重新生成。
- 下载文件名使用 `qr-code.png`。
- 生成过程在浏览器中完成，不上传到服务器。

## 11. 多语言需求

### 11.1 支持语言

第一版支持：

| 语言 | 标识 |
| --- | --- |
| 英文 | `en` |
| 简体中文 | `zh` 或 `zh-CN` |

### 11.2 切换范围

语言切换必须影响：

- 浏览器标题
- 顶部导航
- 首页首屏
- 首页工具卡片
- 工具详情页标题
- 工具详情页说明
- 上传区域文案
- 本地处理说明
- 设置区文案
- 按钮文案
- 结果区表头
- 结果区动态文案
- 页脚文案

### 11.3 语言数据要求

正式项目建议把文案从原型文件中拆出。

建议路径：

```text
D:\zhizhouAi\myproject\locales\en.json
D:\zhizhouAi\myproject\locales\zh-CN.json
```

新增页面或组件时，不能只写英文硬编码。中英文必须同时补齐。

## 12. 文件选择组件需求

### 12.1 组件目标

正式项目建议抽出统一文件选择组件，所有工具页共用。

建议组件路径：

```text
D:\zhizhouAi\myproject\components\FileDropzone.vue
```

### 12.2 组件能力

必须支持：

- 点击选择文件。
- 拖拽文件。
- 多文件选择。
- 限制文件格式。
- 显示已选择文件。
- 删除单个文件。
- 清空全部文件。
- 显示本地处理说明。

### 12.3 组件配置

建议配置字段：

| 字段 | 说明 |
| --- | --- |
| accept | 支持的文件类型 |
| multiple | 是否支持多文件 |
| maxFiles | 最大文件数 |
| maxFileSize | 单文件最大体积 |
| titleKey | 上传区标题语言 key |
| descriptionKey | 上传区说明语言 key |

## 13. 结果组件需求

### 13.1 组件目标

正式项目建议抽出统一结果组件。

建议组件路径：

```text
D:\zhizhouAi\myproject\components\ResultList.vue
```

### 13.2 桌面端展示

桌面端可以使用表格。

常见字段：

- 文件名
- 原始大小
- 处理后大小
- 节省比例
- 输出格式
- 处理状态
- 下载按钮

不同工具可以按需要隐藏部分字段。

### 13.3 移动端展示

移动端必须使用卡片。

原因：

表格在手机上容易横向溢出，用户看不清，也不好点击下载按钮。

每张卡片至少展示：

- 文件名
- 处理结果摘要
- 状态
- 下载按钮

## 14. 本地处理和隐私需求

### 14.1 页面展示

每个本地处理工具页都要展示：

```text
Files are processed directly in your browser and are not uploaded to our server.
```

中文：

```text
文件直接在浏览器中处理，不会上传到服务器。
```

### 14.2 功能要求

第一版所有已实现工具都应在浏览器本地处理。

不应把用户文件上传到服务器。

### 14.3 统计限制

可以统计：

- 页面访问
- 工具按钮点击
- 处理成功次数
- 处理失败次数
- 文件类型
- 文件数量

不应统计：

- 文件名
- 文件内容
- 用户本地路径
- PDF 正文
- 图片内容

## 15. 移动端需求

### 15.1 布局要求

移动端要求：

- 页面单列展示。
- 顶部导航不能遮挡内容。
- 工具设置区放在文件选择区附近。
- 上传区域高度不小于 240px。
- 按钮宽度适合手指点击。
- 结果表格改为卡片。
- 文案不能溢出容器。

### 15.2 工具页移动端顺序

推荐顺序：

1. 工具标题。
2. 工具说明。
3. 设置区。
4. 文件选择区。
5. 本地处理说明。
6. 处理按钮。
7. 结果区。
8. 相关工具。

如果设置区内容较少，也可以放在文件选择区下面，但不能让用户找不到处理按钮。

## 16. 视觉要求

### 16.1 总体风格

界面要保持：

- 简洁
- 专业
- 操作优先
- 内容直接
- 不做复杂宣传页

### 16.2 颜色

沿用当前原型颜色方向：

| 用途 | 颜色 |
| --- | --- |
| 页面背景 | `#f7f9fc` |
| 卡片背景 | `#ffffff` |
| 浅背景 | `#f1f5f9` |
| 主文字 | `#101827` |
| 次级文字 | `#667085` |
| 边框 | `#dce3ee` |
| 主色 | `#1d64f2` |
| 主色深色 | `#164fc4` |
| 主色浅色 | `#e8f0ff` |
| 成功色 | `#11845b` |

### 16.3 图标

图标要求：

- 使用线性图标。
- 图标放在浅蓝底容器中。
- 图标线条不要过粗。
- 图标语义要和工具功能对应。
- 不要再使用纯字母作为工具图标。

正式项目建议使用：

```text
lucide-vue-next
```

### 16.4 按钮

主要按钮：

- 蓝色背景。
- 白色文字。
- 文案直接说明动作。

示例：

- Compress Images
- Convert Images
- Create PDF
- Merge PDF Files

不要使用含糊文案：

- Start
- Go
- Submit

## 17. SEO 需求

### 17.1 页面标题

| 页面 | 英文 Title |
| --- | --- |
| 首页 | Free Online PDF and Image Tools |
| 图片压缩 | Compress Image Online - Reduce Image Size in Browser |
| 图片转换 | Convert Image Online - JPG PNG WebP Converter |
| 图片转 PDF | Image to PDF Converter Online |
| PDF 合并 | Merge PDF Online - Combine PDF Files |
| PDF 拆分 | Split PDF Online - Extract PDF Pages |
| 图片尺寸调整 | Resize Image Online - Change Image Size in Browser |

### 17.2 页面描述

图片压缩页：

```text
Compress JPG, PNG, and WebP images online. Reduce image file size directly in your browser without uploading files.
```

图片转换页：

```text
Convert JPG, PNG, and WebP images online. Change image format directly in your browser without uploading files.
```

图片转 PDF 页：

```text
Create a PDF from images online. Arrange JPG, PNG, and WebP files and generate a PDF directly in your browser.
```

PDF 合并页：

```text
Merge multiple PDF files into one PDF online. Reorder files and combine them directly in your browser.
```

### 17.3 页面内容要求

每个正式工具页至少包含：

- 一个 H1。
- 一句话工具说明。
- 工具操作区。
- 本地处理说明。
- 相关工具链接。
- FAQ。

## 18. 错误提示需求

错误提示要直接，不要写得含糊。

| 场景 | 英文提示 | 中文提示 |
| --- | --- | --- |
| 未选择文件 | Choose at least one file first. | 请先选择至少一个文件。 |
| 文件格式不支持 | This file type is not supported. | 不支持这个文件格式。 |
| 文件太大 | This file is too large for browser processing. | 这个文件太大，浏览器处理可能较慢。 |
| 图片读取失败 | Failed to read this image. | 图片读取失败。 |
| PDF 读取失败 | Failed to read this PDF file. | PDF 文件读取失败。 |
| PDF 有密码 | Password-protected PDF files are not supported yet. | 暂不支持加密 PDF。 |
| 页码范围错误 | Enter a valid page range, such as 1-3 or 1,4,8. | 请输入正确的页码范围，例如 1-3 或 1,4,8。 |
| 处理失败 | Processing failed. Try again with another file. | 处理失败，请换一个文件重试。 |

## 19. 性能需求

### 19.1 首页

首页要求：

- 快速显示首屏。
- 不加载 PDF 处理库。
- 不加载图片处理重库。
- 工具卡片优先静态展示。

### 19.2 工具页

工具页要求：

- 页面先显示操作区。
- 用户选择文件后再加载实际处理逻辑。
- 处理大文件时显示处理中状态。
- 不要让页面在处理期间完全无反馈。

### 19.3 文件限制建议

第一版建议限制：

| 类型 | 限制 |
| --- | --- |
| 图片单文件 | 20 MB |
| 图片批量数量 | 20 张 |
| PDF 单文件 | 50 MB |
| PDF 合并数量 | 10 个 |
| PDF 转图片页数 | 50 页 |

这些限制是为了避免浏览器卡死。

## 20. 技术实现建议

### 20.1 项目技术栈

正式项目建议：

- Nuxt 3
- Vue 3
- TypeScript
- Vue Router
- i18n
- CSS 变量

原因：

- 工具站需要 SEO。
- 每个工具页需要独立标题和描述。
- 后续多语言更方便。

### 20.2 处理库建议

| 功能 | 建议库或能力 |
| --- | --- |
| 图片压缩 | Canvas API |
| 图片格式转换 | Canvas API |
| 图片转 PDF | `pdf-lib` |
| PDF 合并 | `pdf-lib` |
| PDF 拆分 | `pdf-lib` |
| PDF 转图片 | `pdfjs-dist` |
| QR 码生成 | `qrcode` |
| 拖拽排序 | `vuedraggable` |
| 文件下载 | Blob + URL API |

### 20.3 正式目录建议

建议目录：

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
│   └── resize-image.vue
├── components
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── ToolCard.vue
│   ├── ToolIcon.vue
│   ├── FileDropzone.vue
│   ├── LocalProcessingNotice.vue
│   └── ResultList.vue
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
    └── zh-CN.json
```

## 21. 埋点需求

第一版可以做基础统计，但不能采集用户文件内容。

建议统计：

| 事件 | 说明 |
| --- | --- |
| page_view | 页面访问 |
| tool_open | 打开工具页 |
| file_selected | 选择文件 |
| process_start | 点击处理按钮 |
| process_success | 处理成功 |
| process_failed | 处理失败 |
| download_click | 点击下载 |
| language_change | 切换语言 |

事件中可以带：

- 工具类型
- 文件类型
- 文件数量
- 是否成功
- 错误类型

不能带：

- 文件名
- 文件内容
- 用户本地路径

## 22. 验收标准

### 22.1 首页验收

首页通过标准：

- 能正常显示品牌、导航、语言切换。
- 首页首屏能看到主标题和 3 个主要工具按钮。
- 点击图片压缩按钮能进入图片压缩页。
- 点击图片转换按钮能进入图片转换页。
- 点击图片转 PDF 按钮能进入图片转 PDF 页。
- 常用工具卡片显示 6 个工具。
- 中文和英文切换后，首页文案全部更新。

### 22.2 图片压缩页验收

图片压缩页通过标准：

- 能选择 JPG、PNG、WebP 图片。
- 能调整质量滑块。
- 能选择输出格式。
- 点击压缩后能生成真实压缩结果。
- 结果区展示原大小、新大小、节省比例。
- 能下载单个处理后的图片。
- 移动端结果区使用卡片展示。

### 22.3 图片转换页验收

图片转换页通过标准：

- 能选择 JPG、PNG、WebP 图片。
- 能选择目标格式。
- 能真实生成转换后的文件。
- PNG 转 JPG 时能处理透明背景。
- 转换后能下载结果。

### 22.4 图片转 PDF 页验收

图片转 PDF 页通过标准：

- 能选择多张图片。
- 能显示图片顺序。
- 能调整顺序。
- 能设置页面方向。
- 能生成 PDF。
- 能下载 PDF。

### 22.5 PDF 合并页验收

PDF 合并页通过标准：

- 能选择多个 PDF。
- 能显示 PDF 列表。
- 能调整合并顺序。
- 能合并为一个 PDF。
- 能下载合并后的 PDF。

### 22.6 多语言验收

多语言通过标准：

- 中英文切换后，导航、首页、工具页、结果区、按钮、页脚都更新。
- 浏览器标题跟随语言变化。
- `html lang` 跟随语言变化。
- 新增文案不能只写英文。

### 22.7 移动端验收

移动端通过标准：

- 首页工具卡片单列展示。
- 工具页不出现横向滚动。
- 上传区域能正常点击。
- 设置项不重叠。
- 结果卡片不溢出。
- 下载按钮容易点击。

### 22.8 隐私验收

隐私通过标准：

- 本地处理工具不会把文件上传到服务器。
- 每个工具页都显示本地处理说明。
- 不采集文件名。
- 不采集文件内容。
- 不采集用户本地路径。

## 23. 开发优先级

### 23.1 第一阶段

先做原型中已经有详情页的 4 个核心工具：

1. 首页。
2. 图片压缩。
3. 图片转换。
4. 图片转 PDF。
5. PDF 合并。

第一阶段完成后，网站已经能覆盖大部分高频文件处理场景。

### 23.2 第二阶段

补齐首页已有入口但没有详情页的工具：

1. PDF 拆分。
2. 图片尺寸调整。

### 23.3 第三阶段

继续扩展：

1. PDF 转图片。
2. 批量下载 ZIP。
3. FAQ 页面。
4. 隐私政策页面。

## 24. 和当前原型的差异说明

当前原型已经确认：

- 页面视觉方向。
- 首页结构。
- 工具卡片样式。
- 顶部导航。
- 中英文切换。
- 图片压缩页布局。
- 图片转换页布局。
- 图片转 PDF 页布局。
- PDF 合并页布局。
- 移动端基础适配。

当前原型还没有真实实现：

- 图片真实压缩。
- 图片真实转换。
- 图片真实生成 PDF。
- PDF 真实合并。
- 文件真实下载。
- 拖拽排序。
- 文件删除。
- 错误提示。
- 处理进度。
- SEO 元信息。

正式开发时不要把原型里的模拟结果当成真实功能完成。

## 25. 上线前检查清单

上线前必须检查：

- `D:\zhizhouAi\myproject` 中正式项目能正常启动。
- 首页能访问。
- 每个工具页能访问。
- 每个工具页只有一个 H1。
- 每个工具页有独立 title。
- 每个工具页有独立 description。
- 中英文切换正常。
- 文件不会上传到服务器。
- 图片压缩能生成真实结果。
- 图片转换能生成真实结果。
- 图片转 PDF 能生成真实 PDF。
- PDF 合并能生成真实 PDF。
- 移动端布局正常。
- 错误提示能看懂。
- 下载按钮不会和广告或其他内容混淆。
