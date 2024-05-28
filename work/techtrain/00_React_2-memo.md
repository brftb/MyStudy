## Station 1 「Reactプロジェクトの作成」
* ディレクトリ作成からコマンドで環境構築
[公式ドキュメント](https://ja.legacy.reactjs.org/docs/create-a-new-react-app.html)
```
npx create-react-app my-app
cd my-app
npm start
```
* NVM（バージョン管理ツール）のインストール
[公式ドキュメント](https://github.com/nvm-sh/nvm)
[参考１](https://maku77.github.io/nodejs/env/nvm)
[参考２](https://qiita.com/ffggss/items/94f1c4c5d311db2ec71a)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
* nvm が現在アクティブにしている Node.js のバージョンを調べる
```
nvm current
```
* バージョンを指定してインストール
* 使用する Node.js のバージョンを切り替える
```
nvm use
```

* nvmでバージョン固定は知らん


## Station 2 「APIからスレッド一覧画面を作成」
* サーバーを起動してブラウザで確認
```
npm start
```
http://localhost:3000/


* ch child in a list should have a unique "key" prop.
* map を使う
```js
const list = result.map((thread) =>
   <tr key={thread.id}>
      <td>{thread.title}</td>
      <td className='threadListId'>{thread.id}</td>
   </tr>
)
setThreadList(list);
```
[map is not a function](https://kudohayatoblog.com/blog/mapIsNotFunc)
[リストとキー](https://ja.legacy.reactjs.org/docs/lists-and-keys.html#basic-list-component)

[2回描画される理由](https://www.ey-office.com/blog_archive/2021/06/30/i-found-out-why-the-component-is-drawn-twice-in-the-react/)

## Station 3 「ルーティング と API POST」

```
npm install react-router-dom
```
[参考](https://reffect.co.jp/react/react-router)


* 画面遷移・ページ遷移
```js
import {useNavigate} from "react-router-dom"
const navigate = useNavigate();
   function postString(){
      navigate('/home');
   }
```

* 「js fetch api post」「js axios api post」
[js fetch api post 1](https://www.i-ryo.com/entry/2020/07/31/202219)
[js axios api post 1](https://www.sukerou.com/2019/05/axios.html)
[js axios api post 2](https://qiita.com/chenglin/items/f59a6daff76fa0f582af)

