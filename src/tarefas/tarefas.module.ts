import { Module } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefas } from './entity/tarefas.entity';
import { Users } from '../users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefas, Users])],
  providers: [TarefasService],
  controllers: [TarefasController]
})
export class TarefasModule {}
