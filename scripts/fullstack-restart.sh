#!/bin/bash

# Stop and remove containers, networks, and volumes
docker compose -f docker-compose.fullstack.yml down -v

docker compose -f docker-compose.fullstack.yml up --force-recreate --build -d