import { prisma } from '../../lib/prisma.js';

export const createPartnerRepository = async partnerData => {
  const result = await prisma.$queryRaw`
    INSERT INTO "Partner" (
      "id",
      "tradingName",
      "ownerName",
      "document",
      "coverageArea",
      "address"
    ) VALUES (
      ${partnerData.id},
      ${partnerData.tradingName},
      ${partnerData.ownerName},
      ${partnerData.document},
      ST_SetSRID(
        ST_GeomFromGeoJSON(${JSON.stringify(partnerData.coverageArea)}),
        4326
      ),
      ST_SetSRID(
        ST_GeomFromGeoJSON(${JSON.stringify(partnerData.address)}),
        4326
      )
    )
    ON CONFLICT DO NOTHING
    RETURNING
      "id",
      "tradingName",
      "ownerName",
      "document",
      ST_AsGeoJSON("coverageArea")::json AS "coverageArea",
      ST_AsGeoJSON("address")::json AS "address"
  `;

  if (result.length === 0) {
    throw new Error('Não foi possível criar o parceiro.'); // Indica que o parceiro não foi criado (possível conflito de documento)
  }

  return result[0];
};

export const getPartnerByIdRepository = async id => {
  const result = await prisma.$queryRaw`
    SELECT
      "id",
      "tradingName",
      "ownerName",
      "document",
      ST_AsGeoJSON("coverageArea")::json AS "coverageArea",
      ST_AsGeoJSON("address")::json AS "address"
    FROM "Partner"
    WHERE "id" = ${id}
  `;

  if (result.length === 0) {
    throw new Error('Parceiro não encontrado.'); // Indica que o parceiro não foi encontrado
  }

  return result[0];
};

export const searchPartnersByLocationRepository = (lat, long) => {
  return prisma.$queryRaw`
    SELECT
      id,
      "tradingName",
      "ownerName",
      document,
      ST_AsGeoJSON("coverageArea") as "coverageArea",
      ST_AsGeoJSON("address") as "address",
      ST_Distance(
        "address"::geography,
        ST_SetSRID(ST_Point(${long}, ${lat}), 4326)::geography
      ) as distance
    FROM "Partner"
    WHERE ST_Contains(
      "coverageArea",
      ST_SetSRID(ST_Point(${long}, ${lat}), 4326)
    )
    ORDER BY distance ASC
  `;
};

export const searchLastPartnerRepository = () => {
  return prisma.partner.findFirst({
    orderBy: {
      id: 'desc',
    },
  });
};
