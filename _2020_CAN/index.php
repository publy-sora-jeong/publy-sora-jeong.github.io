<?php include "include/header.html"; ?>

<div>
<?
	/* 게시물 내용 */
	$sql = "SELECT * ".
		" FROM TB_PART ".
		" WHERE part_url='$url' ";
#echo $sql;
	$rs = mysqli_query($conn, $sql);
	$obj = mysqli_fetch_object($rs);

?>
</div>
<? /*
<div class="section" id="subcontent">
	<div class="container">
			<div class="bbs_content">
				<p><?=$obj->part_content;?></p>
			</div>
	</div>
</div>
*/ ?>
<?=$obj->part_content;?>
  
<?php include "include/footer.html"; ?>
