<!DOCTYPE HTML>
<html lang="ja">
<head>
   <meta charset="utf-8">
   <title>5/27 | json練習</title>
   <link rel="stylesheet" href="../css/BS.css">
   <link rel="stylesheet" href="../css/sample1.css">
</head>
<body>
<div id="wrapper">

<header class="displayFlex">
   <h1>JSON1-2</h1>
   <nav><ul><li><a href="#">area</a></li><li><a href="#">piece</a></li><li><a href="#">section</a></li><li><a href="#">category</a></li><li><a href="#">field</a></li><li><a href="#">zone</a></li><li><a href="#">branch</a></li><li><a href="#">secter</a></li><li><a href="#">part</a></li></ul></nav>
</header>

<main>

<article class="contents">
   <p><?php echo $_GET['msg']; ?></p>
   <hr>
   <p><?php echo $_GET['json']; ?></p>
   <hr>
   <p><pre><?php var_dump($json); ?></pre></p>
</article><!-- contents -->

</main>

</div><!-- wrapper -->
</body>
</html>