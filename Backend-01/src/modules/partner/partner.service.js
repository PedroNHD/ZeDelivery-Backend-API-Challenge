import {
  searchLastPartnerRepository,
  getPartnerByIdRepository,
  createPartnerRepository,
  searchPartnersByLocationRepository,
} from './partner.repository.js';

export const createPartnerService = async data => {
  let finalId = data.id;

  if (!finalId) {
    const lastPartner = await searchLastPartnerRepository();
    finalId = lastPartner ? parseInt(lastPartner.id) + 1 : 1;
  }

  return createPartnerRepository({
    id: String(finalId),
    tradingName: data.tradingName,
    ownerName: data.ownerName,
    document: data.document,
    coverageArea: data.coverageArea,
    address: data.address,
  });
};

export const searchPartnersByLocationService = query => {
  const { lat, long } = query;

  if (!lat || !long) {
    throw new Error('Latitude e Longitude são obrigatórios.');
  }

  return searchPartnersByLocationRepository(lat, long);
};

export const getPartnerByIdService = id => {
  return getPartnerByIdRepository(id);
};
