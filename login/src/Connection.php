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
        $this->database = new Database(
            new PDO('sqlite:'.__DIR__.'/../'.$_ENV['DB_NAME'])
        );
    }
    public function connect(string $username, string $password): string {
		$this->database->connect($_POST['username'], $_POST['password']);
    }
}