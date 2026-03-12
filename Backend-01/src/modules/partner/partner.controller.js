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
    if (error.message?.includes('já existe')) {
      return reply.status(400).send({ error: 'Documento já existe para outro parceiro.' });
    }

    req.log.error('Error creating partner:', error);
    return reply.status(500).send({ error: 'Erro interno ao criar o parceiro.' });
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
    if (error.message?.includes('Parceiro não encontrado')) {
      return reply.status(404).send({ error: 'Parceiro não encontrado.' });
    }

    req.log.error('Error fetching partner by ID:', error);
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}

// READ - Search Partners (GET /partners/search?lat=...&long=...&limit=...)
export async function searchPartnerController(req, reply) {
  try {
    const partners = await searchPartnersByLocationService(req.query);

    if (!partners || partners.length === 0) {
      return reply.status(404).send({ error: 'Nenhum parceiro encontrado nesta região.' });
    }

    if (req.query.limit) {
      return reply.send(partners.slice(0, req.query.limit));
    }

    return reply.send(partners);
  } catch (error) {
    req.log.error('Error searching for partners:', error);
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}
