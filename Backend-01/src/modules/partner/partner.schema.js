export const partnerSchema = {
  body: {
    type: 'object',
    required: [
      'tradingName',
      'ownerName',
      'document',
      'coverageArea',
      'address',
    ],
    properties: {
      tradingName: { type: 'string', minLength: 1 },
      ownerName: { type: 'string', minLength: 1 },
      document: { type: 'string' },

      // Validação para GeoJSON MultiPolygon
      coverageArea: {
        type: 'object',
        required: ['type', 'coordinates'],
        properties: {
          type: {
            type: 'string',
            enum: ['MultiPolygon', 'Polygon'],
          },
          coordinates: { type: 'array' },
        },
      },

      address: {
        type: 'object',
        required: ['type', 'coordinates'],
        properties: {
          type: {
            type: 'string',
            enum: ['Point'],
          },
          coordinates: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
          },
        },
      },
    },
  },
};
