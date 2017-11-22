CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT
);

INSERT INTO stories (title, content)
