/* eslint-disable no-console */
import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from '../lib/data-source.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { DataSource } from 'typeorm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUser = async () => {
  const adminDataSource = new DataSource({
    type: 'oracle',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '1521', 10),
    username: process.env.DB_ADMIN_USER || process.env.DB_USER,
    password: process.env.DB_ADMIN_PASSWORD || process.env.DB_PASSWORD,
    serviceName: process.env.DB_SERVICE_NAME,
  });

  try {
    await adminDataSource.initialize();
    console.log('🛡️ Admin Data Source inicializado!');

    const appUser = process.env.DB_USER?.toUpperCase();
    const appPassword = process.env.DB_PASSWORD;

    const userExists = await adminDataSource.query(
      `SELECT username FROM dba_users WHERE username = '${appUser}'`,
    );

    if (userExists.length === 0) {
      console.log(`👤 Usuário ${appUser} não existe. Criando...`);
      await adminDataSource.query(`CREATE USER ${appUser} IDENTIFIED BY "${appPassword}"`);
      await adminDataSource.query(`GRANT CONNECT, RESOURCE, DBA TO ${appUser}`);
      await adminDataSource.query(`ALTER USER ${appUser} QUOTA UNLIMITED ON USERS`);
      console.log(`✅ Usuário ${appUser} criado com permissões DBA.`);
    } else {
      console.log(`ℹ️ Usuário ${appUser} já existe. Pulando criação.`);
    }
  } catch (err) {
    console.error('❌ Erro durante as operações de Admin:', err.message);
    throw err;
  } finally {
    if (adminDataSource.isInitialized) {
      await adminDataSource.destroy();
    }
  }
};

const seed = async () => {
  try {
    await createUser();

    await AppDataSource.initialize();
    console.log('📦 App Data Source inicializado para o Seed!');

    const data = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'pdvs.json'), 'utf8');
    const pdvsData = JSON.parse(data);

    console.log('🧹 Limpando tabela e metadados antigos...');
    try {
      await AppDataSource.query(`DROP TABLE "partner" CASCADE CONSTRAINTS`);
      await AppDataSource.query(`DELETE FROM USER_SDO_GEOM_METADATA WHERE TABLE_NAME = 'partner'`);
    } catch (e) {
      console.log('Tabela ou metadados não existiam. Tudo limpo.');
    }

    console.log('🏗️ Criando tabela "partner"...');
    await AppDataSource.query(`
      CREATE TABLE "partner" (
        "id" NUMBER PRIMARY KEY,
        "tradingName" VARCHAR2(255) NOT NULL,
        "ownerName" VARCHAR2(255) NOT NULL,
        "document" VARCHAR2(255) NOT NULL UNIQUE,
        "coverageArea" MDSYS.SDO_GEOMETRY NOT NULL,
        "address" MDSYS.SDO_GEOMETRY NOT NULL
      )
    `);

    console.log('🌍 Inserindo metadados espaciais (SRID 4326)...');
    await AppDataSource.query(`
      INSERT INTO USER_SDO_GEOM_METADATA (TABLE_NAME, COLUMN_NAME, DIMINFO, SRID) 
      VALUES (
        'partner', 'coverageArea', 
        SDO_DIM_ARRAY(SDO_DIM_ELEMENT('Longitude', -180, 180, 0.005), SDO_DIM_ELEMENT('Latitude', -90, 90, 0.005)), 
        4326
      )
    `);
    await AppDataSource.query(`
      INSERT INTO USER_SDO_GEOM_METADATA (TABLE_NAME, COLUMN_NAME, DIMINFO, SRID) 
      VALUES (
        'partner', 'address', 
        SDO_DIM_ARRAY(SDO_DIM_ELEMENT('Longitude', -180, 180, 0.005), SDO_DIM_ELEMENT('Latitude', -90, 90, 0.005)), 
        4326
      )
    `);

    console.log(`🌱 Semeando ${pdvsData.pdvs.length} parceiros...`);
    for (const pdv of pdvsData.pdvs) {
      await AppDataSource.query(
        `INSERT INTO "partner"("id", "tradingName", "ownerName", "document", "coverageArea", "address") 
         VALUES (:1, :2, :3, :4, SDO_UTIL.FROM_GEOJSON(:5), SDO_UTIL.FROM_GEOJSON(:6))`,
        [
          parseInt(pdv.id, 10),
          pdv.tradingName,
          pdv.ownerName,
          pdv.document,
          JSON.stringify(pdv.coverageArea),
          JSON.stringify(pdv.address),
        ],
      );
    }
    console.log('✅ Parceiros salvos com sucesso!');

    console.log('⚡ Criando índices espaciais (Isso pode demorar alguns segundos)...');
    try {
      await AppDataSource.query(
        `CREATE INDEX partner_coverage_area_idx ON "partner"("coverageArea") INDEXTYPE IS MDSYS.SPATIAL_INDEX_V2`,
      );
      await AppDataSource.query(
        `CREATE INDEX partner_address_idx ON "partner"("address") INDEXTYPE IS MDSYS.SPATIAL_INDEX_V2`,
      );
      console.log('✅ Índices espaciais criados com sucesso!');
    } catch (e) {
      if (e.message.includes('ORA-00955')) {
        console.log('ℹ️ Índices espaciais já existem.');
      } else {
        throw e;
      }
    }

    console.log('🚀 Script de Semeamento (Seed) concluído com sucesso!');
  } catch (err) {
    console.error('❌ Erro crítico durante o processo de Seed:', err);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🔌 Conexão com o banco encerrada.');
    }
  }
};

seed();
