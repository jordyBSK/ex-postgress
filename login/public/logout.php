<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;
use Jordybsk\ExPostgress\Lib;

// create a new connection
$connection = new Connection();

// check if user is logged in
if (!$connection->isConnected())
    Lib::respond('You are not logged in');

// log out the user
$connection->logout();

// respond with a message
Lib::respond('Logout successful');
