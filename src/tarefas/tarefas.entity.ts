import { Users } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarefas {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string;

    @Column() 
    objetivo: string;

    @Column()
    descricao:string

    @ManyToOne(() => Users, (user) => user.tarefas)
    user: Users
}