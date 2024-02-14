<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;

// create connection
$connection = new Connection();

// check if user is already logged in
if (!$connection->isConnected())
    throw new Exception('Please log in first');
