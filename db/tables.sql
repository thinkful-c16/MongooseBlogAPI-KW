-- DROP TABLE IF EXISTS stories;
-- //^^^ !!!DO NOT RUN THIS COMMAND IN PRODUCTION!!!!! ^^^

CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT
);

-- ALTER SEQUENCE stories_id_seq RESTART WITH 1000;

INSERT INTO stories (title, content) VALUES 
('first post', 'post content here'),
('cats are awesome', 'cats are so freaking awesome'),
('dogs are better', 'dogs are the freaking best and better than cats');


