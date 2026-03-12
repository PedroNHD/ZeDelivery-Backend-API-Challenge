import {
  searchLastPartnerRepository,
  getPartnerByIdRepository,
  createPartnerRepository,
  searchPartnersByLocationRepository,
} from './partner.repository.js';

export const createPartnerService = async data => {
  let nextId = data.id;

  if (!nextId) {
    const lastPartner = await searchLastPartnerRepository();
    const parseId = lastPartner?.id ? Number(lastPartner.id) : 0;
    nextId = (isNaN(parseId) ? 0 : parseId) + 1;
  }

  return createPartnerRepository({
    ...data,
    id: nextId,
  });
};

export const searchPartnersByLocationService = query => {
  const { lat, long } = query;

  if (lat === undefined || lat === null || long === undefined || long === null) {
    throw new Error('Latitude e Longitude são obrigatórias.');
  }

  return searchPartnersByLocationRepository(lat, long);
};

export const getPartnerByIdService = async id => {
  if (!id) {
    throw new Error('O ID do parceiro é obrigatório para a busca.');
  }

  return getPartnerByIdRepository(id);
};
