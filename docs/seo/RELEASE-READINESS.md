# Lanarve SEO 上线准备（2026-10-22）

## 仓库与审核入口

- 仓库：Alice19881223/codex-test
- 来源分支：feat/seo-b2b-audit；目标分支：main。
- 创建 PR：https://github.com/Alice19881223/codex-test/compare/main...feat/seo-b2b-audit?expand=1
- PR 说明：docs/seo/PR_DESCRIPTION.md。
- 四份审核资料：AUDIT.md、DELIVERY.md、keyword-map.csv、OWNER-CHECKLIST.md，均在 docs/seo/。
- SEO 代码已推送。PR 尚未创建：当前环境 GitHub GraphQL 请求被拒绝，先前通过 Actions 创建也未成功；不能将比较链接当作已存在的 PR。
- 本次不合并、不部署、不改 DNS 或线上设置。

## 部署依据

.github/workflows/deploy-pages.yml 在 main push（包括 PR 合并）时自动运行，通过 actions/deploy-pages@v4 发布 GitHub Pages。发布目录是 _site/。SEO 分支推送仅触发检查，不触发正式部署。

完整构建：`npm ci` 后执行 `npm run build`；现有发布工作流执行 `python3 scripts/prepare-pages.py` 生成 _site/。

仓库未发现 cPanel 手动上传配置。如果实际另有 cPanel 镜像，需先确认其域名绑定及文档根目录；上传对象应是 _site/ 内的文件，不能凭空指定服务器目录。GitHub Pages 账户中的域名、HTTPS 强制设置及实际 DNS 仍需核对。

## 上线前必须解决

1. 在可访问正式站的网络核实首选域名 https://www.lanarve.com、有效证书、HTTP/裸域跳转及真实 200/404 状态。如果实际首选域名不同，先调整 assets/seo-config.json 并重建。
2. 审核新英文文案和建议香型。建议香型不能被误认为已确认的实际出货配方；如与实物不符，发布前更正对应资料。
3. 核实当前展示的公司名称、电话、两处邮箱、产品名称与图片对应关系。自动检查可证明目录数据未变，不能证明实物信息或邮箱实际收信能力。
4. 创建并审核 PR，检查 CI 成功；取得明确上线授权后才能合并。创建 PR 本身不会部署，合并到 main 会触发部署。

## 业务事实复核及可以后补的信息

| 信息 | 当前处理与来源 | 是否阻止上线 |
| --- | --- | --- |
| US$50/款打样、下单可退、7天出样、小批量订单 | 用户此前明确提供，沿用；不是 SEO 推测 | 若已经变化，先改正；无需凭空重填 |
| 公司英文名及两处邮箱 | 用户此前提供；alicechen@lanarve.com、lisachen@lanarve.com | 错误需先改正 |
| 数值 MOQ、生产交期、产能 | 未新增承诺；按具体设计与报价确认 | 可后补批准资料 |
| 材质、容量、尺寸 | product-specifications.json 当前为空；未猜测补全 | 可后补，不能把缺失写成事实 |
| 产品证书/检测文件 | compliance-documents.json 当前为空；没有新增通用出口认证承诺 | 可后补真实且适用的文件；不得宣称全系列获证 |
| 香型与三段香调 | 复用现有香库与配对，静态展示默认建议；未认定实物配方 | 建议定位可保留，实物冲突需先更正 |
| 关键词量及难度、排名、收录 | 关键词为假设；无 Search Console 权限 | 上线后用真实数据补充 |

原有产品 URL 和目录 JSON 未改动。保留地址及历史 HTML 跳转见 url-map.csv；HTML 跳转不是 HTTP 301，GitHub Pages 也不支持用 .htaccess 实现任意路径跳转。

## 验证记录与限制

本地构建、SEO 检查、桌面/移动浏览器回归和重复构建检查已通过，详细结果见 DELIVERY.md。2026-10-22 再次执行 npm run check：365 个 sitemap URL、288 个静态产品页面通过。目录 JSON 相对基线未修改；产品规格仍为空、证书列表仍为空。

正式站探测返回 curl 56 / CONNECT tunnel failed, response 403，是环境代理拒绝建立连接，不是已证实的网站返回 403。正式站、TLS、线上跳转和真实 404 均未通过验证；本地模拟不能替代线上结果。未发送真实邮件或 WhatsApp 消息。

## 明确授权上线后执行

先确认 main 对应的 Publish Lanarve website 工作流成功，再在无上述网络限制的终端执行：

```sh
curl -I https://www.lanarve.com/
curl -I https://www.lanarve.com/products-current.html
curl -I https://www.lanarve.com/private-label.html
curl -I https://www.lanarve.com/robots.txt
curl -I https://www.lanarve.com/sitemap.xml
curl -I https://www.lanarve.com/seo-check-missing-20261022.html
curl -IL http://lanarve.com/
curl -IL https://lanarve.com/
curl -IL http://www.lanarve.com/
```

首页、分类、服务及站内实际链接选取的代表性产品页应返回 200；不存在的地址应返回 404，且展示自定义错误页。证书校验不要使用 -k 绕过。HTTP 与裸域应最终到达首选 HTTPS www 地址，记录各跳状态及 Location。

浏览器查看网页源代码：核实 title、description、自指 canonical、产品正文与 JSON-LD；sitemap 应只有正式可索引地址，robots 不应屏蔽产品。测试 Fragrance 悬浮菜单、筛选、图片切换、手机导航、香型选择和询盘内容。核对 mailto 的两处收件地址，真实收信需收件方配合验证；不要把打开邮件客户端当成送达。

用 Google Search Console 检查索引资格、Google 选择的 canonical、站点地图和抓取状态，提交 sitemap。检查真实用户 Core Web Vitals；本地性能结果不是线上实测或排名承诺。
