#!/bin/bash

docker compose -f docker-compose.backend-only.yml up --force-recreate --build -d
