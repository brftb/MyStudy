'use strict'; // 厳格に記述しないと動作しなくなる

// 配列作成
const array = new Array(100);
for(let i=0; i<array.length; i++){
   array[i] = i;
}

// JSON文字列に変換
const send_data = JSON.stringify(array);

// ボタンクリック後
$('#button').get(0).addEventListener('click',()=>{
   // PHPに非同期通信で送信
   $.ajax({
      type: "POST",
      url: "./src2-2.php",
      data: {
         value : send_data
      }
   }).done(function(msg, status, xhr){
      console.log("SUCCESS");
      console.log("msg=" + msg);
      console.log("status=" + status);
      console.log("xhr=" + xhr);
      $('#output2').append(msg);
   }).fail(function(xhr){
      console.log("ERROR");
   }).always(function(xhr){
      console.log("FIN");
   });

   // 配列の中身を書き出し
   $('#output1').append(send_data);
   for(let key in array){ // 拡張forらしきもの
      $('#output3').append("キー：" + key + "　値：" + array[key] + "<br>");
   }
},false);
