<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\Dotenv\Dotenv;

$data = match ($_SERVER['REQUEST_METHOD']) {
	'GET' => $_GET,
	'POST' => $_POST,
	default => output(['error' => 'Unsupported method'], 405),
};

if (!isset($data['username']) || !isset($data['password']))
    output(['error' => 'Username and password are required'], 400);

// Load environment variables
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/../.env');
