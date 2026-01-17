import { Tarefas } from "src/tarefas/tarefas.entity";
import { Users } from "src/users/entity/users.entity";
import { DataSource } from "typeorm";


export default new DataSource({ // criando as imigrações
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'tarefas',
  entities: [Tarefas, Users],
  migrations: ['dist/migrations/*.js'],
});