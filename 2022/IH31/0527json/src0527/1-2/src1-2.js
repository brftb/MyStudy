// 配列作成
const array = [
   'bar',
   100,
   true,
   {'a': 'b'},
   {
      'xxx':'baz',
      'yyy':'barbaz'
   }
];

// JSON文字列に変換
const val = JSON.stringify(array);


//// 表示(inputタグを格納)
// 用意
let input = document.createElement('input');
input.type = 'hidden';
input.name = 'json';
input.value = val;
// 追加
let parent = document.getElementsByTagName('form');
parent[0].appendChild(input);
