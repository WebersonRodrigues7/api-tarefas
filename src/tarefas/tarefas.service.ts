import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefas } from './tarefas.entity';
import { TarefasDTO } from './dto/upsert-dto.tarefas';

@Injectable()
export class TarefasService {   
    constructor(@InjectRepository(Tarefas)
    private TarefasRepository: Repository<Tarefas>
){}

getAll(){
    return this.TarefasRepository.find()
    }

async create(taskBody: TarefasDTO){
    const newtarefa = await this.TarefasRepository.create(taskBody)
    await this.TarefasRepository.save(newtarefa)

    return {
        message: "Tarefa criada com sucesso!"
    }
}

async delete(id: number){
    const deletedTask = await this.TarefasRepository.findOne({where: {id}})
    if(!deletedTask){
        throw new NotFoundException("Tarefa não encontrada")
    }

    await this.TarefasRepository.delete(id)
    return {
        message: "Tarefa deletada com sucesso!"
    }
}

async update(taskBody: TarefasDTO, id:number){
    const gettingID = await this.TarefasRepository.findOne({where: {id}})
    if(!gettingID){
        throw new NotFoundException("Tarefa não encontrada")
    }
    await this.TarefasRepository.update(id, taskBody)
    return {
        message: "Tarefa atualizada com sucesso"
    }
}


}
