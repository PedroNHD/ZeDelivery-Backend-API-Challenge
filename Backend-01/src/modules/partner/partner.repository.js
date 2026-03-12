import { AppDataSource } from '../../lib/data-source.js';

const SELECT_PARTNERS_BASE_QUERY = `
  SELECT "id", "tradingName", "ownerName", "document", 
         SDO_UTIL.TO_GEOJSON("coverageArea") AS "coverageArea", 
         SDO_UTIL.TO_GEOJSON("address") AS "address"
  FROM "partner"
`;

const formatPartnerResponse = partnerRow => {
  if (!partnerRow) return null;
  return {
    ...partnerRow,
    coverageArea: partnerRow.coverageArea ? JSON.parse(partnerRow.coverageArea) : null,
    address: partnerRow.address ? JSON.parse(partnerRow.address) : null,
  };
};

export const createPartnerRepository = async partnerData => {
  try {
    await AppDataSource.query(
      `INSERT INTO "partner" ("id", "tradingName", "ownerName", "document", "coverageArea", "address") 
       VALUES (:1, :2, :3, :4, SDO_UTIL.FROM_GEOJSON(:5), SDO_UTIL.FROM_GEOJSON(:6))`,
      [
        partnerData.id,
        partnerData.tradingName,
        partnerData.ownerName,
        partnerData.document,
        JSON.stringify(partnerData.coverageArea),
        JSON.stringify(partnerData.address),
      ],
    );

    return partnerData;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY' || error.message?.includes('ORA-00001')) {
      throw new Error('Não foi possível criar o parceiro. O documento já existe.', {
        cause: error,
      });
    }
    throw error;
  }
};

export const getPartnerByIdRepository = async id => {
  const partners = await AppDataSource.query(`${SELECT_PARTNERS_BASE_QUERY} WHERE "id" = :1`, [id]);

  if (!partners?.length) {
    throw new Error('Parceiro não encontrado.');
  }

  return formatPartnerResponse(partners[0]);
};

export const searchPartnersByLocationRepository = async (lat, long) => {
  const parsedLat = parseFloat(lat);
  const parsedLong = parseFloat(long);

  if (isNaN(parsedLat) || isNaN(parsedLong)) {
    throw new Error('Coordenadas de latitude e longitude inválidas.');
  }

  const searchPoint = JSON.stringify({
    type: 'Point',
    coordinates: [parsedLong, parsedLat],
  });

  let partners = await AppDataSource.query(
    `${SELECT_PARTNERS_BASE_QUERY} 
     WHERE SDO_CONTAINS("coverageArea", SDO_UTIL.FROM_GEOJSON(:1)) = 'TRUE'`,
    [searchPoint],
  );

  if (!partners?.length) {
    partners = await AppDataSource.query(
      `${SELECT_PARTNERS_BASE_QUERY} 
       WHERE SDO_NN("coverageArea", SDO_UTIL.FROM_GEOJSON(:1), 'sdo_num_res=1') = 'TRUE'`,
      [searchPoint],
    );
  }

  if (!partners?.length) {
    return null;
  }

  return partners.map(formatPartnerResponse);
};

export const searchLastPartnerRepository = async () => {
  const partners = await AppDataSource.query(
    `${SELECT_PARTNERS_BASE_QUERY} 
     ORDER BY "id" DESC 
     FETCH FIRST 1 ROWS ONLY`,
  );

  if (!partners?.length) {
    return null;
  }

  return formatPartnerResponse(partners[0]);
};
