#!/bin/bash

# Stop and remove containers, networks, and volumes
docker compose -f docker-compose.backend-only.yml down -v

docker compose -f docker-compose.backend-only.yml up --force-recreate --build -d