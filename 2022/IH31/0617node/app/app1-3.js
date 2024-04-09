'use strict';

const port = 9000;
const http = require('http'); // モジュールインストール
const app = http.createServer();

app.on('request', function(request,response){
   console.log("リクエストを受信しました。");
   console.log("----request.method----");
   console.log(request.method);
   console.log("----request.url----");
   console.log(request.url);
   console.log("----request.headers----");
   console.log(request.headers);

   const params = (new URL(request.url, 'http://localhost:9000')).searchParams;
   for(let param of params){
      console.log("name:", param[0], "value:", param[1]);
   }
   console.log("-=-=-=-+-=-=-=-");

   response.writeHead(200, {'Content-Type': 'text/plain'});
   const responseMessage = "<h1>Hello request1-3</h1>";
   response.end(responseMessage);
});

// 9000番ポートで待ち受ける
app.listen(port);
console.log("サーバ起動" + 9000 + "　ポート監視中");


// ブラウザで「localhost:9000/?value1=HAL&value2=OSAKA」
// ターミナルで「curl -X GET "http://localhost:9000/?value1=HAL&value2=OSAKA"」
