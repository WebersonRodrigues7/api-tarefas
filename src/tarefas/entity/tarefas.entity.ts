import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../users/entity/users.entity";

@Entity()
export class Tarefas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  objetivo: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Users, (user) => user.tarefas, { onDelete: "CASCADE",
  nullable: false})
  user: Users;
}