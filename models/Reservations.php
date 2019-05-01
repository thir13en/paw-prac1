<?php
	class Reservations {
		// db stuff
		private $conn;
		private $table = 'reservas';

		// properties
		public $id;
		public $nombre;
		public $apellidos;
		public $telefono;
		public $fecha;
		public $comensales;
		public $comentarios;
		
		public function __construct($db) {
			$this->conn = $db;
		}

		public function read() {
			$query = 	'SELECT
							r.id as id,
							r.nombre as name,
							r.apellidos as surnames,
							r.telefono as phone,
							r.fecha as date_reservation,
							r.comensales as guests,
							r.comentarios as comments
						FROM ' . $this->table . ' r  
						WHERE r.fecha >= NOW()';

			// prepare statement
			$stmt = $this->conn->prepare($query);

			// execute query
			$stmt->execute();

			return $stmt;
		}

		public function read24() {
			$query = 	'SELECT
							r.id as id,
							r.nombre as name,
							r.apellidos as surnames,
							r.telefono as phone,
							r.fecha as date_reservation,
							r.comensales as guests,
							r.comentarios as comments
						FROM ' . $this->table . ' r  
						WHERE r.fecha BETWEEN NOW() AND NOW() + INTERVAL 1 DAY';


			// prepare statement
			$stmt = $this->conn->prepare($query);

			// execute query
			$stmt->execute();

			return $stmt;
		}

		public function readSingle($id) {
			$query = 	'SELECT
							r.id as id,
							r.nombre as name,
							r.apellidos as surnames,
							r.telefono as phone,
							r.fecha as date_reservation,
							r.comensales as guests,
							r.comentarios as comments
						FROM ' . $this->table . ' r  
						WHERE r.id=' . $id;

			// prepare statement
			$stmt = $this->conn->prepare($query);

			// execute query
			$stmt->execute();

			return $stmt;
		}

		public function create($data) {
			$query = 'INSERT INTO reservas(
				nombre,
				apellidos,
				telefono,
				fecha,
				comensales
			) VALUES (\'' .
				$data['name']. '\', \'' .
				$data['surnames'] . '\', \'' .
				$data['phone'] . '\', \'' .
				$data['date'] . '\', ' .
				$data['guests'] . ')';

			// prepare statement
			$stmt = $this->conn->prepare($query);

			if ($stmt->execute()) {
				return true;
			} else {
				printf('Error: %s.\n', $stmt->error);
				return false;
			}
		}

		public function update($data) {
			$query = 'UPDATE reservas r
						SET nombre=\'' . $data['name'] . '\',
							apellidos=\'' . $data['surnames'] . '\',
							telefono=\'' . $data['phone'] . '\',
							fecha=\'' . $data['date'] . '\',
							comensales=' . $data['guests'] . '
						WHERE r.id=' . $data['ID'];

			// prepare statement
			$stmt = $this->conn->prepare($query);

			if ($stmt->execute()) {
				return true;
			} else {
				printf('Error: %s.\n', $stmt->error);
				return false;
			}
		}

		public function delete($id) {
			$query = 'DELETE FROM ' . $this->table . ' WHERE ' . $this->table . '.id = :id';

			// prepare statement
			$stmt = $this->conn->prepare($query);

			// clean data
			$id = htmlspecialchars(strip_tags($id));


			$stmt->bindParam(':id', $id);

			if ($stmt->execute()) {
				return true;
			} else {
				printf('Error: %s.\n', $stmt->error);
				return false;
			}
		}

	}
?>