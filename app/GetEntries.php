<?php
require_once('connection/appdb.php');

$rawdata = json_decode($HTTP_RAW_POST_DATA);

$from =  $rawdata->from;
$to =  $rawdata->to;
// $programid = $rawdata->programid;


$result = mysql_query("SELECT * FROM `request_for_banner_designs_form` ORDER BY created DESC limit {$from},{$to}");

$data = array();
while ($row = mysql_fetch_array($result)) {
	array_push($data, array(
					'name' => $row['name']
				, 'email' => $row['email']
				, 'contactNumber' => $row['contact_number']
				, 'bannerType' => $row['banner_type']
				, 'format' => json_decode($row['format'])
				, 'sizes' => json_decode($row['sizes'])
				, 'adServer' => $row['ad_server']
				, 'notes' => $row['notes']
				, 'created' => $row['created']
	));
}

echo json_encode($data);