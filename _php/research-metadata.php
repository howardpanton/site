<?php

	$subject = array(
		<t4 type="navigation" id="4889"/>
	//	'History, Theory & Cultural Studies,',
	//	'Curation, Collections & Conservation,',
	//	'Design'
	);

	print_r(array_values($subject));

	echo implode(" | ",$subject);

	//    <!-- navigation object : Research Profile Metadata College -->
	//    <meta name="research-profile-metadata-college" content="CSM, University Wide, LCC"/>
	//    <!-- navigation object : Research Profile Metadata Subject -->
	//    <meta name="research-profile-metadata-subject" content="History, Theory & Cultural Studies, Curation, Collections & Conservation, Design"/>
	//    <!-- navigation object : Research Profile Metadata Theme -->
	//    <meta name="research-profile-metadata-theme" content=""/>
	
?>