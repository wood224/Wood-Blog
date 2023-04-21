import { mysqlConfig } from './../config/index';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  username: mysqlConfig.username,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  entities: mysqlConfig.entities,
})

AppDataSource.initialize();