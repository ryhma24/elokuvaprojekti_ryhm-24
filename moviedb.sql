create table account (
 idaccount serial primary key,
 username varchar(45) not null CONSTRAINT username_unq UNIQUE(username),
 email varchar(45) not null,
 password varchar (60) not null,
 refresh_token varchar(200),
 deletion_flag bool,
 deletion_date varchar(20);
);


CREATE TABLE groups (
  idgroup serial PRIMARY KEY,
  name varchar(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  owner INT NOT NULL REFERENCES account(idaccount) ON DELETE CASCADE
);

CREATE TABLE group_members (
  id serial PRIMARY KEY,
  idgroup INT NOT NULL REFERENCES groups(idgroup) ON DELETE CASCADE,
  idaccount INT NOT NULL REFERENCES account(idaccount) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP,
  UNIQUE(idgroup, idaccount)
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




