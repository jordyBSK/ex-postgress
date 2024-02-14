<?php

namespace Jordybsk\ExPostgress;


readonly class Database {
    public function __construct(private \PDO $pdo) {}

    public function connect(string $username, string $password): string {
		// get the hash of the password for the given username
        $stmt = $this->pdo->prepare('SELECT password FROM "user" WHERE username = ?');
        $stmt->execute([$username]);
        $hash = $stmt->fetchColumn();
        if (password_verify($password, $hash)) {
			// TODO: generate a random token and an expiration date
        }
        throw new \Exception('Username or password is incorrect');
    }
}