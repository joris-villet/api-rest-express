-- Deploy crud_dev:import_data to pg

BEGIN;

INSERT INTO api_user (firstname, lastname, email, password) VALUES
('joris','villet','badjojo@hotmail.fr', '12345678'),
('marc','roussel','marc@hotmail.fr', '12345678'),
('joe','biroute','jojo@hotmail.fr', '12345678');

COMMIT;
