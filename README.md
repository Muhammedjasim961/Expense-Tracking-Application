# Expense Tracking Application

### Summary

The Expense Tracking Application is a user-friendly tool designed to simplify the management of daily expenses. With an intuitive interface, users can easily record and monitor their spending habits without the fear of forgetting any transactions. All expenses are securely stored in the expense table section, allowing for quick access and review at any time. This application empowers users to take control of their finances, helping them to budget effectively and achieve their financial goals.

## Features

- User authentication using [Passport.js](http://www.passportjs.org/)
- Expense tracking with CRUD operations
- Input validation using [Express Validator](https://express-validator.github.io/docs/)
- Flash messages for user feedback with [Connect Flash](https://github.com/jaredhanson/connect-flash)
- Session management with [Express Sessions](https://github.com/expressjs/session)
- Bower for front-end package management
- Templating with [EJS](https://ejs.co/)

## Technologies Used

- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/)
- **Authentication**: [Passport.js](http://www.passportjs.org/)
- **Middlewares**:
  - [Body Parser](https://www.npmjs.com/package/body-parser)
  - [Connect Flash](https://github.com/jaredhanson/connect-flash)
  - [Express Messages](https://github.com/flash/express-messages)
  - [Express Validator](https://express-validator.github.io/docs/)
- **Frontend**: [EJS](https://ejs.co/), [Bower](https://bower.io/)

## Installation

1.  Clone the repository:

    ```bash
    git clone = https://github.com/Muhammedjasim961/Expense-Tracking-Application
    cd expense-tracking-app
    Start npm run dev[nodemon]
    ```

2.  Install dependencies:

    npm install

3.  Create a .env file in the root directory and add MongoDB Url:

        MONGODB_URI=<your-mongodb-uri>
        SESSION_SECRET=<your-session-secret>

## Contributing

<b> `Contributions are welcome! If you have suggestions for improvements or features, please create an issue or submit a pull request.`

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
