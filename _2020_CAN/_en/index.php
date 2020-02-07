<?php include "include/header.html"; ?>

<div>
<?
	/* Sub페이지 내용 */
	$part_rs = $db->obj("TB_PART","WHERE part_url='$url'");
?>

<?	
	if($part_rs->part_mgrid=="history"){ 
		include_once "html/history.html";
	} else if($part_rs->part_mgrid=="notice"){ 
		include_once "html/notice.html";
	} else if($part_rs->part_mgrid=="news"){
		include_once "html/news.html";
	} else if($part_rs->part_mgrid=="faq"){
		include_once "html/faq.html";
	} else if($part_rs->part_mgrid=="recipe"){
		include_once "html/recipe.html";



	} else { 
		echo $part_rs->part_content;
	} 
 ?>

</div>
<?php include "include/footer.html"; ?>
