<?php 

function ual_table($filename, $header=false) {

// Open CSV file from server
$handle = fopen($filename, "r");

echo '</div></div></div></div>	<div class="content-wrapper"><div class="row"><div class="table-wrapper d5-d16">'; ?>
 <t4 type="content" name="Heading" output="selective-output" modifiers="" format="<h2>$value</h2>"  />
<?php echo '<table class="table">';

//display header row if true
if ($header) {
		// Get the header form the CSV file
    $csvcontents = fgetcsv($handle);

	// remove empty values from Array
	$d = array_filter($csvcontents);
	// convert HTML characters from Excel export
	$f = array_map("htmlentities", $d);
	// replace HTML characters with space
	$j = str_replace('&nbsp;', '', $f);

    echo '<thead><tr>';
    foreach ($j as $headercolumn) {
       echo "<th class='optional'>$headercolumn</th>";
    }
  echo '</tr></thead><tbody>';
}

// Loop through contents of CSV file
while ($csvcontents = fgetcsv($handle)) {

	// remove empty values from Array
	$d = array_filter($csvcontents);
	// convert HTML characters from Excel export
	$f = array_map("htmlentities", $d);
	// replace HTML characters with space
	$j = str_replace('&nbsp;', '', $f);

			// Loop through Cleaned content
	    echo '<tr>';
	    foreach ($j as $column) {
	    echo "<td>{$column}</td>";
	    }
	    echo '</tr>';
	}
  echo '</tbody></table></div></div></div><div class="content-wrapper"><div class="row"><div role="main" class="content">';
	fclose($handle);
}

// Run function
ual_table('/web/sites/t4/beta.arts.ac.uk<t4 type="content" name="CSV upload" output="file" modifiers=""  />',true);

?>


