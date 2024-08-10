#!/bin/bash

# Stop and remove containers, networks, and volumes
docker compose down -v

# Optionally, remove dangling volumes not associated with any container
docker volume prune -f

docker compose up --force-recreate --build -d