import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from '../lib/data-source.js';
import { PartnerSchema } from '../modules/partner/partner.entity.js';
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
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    serviceName: process.env.DB_SERVICE_NAME,
  });

  try {
    await adminDataSource.initialize();
    console.log('Admin Data Source has been initialized!');

    const appUser = process.env.DB_USER?.toUpperCase();
    const appPassword = process.env.DB_PASSWORD;

    const userExists = await adminDataSource.query(
      `SELECT username FROM dba_users WHERE username = '${appUser}'`,
    );

    if (userExists.length === 0) {
      console.log(`User ${appUser} does not exist. Creating user...`);
      await adminDataSource.query(`CREATE USER ${appUser} IDENTIFIED BY "${appPassword}"`);
      console.log(`User ${appUser} created.`);
    } else {
      console.log(`User ${appUser} already exists.`);
    }

    await adminDataSource.query(`GRANT CONNECT, RESOURCE, DBA TO ${appUser}`);
    await adminDataSource.query(`ALTER USER ${appUser} QUOTA UNLIMITED ON USERS`);

    console.log(`Grants and Quota assigned to user ${appUser}.`);
  } catch (err) {
    console.error('Error during admin operations', err);
    throw err; // re-throw the error to be caught by the main catch block
  } finally {
    if (adminDataSource.isInitialized) {
      await adminDataSource.destroy();
      console.log('Admin Data Source has been destroyed!');
    }
  }
};

const seed = async () => {
  try {
    await createUser();

    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const partnerRepository = AppDataSource.getRepository(PartnerSchema);

    // Path is now relative to this script inside src/scripts
    const data = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'pdvs.json'), 'utf8');
    const pdvsData = JSON.parse(data);

    const partners = pdvsData.pdvs.map(pdv => {
      return {
        id: parseInt(pdv.id, 10),
        tradingName: pdv.tradingName,
        ownerName: pdv.ownerName,
        document: pdv.document,
        coverageArea: pdv.coverageArea,
        address: pdv.address,
      };
    });

    // Clear the table before seeding
    await partnerRepository.clear();
    console.log('Cleared existing data from the partner table.');

    // Create and save the new partners
    const createdPartners = partnerRepository.create(partners);
    await partnerRepository.save(createdPartners);

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error during seeding process', err);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Data Source has been destroyed!');
    }
  }
};

seed();
