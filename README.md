# vectra-api-vendor

用于构建 Vectra API 完整运行时依赖包（vendor archive）的 CI 仓库。

## 仓库结构

```
vectra-api-vendor/
├── .github/workflows/build-vendor.yml   ← CI 构建流程
├── pnpm-workspace.yaml                  ← workspace 定义
├── api/
│   ├── package.json                     ← 从 Vectra/api/api/package.json 同步
│   └── pnpm-lock.yaml                   ← 从 Vectra/api/pnpm-lock.yaml 同步
├── packages/
│   ├── vectra-shared/
│   │   ├── package.json
│   │   └── dist/                        ← 预构建的 JS 产物
│   └── vectra-api-plugin-community-apps-security/
│       ├── package.json
│       └── dist/
└── libvirt/
    ├── package.json                     ← 从 @vectra/libvirt 复制（不含 src/build）
    └── dist/                            ← TypeScript 编译产物
```

## 工作流程

### 自动构建（推荐）
1. 当 API 依赖变更时，同步 `package.json` 和 `pnpm-lock.yaml` 到本仓库
2. 创建 tag（如 `v4.30.0`）并推送
3. GitHub Actions 自动：
   - 安装 production 依赖
   - 解析 workspace symlinks
   - 下载 libvirt 预编译件（从 Green3785/libvirt releases）
   - 清理非必要文件
   - 打包为 `node_modules-for-v{version}.tar.xz`
   - 发布到 GitHub Release

### 手动触发
在 Actions 页面选择 "Build Vendor Archive"，填写：
- `api_version`: API 版本号（如 `4.30.0`）
- `libvirt_version`: libvirt 预编译 tag（如 `v2.2.1-custom.1`）

## 产出

| 文件 | 说明 |
|------|------|
| `node_modules-for-v{version}.tar.xz` | 完整运行时依赖，解压到 `/usr/local/vectra-api/` |
| `*.sha256` | 校验文件 |

## 部署到 Unraid

```bash
# 下载
curl -fSL "https://github.com/Green3785/vectra-api-vendor/releases/download/v4.30.0/node_modules-for-v4.30.0.tar.xz" \
  -o /boot/config/plugins/vectra-api/node_modules-for-v4.30.0.tar.xz

# 解压（会覆盖 node_modules 目录）
tar -xJf /boot/config/plugins/vectra-api/node_modules-for-v4.30.0.tar.xz \
  -C /usr/local/vectra-api/

# 启动服务
vectra-api start
```

## 依赖关系

```
Green3785/libvirt                → 预编译 libvirt.node (极少变更)
    ↓
Green3785/vectra-api-vendor      → 完整 vendor archive (跟随 API 版本)
    ↓
插件安装 (vectra-api.plg)        → 下载 vendor archive 并解压
```

## 同步操作清单

当 API 依赖变更时需要同步的文件：

1. `api/package.json` ← `Vectra/api/api/package.json`
2. `pnpm-lock.yaml` ← 根级 lockfile（需要重新生成或提取 api 子集）
3. `packages/vectra-shared/dist/` ← 需要先在主仓库执行 `pnpm build`
4. `packages/vectra-shared/package.json`
5. `libvirt/dist/` 和 `libvirt/package.json`（仅当 libvirt TS 层变更时）

> 注意：`pnpm-lock.yaml` 需要能解析 workspace 引用。
> 建议在本仓库运行一次 `pnpm install` 生成正确的 lockfile。
