-- create shema and table
create schema if not exists api;
create table api.data (
  temperature real,
  humidity real,
  timestamp timestamp NOT NULL,
  id character varying(14) NOT NULL
);

-- create autenticator
create role authenticator noinherit login password 'mysecretpassword';

-- create anonymous role
create role web_anon nologin;
grant usage on schema api to web_anon;
grant select on api.data to web_anon;
grant web_anon to authenticator;

-- convert unix timestamp to timestamp and insert it
create or replace function api.insert_data(
	temperature real,
	humidity real,
	id varchar(15),
	unix_timestamp bigint
) 
returns void as $$
	insert into api.data("temperature", "humidity", "id", "timestamp") values (temperature, humidity, id, to_timestamp(unix_timestamp));
$$ language sql;

-- create role for the esp 32
create role esp32 nologin;
grant usage on schema api to esp32;
grant insert on api.data to esp32;
grant esp32 to authenticator;
