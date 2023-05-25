import { mongoose } from "mongoose";

const TokenSchema = new mongoose.Schema({
  refresh_token: {
    type: String
  },
  access_token: {
    type: String
  },
  client_secret: {
    type: String
  },
  client_id: {
    type: String
  },
  grant_type: {
    type: String
  },
  expires: {
    type: String
  }
});
TokenSchema.set("timestamps", true);

export const Token = mongoose.model("token", TokenSchema);
