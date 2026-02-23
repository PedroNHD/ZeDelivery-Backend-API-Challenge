import {
  createPartnerService,
  searchPartnersByLocationService,
  getPartnerByIdService,
} from './partner.service.js';

// CREATE - Partner (POST /partners)
export async function createPartnerController(req, reply) {
  try {
    const partner = await createPartnerService(req.body);

    return reply.status(201).send(partner);
  } catch (error) {
    if (error.code === 'P2002') {
      return reply.status(400).send({ error: 'Documento já existe para outro parceiro.' });
    }

    reply.log.error('Error creating partner:', error);
    return reply.status(500).send({ error: `Error creating partner - ${error.message}` });
  }
}

// READ - Partner by ID (GET /partners/:id)
export async function getPartnerByIdController(req, reply) {
  try {
    const partner = await getPartnerByIdService(req.params.id);

    if (!partner) {
      return reply.status(404).send({ error: 'Parceiro não encontrado.' });
    }

    return reply.send(partner);
  } catch (error) {
    reply.log.error('Error fetching partner by ID:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}

// READ - Search Partners (GET /partners/search?lat=...&lon=...&limit=...)
export async function searchPartnerController(req, reply) {
  try {
    const partner = await searchPartnersByLocationService(req.query);

    if (!partner) {
      return reply.status(404).send({ error: 'Nenhum parceiro encontrado.' });
    }

    if (req.query.limit) {
      return reply.send(Array.isArray(partner) ? partner.slice(0, req.query.limit) : partner);
    }

    return reply.send(partner);
  } catch (error) {
    reply.log.error('Error searching for partner:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
}
