<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../lib.php';

use Firebase\JWT\JWT;
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

// Generate a token for the user that expires at midnight
$payload = [
    'role' => 'web_user',
    'id' => $user[0]['id'],
    'exp' => strtotime('tomorrow midnight')
];
$token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

output(['token' => $token]);
