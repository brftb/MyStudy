<?php
//呼び出した場所にpagerを作成
class Pager{

   //現在のページ番号
   private $page_num;
   //１ページあたりの表示件数
   private $line;
   //表示対象の全データ
   private $data_array;

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

//コンストラクタ
public function __construct($data_array,$line,$page_num){
   $this->set_data_array($data_array);
   $this->set_line($line);
   $this->set_page_num($page_num);
}

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

//setterとgetter
private function set_page_num($num){
   //urlで指定されていたら変更
   if(isset($_GET['page_num'])) $num = $_GET['page_num'];
   $this->natural_number_check($num);
   $this->page_num = $num;
   //ありえない数値を入力された場合１ページ目を表示
   if($num < 1 || $this->get_last_page_num() < $num) $this->page_num = 1;
}
private function set_line($num){
   $this->natural_number_check($num);
   $this->line = $num;
}
private function set_data_array($array){
   $this->data_array = $array;
}

// 自然数チェック
private function natural_number_check($num){
   if(!is_numeric($num)){
      $num = 1;
   }elseif($num < 1){
      $num = 1;
   }
}

public function get_page_num(){
   return $this->page_num;
}
public function get_line(){
   return $this->line;
}
public function get_data_array(){
   return $this->data_array;
}

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

// メソッド

// 表示データを配列で返す
public function get_data(){
   for($i=($this->page_num-1)*$this->line; $i<$this->page_num*$this->line-1; $i++){
      if(count($this->data_array)-1<$i) continue;
      $array[] = $this->data_array[$i];
   }
   return $array;
}

// ページャの表示
public function page_list($class_array = [] , $str = ''){
   if(!empty($class_array)){
      $class = [
         'ul' => ' class="'.$class_array['ul'].'"',
         'li' => [
            'main' => ' class="'.$class_array['li']['main'],
            'active' => ' '.$class_array['li']['active'].'"',
            'disabled' => ' '.$class_array['li']['disabled'].'"'
         ],
         'a' => ' class="'.$class_array['a'].'"'
      ];
   }

   $pager = '<ul'.$class['ul'].'>';

   if($this->page_num == 1) $pager .= '<li'.$class['li']['main'].$class['li']['disabled'].'><a href="?page_num='.$this->get_back_page_num().'"'.$class['a'].'>前へ</a></li>';
   else $pager .= '<li'.$class['li']['main'].'"><a href="?page_num='.$this->get_back_page_num().'"'.$class['a'].'>前へ</a></li>';

   for($i=1; $i<=$this->get_last_page_num(); $i++){
      if($this->page_num == $i) $pager .= '<li'.$class['li']['main'].$class['li']['active'].'><a href="?page_num='.$i.'"'.$class['a'].'>'.$i.'</a></li>';
      else $pager .= '<li'.$class['li']['main'].'"><a href="?page_num='.$i.'"'.$class['a'].'>'.$i.'</a></li>';
   }

   if($this->page_num == $this->get_last_page_num()) $pager .= '<li'.$class['li']['main'].$class['li']['disabled'].'><a href="?page_num='.$this->get_next_page_num().'"'.$class['a'].'>次へ</a></li>';
   else $pager .= '<li'.$class['li']['main'].'"><a href="?page_num='.$this->get_next_page_num().'"'.$class['a'].'>次へ</a></li>';

   $pager .= '</ul>';
   echo $pager;
}

//最終ページ番号(総ページ数)取得
public function get_last_page_num(){
   //総ページ数
   $lastPageNum = count($this->data_array) / $this->line;
   //割り切れなければ切り捨て+1
   if($lastPageNum*10 % 10 != 0){
      $lastPageNum = floor($lastPageNum) + 1;
   }
   return $lastPageNum;
}

//前のページ番号取得
public function get_back_page_num(){
   //総ページ数
   $backPageNum = $this->page_num-1;
   //矛盾の除去
   if($backPageNum < 1) $backPageNum = 1;
   return $backPageNum;
}

//次のページ番号取得
public function get_next_page_num(){
   //総ページ数
   $nextPageNum = $this->page_num+1;
   //矛盾の除去
   if($this->get_last_page_num() < $nextPageNum) $nextPageNum = $this->get_last_page_num();
   return $nextPageNum;
}

//現在ページの先頭項番取得(pageStart)
public function get_first_column_num(){
   return ($this->page_num-1) * $this->line + 1;
}

//現在ページの末尾項番取得(pageEnd)
public function get_last_column_num(){
   return min($this->page_num * $this->line, count($this->data_array));
}

}