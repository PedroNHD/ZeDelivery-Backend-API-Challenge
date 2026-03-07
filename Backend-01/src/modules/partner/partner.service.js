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
    finalId = lastPartner ? Number(lastPartner.id) + 1 : 1;
  }

  return createPartnerRepository({
    ...data,
    id: finalId, // Ensure ID is a number
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
