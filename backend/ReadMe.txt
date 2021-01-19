Αρχικοποίηση package.json με την npm init.

Εγκατάσταση των express, router, postgres client με τις εντολές:
npm install --save express
npm install --save pg
 npm install --save pg-hstore    
npm install --save body-parser

Δημιουργία βάσης:

CREATE DATABASE backend;

\c backend;
DROP TABLE IF EXISTS Employee;
CREATE SEQUENCE id_seq;
CREATE TABLE Employee (
id bigint NOT NULL DEFAULT nextval('id_seq'),
last_name VARCHAR(50),
first_name VARCHAR(50),
is_active BOOLEAN,
date_of_birth DATE
);
ALTER SEQUENCE id_seq OWNED BY Employee.id;

INSERT INTO Employee (last_name, first_name, is_active, date_of_birth)
VALUES ('Kokkonos', 'Dimosthenis', True, '28/4/1995');


INSERT INTO Employee (last_name, first_name, is_active, date_of_birth)
VALUES ('Smith', 'John', False, '2/2/1000');

SELECT * FROM Employee;

  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
