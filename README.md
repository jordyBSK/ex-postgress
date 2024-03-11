# ex-postgress

## Postgresql
### Installation
This project uses a postgresql database wich is run in a docker container
Start by creating a database called `memoires-info`
Then to create the tables, you can run the file `init.sql` in the backend folder
```bash
psql -h localhost -U postgres -d memoires-info -a -f backend/init.sql
```
### Launch
Once the database is created, you can start the docker container in the backend folder 
This will run the database on port 5432
This also run adminer on port 8080 wich is a web interface to manage the database
```bash
docker-compose -f backend/docker-compose.yml up
```
### Adminer
You can access adminer by going to `localhost:8080` in your web browser
You can then connect to the database with the following credentials
```
System: PostgreSQL
Server: db
Username: postgres
Password: postgres
Database: memoires-info
```
