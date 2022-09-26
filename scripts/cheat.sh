#!/usr/bin/env bash

sqlite3 db.sqlite3 "
    SELECT w.content FROM games_game g
    INNER JOIN games_word w
    ON g.answer_id = w.id
    WHERE g.id = ${1};
"
