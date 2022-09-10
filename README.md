# curdle

A cheesy word game built to demonstrate Django REST Framework and Redux code generation

![](/images/screenshot.png)

## Requirements

- Python 3.10
- Pipenv
- Node.js 18.8.0
- npm 8.19.1

## Setup

### Check out the repository

```bash
git clone https://github.com/midouest/curdle.git
cd curdle
```

### Install Python dependencies

```bash
pipenv install --dev
pipenv shell
```

### Initialize Django database

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py load_words data/answers.txt data/guesses.txt
```

### Install JavaScript dependencies

```bash
cd web
npm install
```

## Launch

### Backend

```bash
python manage.py runserver 8000
```

Open http://localhost:8000/docs/ to view the OpenAPI schema

### Frontend

```bash
cd web
npm start
```

Open http://localhost:3000 to view the app

## Common Development Tasks

### Code Generation

To regenerate the OpenAPI schema and Redux API slice, run the [codegen](/scripts/codegen.sh) script in the root of the repository:

```bash
./scripts/codegen.sh
```

### Reset Game Data

To clear all game data and reload the word database, run the [reset](/scripts/reset.sh) script in the root of the repository:

```bash
./scripts/reset.sh
```
