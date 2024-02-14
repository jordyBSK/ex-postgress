<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;

// create a new connection
$connection = new Connection();

// check if password and username are set
if (!isset($_POST['username'], $_POST['password'])) {
    throw new Exception('Please enter a valid username and password');
}

$connection->connect($_POST['username'], $_POST['password']);
