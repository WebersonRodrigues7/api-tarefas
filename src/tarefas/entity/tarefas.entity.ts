import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => Users, (userId) => userId.tarefas, { onDelete: "CASCADE"})
  userId: Users;
}