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

  @Column({default: true})
  active: boolean;

  @ManyToOne(() => Users, (user) => user.tarefas, { onDelete: "CASCADE"})
  user: Users;
}