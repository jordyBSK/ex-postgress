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
        $token = $this->database->connect($_POST['username'], $_POST['password']);
        $_SESSION['token'] = $token;
        return $token;
    }
    public function register(string $username, string $password) {
        $this->database->register($_POST['username'], $_POST['password']);
    }

    public function callAPI(string $method, string $url, array|null $data = null, string|null $auth = null): bool|string {
        $curl = curl_init();

        switch ($method) {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        // Optional Authentication:
        if ($auth) {
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($curl, CURLOPT_USERPWD, $auth);
        }

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    }
}