/* 2024-02-14 13:43 */
create table if not exists "user" (
    id integer primary key autoincrement,
    username varchar(255) unique not null,
    password varchar(255) not null,
    token varchar(255),
    token_expires_at timestamp
);
