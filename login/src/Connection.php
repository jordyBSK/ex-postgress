<?php
namespace Jordybsk\ExPostgress;

session_start();


class Connection {
    public function __construct() {
        // query data from .env file
        $dotenv = new Dotenv();
        $dotenv->load(__DIR__.'/../.env');

        // connect to database
        $this->database = new Database(
            new PDO('sqlite:'.__DIR__.'/../'.$_ENV['DB_NAME'])
        );
    }
}