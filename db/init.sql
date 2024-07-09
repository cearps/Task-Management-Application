-- Create the "board" table
CREATE TABLE board (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    due_date DATE
);

-- Insert some initial data into the "board" table
INSERT INTO board (name, description, start_date, end_date)
VALUES
    ('Board 1', 'Description for Board 1', '2022-01-01', '2022-01-31'),
    ('Board 2', 'Description for Board 2', '2022-02-01', '2022-02-28'),
    ('Board 3', 'Description for Board 3', '2022-03-01', '2022-03-31');