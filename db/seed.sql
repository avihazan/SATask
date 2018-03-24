DROP DATABASE IF EXISTS sa_task_db;
CREATE DATABASE sa_task_db;

\c sa_task_db;

CREATE TABLE users(
  id serial primary key,
  name VARCHAR(30),
  group_id INTEGER
);

CREATE TABLE groups(
  id serial primary key,
  name VARCHAR(30)
);

CREATE TABLE relations(
  follower_id INTEGER,
  target_id INTEGER
);

INSERT INTO groups (name)
  VALUES ('Group A');

INSERT INTO groups (name)
  VALUES ('Group B');

INSERT INTO groups (name)
  VALUES ('Group C');

INSERT INTO groups (name)
  VALUES ('Group D');

INSERT INTO groups (name)
  VALUES ('Group E');


INSERT INTO users (name, group_id)
  VALUES ('User01', 1);

INSERT INTO users (name, group_id)
  VALUES ('User02', 1);

INSERT INTO users (name, group_id)
  VALUES ('User03', 1);

INSERT INTO users (name, group_id)
  VALUES ('User04', 1);

INSERT INTO users (name, group_id)
  VALUES ('User05', 1);

INSERT INTO users (name, group_id)
  VALUES ('User06', 4);

INSERT INTO users (name, group_id)
  VALUES ('User07', 2);

INSERT INTO users (name, group_id)
  VALUES ('User08', 3);

INSERT INTO users (name, group_id)
  VALUES ('User09', 3);

INSERT INTO users (name, group_id)
  VALUES ('User10', 4);



INSERT INTO relations (follower_id, target_id)
  VALUES (1, 2);

INSERT INTO relations (follower_id, target_id)
  VALUES (1, 3);

INSERT INTO relations (follower_id, target_id)
  VALUES (2, 1);

INSERT INTO relations (follower_id, target_id)
  VALUES (3, 5);

INSERT INTO relations (follower_id, target_id)
  VALUES (3, 7);
