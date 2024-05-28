## Next.js
初手手順
```
cd Documents/la-CAMP/Next.js-Hands-on-microCMS/next-front
npm list
npm install
npm run dev
```

### ファイルベースルーティング（旧）
src/pages/ 配下のディレクトリが、そのままURLとなる。
例）http://localhost:3000/personal
動的パスの書き方
例）http://localhost:3000/dynamic/1234

### AppRouter（新）
src/app/ 配下のディレクトリが、そのままURLとなる。
例）http://localhost:3000/about

例）http://localhost:3000/blog/1234
ß
src/app/(group)/ 配下のディレクトリ
例）http://localhost:3000/account

※ pages と app が競合したら app が優先される。

テスト）http://localhost:3000/path_test/aiueo

#### layout.tsx
並行ルート

***
### microCMS
簡単にAPIを作成できる

#### curl

.env ファイルの作成


microCMS JavaScript SDK のインストール
```
npm install microcms-js-sdk
```

例）http://localhost:3000/ingredients

雛形
```tsx
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
```


endpoint:api設定から確認
dayjs:日時フォーマットライブラリ

テスト）http://localhost:3000/api_test
キャッシュを削除したら表示できました。

***
### pagination
[Next.js(SSG)でページネーションを実装](https://blog.microcms.io/next-pagination/)
