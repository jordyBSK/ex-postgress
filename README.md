# ex-postgress

## Login Backend
Once the project is cloned, you can use the login backend
1. Go to the folder `login`
2. install the dependencies with `composer install`
3. Run the server with `php -S localhost:8000 -t public`
```bash
cd login
composer install
php -S localhost:8000 -t public
```
Once the server is running, you can send a GET request to `http://localhost:8000/login.php` with the following body:
```json
{
	"username": "xxxxx",
	"password": "xxxxx"
}
```
