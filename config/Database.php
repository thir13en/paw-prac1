<?php
	class Database {
		private $host = 'localhost';
		private $dbname = 'restauranteuoc';
		private $username = 'pawprac1';
		private $userpsswd = '3LYt%6q4*s5r';
		private $conn;

		public function connect() {
			$this->conn = null;

			try {
				$this->conn = new PDO(
					'mysql:host=' . $this->host . ';dbname=' . $this->dbname,
					$this->username,
					$this->userpsswd
				);
				$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}
			catch(PDOException $e) {
				echo 'Connection Error: ' . $e->getMessage();
			}

			return $this->conn;
		}
	}
?>
