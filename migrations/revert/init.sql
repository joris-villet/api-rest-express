-- Revert crud_dev:init from pg

BEGIN;

DROP TABLE api_user;

COMMIT;
