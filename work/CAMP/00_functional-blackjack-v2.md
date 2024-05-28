## 0511
## 技育CAMP
## ブラックジャックを作って、関数型プログラミングを学ぶ

* [github](https://github.com/Guvalif/functional-blackjack-v2)

* 今回は JavaScript を使って学びます。
Ramda.js
Purify


#### 関数型プログラミングの大原則
##### 主役は純粋関数
* 副作用がない → 挙動が予測しやすい
* 「参照透過」
* 型を設定してさらに予測しやすい
* 外部から値を取り込まない
* ログを途中で出力しない
##### 純粋関数とそれ以外の関数を棲み分ける

下記の情報だけでなにかわかりそう
```js
const POINT_TABLE = {
   'A'  : [ 1, 11 ],
   'N2' : [ 2 ],
   'N3' : [ 3 ],
   'N4' : [ 4 ],
   'N5' : [ 5 ],
   'N6' : [ 6 ],
   'N7' : [ 7 ],
   'N8' : [ 8 ],
   'N9' : [ 9 ],
   'N10': [ 10 ],
   'J'  : [ 10 ],
   'Q'  : [ 10 ],
   'K'  : [ 10 ],
};
```



```js
const toPoint = R.prop(R.__, POINT_TABLE);
```
Ramda.js の特徴を利用
R.prop：取り出す
R.__：仮置き（後から設定できる）


```js
R.lift(R.add);
```
総当たりで計算してくれるので、繰り返し構文を使わなくて良い

```js
R.reduce(addA2, [ 0 ]);
```
与えられた初期値と配列に対して、２引数関数により各要素をたたみ込むことができる

```js
const extractValidScore = R.pipe(
    R.filter(R.gte(21)),
    (xs) => Math.max(...xs),
    Maybe.fromPredicate((x) => x !== - Infinity),
);
```
特典の他幸せから有効なスコアの最大値を計算する（値なしの場合も考慮）
（空配列をマックス関数を入れるとネガティブ無限大が返ってくる）

Just と Nothing とは、
null, undefined を使用するとデータ型が明示的でない

##### 作用を便利に扱うための基本演算群
* of
  値から作用のあり値へ変換する
* map
  関数から作用のある関数へ変換する
* chain
  途中で作用を持つ関数(例：promise)から作用のある関数へ変換する

```js
const shuffleSuit
```
シャッフル処理なので乱数が必要だが、乱数は観測できないので、乱数生成(副作用)を外部から注入可能にする。
また、元の suit を変更したくないので、複製したものに変更をかける。


addIndex：インデックスを指定可能にする
pipe：複数関数の合体
juxt：N分岐

caseOf：switch 文の上位互換

```js
prompt(io)
```
プレイヤーの入力待ち
Either,Right 継続可能
Either,Left　ゲーム終了


