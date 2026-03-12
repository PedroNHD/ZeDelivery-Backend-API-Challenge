/* eslint-disable no-undef */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { build } from '../../../app.js';
import { AppDataSource } from '../../lib/data-source.js';

const generateRandomDocument = () => {
  const randomDigits1 = Math.floor(Math.random() * 900000000) + 100000000;
  const randomDigits2 = Math.floor(Math.random() * 90) + 10;
  return `${randomDigits1.toString().slice(0, 2)}.${randomDigits1.toString().slice(2, 5)}.${randomDigits1.toString().slice(5, 8)}/0001-${randomDigits2.toString()}`;
};

const generateRandomID = (max = 100000, min = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomLatLong = () => {
  const validCoordinates = [
    { lat: -23.013538, long: -43.297337 },
    { lat: -25.380995, long: -49.33425 },
  ];
  const randomIndex = Math.floor(Math.random() * validCoordinates.length);
  const point = validCoordinates[randomIndex];

  return { lat: point.lat.toString(), long: point.long.toString() };
};

describe('Partner Routes', () => {
  let app;
  let request;

  beforeAll(async () => {
    await AppDataSource.initialize();

    try {
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
    } catch (e) {
      if (!e.message.includes('ORA-00955')) console.warn('Tabela já existe.');
    }

    try {
      await AppDataSource.query(`
        INSERT INTO USER_SDO_GEOM_METADATA (TABLE_NAME, COLUMN_NAME, DIMINFO, SRID) 
        VALUES (
          'partner', 
          'coverageArea', 
          SDO_DIM_ARRAY(SDO_DIM_ELEMENT('Longitude', -180, 180, 0.005), SDO_DIM_ELEMENT('Latitude', -90, 90, 0.005)), 
          4326
        )
      `);
      await AppDataSource.query(`
        INSERT INTO USER_SDO_GEOM_METADATA (TABLE_NAME, COLUMN_NAME, DIMINFO, SRID) 
        VALUES (
          'partner', 
          'address', 
          SDO_DIM_ARRAY(SDO_DIM_ELEMENT('Longitude', -180, 180, 0.005), SDO_DIM_ELEMENT('Latitude', -90, 90, 0.005)), 
          4326
        )
      `);
    } catch (e) {
      if (!e.message.includes('ORA-00001')) console.warn('Metadados já existem.');
    }

    const checkIndexExists = async indexName => {
      const result = await AppDataSource.query(
        `SELECT index_name FROM user_indexes WHERE index_name = :1`,
        [indexName.toUpperCase()],
      );
      return result.length > 0;
    };

    const hasCoverageIndex = await checkIndexExists('partner_coverage_area_idx');
    if (!hasCoverageIndex) {
      await AppDataSource.query(
        `CREATE INDEX partner_coverage_area_idx ON "partner"("coverageArea") INDEXTYPE IS MDSYS.SPATIAL_INDEX_V2`,
      );
    }

    const hasAddressIndex = await checkIndexExists('partner_address_idx');
    if (!hasAddressIndex) {
      await AppDataSource.query(
        `CREATE INDEX partner_address_idx ON "partner"("address") INDEXTYPE IS MDSYS.SPATIAL_INDEX_V2`,
      );
    }

    app = await build();
    await app.ready();
    request = supertest(app.server);
  }, 30000);

  afterAll(async () => {
    try {
      await AppDataSource.query(`DROP INDEX partner_coverage_area_idx`);
      await AppDataSource.query(`DROP INDEX partner_address_idx`);
      await AppDataSource.query(`DELETE FROM USER_SDO_GEOM_METADATA WHERE TABLE_NAME = 'partner'`);
    } catch (e) {
      if (!e.message.includes('ORA-01418')) console.warn(e.message);
    }

    if (app) await app.close();
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
  }, 30000);

  it('should return 201 (Created) when creating a new partner', async () => {
    const testPartnerData = {
      id: generateRandomID(),
      tradingName: 'Adega da Cerveja - Teste',
      ownerName: 'Zé da Silva',
      document: generateRandomDocument(),
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-43.985, -19.865],
              [-43.975, -19.864],
              [-43.965, -19.86],
              [-43.955, -19.858],
              [-43.985, -19.865],
            ],
          ],
        ],
      },
      address: {
        type: 'Point',
        coordinates: [-43.955, -19.84],
      },
    };

    const response = await request.post('/api/v1/partners').send(testPartnerData);

    if (response.status !== 201) {
      console.log('Erro no POST /partners:', response.body);
    }

    expect(response.status).toBe(201);
  });

  it('should return 200 (OK) or 404 when getting a partner by ID', async () => {
    const response = await request.get(`/api/v1/partners/${generateRandomID(50, 1)}`);
    expect([200, 404]).toContain(response.status);
  });

  it('should return 200 (OK) when searching for partners', async () => {
    const randomPoint = generateRandomLatLong();

    const response = await request.get(
      `/api/v1/partners/search?lat=${randomPoint.lat}&long=${randomPoint.long}&limit=5`,
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
