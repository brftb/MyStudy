// PHPの読み込み
$.ajax({
   type: "GET",
   url: "./src1-4.php"
}).done(function(data){
   // JSON文字列を受け取り
   const array = JSON.parse(data);

   //// 表示(タグを格納)
   // 用意
   let element01 = document.createElement('p');
   element01.textContent = data;
   // 追加
   let parent = document.getElementById('here');
   parent.appendChild(element01);

   // hr
   let element02 = document.createElement('hr');
   parent.appendChild(element02);

   // 利用して表示
   let element03 = document.createElement('div');
   parent.appendChild(element03);
   // 配列の中身を書き出し
   for(let i=0; i<array.length; i++){
      let p01 = document.createElement('p');
      p01.textContent = array[i]['name'];
      element03.appendChild(p01);
      let p02 = document.createElement('p');
      p02.textContent = array[i].gender;
      element03.appendChild(p02);
      for(let key in array[i]['blog']){ // 拡張forらしきもの
         let p03 = document.createElement('p');
         p03.textContent = array[i]['blog'][key];
         element03.appendChild(p03);
      }
   }
});
