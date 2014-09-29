<?php
require_once('connection/appdb.php');

$rawdata = json_decode($HTTP_RAW_POST_DATA);


$name = $rawdata->name;
$email = $rawdata->email;
$contactNumber = $rawdata->contactNumber;
$bannerType = $rawdata->bannerType;
$format = json_encode($rawdata->format);
$sizes = json_encode($rawdata->sizes);
$adServer = $rawdata->adServer;
$notes = $rawdata->notes;
$created = $rawdata->created;

$id = 0;
if (isset($rawdata->id)) {
   $id = $rawdata->id;
}


$result = mysql_query("SELECT * FROM `request_for_banner_designs_form` WHERE `id`='{$id}'");
$num_rows = mysql_num_rows($result);

if ($num_rows > 0) {
  // do something
  $sql = "UPDATE `request_for_banner_designs_form` 
			SET `name` = '{$name}'
				, `email` = '{$email}'
				, `contact_number` = '{$contactNumber}'
				, `banner_type` = '{$bannerType}'
				, `format` = '{$format}'
				, `sizes` = '{$sizes}'
				, `ad_server` = '{$adServer}'
				, `notes` = '{$notes}'
				, `created` = '{$created}'
			WHERE `id` = '{$id}'
		";
  if (!mysql_query($sql,$db)){
		die('Error: ' . mysql_error());
	}
  
}
else {
  // do something else
	$sql = "INSERT INTO `request_for_banner_designs_form` 
				(name, 
					email, 
					contact_number, 
					banner_type, 
					format, 
					sizes, 
					ad_server, 
					notes, 
					created
				)
				VALUES ('{$name}', 
					'{$email}', 
					'{$contactNumber}', 
					'{$bannerType}', 
					'{$format}', 
					'{$sizes}', 
					'{$adServer}', 
					'{$notes}', 
					'{$created}'
				)
			";
						
	if (!mysql_query($sql,$db)){
		die('Error: ' . mysql_error());
	}
}

