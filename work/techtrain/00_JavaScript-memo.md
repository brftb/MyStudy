## Station 14 「map」
[参考資料その１](https://www.sejuku.net/blog/21812)
[参考資料その２](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
[参考資料その３](https://www.pasonatech.co.jp/workstyle/column/detail.html?p=2639)

### 概要
「forEach」は単純に実行するだけのメソッドなのに対して、「map」は実行後の結果を配列データとして返してくれるという点が違う
```js
//「forEach」で試した例
var result = [1,2,3].forEach(function( value ) {
   console.log( value );
   return value * 2;
});
console.log( result );

//「map」で試した例
var result = [1,2,3].map(function( value ) {
   console.log( value );
   return value * 2;
});
console.log( result );
```

### メソッド
* 作成
```js
let hoge = new map();
hoge.name = 'yamada'
map.set('name', '太郎');
map.set('age', 30);
```
* 追加
```js
data.full_name = data.family_name + ' ' + data.first_name;
```
* 削除
```js
delete data.name;
map.delete('name');
map.clear();
```
* Other
```js
console.log(map.get('name'));
console.log(map.size);
console.log(map.has('age'));
```


### Object
配列のメソッドとしてのmapではなく
```js
function build(userList){
   userList.map((e) => {
      Object.assign(e,{ full_name: `${e.family_name} ${e.first_name}` });
   });
   return userList;
}
```


#### 混乱を起こす可能性があるトリッキーな使用例
Array.prototype.map はコールバックに次の 3 つの引数を与えています。
その要素
その添字
その配列

***

## Station 15 「Promise」


let hoge = await new Promise((resolve) => {
});

hoge have [pending] at new

await : wait fot reject
      and make only in async





#### setTimeout()

第一引数はコールバック関数
第２引数はミリ秒

resolve();はPromiseをfulfilled(resolve or reject)状態にする関数

コールバック関数じゃない場合は
```js
  await new Promise((resolve) => {
    setTimeout(resolve(), 3000);
  });
```
コールバック関数を書きたい場合は
```js
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
```
```js
  await new Promise(resolve => {
    setTimeout(() => {
      console.log('非同期成功(3s)');
      // resolve();
    }, 3000);
  });
```


状態の返し方
```js
  await new Promise((resolve,reject) => {
    if(a == 0){
      reject();
    }else{
      resolve();
    }
  });
```

