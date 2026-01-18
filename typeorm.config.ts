import { Tarefas } from "./src/tarefas/entity/tarefas.entity";
import { Users } from "./src/users/entity/users.entity";
import { DataSource } from "typeorm";

export default new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "tarefas",
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  entities: [Tarefas, Users],
});