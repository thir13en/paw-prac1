<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Methods: POST');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../models/Reservations.php';

	// initiate database and connect
	$database = new Database();
	$db = $database->connect();

	// instantiate reservation
	$reservations = new Reservations($db);

	$data = json_decode($_POST['id']);
	$reservations->id = $data;
	
	// // Delete reservation
	if ($reservations->delete($data)) {
		echo json_encode(array('message'=>'reservation deleted'));
	} else {
		echo json_encode(array('message'=>'reservation NOT deleted'));
	}
?>
