# Movie platform

## Agenda 
This is a task for the hiring process. It's a movie platform system
with auth/OAuth and movie management features.

## Functional requirements

- [x] All endpoints related to movies should only be able to be used by registered
  users
- Create the following endpoints:
  - [x] Register 
    * Username (alphanumeric starting with letter)
    * Password (add some validations like maximum number of characters...)
  - [x] Login(should return the JWT token with expiration time)
  - [x] Logout
  - [x] Create film. Suggested fields 
    * Title
    * Director
    * release date 
    * cast 
    * genre 
    * synopsis
  - [x] The film should have a reference to the user who created it
  - [ ] Get films with custom filters
    * title 
    * release date 
    * genre
  - [x] Get film details
  - [x] Update a film
  - [x] Delete a film
  - [ ] Add/Remove film to/from favourites
  - [ ] Import/Export films in csv format
    
## Non-functional requirements

- [x] Logged users should authenticate their requests via JWT token
- [x] Data should be stored in a database of your choice (MySQL, MongoDB...)
- Create a simple migration script 
  - [x] to create database structure
  - [ ] initial data 
- [x] Clean solution architecture
  - Structure your solution by components
  - Wrap common utilities in a separate module
- [x] Good code quality. Keep it simple and readable.
- [x] Use async-await or promises for async functionality and error handling (avoid callbacks).
- [x] Apply security mechanisms: Authentication, authorisation, prevent SQL injection
- [x] Proper use of common libraries;
- [x] Use environment variables to configure your system;
- [x] (only integrational auth) Unit and integration tests. Use Mocha, Chai or Jest for testing;
- [x] Proper Error handling(don't forget to catch unhandled promise rejections)
- [x] Logging system
- [ ] Deployment instructions
- [x] Possibility to be run automatically using Docker (docker composer)
- [ ] Configure a Continuous Deployment Integration system
- [x] Use a code analyser library like ESLint
- [ ] Document API using Swagger

## Technologies and common libs
- Node.js
- PostgresQL
- Docker
- Nest.js
- Passport.js
- TypeORM
- Nginx
- Jest

## Instructions

To start all services just run `docker-compose up`

There is no proper api documentation for now, but you can get
[postman collection](https://www.getpostman.com/collections/6c8ff1c6005d43c6d296)

### A word about entities

- person - person who could have a role in a film
- role - kinds of activity in a films production(director, cast, producer, etc)
- genre films genres(Thriller, action, etc)
- film - to create film you should send this model
```json
{
    "title": "Terminator 2 (1991)",
    "synopsis": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    "releaseDate": "2017-06-07T14:34:08.700",
    "people": [{
        "roleId": "5a6d654e-12d8-4adc-a2a6-c25859f7e956",
        "personId": "8ff89a9d-f59e-4cc0-82c5-f82452fcb6bb"
    }, {
        "personId": "8ff89a9d-f59e-4cc0-82c5-f82452fcb6bb",
        "roleId": "0015cd10-ea68-43f0-9474-e6a810a077b6"
    }
    ],
    "genres": [{
        "id": "c3b3b1ec-f353-4765-9e68-39e288165ffe"
    }]
}
```

### Logout

I implemented it by creating a blacklist of jwt tokens stored 
in redis and with an exp time equals token exp time