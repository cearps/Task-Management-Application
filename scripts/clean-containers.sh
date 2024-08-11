#!/bin/bash

# Stop and remove containers, networks, and volumes
docker compose down -v
docker compose -f docker-compose.frontend.yml down -v
docker compose -f docker-compose.backend.yml down -v

# Optionally, remove dangling volumes not associated with any container
docker volume prune -f
