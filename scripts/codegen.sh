#!/usr/bin/env bash

python manage.py spectacular --file web/schema.json --format openapi-json
cd web && npm run codegen
