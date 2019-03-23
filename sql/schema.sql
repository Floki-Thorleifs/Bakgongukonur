
CREATE TABLE docs
(
    id serial primary key,
    name varchar(256) not null
);

CREATE TABLE users
(
    id serial primary key,
    name varchar(128) not null,
    username varchar(64) unique not null,
    password varchar(256) not null,
    admin BOOLEAN DEFAULT false,
    docid int not null,
    FOREIGN KEY (docid) REFERENCES docs (id)
);

CREATE TABLE questions
(
    id serial primary key,
    question varchar(256) not null,
    userid int not null,
    created timestamp
    with time zone not null default current_timestamp,
    FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE comments
(
    id serial primary key,
    comment varchar(256) not null,
    questionid int not null,
    userid int not null,
    created timestamp
    with time zone not null default current_timestamp,
    FOREIGN KEY (questionid) REFERENCES questions(id),
    FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE results
(
    id serial primary key,
    result float not null,
    created timestamp
    with time zone not null default current_timestamp,
    userid int not null,
    FOREIGN KEY (userid) REFERENCES users(id)
);
