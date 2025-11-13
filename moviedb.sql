create table account (
 idaccount serial primary key,
 username varchar(45) not null,
 email varchar(45) not null,
 password varchar (60) not null,
 refresh_token varchar(200)
);

create table groups (
 idgroup serial primary key,
 name varchar(20),
 group_color varchar(45),
 member_status boolean,
 movie_list int,
 owner INT NOT NULL CONSTRAINT foreign_idaccount REFERENCES account(idaccount) ON DELETE CASCADE
);

create table favourites (
 idfavourites serial primary key,
 favourites int,
 idaccount INT NOT NULL CONSTRAINT foreign_idaccount REFERENCES account(idaccount) ON DELETE CASCADE
);

create table reviews (
 idreviews serial primary key,
 review varchar(200),
 rating float,
 idaccount INT NOT NULL CONSTRAINT foreign_idaccount REFERENCES account(idaccount) ON DELETE CASCADE,
 idmovie int
 date DATE
);

