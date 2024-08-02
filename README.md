# FIT3162

This repo contains the project files for our task management application built as part of FIT3162.

## File structure

|- api - Contains the Java Spring backend Code.<br>
|- db: startup sql scripts for postgres container<br>
|- frontend: Typescript/React UI + API mock for testing.<br>
|- scripts: tooling scripts

## Running the containerised application:


`./scripts/start-containers.sh`

Will start three containers:
- frontend nginx
- backend java 21 spring app
- backend postgres db

Access the nginx on:                http://localhost:80/ <br>
Check the backend server is up at:  http://localhost:8080/actuator/health


## TODO

Refer to: https://trello.com/b/xkcOj1Bp/pre-semester

## Documentation

https://student-team-sx2xae6w.atlassian.net/wiki/spaces/TMA/overview

## Useful links

- https://medium.com/@thearaseng/building-a-full-stack-product-app-with-react-spring-boot-and-docker-compose-64a47f4a1080
- https://spring.io/
- https://react.dev/
- https://tailwindcss.com/
- https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file
