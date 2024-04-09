'use strict';
const routeResponseMap={
   "/": "views/index.html",
   "page1": "./views/page1.html"
}
const port = 9000;
const http = require('http'); // モジュールインストール
const fs = require('fs');
const app = http.createServer();

app.on('request', function(request,response){
   if(routeResponseMap[request.url]){
      response.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(routeResponseMap[request.url],function(error, data){
         response.write(data);
         response.end();
      });
   }else{
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write("<h1>Not Found</h1>");
      response.end();
   }
});

// 9000番ポートで待ち受ける
app.listen(port);
console.log("サーバ起動" + 9000 + "　ポート監視中");


// cd /Users/takekota/Documents/2022年度その他/IH31/0624node/app
// node app2-1
// ブラウザで「localhost:9000」見てみ
// control + C で強制終了

