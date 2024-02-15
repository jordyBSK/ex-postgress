<?php
namespace Jordybsk\ExPostgress;

session_start();

use PDO;
use Symfony\Component\Dotenv\Dotenv;

class Connection {
    private Database $database;
    public function __construct() {
        // query data from .env file
        $dotenv = new Dotenv();
        $dotenv->load(__DIR__.'/../.env');

        // connect to database
        $this->database = new Database(new PDO('sqlite:'.__DIR__.'/../'.$_ENV['DB_NAME']));
    }
    public function isConnected(): bool {
        // check if user is already logged in
        return (isset($_GET['token']) && $this->database->verifyToken($_GET['token']));
    }

    public function connect(string $username, string $password): string {
        $token = $this->database->connect($username, $password);
        return $token;
    }
    public function register(string $username, string $password) {
        $this->database->register($_GET['username'], $_GET['password']);
    }
    public function callAPI(string $method, string $url, array|string|null $data) {
        return Lib::callAPI($method, $url, is_string($data) ? json_decode($data, true) : $data);
    }
}