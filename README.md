# web 项目模板

## Getting Started

### Install

统一使用 pnpm 管理依赖

```bash
cd project-path
pnpm install
```

### Start

Serve with hot reload at <http://localhost:5173>.

```bash
pnpm run dev
```

### Lint

```bash
pnpm run lint
```

### Typecheck

```bash
pnpm run typecheck
```

### Build

```bash
pnpm run build
```

### Test

```bash
pnpm run test
```

## 代码提交

- commit 须满足 commitline 响应规范，建议全局安装 git-cz

```bash
npm install git-cz -g

git-cz
```

##commit error

1. husky - pre-commit hook exited with code 1 (error)

```
 ✖ vitest related --run --coverage=false failed without output (ENOENT).

 // 解决方案：
 git config --unset core.hooksPath
```

## What is inside?

This project uses many tools like:

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)
- [unocss](https://github.com/unocss/unocss)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)

## License

This project is licensed under the MIT License.

## ⚠️ 注意

**为了和 ui 对齐，pro-layout 使用的不是最新版本，所以看文档时候注意一下～**
**如果想使用 openapi 请下载 ts-node**
