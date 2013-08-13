<?php 
function jj_readcsv($filename, $header=false) {
$handle = fopen($filename, "r");
echo '</div></div></div></div>	<div class="panel bg-gray-bg"><div class="content-wrapper"><div class="row"><div class="table-wrapper d5-d16">'; ?>
 <t4 type="content" name="Heading" output="selective-output" modifiers="" format="<h2>$value</h2>"  />
<?php echo '<table>';
//display header row if true
if ($header) {
    $csvcontents = fgetcsv($handle);
    echo '<thead><tr>';
    foreach ($csvcontents as $headercolumn) {
        echo "<th class='optional'>$headercolumn</th>";
    }
  echo '</tr></thead><tbody>';
}
// displaying contents
while ($csvcontents = fgetcsv($handle)) {
    echo '<tr>';
    foreach ($csvcontents as $column) {
        echo "<td>$column</td>";
    }
    echo '</tr>';
}
  echo '</tbody></table></div></div></div></div><div class="content-wrapper"><div class="row"><div class="main-content">';
fclose($handle);
}

jj_readcsv('/web/sites/t4/beta.arts.ac.uk<t4 type="content" name="CSV upload" output="file" modifiers=""  />',true);
?>


