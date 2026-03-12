import { z } from 'zod';

// Schema para GeoJSON Point
const pointSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([
    z.number().min(-180).max(180), // Longitude
    z.number().min(-90).max(90), // Latitude
  ]),
});

// Schema para GeoJSON MultiPolygon
const multiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(
    z.array(z.array(z.tuple([z.number().min(-180).max(180), z.number().min(-90).max(90)]))),
  ),
});

// POST /partners
export const createPartnerSchema = z.object({
  body: z.object({
    // Correção: .trim() remove espaços inúteis e .min(1) barra strings vazias ""
    tradingName: z
      .string({ required_error: 'tradingName é obrigatório.' })
      .trim()
      .min(1, 'tradingName não pode estar vazio.'),

    ownerName: z
      .string({ required_error: 'ownerName é obrigatório.' })
      .trim()
      .min(1, 'ownerName não pode estar vazio.'),

    document: z
      .string({ required_error: 'document é obrigatório.' })
      .regex(/^\d{14}$/, 'O documento deve ser um CNPJ válido com 14 dígitos (apenas números).'),

    coverageArea: multiPolygonSchema,
    address: pointSchema,
  }),
});

// GET /partners/:id
export const getPartnerByIdSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'O ID do parceiro é obrigatório.' })
      .min(1, 'O ID do parceiro é inválido.'),
  }),
});

// GET /partners/search?long=...&lat=...
export const searchPartnerSchema = z.object({
  querystring: z.object({
    lat: z.coerce
      .number({ required_error: 'A latitude (lat) é obrigatória.' })
      .min(-90, 'A latitude deve ser no mínimo -90.')
      .max(90, 'A latitude deve ser no máximo 90.'),

    long: z.coerce
      .number({ required_error: 'A longitude (lon) é obrigatória.' })
      .min(-180, 'A longitude deve ser no mínimo -180.')
      .max(180, 'A longitude deve ser no máximo 180.'),

    limit: z.coerce.number().positive().optional(),
  }),
});
