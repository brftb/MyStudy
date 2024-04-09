// ボタンクリック後
button.addEventListener('click',()=>{

   // PHPの読み込み
   $.ajax({
      type: "GET",
      url: "./src2-1.php"
   }).done(function(data){
      // JSON文字列を受け取り
      const array = JSON.parse(data);

      //// 表示
      const output1 = $('#output1');
      const output2 = $('#output2');
      const output3 = $('#output3');
      //const button = document.getElementById('button');
      const button = $('#button').get(0);

      // 配列の中身を書き出し
      $('#output2').append(data);
      //output2.textContent = data;
      for(let key in array){ // 拡張forらしきもの
         output3.append("キー：" + key + "　値" + array[key] + "<br>");
      }

   }).fail(function(xhr){
      alert('エラー')
   }).always(function(xhr){
      alert('完了')
   });

},false);

//「.get(0)」記述するとaddEventLisstener使えて<br>が文字列になった。
