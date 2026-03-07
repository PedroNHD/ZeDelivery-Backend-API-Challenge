import { AppDataSource } from '../../lib/data-source.js';
import { PartnerSchema } from './partner.entity.js';

const partnerRepository = AppDataSource.getRepository(PartnerSchema);

export const createPartnerRepository = async partnerData => {
  try {
    const result = await partnerRepository.insert(partnerData);
    return partnerRepository.findOneBy({ id: result.identifiers[0].id });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY' || error.message.includes('ORA-00001')) {
      throw new Error('Não foi possível criar o parceiro. O documento já existe.', { cause: error });
    }
    throw error;
  }
};

export const getPartnerByIdRepository = async id => {
  const partner = await partnerRepository.findOneBy({ id });
  if (!partner) {
    throw new Error('Parceiro não encontrado.');
  }
  return partner;
};

export const searchPartnersByLocationRepository = (lat, long) => {
  const point = {
    type: 'Point',
    coordinates: [long, lat],
  };

  // Using QueryBuilder for complex spatial query in Oracle
  return partnerRepository
    .createQueryBuilder('partner')
    .where(
      `SDO_RELATE(
        partner.coverageArea,
        SDO_GEOMETRY(:point, 4326),
        'mask=CONTAINS'
      ) = 'TRUE'`,
      { point: JSON.stringify(point) },
    )
    .orderBy(
      `SDO_GEOM.SDO_DISTANCE(
        partner.address,
        SDO_GEOMETRY(:point, 4326),
        0.005,
        'unit=M'
      )`,
    )
    .getMany();
};

export const searchLastPartnerRepository = async () => {
  const partners = await partnerRepository.find({
    order: {
      id: 'DESC',
    },
    take: 1,
  });
  return partners[0];
};
