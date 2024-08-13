import Ajv, { JSONSchemaType } from "ajv";
import { Fen } from "@/types/fen";
const ajv = new Ajv();

const schema: JSONSchemaType<Fen> = {
  type: "object",
  properties: {
    fen: { type: "string" },
    lastMove: { type: "string" },
    fromNumeric: { type: "string" },
    toNumeric: { type: "string" },
    enPassant: { type: "string" },
  },
  required: ["fen", "lastMove"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export function GameStateValidator(data: any) {
  if (validate(data)) {
    return true;
  } else {
    return false;
  }
}
