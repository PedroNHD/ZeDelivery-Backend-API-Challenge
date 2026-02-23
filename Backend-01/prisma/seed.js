/* eslint-disable no-sync */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pdvs.json'), 'utf-8'));

  const data = raw.pdvs;

  await prisma.$transaction(async tx => {
    for (const partner of data) {
      console.log(`Inserting ${partner.tradingName} - ${partner.document}`);

      await tx.$executeRaw`
        INSERT INTO "Partner"
        ("id", "tradingName", "ownerName", "document", "coverageArea", "address")
        VALUES (
          ${partner.id},
          ${partner.tradingName},
          ${partner.ownerName},
          ${partner.document},
          ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(partner.coverageArea)}), 4326),
          ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(partner.address)}), 4326)
        )
        ON CONFLICT ("document") DO NOTHING
      `;
    }
  });

  console.log('Data seeded successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
