<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Jordybsk\ExPostgress\Connection;
use Jordybsk\ExPostgress\Lib;

// create a new connection
$connection = new Connection();

// check if username and password are set
if (!isset($_POST['username'], $_POST['password']))
    Lib::respond('Please enter a valid username and password');
if (empty($_POST['username']))
    Lib::respond('Username cannot be empty');
if (mb_strlen($_POST['username']) > 255)
    Lib::respond('Username size cannot exceed 255 characters');
// password needs to be at least 8 characters long, have at least one uppercase letter, one lowercase letter, one number and one special character
if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/', $_POST['password']))
    Lib::respond('Password needs to be at least 8 characters long, have at least one uppercase letter, one lowercase letter, one number and one special character');

// create a new user
try {
    $connection->register($_POST['username'], $_POST['password']);
} catch (Exception $e) {
    switch ($e->getCode()) {
        case 23000:
            Lib::respond('Username already exists');
        default:
            Lib::respond('User creation failed');
    }
}

// respond with a message
Lib::respond('User created successfully');
