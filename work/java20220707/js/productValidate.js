
//エラー処理
//DOMの読み込みが終了したら行うイベントリスナー
window.addEventListener('DOMContentLoaded',function(){

$(function(){
   /* 
   id名：form
   メソッド名：validate()
   引数(オブジェクト)：rules:{},message:{}
      */
   $('#productValidate').validate({
   /* ---------------------------------------- */
      //エラー判定
      rules:{
         //name属性
         name:{
            required:true,
            maxlength:20
         },
         maker:{
            required:true
         },
         genre:{
            required:true
         },
         price:{
            required:true,
            number: true
         },
         stock:{
            required:true,
            number: true,
            min: 0
         }
      },
   /* ---------------------------------------- */
      //エラーメッセージ
      messages:{
         //name属性
         name:{
            required:"必須項目",
            maxlength:"20桁以内で入力してください"
         },
         maker:{
            required:"必須項目"
         },
         genre:{
            required:"必須項目",
         },
         price:{
            required:"必須項目",
            number: "数字のみ入力出来ます"
         },
         stock:{
            required:"必須項目",
            number: "数字のみ入力出来ます",
            min: "0以上を入力してください。"
         }
      },
   /* ---------------------------------------- */
      //エラーメッセージの表示場所指定
      errorPlacement:function(error,element){
         error.appendTo(element.data('error_placement'));
      }
   });
});

});
