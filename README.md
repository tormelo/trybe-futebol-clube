# Trybe Futebol Clube

A full-stack soccer stats and standings app to practice integrating back-end to front-end, authentication, and CRUD operations on teams, matches, and leaderboards using the model-service-controller architecture.

The frontend was built using React, while the backend was developed with Node and Express. For the database, MySQL was utilized, and Sequelize was chosen as the ORM for managing the data.

## Table of Contents

* [Technologies Used](#technologies-used)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation and Running the App](#installation-and-running-the-app)
* [Tests](#tests)
* [API Endpoints](#api-endpoints)
* [Authentication](#authentication)
* [Acknowledgments](#acknowledgments)

## Technologies Used

* **Frontend**: React
* **Backend**: Node.js and Express
* **Database**: MySQL
* **ORM (Object-Relational Mapping)**: Sequelize
* **Containerization**: Docker/Docker-compose
* **Authentication**: JSON Web Tokens (JWT)
* **Testing**: Mocha, Chai, Sinon

## Features

The app comes with the following features:

* Authentication: Users need to log in to access protected endpoints.
* Teams: Retrieve information for all teams or a specific team based on its ID.
* Matches: View information on all matches, create new matches, update match information, and mark matches as finished.
* Leaderboard: Access the overall leaderboard, as well as separate leaderboards for home and away teams.

## Prerequisites

Before running the project, make sure you have Docker and Docker Compose installed on your system. If you don't have them installed, follow the instructions below:

- Install Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Install Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Installation and Running the App

1. Clone the repository:
    ```bash
    git clone https://github.com/tormelo/trybe-futebol-clube.git
    ```
2. Navigate to the project folder:
    ```bash
    cd trybe-futebol-clube
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the db, server and front-end containers using Docker Compose:
    ```bash
    npm run compose:up:dev
    ```
    or
    ```bash
    npm run compose:up
    ```
5. The API will be accessible at `http://localhost:3001` and the app at `http://localhost:3000`.

## Tests

Run the tests using the following command in the root directory:
  ```bash
  npm run test
  ```

## API Endpoints

### Login
- **POST /login**: User authentication endpoint. Obtain an authentication token by submitting credentials.
- **GET /login/validate**: Validates the current token to verify both the user's authenticity and their current role.

### Teams
- **GET /teams**: Retrieve information of all teams.
- **GET /teams/:id**: Retrieve information of a specific team identified by the provided `id`.

### Matches
- **GET /matches**: Retrieve information of all matches.
- **POST /matches**: Create a new match by submitting the required match data.
- **PATCH /matches/:id/finish**: Mark a specific match as finished, updating its status accordingly.
- **PATCH /matches/:id**: Update the information of a specific match identified by the provided `id`.

### Leaderboard
- **GET /leaderboard**: Retrieve the overall leaderboard, displaying the rankings of all teams.
- **GET /leaderboard/home**: Retrieve the leaderboard for home teams, showing the rankings of teams based on their home match performance.
- **GET /leaderboard/away**: Retrieve the leaderboard for away teams, showing the rankings of teams based on their away match performance.

## Authentication

The API implements authentication to secure certain routes. Users are required to register and log in to access protected endpoints.

## Acknowledgments

This project was developed during the Web Development course at Trybe. Special thanks to all the instructors who contributed to the learning process and helped in the development of this project.