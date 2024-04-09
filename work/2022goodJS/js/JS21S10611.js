////ボタン操作１

//テキストボックスから値を受け取る
const calcVal1 = document.getElementById('calcVal-1');
const calcVal2 = document.getElementById('calcVal-2');
//ボタンの取得
const calcBtns = document.getElementsByClassName('calcBtn');
//結果表示部分の取得
const result = document.getElementById('answer');

//四則演算
for(let btn of calcBtns){ //foreachみたいなやつ
   //全てのボタンにイベントリスナーを追加
   btn.addEventListener('click',(e)=>{
      let event = e.target.value;
      let left = parseFloat(calcVal1.value,10)
      let right = parseFloat(calcVal2.value,10)
      //parseInt() : 数値変換（第２引数：進数）
      let answer = 0;
      if(event === 'add'){
         answer = left + right;
      }else if(event === 'sub'){
         answer = left - right;
      }else if(event === 'multi'){
         answer = left * right;
      }else if(event === 'division'){
         answer = left / right;
      }
      answer = answer.toFixed(2); //四捨五入
      //結果を表示させる
      result.textContent = left+' '+e.target.textContent+' '+right+' = '+answer;
   },false);
}


/*==========-==========-==========-==========-==========*/
////ボタン操作２

//classと連結
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const input = document.getElementsByClassName('userInf');
const bmiBtn = document.getElementById('BMIBtn');

//結果表示部分の連結
const displayBmi = document.getElementById('displayBmi');
const displayFigure = document.getElementById('displayFigure');

//BMI計算
bmiBtn.addEventListener('click',()=>{
   //値の取得
   let height = parseInt(input[0].value,10) / 100;
   let weight = parseInt(input[1].value,10);
   //計算
   let bmi = weight / height / height;
   bmi = bmi.toFixed(1); //四捨五入
   let figure = ''; //体型
   if(bmi < 16){
      figure = 'やせすぎ';
   }else if(bmi < 17){
      figure = 'やせ';
   }else if(bmi < 18.5){
      figure = 'やせぎみ';
   }else if(bmi < 25){
      figure = '標準';
   }else if(bmi < 30){
      figure = '肥満ぎみ';
   }else if(bmi < 35){
      figure = '肥満1';
   }else if(bmi < 40){
      figure = '肥満2';
   }else{
      figure = '肥満3';
   }
   //結果を表示させる
   displayBmi.textContent = 'BMI：'+bmi;
   displayFigure.textContent = '体型：'+figure;
},false);


//値が入力されるまでボタンは非活性
bmiBtn.disabled=true;
bmiBtn.style.cursor = 'not-allowed';
bmiBtn.style.opacity = .5;

//入力された時
for(let i=0;i<2;i++){
   input[i].addEventListener("input",()=>{
      //中身チェック(両者が空文字でも非数値でもないとき活性)
      if(input[0].value != '' && input[1].value != '' && !isNaN(input[0].value) && !isNaN(input[1].value)){
         bmiBtn.disabled=false;
         bmiBtn.style.cursor = 'pointer';
         bmiBtn.style.opacity = 1;
      }else{
         bmiBtn.disabled=true;
         bmiBtn.style.cursor = 'not-allowed';
         bmiBtn.style.opacity = .5;
      }
   });
}

/*==========-==========-==========-==========-==========*/
////ラジオボタン操作

///活性/非活性
//連携
const radioBtns = document.getElementsByClassName('choice');
const productNo = document.getElementById('product-no');
const productName = document.getElementById('product-name');
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');

//処理
for(let i=0; i<radioBtns.length; i++){
   radioBtns[i].addEventListener('change',(e)=>{
      //イベント(change)が発生した場合の処理
      let event = e.target.value;
      if(event === 'search'){
         productNo.disabled=false;
         productName.disabled=false;
         priceMin.disabled=false;
         priceMax.disabled=false;
      }else if(event === 'regist'){
         productNo.disabled=false;
         productName.disabled=false;
         priceMin.disabled=false;
         priceMax.disabled=true;
      }else if(event === 'update'){
         productNo.disabled=true;
         productName.disabled=false;
         priceMin.disabled=true;
         priceMax.disabled=false;
      }else if(event === 'delete'){
         productNo.disabled=false;
         productName.disabled=true;
         priceMin.disabled=true;
         priceMax.disabled=true;
      }
   },false);
}


/*==========-==========-==========-==========-==========*/
///ログイン

//連携
const userName = document.getElementById('userName');
const password = document.getElementsByClassName('password');
const checkbox = document.getElementsByClassName('checkbox');


//パスワード表示
for(let i=0;i<2;i++){
   checkbox[i].addEventListener('change',(e)=>{
      //イベント(change)が発生した場合の処理
      let event = e.target.checked;
      if(event === true){
         password[i].type='text';
      }else{
         password[i].type='password';
      }
   },false);
}

//エラー処理
//DOMの読み込みが終了したら行うイベントリスナー
window.addEventListener('DOMContentLoaded',function(){

$(function(){
   /* 
   id名：form
   メソッド名：validate()
   引数(オブジェクト)：rules:{},message:{}
    */
   $('#form').validate({
   /* ---------------------------------------- */
      //エラー判定
      rules:{
         //name属性
         name:{
            required:true,
            maxlength:4
         },
         password:{
            required:true,
            rangelength:[8,12]
         },
         passwordRe:{
            required:true,
            equalTo: "input[name=password]"
         },
         age:{
            required:true,
            number: true
         },
         mail:{
            required:true,
            email:true
         },
         mail2:{
            required:true,
            email:true,
            equalTo: "input[name=mail]"
         },
         gender:{
            required:true
         },
         color:{
            required:true
         },
         subject:{
            required:true
         }
      },
   /* ---------------------------------------- */
      //エラーメッセージ
      messages:{
         //name属性
         name:{
            required:"必須項目",
            maxlength:"5桁未満で入力してください"
         },
         password:{
            required:"必須項目",
            rangelength:"8〜12文字にしてください"
         },
         passwordRe:{
            required:"必須項目",
            equalTo: "パスワードと一致しません"
         },
         age:{
            required:"必須項目",
            number: "数字のみ入力出来ます"
         },
         mail:{
            required:"必須項目",
            email:"有効なメールアドレスを入力"
         },
         mail2:{
            required:"必須項目",
            email:"有効なメールアドレスを入力",
            equalTo: "一致しません"
         },
         gender:{
            required:"必須項目"
         },
         color:{
            required:"必須項目"
         },
         subject:{
            required:"必須項目"
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


//キャンセルボタン
const cancelBtn = document.getElementById('cancelBtn');
const contents4 = document.getElementById('contents-4');
const single = contents4.getElementsByClassName('single');
const multi = contents4.getElementsByClassName('multi');
const color = contents4.getElementsByClassName('color');

cancelBtn.addEventListener('click',()=>{
   //値を空文字にする
   userName.value = '';
   password[0].value = '';
   password[1].value = '';
   single[0].value = ''; // age
   single[1].value = ''; // mail
   single[2].value = ''; // mail2
   multi[0].checked = false; // male
   multi[1].checked = false; // female
   for(let i=0;i<color.length;i++){
      color[i].selected = false; // female
   }
   multi[2].checked = false; // 科目
   multi[3].checked = false; // 科目
},false);
