import { ConnectOptions, connect, set, connection } from "mongoose";
import { ENVIRONMENT, DB } from "@config/index";
import { logger } from "@utils/logger";

export const dbConnection = async () => {
  const dbConfig = {
    url: `mongodb://127.0.0.1:27017/oauth-server`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };

  if (ENVIRONMENT !== "production") {
    set("debug", true);
  }

  connect(dbConfig.url, dbConfig.options as ConnectOptions)
    .then(() => {
      logger.info("Database connected Successfully");
    })
    .catch((err) => {
      logger.error(err, "err");
    });
};
