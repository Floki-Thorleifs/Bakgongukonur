
INSERT INTO docs (name) VALUES ('ljosmodir');

INSERT INTO users
(name, username, password, admin, docid)
VALUES
('Gamli nettason', 'user', '123', false, 1);

INSERT INTO users
(name, username, password, admin, docid)
VALUES
('Netti Gamlason', 'admin', '123', true, 1);

INSERT INTO questions
(question, userid)
VALUES
('Hvað er í gangi', 1);

INSERT INTO comments
(comment, questionid)
VALUES
('Ég veit það ekkert', 1);
