<?php
	include_once('system/microtemplate.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>
			php-microtemplate simple example
		</title>
		<!-- Adding the template "templates/css.php" -->
		<?=template('css')?>
	</head>
	<body>
		<div id="wrapper">
			<!-- Adding the template "templates/content.php" -->
			<?=template('content')?>
			
			<!-- Adding the template "templates/footer.php" -->
			<?=template('footer')?>
		</div>
	</body>
</html>

