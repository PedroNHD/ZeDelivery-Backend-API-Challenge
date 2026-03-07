#!/bin/bash
# setup-users.sh

# 1. Ajusta a senha do SYSTEM no nível global (CDB)
sqlplus / as sysdba <<EOF
ALTER SESSION SET CONTAINER = CDB$ROOT;
ALTER USER system IDENTIFIED BY "${ORACLE_PASSWORD}" CONTAINER=ALL;
ALTER PLUGGABLE DATABASE FREEPDB1 OPEN;
EXIT;
EOF

# 2. Cria o usuário da aplicação dentro do PDB
sqlplus / as sysdba <<EOF
ALTER SESSION SET CONTAINER = FREEPDB1;

-- Verifica se o usuário já existe antes de criar para evitar erros no log
DECLARE
  user_count NUMBER;
BEGIN
  SELECT count(*) INTO user_count FROM dba_users WHERE username = UPPER('${APP_USER}');
  IF user_count = 0 THEN
    EXECUTE IMMEDIATE 'CREATE USER ${APP_USER} IDENTIFIED BY "${APP_PASSWORD}"';
  END IF;
END;
/

GRANT CONNECT, RESOURCE, DBA TO ${APP_USER};
ALTER USER ${APP_USER} QUOTA UNLIMITED ON USERS;
EXIT;
EOF