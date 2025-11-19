CREATE DATABASE "Naser-Alex"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE SCHEMA  Employees AUTHORIZATION postgres;    
CREATE SCHEMA  Items AUTHORIZATION postgres;    
CREATE SCHEMA  Stored AUTHORIZATION postgres;    
CREATE SCHEMA  Public AUTHORIZATION postgres;    
CREATE SCHEMA  Users AUTHORIZATION postgres;