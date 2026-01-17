import { Module } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefas } from './tarefas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefas])],
  providers: [TarefasService],
  controllers: [TarefasController]
})
export class TarefasModule {}
