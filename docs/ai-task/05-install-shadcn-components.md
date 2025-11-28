# タスク05: shadcn/ui コンポーネントのインストール

## 目的
必要な shadcn/ui コンポーネントをインストール

## 具体的な作業

### 1. 必要なコンポーネントのインストール
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add avatar
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add separator
```

### 2. インストール確認
以下のファイルが存在することを確認:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/separator.tsx`

### 3. shared/ui へのエイリアス作成（オプション）
`src/shared/ui/index.ts`:
```typescript
export { Button } from '@/components/ui/button'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
export { Input } from '@/components/ui/input'
export { Textarea } from '@/components/ui/textarea'
export { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
export { Separator } from '@/components/ui/separator'
```

## 完了条件
- [ ] すべてのコンポーネントがインストールされている
- [ ] `src/components/ui/` 配下にファイルが存在する
- [ ] ビルドエラーが発生しない
