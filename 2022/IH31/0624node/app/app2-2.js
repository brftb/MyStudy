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
   // 拡張子によって動きを変える
   const url = request.url;
   console.log(url);
   if(url == "/"){
      response.writeHead(200,{"content-type": "text/html"});
      fs.readFile(routeResponseMap[url],function(error, data){
         response.end(data);
      });
   }else if(url.indexOf(".html") != -1){
      response.writeHead(200,{"content-type": "text/html"});
      customReadFile("view"+url, response);
   }else if(url.indexOf(".css") != -1){
      response.writeHead(200,{"content-type": "text/css"});
      customReadFile("public/css"+url, response);
   }else if(url.indexOf(".js") != -1){
      response.writeHead(200,{"content-type": "text/javascript"});
      customReadFile("public/js"+url, response);
   }else if(url.indexOf(".jpg") != -1){
      response.writeHead(200,{"content-type": "image/jpeg"});
      customReadFile("public"+url, response);
   }else if(url.indexOf(".png") != -1){
      response.writeHead(200,{"content-type": "image/png"});
      customReadFile("public"+url, response);
   }else{
      sendErrorResponse(response);
   }
});
/// ファイル読み取り関数
// function customReadFile(file_path, response){}と等価
const customReadFile = function(file_path, response){
   // ファイルが存在するかどうか
   if(fs.existsSync(file_path)){
      fs.readFile(file_path,function(error, data){
         if(error){
            sendErrorResponse(response);
            return;
         }else{
            response.write(data);
            response.end();
         }
      });
   }else{
      sendErrorResponse(response);
   }
}
/// エラーの関数
const sendErrorResponse = function(response){
   response.writeHead(404,{"content-type": "text/html"});
   response.write("<h1>Not Found</h1>");
   response.end();
}


//// 9000番ポートで待ち受ける
app.listen(port);
console.log("サーバ起動" + 9000 + "　ポート監視中");


