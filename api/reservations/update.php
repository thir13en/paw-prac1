<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../models/Reservations.php';

	// initiate database and connect
	$database = new Database();
	$db = $database->connect();

	// instantiate reservation
	$reservations = new Reservations($db);

	$data = array(
		'name'=>$_POST['name'],
		'surnames'=>$_POST['surnames'],
		'phone'=>$_POST['phone'],
		'date'=>$_POST['date'],
		'guests'=>$_POST['guests'],
		'ID'=>$_GET['id']
	);
	// Create reservation
	if ($reservations->update($data)) {
		echo json_encode(array('OK'));
	} else {
		echo json_encode(array('KO'));
	}
?>
