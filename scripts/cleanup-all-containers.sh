#!/bin/bash

# Stop and remove containers, networks, and volumes
docker compose -f docker-compose.fullstack.yml down -v
docker compose -f docker-compose.frontend-dev.yml down -v
docker compose -f docker-compose.backend-only.yml down -v

# Optionally, remove dangling volumes not associated with any container
docker volume prune -f
