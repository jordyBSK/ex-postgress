<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;

// create a new connection
$connection = new Connection();

// check if user is already logged in
if ($connection->isConnected()) {
	echo $_SESSION['token'];
	exit;
}

// check if password and username are set
if (!isset($_POST['username'], $_POST['password'])) {
    throw new Exception('Please enter a valid username and password');
}

// check if username and password are correct
echo $connection->connect($_POST['username'], $_POST['password']);
