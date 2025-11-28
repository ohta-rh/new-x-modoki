# テストカバレッジ改善計画

## 現状分析

### カバレッジ状況
- **現在のカバレッジ: 0%**
- テストファイルが存在しない
- すべてのコンポーネントとロジックがテストされていない

### テスト対象ファイル

#### 優先度: 高（ビジネスロジック）
1. `shared/lib/storage.ts` - 121行（データ永続化の中核）
2. `features/post-form/ui/PostForm.tsx` - 73行
3. `features/profile-form/ui/ProfileForm.tsx` - 122行

#### 優先度: 中（UIコンポーネント）
1. `features/post-card/ui/PostCard.tsx` - 61行
2. `features/timeline/ui/Timeline.tsx` - 43行
3. `features/header/ui/Header.tsx` - 44行

#### 優先度: 低（インタラクションボタン）
1. `features/like-button/ui/LikeButton.tsx` - 40行
2. `features/repost-button/ui/RepostButton.tsx` - 40行
3. `features/reply-button/ui/ReplyButton.tsx` - 30行

## 目標設定

### フェーズ1: 基礎テスト（目標カバレッジ: 40%）
- ストレージサービスの完全なテスト
- 主要コンポーネントの基本テスト

### フェーズ2: コンポーネントテスト（目標カバレッジ: 70%）
- すべてのフィーチャーコンポーネントのテスト
- インタラクションのテスト

### フェーズ3: 統合テスト（目標カバレッジ: 80%+）
- ユーザーフローの統合テスト
- エッジケースのテスト

## 実装計画

### フェーズ1: 基礎テスト（1-2日）

#### タスク1.1: ストレージサービステスト
**ファイル**: `tests/shared/storage.test.ts`

**テストケース**:
- ✅ 投稿の作成・取得・削除
- ✅ いいね・アンライク機能
- ✅ リポスト・アンリポスト機能
- ✅ ユーザーの初期化・更新
- ✅ 返信機能
- ⚠️ エラーハンドリング（localStorage容量超過）

**推定カバレッジ向上**: +15%

#### タスク1.2: PostFormテスト
**ファイル**: `tests/features/post-form.test.tsx`

**テストケース**:
- フォームのレンダリング
- 文字数カウント
- 280文字制限
- 投稿ボタンの有効/無効
- 投稿の送信

**推定カバレッジ向上**: +10%

#### タスク1.3: Timelineテスト
**ファイル**: `tests/features/timeline.test.tsx`

**テストケース**:
- 空の状態表示
- 投稿一覧の表示
- 返信の除外
- リフレッシュ機能

**推定カバレッジ向上**: +8%

### フェーズ2: コンポーネントテスト（2-3日）

#### タスク2.1: PostCardテスト
**ファイル**: `tests/features/post-card.test.tsx`

**テストケース**:
- 投稿内容の表示
- 日時フォーマット
- アバターの表示
- インタラクションボタンの表示

**推定カバレッジ向上**: +8%

#### タスク2.2: インタラクションボタンテスト
**ファイル**: 
- `tests/features/like-button.test.tsx`
- `tests/features/repost-button.test.tsx`
- `tests/features/reply-button.test.tsx`

**テストケース**:
- ボタンのレンダリング
- クリックイベント
- 状態の変更（色の変化）
- カウントの更新

**推定カバレッジ向上**: +12%

#### タスク2.3: ProfileFormテスト
**ファイル**: `tests/features/profile-form.test.tsx`

**テストケース**:
- プロフィール情報の表示
- 編集モードの切り替え
- 入力値の検証
- 保存機能
- キャンセル機能

**推定カバレッジ向上**: +10%

#### タスク2.4: Headerテスト
**ファイル**: `tests/features/header.test.tsx`

**テストケース**:
- ナビゲーションリンクの表示
- アクティブ状態のハイライト
- ルーティング

**推定カバレッジ向上**: +5%

### フェーズ3: 統合テスト（1-2日）

#### タスク3.1: 投稿フロー統合テスト
**ファイル**: `tests/integration/post-flow.test.tsx`

**テストケース**:
- 投稿作成からタイムライン表示まで
- いいね・リポストの統合フロー
- 返信機能の統合フロー

**推定カバレッジ向上**: +8%

#### タスク3.2: プロフィール統合テスト
**ファイル**: `tests/integration/profile-flow.test.tsx`

**テストケース**:
- プロフィール編集フロー
- 投稿への反映確認

**推定カバレッジ向上**: +4%

## テスト実装のベストプラクティス

### 1. テストの構造
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // セットアップ
    localStorage.clear()
  })

  it('should render correctly', () => {
    // テストケース
  })
})
```

### 2. モックの使用
- `localStorage` のモック
- Next.js Router のモック
- ユーザーインタラクションのシミュレーション

### 3. テストデータ
- 再利用可能なテストデータファクトリーを作成
- `tests/fixtures/` ディレクトリに配置

### 4. カバレッジ除外
以下はカバレッジから除外:
- UIコンポーネント（shadcn/ui）
- 設定ファイル
- 型定義ファイル

## 実装スケジュール

| フェーズ | 期間 | 目標カバレッジ | タスク数 |
|---------|------|---------------|---------|
| フェーズ1 | 1-2日 | 40% | 3 |
| フェーズ2 | 2-3日 | 70% | 4 |
| フェーズ3 | 1-2日 | 80%+ | 2 |
| **合計** | **4-7日** | **80%+** | **9** |

## 成功指標

### 定量的指標
- [ ] ストレージサービスのカバレッジ: 90%+
- [ ] フィーチャーコンポーネントのカバレッジ: 80%+
- [ ] 全体のカバレッジ: 80%+
- [ ] すべてのテストがパス

### 定性的指標
- [ ] 主要なユーザーフローがテストされている
- [ ] エッジケースが考慮されている
- [ ] テストが保守しやすい
- [ ] CI/CDに統合可能

## 次のステップ

1. **即座に開始**: フェーズ1のストレージサービステスト
2. **並行作業可能**: PostFormとTimelineのテストは独立して実装可能
3. **継続的改善**: 新機能追加時は必ずテストも追加

## 参考リソース

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
