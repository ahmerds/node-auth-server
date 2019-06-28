# Node JWT Auth Service

A service that secures and authenticate API end users using JWTs. Can be easily integrated into any existing codebase.

## Getting Started

These instructions will give a basic overview to get you started integrating this service into your project.

### Prerequisites

Clone the repo into a directory.


### Installing

Start by running

```
yarn
```

in the project root directory

Modify the .env file to your paramaters.

Make your database migrations by running

```
node_modules/.bin/knex migrate:latest
```

The project currently uses sqlite3 to store user data. Please change your DB config in the `knexfile.js` and in `utils/db.ts` 
when migrating to a production environment. You can view Knex documentation [here](https://knexjs.org/).

Use 

```
yarn run serve
```

to start a development server.


## Deployment

Can be deployed with docker or using your Node.js deployment strategy

## Built With

* Node.js
* Knex
* Typescript
* Passport
* JWTs


## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details

## Notes

If you'll like to see any feature added, Feel free to raise an issue.
