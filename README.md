# MERN Stack User Management App

This project is a simple User Management application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to sign up, log in, and perform basic CRUD operations on user records.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- User signup and login functionality.
- CRUD operations for managing user records.
- Responsive UI design for a seamless user experience.

## Technologies

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** CSS, Tailwindcss

## Local Setup

### Frontend

1. Clone the repository:

    ```bash
    git clone git@github.com:s-atyam/User-Flow.git
    ```

2. Create a `.env` file in the frontend root directory:

    ```env
    REACT_APP_HOST=http://localhost:5000
    ```

3. Install dependencies and start the frontend:

    ```bash
    npm install
    npm start
    ```

4. Access the application at `http://localhost:3000` in your browser.

### Backend

1. Change directory to Backend

    ```bash
    cd Backend
    ```

2. Create a `.env` file in the backend root directory:

    ```env
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

    Replace `your_jwt_secret` and `your_mongodb_connection_string` with your actual JWT secret key and MongoDB connection string.

3. Install dependencies and start the backend:

    ```bash
    npm install
    npm start
    ```

4. The backend server will run at `http://localhost:5000`.

## Usage

### 1. Signup

- Fill in the required fields on the signup screen and click "Save" to create a new user.

### 2. Login

- Use your registered email and password to log in.
- Upon successful login, you will be directed to the dashboard.

### 3. Dashboard

- View a list of users with their username, email, and phone in card items.
- Perform CRUD operations on user records.

## Contributing

If you would like to contribute to the development of this User Management System, feel free to open issues, submit pull requests, or provide feedback.
