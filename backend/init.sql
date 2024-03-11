-- create shema and table
create schema if not exists api;
create table api.data (
  temperature real,
  humidity real,
  timestamp timestamp NOT NULL DEFAULT now(),
  id character varying(14) NOT NULL
);

-- create role
create role web_anon nologin;
grant usage on schema api to web_anon;
grant select, insert on api.data to web_anon;

-- create autenticator
create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;

