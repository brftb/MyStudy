# `node.js`のモジュールである`socket.io`の使い方

## 概要
**webSocket**
サーバーからプッシュする（双方向）
たまに対応していないブラウザやバージョンがある

## 導入
`npm install socket.io`


***
## 基本的な記述方法
**Socket通信**
`emit` データの送信
`on` 接続の待ち受け

### クライアント側
```html:client.html
<!-- ライブラリの取得（CDN） -->
<script src="/socket.io/socket.io.js"></script>
<script>
// Socket接続（コネクション）
const socketio = io();
// サーバーに送信
socketio.emit('c2s', input_msg);
// 待ち受け
socketio.on('s2c', function(msg){
   console.log('ソケットs2c: '+msg);
});
</script>
```

### サーバー側
#### server setup
ExpressとSocket.IOを統合してWebSocketサーバーを作成
```js:server.js
// official
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketio = new Server(server);
```
上記をいろいろ省略して記述したものが下記
```js:server.js
// simplex
const express = require('express');
const app = express();
const Server = require('http').Server(app);
```

#### サーバーの起動
```js:server.js
const socketio = require('socket.io')(Server);
Server.listen(config.port);
// Socket接続（コネクション）
socketio('connection',(socket)=>{
   // クライアントに送信
   socket.emit('s2c', server_msg); // only the client
   socketio.emit('s2c', server_msg); // all client
   // 待ち受け
   socket.on('c2s', function(msg){
      console.log('ソケットc2s: '+msg);
   });
})
```
##### ソケット通信で変数を使いたい場合
```js:server.js
// ここ宣言した変数は全クライアントで共通利用
io('connection',(socket)=>{
   // ここで宣言した変数は各クライアントで利用
})
```

***
## 応用的な記述方法
### 送信タイミングの指定
<span style="color:crimson;">ソケット接続確率直後</span>

```js:client.html
io('connection',(socket)=>{
   // ソケット接続確率直後


   // ボタン押下時
   const form = document.getElementById("chat-form");
   form.addEventListener("submit", function(event){
      event.preventDefault(); // イベントに関連するデフォルトの動作を防ぐ
      const input_message = document.getElementById("get-text").value;
      socketio.emit('c2s', input_message); // サーバーに送信
   });
   // ボタン押下時２
   const submitBtn = document.getElementById("submit-btn");
   submitBtn.addEventListener("click", (e)=>{
      const input_message = document.getElementById("get-text").value;
      socketio.emit('c2s', input_message); // サーバーに送信
   });
})
```

### 複数のデータ(オブジェクト)の送受信
```js:client.html
const sendData = {
   input1 : document.getElementById("chat-input1").value,
   input2 : document.getElementById("chat-input2").value
};
socketio.emit('c2s', sendData); // サーバーに送信
```
```js:server.js
socket.on('c2s',function(msg){ // データ「c2s:msg」を受信したら
   console.log('c2s[input1]: ' + msg.input1);
   console.log('c2s[input2]: ' + msg.input2);
});
```


***
## room

`room`は双方向・リアルタイムデータ送受信を任意の範囲で行うための仕組み。
`room`を使用すると、その部屋に所属するクライアント間のみでデータをやり取りすろことが可能。

<span style="font-size:10px;">ネットワークのマルチキャスト通信みたいなイメージ</span>
<span style="font-size:10px;">`socketio.emit('s2c', server_msg); // only the client`がブロードキャスト</span>
<span style="font-size:10px;">`socket.emit('s2c', server_msg); // all client`がユニキャスト</span>

### 動きの流れ
1. クライアントがルーム名を送信
   ```js:client.html
   const sendData = {
      chatid: "1"
   }
   socketio.emit ('c2s-join', sendData);
   ```

2. サーバーがルーム名を受け取り、参加
   ```js:server.js
   socketio.on('c2s-join', (data)=>{
      socket.join(data.chatid);
   });
   ```

3. クライアントからの送信はネームスペースを付ける
   ```js:client.html
   const sendData = {
      chatid: "1",
      input1: document.getElementById("chat-input1").value,
      input2: document.getElementById("chat-input2").value,
   }
   ```

4. サーバーからの送信はルーム名を付ける
   ```js:server.js
   // クライアント（ブラウザ）からサーバ（Node.js）へのSocket受信待ち
   socket.on('c2s-chat1',function(msg){
      console.log('c2s-chat1: ' + msg);
      io_socket.emit('s2c-chat1',msg);
   });
   socket.on('c2s-chat2',function(msg){
      io_socket.emit('s2c-chat2',msg);
   });
   socket.on('c2s-chat3',function(msg){
      io_socket.emit('s2c-chat3',msg);
   });
   ```
   ```js:client.html
   socketio.on('s2c-chat3', (msg) => { // データ「s2c-chat1:msg」を受信したら④
      console.log('s2c-chat3: '+msg);
      // htmlに表示
      let ul = document.getElementById("output");
      let li = document.createElement('li');
      li.innerHTML = msg;
      ul.appendChild(li);
   });
   ```


namespace

