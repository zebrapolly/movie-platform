# Movie platform

## Agenda 
This is a task for hiring process. It's a movie platform system 
with auth/oauth and movie management features.

## Functional requirements

- All endpoints related to movies should only be able to be used by registered
  users
- Create the following endpoints:
  - Register 
    * Username (alphanumeric starting with letter)
    * Password (add some validations like maximum number of characters...)
  - Login(should return the JWT token with expiration time)
  - Logout
  - Create film. Suggested fields 
    * Title
    * Director
    * release date 
    * cast 
    * genre 
    * synopsis
  - The film should have a reference to the user who created it
  - Get films with custom filters
    * title 
    * release date 
    * genre
  - Get film details
  - Update a film
  - Delete a film
  - Add/Remove film to/from favourites
  - Import/Export films in csv format
    
## Non-functional requirements

- Logged users should authenticate their requests via JWT token
- Data should be stored in a database of your choice (MySQL, MongoDB...)   
- Create a simple migration script to create database structure and initial data 
- Clean solution architecture
  - Structure your solution by components
  - Wrap common utilities in a separate module
- Good code quality. Keep it simple and readable.
- Use async-await or promises for async functionality and error handling (avoid callbacks).
- Apply security mechanisms: Authentication, authorisation, prevent SQL injection
- Proper use of common libraries;
- Use environment variables to configure your system;
- Unit and integration tests. Use Mocha, Chai or Jest for testing;
- Proper Error handling(don't forget to catch unhandled promise rejections)
- Logging system
- Deployment instructions
- Possibility to be run automatically using Docker (docker composer)
- Configure a Continuous Deployment Integration system
- Use a code analyser library like ESLint
- Document API using Swagger

## Technologies and common libs
- Node.js
- PostgresQL
- Docker
- Nest.js
- Passport.js
- TypeORM
- Nginx
- Jest