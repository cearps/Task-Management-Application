# Task Management Application

Source code for containerised + cloud native task management app.
Built as part of unit FIT3162 at Monash University.
![image](https://github.com/user-attachments/assets/412e2051-8a1c-447f-a14c-de9c1ada23e9)
![image](https://github.com/user-attachments/assets/bf8ab055-7447-46b4-ba37-e44809299dc6)


## Setup:

Prerequisites:
- docker

`./scripts/fullstack-start.sh`

Access the UI on:                http://localhost:80/ <br>
Access the API on:  http://localhost:8080/actuator/health

## Architecture

|- api - Contains the Java Spring backend Code.<br>
|- db: startup sql scripts for postgres container<br>
|- frontend: Typescript/React UI + API mock for testing.<br>
|- scripts: tooling scripts

Containers:
- frontend nginx
- backend java 21 spring app
- backend postgres db

![image](https://github.com/user-attachments/assets/0e4dd2e2-2c75-4139-b84f-d40bb9b62216)

## Contribution

Refer to: https://trello.com/b/xkcOj1Bp/pre-semester

## Documentation

https://student-team-sx2xae6w.atlassian.net/wiki/spaces/TMA/overview

## Useful links

- https://medium.com/@thearaseng/building-a-full-stack-product-app-with-react-spring-boot-and-docker-compose-64a47f4a1080
- https://spring.io/
- https://react.dev/
- https://tailwindcss.com/
- https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file
