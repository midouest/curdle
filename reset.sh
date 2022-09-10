#!/usr/bin/env bash

python manage.py migrate games zero
python manage.py migrate games
python manage.py load_words data/answers.txt data/guesses.txt
