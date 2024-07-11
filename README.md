# FIT3162

This repo contains the files written proceeding the commencement of FIT3162 in an attempt to try get ahead in this GODFORSAKEN unit.

## File structure

|- frontend: Typescript/React UI + API mock for testing.<br>
|- backend - Contains the Java Spring backend Code.<br>
|- db: startup sql scripts for postgres container<br>
|- scripts: tooling scripts

## Running the application in docker containers:

Will start three containers: frontend nginx, backend java 21 spring app, backend postgres db

`docker-compose up --force-recreate --build -d`

Access the nginx on:                http://localhost:80/

Check the backend server is up at:  http://localhost:8080/actuator/health

## Required Software

- IDE: VSCode/IntelliJ.
- Docker.
- Beekeeper (for viewing PostgreSQL Database in a UI).
- Postman (for testing the backend API).

## TODO

Refer to: https://trello.com/b/xkcOj1Bp/pre-semester

## Useful links

- https://medium.com/@thearaseng/building-a-full-stack-product-app-with-react-spring-boot-and-docker-compose-64a47f4a1080
- https://spring.io/
- https://react.dev/
- https://tailwindcss.com/
- https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file
