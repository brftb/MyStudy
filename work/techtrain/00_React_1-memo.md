## Station 1 「start」
* yarn dev コマンドでアプリを起動して、
http://localhost:3000/ にアクセス

* 使用しているポートの確認
```
sudo lsof -P -i:8080
sudo lsof -i:3000
lsof -i -P | grep 1080

kill -9 [プロセスID]
```

***
## Station 3 「犬の画像」
[公式ドキュメント](https://ja.reactjs.org/docs/introducing-jsx.html)
JSファイルにマークアップを記述するのだ！
拡張子は .js でも .jsx でもいいじゃん。
return の中に書くけど一つのタブしか返せないから空のタブもしくはdivタブでまとめなさい

importでフォルダ構成のcssとかなんかできるやろ

***
## Station 4 「useState」
[公式ドキュメント](https://ja.reactjs.org/docs/hooks-state.html)
Reactでは、あとから変更されるデータを state（状態） として保持することができます。
stateは useState という関数（React内ではHooksといいます）を使うことで定義できます。

例
```js
import React, { useState } from 'react';
// useState フックを React からインポートします。これにより関数コンポーネント内でローカル state が使えるようにになります。
function Example() {
  const [count, setCount] = useState(0);
  // count:変数
  // setCount:関数
  // useState:初期値
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

***
## Station 6 「useState」
状態を維持できる
普通の変数だったら、ボタン押して変更とかしてもレンダリングに間に合わない
```js
  const [state, setState] = useState("");
  setState("imgSrc"); // stateに反映する
```


***
## Station 8 「コンポーネントとProps」
[公式ドキュメント](https://ja.reactjs.org/docs/components-and-props.html)

* コンポーネント名は常に大文字で始めてください。
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

* 別ファイルに部品化する
```js
import * as React from 'react'

export default function Header(props) {
   return <h1>Hello, {props.name}</h1>;
}
```
```js
import * as React from 'react'
import Header from "./Header";

export const App = () => {
  return (
    <header><Header name="aaa" /></header>
  )
}
```
[Propsの渡し方/受け取り方](https://zenn.dev/ynakamura/articles/e562376735d398)


###### コードは問題ないのに自動判定がなぜかうまく動作していなかったので、テストツールのコード(8,9,10,11)をコメントアウトさせてもらいました。


***
## Station 9 「useEffect」
コンポーネントをマウント（レンダリング）した時や、その他発火条件を満たした時に発動したい処理を中に入れると良い。
useEffect を使用しないとレンダリング後にもう一度、もしくは無限ループして処理が走ることがある。

```js
useEffect(() => {
  // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
  const access = async () => {
      // JSONの取得
      const response = await fetch(urlList);
      const json = await response.json();
      //　エンコード
      const dataStr = JSON.stringify(json); // encode json to string
      const data = JSON.parse(dataStr); // parse string to object
      // 犬種を配列に格納
      let breeds = [];
      for(let key in data.message){
        breeds.push(key);
      }
      setBreeds(breeds); // stateに反映する
  };
  access();
}, []);
```

