<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;
$connection = new Connection();

$connection->connect($_POST['username'], $_POST['password']);
