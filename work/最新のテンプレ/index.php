<!DOCTYPE HTML>
<html lang="ja">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <link rel="icon" type="image/x-icon" href="./img/favicon.png">
   <title>5/25→5/25 | BTCdataAnalysis</title>
   <link rel="stylesheet" href="./css/BS.css">
   <link rel="stylesheet" href="./css/style00.css">
   <script src="./js/file_preview.js" defer></script>
</head>
<body>
<div id="wrapper">

<header class="displayFlex">
   <h1><a href="#">画像編集</a></h1>
   <nav><ul><li><a href="#">area</a></li><li><a href="#">piece</a></li><li><a href="#">section</a></li><li><a href="#">category</a></li><li><a href="#">field</a></li><li><a href="#">zone</a></li><li><a href="#">branch</a></li><li><a href="#">secter</a></li><li><a href="#">part</a></li></ul></nav>
</header>

<main>

<article class="contents" id="contents-1">
   <h2>ボタン操作1</h2>
   <h3>計算処理(小数点有）</h3>
   <p class="question">
      小数点の値計算を含む四則演算を行う。<br>
      【加点】小数第2位までで四捨五入を行う　（123.4567 ⇒　123.46)
   </p>
   <p>
      値<input id="calcVal-1" type="text" name="" value="">
      値<input id="calcVal-2" type="text" name="" value="">
   </p>
   <p>
      <button class="calcBtn" name="" value="add">+</button>
      <button class="calcBtn" name="" value="sub">-</button>
      <button class="calcBtn" name="" value="multi">×</button>
      <button class="calcBtn" name="" value="division">÷</button>
   </p>
   <p id="answer">結果</p>
</article><!-- contents -->

<article class="contents" id="contents-2">
   <h2>ボタン操作2</h2>
   <h3>BMI計算</h3>
   <p class="question">
      ＢＭＩ計算を行う（仕様はjv21を参考）<br>
      【加点】身長、体重のテキストに入力された場合のみボタンを活性させる
   </p>
   <div class="displayFlex">
      <p>身長（cm)<input class="userInf" type="text" name="" value=""></p>
      <p>体重(kg)<input class="userInf" type="text" name="" value=""></p>
      <button id="BMIBtn" name="" value="" disabled="false">BMI計算</button>
   </div>
   <div class="displayFlex result">
      <p id="displayBmi">BMI値</p>
      <p id="displayFigure">体型</p>
   </div>
</article><!-- contents -->

</main>

<footer>
   <p>COPYRIGHT © ALL RIGHTS RESERVED.</p>
</footer>

<div id="pagetop">
   <p><a href="#"></a></p>
</div>

</div><!-- wrapper -->
</body>
</html>