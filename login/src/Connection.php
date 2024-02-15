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
        if (isset($_SESSION['token'])) {
            if ($this->database->verifyToken($_SESSION['token'])) 
                return true;
            unset($_SESSION['token']);
        }
        return false;
    }

    public function connect(string $username, string $password): string {
        $token = $this->database->connect($username, $password);
        $_SESSION['token'] = $token;
        return $token;
    }
    public function register(string $username, string $password) {
        $this->database->register($_POST['username'], $_POST['password']);
    }
    public function callAPI(string $method, string $url, array $data) {
        return Lib::callAPI($method, $url, $data);
    }
}