-- Insert some initial data into the "board" table
INSERT INTO board (name, description, start_date, due_date)
VALUES
    ('Board 1', 'Description for Board 1', '2022-01-01', '2022-01-31'),
    ('Board 2', 'Description for Board 2', '2022-02-01', '2022-02-28'),
    ('Board 3', 'Description for Board 3', '2022-03-01', '2022-03-31');


INSERT INTO UserBoard (id, user_id, board_id) VALUES (1, 1, 1);
INSERT INTO UserBoard (id, user_id, board_id) VALUES (2, 1, 2);
INSERT INTO UserBoard (id, user_id, board_id) VALUES (3, 1, 3);