# SEO优化交付与验证记录

状态：仅功能分支，未合并、未部署到正式站点。基线为 `ac9b6f2`。

## 已实施

1. **独立静态内容**：复用288个现有产品URL、SKU及数据，不另建SPA、不改产品地址。默认香味、Key Notes、Smells Like、前中后调与香气示意全部预填HTML；39个香型的选择、刷新保持和询盘仍可用。自选香型查询参数归并到产品本身的canonical，不生成288×39套索引页。
2. **英文B2B意图**：首页、分类、系列、香型、产品、联系及资料页使用独立标题和描述；补齐H1和可读采购介绍。新增 `private-label.html`，介绍已有的私人标签、OEM/ODM、香型与包装询盘流程。恢复 `fragrance.html` 为完整静态香味库，同时保留悬停菜单。
3. **技术SEO**：以 `https://www.lanarve.com` 为待业主确认的首选host；365条正式URL进入sitemap，各分页自引用canonical。保留28个旧跳转/重复入口并记录映射；原HTML跳转仍为客户端fallback，不声称实现HTTP 301。添加robots及有帮助的404页面，不屏蔽产品页。
4. **结构化数据**：首页Organization/WebSite，相关页面BreadcrumbList，288个Product。仅用已有品牌、SKU、图片、系列及建议香型。不添加Offer、库存、评价、评分、GTIN、证书或未经确认的规格，不承诺富媒体结果。
5. **性能**：314组响应式WebP副本；原图、产品身份与图对顺序不变。图片尺寸、首屏优先级、次要图片延迟加载；非目录/详情页不再加载完整catalog数据。保留并本地提供Manrope变量字体及OFL许可，移除Google Fonts外部依赖和未使用的字体族。图库切图同时更新src/srcset，避免只改src而仍显示旧图。
6. **询盘与内容边界**：询盘摘要中的产品链接使用canonical域名，不再硬编码旧GitHub地址。空的验证文档登记表不支撑全面出口资质宣称，改为按具体产品/市场确认资料。没有新增容量、材料、MOQ、认证、产能、生产交期或效果数据；既有用户提供的打样条款未擅自更改。
7. **可维护性**：SEO后处理已接入现有生成与staging流程；新增只读PR检查工作流。正式部署工作流仍仅响应main。README说明正式构建方法，WEBSITE的旧记录标为历史信息。

## 关键词与页面对应（全部为假设）

| 页面层次 | 搜索意图/关键词方向 | 代表地址 |
|---|---|---|
| 首页 | wholesale home fragrance / supplier discovery | `/` |
| 蜡烛分类 | wholesale scented candles / private label designs | `/products-current.html` |
| 藤条香薰分类 | wholesale reed diffusers | `/reed-collections.html` |
| 晶石分类 | wholesale crystal diffusers | `/products-crystal-1.html` |
| 礼盒分类 | wholesale fragrance gift sets | `/gift-collection.html` |
| 季节采购 | wholesale Christmas candles | `/christmas-collection.html` |
| 私人标签/定制 | private label home fragrance / OEM/ODM | `/private-label.html` |
| 系列 | collection name + product format + wholesale | `/candles-morning-light.html` 等 |
| 香型 | fragrance name + home fragrance options | `/fragrance-pear-freesia.html` 等 |
| 产品详情 | actual design name + product format / private label enquiry | 现有 `/product-lnv-*.html` |

逐URL映射与标题见 `keyword-map.csv`。未获取关键词工具数据，不提供编造的搜索量、KD、排名或市场份额。

## 实际本地加载测试

条件：Chromium冷上下文，390×844，4倍CPU减速，40ms延迟，下载200,000字节/秒、上传100,000字节/秒；本地HTTP、未启用压缩；每次page load后再观察1.8秒。表中传输量是该窗口内完成的资源响应transferSize总和，不等于整页所有滚动资源。

| 页面 | 优化前资源字节 | 优化后资源字节 | 降幅 | 本地LCP观察 | 优化后CLS观察 |
|---|---:|---:|---:|---|---:|
| `index.html` | 23,946,025 | 298,176 | 98.8% | 67.912s → 0.968s | 0.0019 |
| `products-current.html` | 14,284,733 | 151,551 | 98.9% | 2.100s → 0.736s | 0.0000 |
| `product-lnv-cnd-02454833.html` | 14,408,807 | 558,906 | 96.1% | 2.056s → 1.456s | 0.0014 |

这些是受控本地单次前后观察，不是PageSpeed分数、真实用户CWV或生产性能承诺。基线外部Google字体请求在环境中未成功；优化后本地Manrope已真实加载，所以并非完全相同的字体传输条件。图片与传输量变化可在resource明细中核查；不能把单次LCP数值当作稳定现场收益。

原始数据：`baseline-performance.json`、`after-performance.json`；复测脚本 `tests/performance-lab.cjs` 支持 `SEO_LAB_ORIGIN`。

## 已运行的检查

- `npm run build`：生成全部目录、详情、SEO资源并构建 `_site`，原有产品/配对/排序/香型验证通过。
- `npm run check`：365条sitemap URL、288个Product实体；所有索引页独立标题描述、一个H1、canonical目标、静态香味、图片尺寸、CSS资源及站内资源有效；从首页可达全部索引页。
- `npm run test:browser`：26次桌面/手机页面检查，香味悬停/手机点击/Escape、轮播、香型切换与刷新、双图src/srcset切换、询盘清单、样品入口、关闭JS后的可读内容、canonical域名询盘草稿均通过；WhatsApp跳转被拦截，没有向任何人发送消息。
- 连续重建哈希比较无差异，详见 `rebuild-results.json`。
- 原始六类产品数据、稳定身份和香型分配文件与基线逐字节相同。
- 本地路由返回和自定义404行为已检查；**不等同于线上GitHub Pages HTTP状态已验证**。
- `git diff --check`通过。图片和移动布局做了人工截图检查。

## 尚待外部/业主确认

线上HTTP/HTTPS、www与非www跳转、真实状态码、TLS、robots/sitemap可访问性被当前环境代理阻断；不得把代理403归因给网站。Search Console中的收录、Google canonical、抓取、搜索查询及现场CWV未验证。具体检查步骤和待补产品/认证资料见 `OWNER-CHECKLIST.md`；原始线上探测见 `live-probes-2026-10-22.json`。审核通过也不自动授权合并/部署。
