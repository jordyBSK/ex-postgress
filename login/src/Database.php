<?php

namespace Jordybsk\ExPostgress;

use Random\RandomException;

readonly class Database {
    public function __construct(private \PDO $pdo) {}

    /**
     * @param string $username
     * @param string $password
     * @return string a token
     * @throws RandomException
     */
    public function connect(string $username, string $password): string {
		// get the hash of the password for the given username
        $stmt = $this->pdo->prepare('SELECT password FROM "user" WHERE username = ?');
        $stmt->execute([$username]);
        $hash = $stmt->fetchColumn();
        if (password_verify($password, $hash)) {
            // generate a random token an expiration date
            $token = bin2hex(random_bytes(32));
            $tokenExpiresAt = date('Y-m-d H:i:s', strtotime('+1 day'));
            // store the token and expiration date in the database
            $stmt = $this->pdo->prepare('UPDATE "user" SET token = ?, token_expires_at = ? WHERE username = ?');
            $stmt->execute([$token, $tokenExpiresAt, $username]);
            // return the token
            return $token;
        }
        throw new \Exception('Username or password is incorrect');
    }
    /**
     * Check if a token exists and is still valid
     * @param string $token
     * @return bool
     */
    public function verifyToken(string $token): bool {
        $stmt = $this->pdo->prepare('SELECT COUNT(*) FROM "user" WHERE token = ? AND token_expires_at > ?');
        $stmt->execute([$token, date('Y-m-d H:i:s')]);
        return $stmt->fetchColumn() > 0;
    }
    /**
	 * Register a new user
     * @param string $username
     * @param string $password
     * @return void
     */
    public function register(string $username, string $password): void {
        $stmt = $this->pdo->prepare('INSERT INTO "user" (username, password) VALUES (?, ?)');
        $stmt->execute([$username, password_hash($password, PASSWORD_DEFAULT)]);
    }
}