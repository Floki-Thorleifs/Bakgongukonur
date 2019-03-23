
INSERT INTO docs (name) VALUES ('ljosmodir');

INSERT INTO users
(name, username, password, admin, docid)
VALUES
('Gamli nettason', 'user', '$2b$11$W.R3eHwA/0tSREk.tSX72.jfEUVZEu5UdCTmz.qLz/TAsi2Wnuw.W', false, 1);

INSERT INTO users
(name, username, password, admin, docid)
VALUES
('Netti Gamlason', 'admin', '$2b$11$W.R3eHwA/0tSREk.tSX72.jfEUVZEu5UdCTmz.qLz/TAsi2Wnuw.W', true, 1);

INSERT INTO questions
(question, userid)
VALUES
('Hvað er í gangi', 1);

INSERT INTO comments
(comment, questionid, userid)
VALUES
('Ég veit það ekkert', 1, 1);
