//p142 lesson 40

let element21 = document.getElementById('section02');
let element22 = element21.getElementsByClassName('item');
element22[0].innerHTML = '<p>練習中じゃい</p>';

/* let element23 = element22[1].createElement('div'); //新しい要素の作成 */
//「createElement」はdocument直下でないと不可
let element23 = element22[1];

//属性と内容の設定
element23.setAttribute('id','element23');
//要素をHTMLに追加
element23.innerHTML = '<p>要素追加してます（末尾）</p>';

//追加する場所の設定
element21.insertBefore(element23, null);
//第一引数を第二引数の直前に追加する
//「null」は末尾の意味

//p146 lesson 41
//要素の削除
let element24 = element21.getElementsByTagName('li');
let element25 = element24[1];

let parent = element25.parentElement; //親要素を取得
parent.removeChild(element25); //要素を削除
