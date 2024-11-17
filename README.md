## Description

Back-end part of chat application based on Node.js with a NestJS framework and MongoDb as database.

## Technologies

Node.js as a platform with NestJS framework for more comfortable work. I used NestJS cause this framework has a lot of different thing included inside it (like routers, guards, api to work with databases etc.)

The most difficult problem was connected AI Api with my application and database to save all necessary information.

I spend a lot of time to read documentation for Ai and find a right way to use it (I hope for this)

## Install

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```