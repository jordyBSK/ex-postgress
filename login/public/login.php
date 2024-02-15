<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;
use Jordybsk\ExPostgress\Lib;

// create a new connection
$connection = new Connection();

// check if user is already logged in
if ($connection->isConnected())
    Lib::respond(['message' => 'You are already logged in']);

// check if password and username are set
if (!isset($_POST['username'], $_POST['password']))
    Lib::respond(['message' => 'Please enter a valid username and password']);

// check if username and password are correct
$token = $connection->connect($_POST['username'], $_POST['password']);
Lib::respond(['message' => 'Login successful', 'token' => $token]);
