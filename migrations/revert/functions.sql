-- Revert crud_dev:json_functions from pg

BEGIN;

DROP FUNCTION delete_user(int);
DROP FUNCTION edit_user(json);
DROP FUNCTION new_user(json);

COMMIT;
