create table account (
 idaccount serial primary key,
 username varchar(45) not null,
 email varchar(45) not null,
 password varchar (60) not null,
 refresh_token varchar(100)
);

create table groups (
 idgroup serial primary key, 
 group_color varchar(45),
 movie_list int
 user_idaccount INT NOT NULL CONSTRAINT foreign_idaccount REFERENCES account(idaccount);
);

create table movie_data (
 idmovie_data serial primary key, 
 reviews varchar(200),
 favourites int
 user_idaccount INT NOT NULL CONSTRAINT foreign_idaccount REFERENCES account(idaccount);
);


