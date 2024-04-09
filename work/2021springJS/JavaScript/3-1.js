//p150 lesson 42

let element31 = document.getElementById('section03');
let element32 = element31.getElementsByClassName('item');
let element33 = element32[0].getElementsByTagName('button');

element33[0].addEventListener('click', func003);
element33[1].addEventListener('dblclick', func003);
element33[2].addEventListener('mouseout', func003);
element33[3].addEventListener('mouseover', func003);
element33[4].addEventListener('mouseup', func003);
element33[5].addEventListener('mousedown', func003);
element33[6].addEventListener('mousemove', func003);
element33[7].addEventListener('click', func0031);

function func003(){
   //「createElement」はdocument直下でないと不可
   //BUTとりあえず作ってから移動させれば良いじゃん
   let element35 = document.createElement('div'); //新しい要素の作成
   element35.setAttribute('class','element35'); //属性と内容の設定
   element32[1].insertBefore(element35, null); //追加する場所の設定

   element35.innerHTML = '<p>要素追加しとる</p>';
}
function func0031(){
   let element36 = element32[1].getElementsByClassName('element35');
   element32[1].removeChild(element36[0]); //要素を削除
}

let element34 = document.getElementById('form');

element33[0].addEventListener('click', function() {
   element34.style.display = 'flex'; //フォームを表示
});

