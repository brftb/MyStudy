'use strict';
const config = require('./config'); // configの呼び出し
const express = require('express');
const app = express();

//// endpoint
app.get('/', function(req, res){
   res.send('Hello Express!');
});

//// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");

// npm install express してから
// cd /Users/takekota/Documents/2022年度その他/IH31/0701node/app3
// node app3-1
// ブラウザで「localhost:9000」見てみ
// control + C で強制終了
