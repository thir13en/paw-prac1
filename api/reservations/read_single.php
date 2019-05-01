<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	include_once '../../config/Database.php';
	include_once '../../models/Reservations.php';

	// initiate database and connect
	$database = new Database();
	$db = $database->connect();

	// instantiate reservation
	$reservations = new Reservations($db);

	$result = $reservations->readSingle(8);

	echo json_encode($result->fetch(PDO::FETCH_ASSOC));
?>
