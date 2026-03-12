import { EntitySchema } from 'typeorm';

export const PartnerSchema = new EntitySchema({
  name: 'Partner',
  tableName: 'partner',
  // Essencial estar 'false' para que o TypeORM não tente sobrescrever
  // a estrutura complexa do SDO_GEOMETRY no Oracle.
  synchronize: false,
  columns: {
    id: {
      type: 'number',
      primary: true,
    },
    tradingName: {
      type: 'varchar2',
      length: 255,
    },
    ownerName: {
      type: 'varchar2',
      length: 255,
    },
    document: {
      type: 'varchar2',
      length: 14,
      unique: true,
    },

    // ATENÇÃO: As colunas abaixo são do tipo SDO_GEOMETRY no Oracle.
    // Elas estão mapeadas como varchar2 e select: false apenas para
    // "enganar" o TypeORM e evitar erros de mapeamento automático.
    // A manipulação real delas (GeoJSON <-> SDO) ocorre via query bruta no Repository.
    coverageArea: {
      type: 'varchar2',
      select: false,
    },
    address: {
      type: 'varchar2',
      select: false,
    },
  },
});
