<?php
namespace Jordybsk\ExPostgress;

session_start();


class Connection {
    public function __construct() {
        // query data from .env file
        $dotenv = new Dotenv();
        $dotenv->load(__DIR__.'/../.env');
    }
}