CREATE DATABASE auth;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE USER auth_app WITH PASSWORD 'auth_app';
GRANT ALL PRIVILEGES ON DATABASE "auth" to auth_app;