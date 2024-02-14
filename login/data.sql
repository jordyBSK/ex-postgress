/* 2024-02-13 15:31 */
create table if not exists "user" (
    id serial primary key,
    username varchar(255) unique,
    password varchar(255)
);
alter table "user" add column token varchar(255);
alter table "user" add column token_expires_at timestamp;
