import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PartnerSchema } from '../modules/partner/partner.entity.js';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '1521', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  serviceName: process.env.DB_SERVICE_NAME,
  entities: [PartnerSchema],
  synchronize: true,
  logging: true,
});
