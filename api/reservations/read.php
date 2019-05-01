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

	$result = $reservations->read();

	$num = $result->rowCount();

	if ($num > 0) {
	 	$reservations_array = array();
	 	$reservations_array['status'] = 200;
	 	$reservations_array['data'] = array();

		while($row = $result->fetch(PDO::FETCH_ASSOC)) {
			extract($row);

			$reservation_item = array(
				'id' => $id,
				'name' => $name,
				'surnames' => $surnames,
				'phone' => $phone,
				'date_reservation' => $date_reservation,
				'guests' => $guests,
				'comments' => $comments
			);
			
			array_push($reservations_array['data'], $reservation_item);
		}
		echo json_encode($reservations_array);
		
	} else {
		echo json_encode(['message'=>'no reservations', 'status'=>200]);
	}
?>
