import { DataSource } from "typeorm";
import config from "./config";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: config.entities,
})

AppDataSource.initialize();