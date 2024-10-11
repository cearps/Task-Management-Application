#!/bin/bash

# Stop and remove containers, networks, and volumes
docker compose -f docker-compose.fullstack.yml down -v
docker compose -f docker-compose.frontend-dev-mode.yml down -v
docker compose -f docker-compose.backend-only.yml down -v
docker compose -f docker-compose.deploy.yml down -v

docker volume prune -f
