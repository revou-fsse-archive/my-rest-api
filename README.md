This is a simple REST API service for example of assignment week-12 of Revou FSSE course.

The service is built on Node.js, using NestJS framework.

# Live API URL

To access the live URL API endpoint, visit:

https://revou-rest-api.4rif.in/ (Railway.app)
https://revou-rest-api-flyio.4rif.in/ (Fly.io)

## API Endpoints

```
GET   /notes
GET   /notes/{id}
POST  /notes
PUT   /notes/{id}
PATCH /notes/{id}
```

# Development

To run the app on your local environment:

## Prerequisite

Make sure that you have Node.js version >= 16 and PNPM installed on your system

## Install dependencies

Install the dependencies by running

```sh
pnpm i
```

in the directory of this service

## Run the app

Run the server in your computer by running:

```sh
pnpm start
```