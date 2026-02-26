import { z } from 'zod';

// Schema para GeoJSON Point
const pointSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]), // [longitude, latitude]
});

// Schema para GeoJSON MultiPolygon
const multiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(z.array(z.array(z.tuple([z.number(), z.number()])))),
});

// POST /partners
export const createPartnerSchema = z.object({
  body: z.object({
    tradingName: z.string({ required_error: 'tradingName é obrigatório.' }),
    ownerName: z.string({ required_error: 'ownerName é obrigatório.' }),
    document: z
      .string({ required_error: 'document é obrigatório.' })
      .regex(/^\d{14}$/, 'O documento deve ser um CNPJ válido com 14 dígitos.'),
    coverageArea: multiPolygonSchema,
    address: pointSchema,
  }),
});

// GET /partners/:id
export const getPartnerByIdSchema = z.object({
  params: z.object({
    id: z.string().cuid({ message: 'O ID do parceiro é inválido.' }),
  }),
});

// GET /partners/search?lon=...&lat=...
export const searchPartnerSchema = z.object({
  querystring: z.object({
    lat: z.coerce.number({ required_error: 'A latitude (lat) é obrigatória.' }),
    lon: z.coerce.number({ required_error: 'A longitude (lon) é obrigatória.' }),
    limit: z.coerce.number().optional(),
  }),
});
