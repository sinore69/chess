import Ajv, { JSONSchemaType } from "ajv";
import { InitialGameState } from "@/types/initialGameState";
const ajv = new Ajv();

const schema: JSONSchemaType<InitialGameState> = {
  type: "object",
  properties: {
    Creator: { type: "object" },
    CreatorColor: { type: "string" },
    Player: { type: "object" },
    PlayerColor: { type: "string" },
  },
  required: ["CreatorColor", "PlayerColor"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export function InitialGameStateValidator(data: any) {
  if (validate(data)) {
    return true;
  } else {
    return false;
  }
}
