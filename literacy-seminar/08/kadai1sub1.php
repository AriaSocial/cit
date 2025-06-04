<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset=UTF-8">
<title>勝負の結果は？</title>
</head>
<body>
<h1>第8週 Webサイト構築（1）</h1>
<h3>課題１（１）</h3>
<?php
//ユーザが入力した数値（0,1,2）を文字列「グー，チョキ，パー」に変換するための関数
function hyouji($arg){
  if ($arg == 0){
	  $str = "グー";
  } elseif ($arg == 1){
	  $str = "チョキ";
  } else {
	  $str = "パー";
  }
  return $str;
}
$user = @$_POST['janken'];  //@は表示抑制用のおまじない
$com  = rand(0, 2);       //コンピュータの手（0,1,2）を乱数で決める
$win  = $_POST['win'];     //勝った回数
$lose = $_POST['lose'];    //負けた回数
$aiko = $_POST['aiko'];    //あいこだった回数
//勝ち負けを判定する
if ($user == $com){
       $result = "あいこ";
       $aiko++;
} elseif ($com == ($user+1) % 3) {
       $result = "ユーザの勝ち";
       $win++;
} else {
       $result = "コンピュータの勝ち";
       $lose++;
}
echo "ユーザは<span style='color:red;'>";
echo hyouji($user);
echo "</span>で，コンピュータは<span style='color:red;'>";
echo hyouji($com);
echo "</span><BR>";
echo "したがって，$result";
echo "<BR><BR>結果，<span style='color:red;'>".$win."</span>勝 <span style='color:red;'>"; 
echo $lose."</span>敗 <span style='color:red;'>".$aiko."</span>分け";
?>
<br><br>
<form action="kadai1sub1.php" method="GET">
<input type="submit" value="もう一度勝負">
<input type="hidden" value=<?php echo $win; ?>  name="win">
<input type="hidden" value=<?php echo $lose; ?> name="lose">
<input type="hidden" value=<?php echo $aiko; ?> name="aiko">
</form>
<br>
<form action="kadai1main.php" method="GET">
<input type="submit" value="メインに戻る">
<input type="hidden" value=0 name="win">
<input type="hidden" value=0 name="lose">
<input type="hidden" value=0 name="aiko">
</form>
</body>
</html>
