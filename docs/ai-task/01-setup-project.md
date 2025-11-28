# タスク01: プロジェクト初期化

## 目的
Next.js プロジェクトの初期化と基本設定

## 具体的な作業

### 1. Next.js プロジェクト作成
```bash
pnpm create next-app@latest . --typescript --tailwind --app --no-src
```

### 2. 必要なパッケージのインストール
```bash
# Biome
pnpm add -D @biomejs/biome

# vitest
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom

# shadcn/ui の依存関係
pnpm add class-variance-authority clsx tailwind-merge lucide-react
```

### 3. Biome 設定ファイル作成
`biome.json` を作成:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": [".next", "node_modules", "out"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

### 4. vitest 設定ファイル作成
`vitest.config.ts` を作成:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 5. テストセットアップファイル作成
`tests/setup.ts` を作成:
```typescript
import '@testing-library/jest-dom'
```

### 6. package.json にスクリプト追加
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

### 7. shadcn/ui 初期化
```bash
pnpm dlx shadcn@latest init
```

設定:
- TypeScript: Yes
- Style: Default
- Base color: Slate
- CSS variables: Yes
- tailwind.config: Yes
- components: @/components
- utils: @/lib/utils
- React Server Components: Yes

## 完了条件
- [ ] Next.js プロジェクトが起動する (`pnpm dev`)
- [ ] Biome が動作する (`pnpm lint`)
- [ ] vitest が動作する (`pnpm test`)
- [ ] shadcn/ui が初期化されている
