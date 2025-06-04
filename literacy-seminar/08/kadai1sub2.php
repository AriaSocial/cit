<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset=UTF-8">
<title>inputタグの活用</title>
</head>
<body>
<h1>第11週 Webサイト構築（2）</h1>
<h3>課題１（２）</h3>
<?php
//チェックボックスの選択状況
if(isset($_POST['Jump'])){
   echo "<div style='color:red;'>Jumpが選ばれた！</div>";
   } else {
   echo "<div style='color:blue;'>Jumpは選ばれなかった！</div>";
   }
if(isset($_POST['Go'])){
   echo "<div style='color:red;'>Goが選ばれた！</div>";
   } else {
   echo "<div style='color:blue;'>Goは選ばれなかった！</div>";
   }
if(isset($_POST['Warp'])){
   echo "<div style='color:red;'>Warpが選ばれた！</div>";
   } else {
   echo "<div style='color:blue;'>Warpは選ばれなかった！</div>";
   }
if(isset($_POST['color'])){
   echo '<p>色は「<span style="color:'.$_POST['color'].';">'.$_POST['color']."</span>」（16進数表記）が選ばれた！</p>";
   }
if(isset($_POST['date'])){
   if ($_POST['date']<>""){
       echo '<p>入力された日付は「<span style="font-weight:bold">'.$_POST['date']."</span>」です！</p>";
   } else {
	   echo '日付は<span style="font-weight:bold">未入力</span>です．<br>';
   }
}
if(isset($_POST['password'])){
   if ($_POST['password']<>""){
	   echo '<p>入力されたパスワードは「<span style="font-weight:bold">'.$_POST['password']."</span>」です！</p>";
   } else {
	   echo 'パスワードは<span style="font-weight:bold">未入力</span>です．<br>';
   }
}
?>
<br>
<form action="kadai1main.php" method="GET">
<input type="submit" value="戻る">
</form>
<br>
</body>
</html>
