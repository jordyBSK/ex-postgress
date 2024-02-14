<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;

// create connection
$connection = new Connection();

// check if user is already logged in
if (!$connection->isConnected())
    throw new Exception('Please log in first');

// check if the request has an url
if (!isset($_POST['url']))
    throw new Exception('Please enter a valid url');

// send a request to the url provided with the data provided
echo $connection->callAPI('GET', $_POST['url'], $_POST['data']);
