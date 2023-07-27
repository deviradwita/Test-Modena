# Modena Test - Devira Dwita Rizkiningrum

This project is a web application built using Node.js and React.js.

## Installation

Congratulations on successfully cloning this repository! Now, follow these steps to get started with the project.

## Setup Server

1. Navigate to Server folder an run this command:

    ```bash
        npm install
    ```
2. This application uses Sequelize as an ORM (Object-Relational Mapping). Follow these command to setup database 
    ```bash
        npx sequelize-cli db:create
        npx sequelize-cli db:migrate
    ```
    before running those command, change your username and password development in your config

3. To start the server, follow these command:
    ```bash
        node app.js
        or
        nodemon app.js
    ```
    if you want to use nodemon for automatic server restart and don't istall nodemon globally, follow these command:
        ```bash
            npm install -D nodemon
        ``` 


## Setup Client
1. Navigate to client folder and run this command:
    ```bash
        npm install
    ```

2. To start the server, use this following command:
    ```bash
            npm start
    ```


If you have any questions or run into any issues, please don't hesitate to reach out for support.
