<?php

namespace Jordybsk\ExPostgress;


readonly class Database {
    public function __construct(private \PDO $pdo) {}

}