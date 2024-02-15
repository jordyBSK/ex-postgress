<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;
use Jordybsk\ExPostgress\Lib;

// create connection
$connection = new Connection();

// check if user is already logged in
if (!$connection->isConnected())
    Lib::respond(['message' => 'Please log in first']);

// check if the request has an url
if (!isset($_POST['url']))
    Lib::respond(['message' => 'Please enter a valid url']);

// send a request to the url provided with the data provided

$response = $connection->callAPI('GET', $_POST['url'], $_POST['data']);
if (!$response)
	Lib::respond(['message' => 'Request failed']);

Lib::respond([
    'message' => 'Request successful',
    'response' => json_decode($response)
]);
