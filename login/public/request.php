<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;
use Jordybsk\ExPostgress\Lib;

// create connection
$connection = new Connection();

// check if user is already logged in
if (!$connection->isConnected())
    Lib::respond('Please log in first');

// check if the request has an url
if (!isset($_GET['url']))
    Lib::respond('Please enter a valid url');

// send a request to the url provided with the data provided

$response = $connection->callAPI('GET', $_GET['url'], $_GET['data']);
if (!$response)
	Lib::respond('Request failed');

Lib::respond('Request successful', ['response' => json_decode($response) ?? htmlspecialchars($response)]);
