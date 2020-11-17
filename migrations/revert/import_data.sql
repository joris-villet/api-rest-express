-- Revert crud_dev:import_data from pg

BEGIN;

DELETE FROM api_user;

COMMIT;
