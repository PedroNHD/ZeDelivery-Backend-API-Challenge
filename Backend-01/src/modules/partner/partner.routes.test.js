import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import { build } from '../../../app.js';

describe('Partner Routes', () => {
  let app;
  let request;

  beforeAll(async () => {
    app = build();
    await app.ready();
    request = supertest(app.server);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 201 (Created) when creating a new partner', async () => {
    const response = await request.post('/partners').send(testPartnerData);
    expect(response.status).toBe(201);
  });

  it('should return 200 (OK) when getting a partner by ID', async () => {
    const response = await request.get('/partners/1');
    expect(response.status).toBe(200);
  });

  it('should return 200 (OK) when searching for partners', async () => {
    const response = await request.get('/partners/search?long=-46.68539&lat=-23.55348&limit=1');
    expect(response.status).toBe(200);
  });

  const testPartnerData = {
    id: 54,
    tradingName: 'Nome do Parceiro',
    ownerName: 'Nome do Proprietário',
    document: '12.345.678/0001-90',
    coverageArea: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [-43.985, -19.865],
            [-43.975, -19.864],
            [-43.965, -19.86],
            [-43.955, -19.858],
            [-43.948, -19.859],
            [-43.94, -19.857],
            [-43.935, -19.854],
            [-43.932, -19.8535],
            [-43.93, -19.852],
            [-43.928, -19.851],
            [-43.925, -19.85],
            [-43.922, -19.849],
            [-43.92, -19.848],
            [-43.918, -19.8475],
            [-43.915, -19.84],
            [-43.916, -19.835],
            [-43.918, -19.83],
            [-43.92, -19.825],
            [-43.925, -19.82],
            [-43.93, -19.815],
            [-43.935, -19.812],
            [-43.945, -19.81],
            [-43.955, -19.812],
            [-43.965, -19.815],
            [-43.975, -19.82],
            [-43.985, -19.825],
            [-43.992, -19.835],
            [-43.995, -19.845],
            [-43.994, -19.852],
            [-43.99, -19.858],
            [-43.988, -19.863],
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
});
