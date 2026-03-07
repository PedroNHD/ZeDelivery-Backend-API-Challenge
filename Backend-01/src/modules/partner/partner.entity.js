import { EntitySchema } from 'typeorm';

export const PartnerSchema = new EntitySchema({
  name: 'Partner',
  tableName: 'partner',
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
      length: 255,
      unique: true,
    },
    coverageArea: {
      createDate: false,
      type: 'json',
      columnType: 'MDSYS.SDO_GEOMETRY',
      nullable: false,
    },
    address: {
      createDate: false,
      type: 'json',
      columnType: 'MDSYS.SDO_GEOMETRY',
      nullable: false,
    },
  },
});
