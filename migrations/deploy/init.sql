-- Deploy crud_dev:init to pg

BEGIN;

CREATE TABLE api_user (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	firstname text NOT NULL,
	lastname text NOT NULL,
	email text NOT NULL UNIQUE,
	password text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	updated_at timestamptz NULL,
	UNIQUE(firstname, lastname)
);

COMMIT;
