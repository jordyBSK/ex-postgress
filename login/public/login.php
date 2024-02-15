<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;
use Jordybsk\ExPostgress\Lib;

// create a new connection
$connection = new Connection();

// check if user is already logged in
if ($connection->isConnected())
    Lib::respond('You are already logged in');

// check if password and username are set
if (!isset($_GET['username'], $_GET['password']))
    Lib::respond('Please enter a valid username and password');

// check if username and password are correct
$token = $connection->connect($_GET['username'], $_GET['password']);
Lib::respond('Login successful', ['token' => $token]);
