import { EntitySchema } from "typeorm";

export const PartnerSchema = new EntitySchema({
  name: "Partner",
  tableName: "partner",
  columns: {
    id: {
      type: "number",
      primary: true,
    },
    tradingName: {
      type: "varchar2",
      length: 255,
    },
    ownerName: {
      type: "varchar2",
      length: 255,
    },
    document: {
      type: "varchar2",
      length: 255,
      unique: true,
    },
    coverageArea: {
      type: "geometry",
      spatialFeatureType: "MultiPolygon",
      srid: 4326,
    },
    address: {
      type: "geometry",
      spatialFeatureType: "Point",
      srid: 4326,
    },
  },
});
