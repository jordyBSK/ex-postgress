/* 2024-02-13 15:10 */
create table if not exists detector (
    id serial primary key
);
create table if not exists measurement (
    detector_id integer references detector(id),
    recorded_at timestamp,
    temperature float,
    humidity float,
    primary key (detector_id, recorded_at)
);
create table if not exists "user" (
    id serial primary key,
    username varchar(255) unique,
    password varchar(255)
);
/* 2024-02-13 15:31 */
alter table "user" add column if not exists token varchar(255);
alter table "user" add column if not exists token_expires_at timestamp;
