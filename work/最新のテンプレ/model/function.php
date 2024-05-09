<?php
//日付の存在確認「checkdate」の強化版
function checkdateSP($year,$month,$day){
   //year
   if($year < 1 || 32767 < $year) return '※対応した年ではありません。';
   //month
   if($month < 1 || 12 < $month) return '※月が不適切です。';
   //day
   $maxDay = [31,28,31,30,31,30,31,31,30,31,30,31];
   if($year % 4 == 0 && $year % 100 != 0) $maxDay[1] = 29; //うるう
   if($year % 400 == 0) $maxDay[1] = 29; //うるう
   if($day < 1 || $maxDay[$month - 1] < $day) return '※日が不適切です。';
   return 'OK';
}

//配列が空かどうかチェック
function emptyArray($array){
   foreach($array as $key => $value){
      if(empty($value)){
         unset($array[$key]);
      }
   }
   if(empty($array)) return true;
   return false;
}

//入力値チェック
//2次元配列を受け取る
/*
$preData = [
   [$_POST['name'],['empty']],
   [$_POST['age'],['empty','isnumeric']],
   [$_POST['title'],['empty','isnumeric']],
   [$_POST['release_date'],['empty','isnumeric','strlen,=,8','date']],
   [$_POST['purchase_date'],['empty','isnumeric','strlen,=,8']]
];
$error_msg['name'] = inputCheck($preData[0]);
$error_msg['age'] = inputCheck($preData[1]);
$error_msg['title'] = inputCheck($preData[2]);
$error_msg['release_date'] = inputCheck($preData[3]);
$error_msg['purchase_date'] = inputCheck($preData[4]);
*/
function inputCheck($data){
   //エラーメッセージ
   foreach($data[1] as $key => $value){
      //空
      if($value == 'empty') if($data[0] == '') return '※入力が確認できません。';
      //数値
      if($value == 'isnumeric') if(!is_numeric($data[0])) return '※入力できるのは数値のみです。';
      //数
      if(strpos($value,'figure') !== false){
         //配列にする
         $list = explode(',',$value);
         switch($list[1]){
            case '<': if(($data[0]) >= $list[2]) return '※'.$list[2].'未満の数を入力してください。'; break;
            case '<=': if(($data[0]) > $list[2]) return '※'.$list[2].'以下の数を入力してください。'; break;
            case '=': if(($data[0]) != $list[2]) return '※'.$list[2].'になるように入力してください。'; break;
            case '>=': if(($data[0]) < $list[2]) return '※'.$list[2].'以上の数を入力してください。'; break;
            case '>': if(($data[0]) <= $list[2]) return '※'.$list[2].'より大きい数を入力してください。';
         }
      }
      //整数
      if($value == 'integer') if(strpos($data[0],'.') !== false) return '※入力できるのは整数のみです。';
      //桁数
      if(strpos($value,'strlen') !== false){
         //配列にする
         $list = explode(',',$value);
         switch($list[1]){
            case '<': if(strlen($data[0]) >= $list[2]) return '※'.$list[2].'桁未満で入力してください。'; break;
            case '<=': if(strlen($data[0]) > $list[2]) return '※'.$list[2].'桁以下で入力してください。'; break;
            case '=': if(strlen($data[0]) != $list[2]) return '※'.$list[2].'桁で入力してください。'; break;
            case '>=': if(strlen($data[0]) < $list[2]) return '※'.$list[2].'桁以上で入力してください。'; break;
            case '>': if(strlen($data[0]) <= $list[2]) return '※'.$list[2].'桁超過で入力してください。';
         }
      }
      //時間チェック
      if($value == 'date'){
         $year = substr($data[0],0,4);
         $month = substr($data[0],4,2);
         $day = substr($data[0],6,2);
         if(strtotime('now') < strtotime($year.$month.$day)) return '※未来の日付は登録できません。';
         /* if(!checkdate($month,$day,$year)) return 'グレゴリオ暦において不適切です。'; */
         if(checkdateSP($year,$month,$day) != 'OK') return checkdateSP($year,$month,$day);
      }
      //メールアドレスチェック
      if($value == 'mail'){
         if(!strpos($data[0],'@')) return '※有効なメールアドレスを入力してください。。';
         //@が２文字目以降に存在する
      }
   }
   return '';
}

//8桁の数字をハイフン区切りにする(date型)
function dateHyphen($num){
   $year = substr($num,0,4);
   $month = substr($num,4,2);
   $day = substr($num,6,2);
   return $year.'-'.$month.'-'.$day;
}

//ハッシュ化
function hashPassword($password,$salt,$strech){
   for($i=0; $i<$strech; $i++){
      $password = $salt.$password;
      $password = md5($password);
   }
   return $password;
}

//GDライブラリで画像圧縮
function gdImgCompression($uploadFile,$saveFileName,$width,$height,$space=true,$extension=true){
   switch($uploadFile['type']){
      case 'image/jpg': $mime = 'jpg'; break;
      case 'image/jpeg': $mime = 'jpg'; break;
      case 'image/png': $mime = 'png'; break;
      case 'image/gif': $mime = 'gif';
   }

   //元画像をメモリに生成
   switch($mime){
      case 'jpg': $img_in=imagecreatefromjpeg($uploadFile['tmp_name']); break;
      case 'png': $img_in=imagecreatefrompng($uploadFile['tmp_name']); break;
      case 'gif': $img_in=imagecreatefromgif($uploadFile['tmp_name']);
   }
   if($img_in == false) return 'error501';

   ////サイズの計算
   $img_size = getimagesize($uploadFile['tmp_name']); //画像サイズを取得
   //両方小さい
   if($img_size[0]<=$width && $img_size[1]<=$height){
      $newWidth = $img_size[0];
      $newHeight = $img_size[1];
   }
   //片方大きい & 両方大きい
   else if($img_size[0]/$width > $img_size[1]/$height){
      $newWidth = $width;
      $newHeight = $img_size[1] * $width / $img_size[0];
   }else if($img_size[0]/$width < $img_size[1]/$height){
      $newWidth = $img_size[0] * $height / $img_size[1];
      $newHeight = $height;
   }

   if($space){
      //画像を中央に配置
      $startX = ($width-$newWidth)/2;
      $startY = ($height-$newHeight)/2;

      $img_out=ImageCreateTruecolor($width,$height);		//背景の黒い新しいサイズの画像ファイルを作成(width,height)
      ////残りの部分を透明にするために先に全体を透明(白)にする
      switch($mime){
         case 'jpg':
            //$img_default=imagecreatefrompng('./BG/thumb_white.jpg');
            //ImageCopyResampled($img_out,$img_default,0,0,0,0,150,100,150,100);
            $img_BGcolor = imagecolorallocate($img_out, 255, 255, 255); //背景色を設定
            imagefill($img_out, 0, 0, $img_BGcolor); //座標(左上)から塗りつぶす
            break;
         case 'png':
            imagealphablending($img_out, false);  // (透明部分処理)アルファブレンディングをoffにする
            imagesavealpha($img_out, true);       // (透明部分処理)完全なアルファチャネル情報を保存するフラグをonにする
            //$img_clear=imagecreatefrompng('./BG/thumb_transparent.png');
            //ImageCopyResampled($img_out,$img_clear,0,0,0,0,$width,$height,$width,$height);
            $img_clear=imagecreatefrompng('./BG/thumb_white.png');
            ImageCopyResampled($img_out,$img_clear,0,0,0,0,$width,$height,$width,$height);
            break;
         case 'gif':
            $img_BGcolor = imagecolorallocate($img_out, 255, 255, 255); //背景色を設定
            imagefill($img_out, 0, 0, $img_BGcolor); //座標(左上)から塗りつぶす
      }

      //コピーする(コピー先,コピー元,コピー先のx座標,コピー先のy座標,コピー元のx座標,コピー元のy座標,コピー先の幅,コピー先の高さ,コピー元の幅,コピー元の高さ)
      ImageCopyResampled($img_out,$img_in,$startX,$startY,0,0,$newWidth,$newHeight,$img_size[0],$img_size[1]);

   }else{
      $img_out=ImageCreateTruecolor($newWidth,$newHeight);		//背景の黒い新しいサイズの画像ファイルを作成(width,height)
      //コピーする(コピー先,コピー元,コピー先のx座標,コピー先のy座標,コピー元のx座標,コピー元のy座標,コピー先の幅,コピー先の高さ,コピー元の幅,コピー元の高さ)
      ImageCopyResampled($img_out,$img_in,0,0,0,0,$newWidth,$newHeight,$img_size[0],$img_size[1]);
   }



   //(メモリから第２引数のパスに)画像ファイルの書き出し
   //拡張子自動補完
   if($extension){
      switch($mime){
         case 'jpg': Imagejpeg($img_out,$saveFileName.'.jpg'); break;
         case 'png': Imagepng($img_out,$saveFileName.'.png'); break;
         case 'gif': Imagegif($img_out,$saveFileName.'.gif');
      }
   }else{
      switch($mime){
         case 'jpg': Imagejpeg($img_out,$saveFileName); break;
         case 'png': Imagepng($img_out,$saveFileName); break;
         case 'gif': Imagegif($img_out,$saveFileName);
      }
   }

   //◎画像加工を行った後は、メモリを開放すること
   ImageDestroy($img_in);
   ImageDestroy($img_out);
}


//----------~----------~----------~----------「,」区切りcsvから２次元配列に格納（改行を削除）----------~----------~----------~----------
function dualArray_from_csv($csv_file){
   $fp = fopen($csv_file,'r');
   $i = 0;
   $list = [];                            //空配列を用意
   while($value = fgets($fp)){            //一行ずつ取り出す
      $list[] = explode(',',$value);      //配列に格納
      $list[$i][count($list[$i])-1] = substr($list[$i][count($list[$i])-1],0,-1);       //改行を削除
      $i ++;
   }
   fclose($fp);
   return $list;
}


//8桁の数字をdata型にする
function dataHyphen($num){
   $year = substr($num,0,4);
   $month = substr($num,4,2);
   $day = substr($num,6,2);
   return $year.'-'.$month.'-'.$day;
}

//6桁の数字をtime型にする
function timeColon($num){
   $hour = substr($num,0,2);
   $minute = substr($num,2,2);
   $second = substr($num,4,2);
   return $hour.':'.$minute.':'.$second;
}
?>