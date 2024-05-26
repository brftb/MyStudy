
#### DBと接続

/app5
├── ejs@3.1.8
├── express@4.18.1
└── mysql@2.18.1

|method|sql|
|---|---|
|get|SELECT文|
|post|INSERT文|
|put|UPDATE文|
|delete|DELETE文|


***
#### **5-2, 5-3**

textboxに入力された値をDBに格納
プレースフォルダを利用
ボタンを押したタイミングで、非同期で結果を画面表示

```js
// データの読み取り
$('#getbutton').click(function(e){
   let values = {
      id: $('#get_id').val(),
      name: $('#get_name').val(),
      email: $('#get_email').val(),
      password: $('#get_password').val()
   }
   // 送信するデータの準備
   $.ajax({
      type: "GET",
      data: values,
      dataType: "JSON",
      url: "/users"
   })
   // データの送信（非同期）
   .done(function(results){
      console.log(typeof results);
      console.log(results);
      const result_json = JSON.parse(results);
      $('#output').append('<p>'+result_json+'</p>');
      $('#output').append('<p>登録完了しました。</p><br>');
   }).fail(function(xhr, textStatus, errorThrown){
      console.log("ajax通信に失敗しました。");
   }).always(function(xhr){
   });
});
```
