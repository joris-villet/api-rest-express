-- Deploy crud_dev:functions to pg

BEGIN;

CREATE FUNCTION new_user(u json) RETURNS api_user AS $$
INSERT INTO api_user (firstname, lastname, email, password)
VALUES (
	u->>'firstname',
	u->>'lastname',
	u->>'email',
	u->>'password'
)
RETURNING *;

$$ LANGUAGE sql STRICT;

-------------------------

CREATE FUNCTION edit_user(u json) RETURNS api_user AS $$
    UPDATE api_user SET
        firstname = u->>'firstname',
        lastname = u->>'lastname',
        email = u->>'email',
        password = u->>'password'
    WHERE id = (u->>'id')::int
RETURNING *;

$$ LANGUAGE sql STRICT;

-------------------------

CREATE FUNCTION delete_user(uid int) RETURNS void AS $$
    DELETE FROM api_user WHERE id = uid;

$$ LANGUAGE sql STRICT SECURITY DEFINER;

COMMIT;
