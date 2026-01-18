import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefas } from './entity/tarefas.entity';
import { TarefasDTO } from './dto/upsert-dto.tarefas';
import { Users } from '../users/entity/users.entity';

@Injectable()
export class TarefasService {   
    constructor(@InjectRepository(Tarefas)
    private TarefasRepository: Repository<Tarefas>,
    @InjectRepository(Users)
    private UsersRepository: Repository<Users>
){}

getAll(){
    return this.TarefasRepository.find()
    }

async create(taskBody: TarefasDTO, userID: number){
    const user = await this.UsersRepository.findOneBy({ id: userID});
    if(!user){
        throw new NotFoundException("Usuário não encontrado")
    }

    const newtarefa = await this.TarefasRepository.create(taskBody)
    await this.TarefasRepository.save(newtarefa)

    return {
        message: "Tarefa criada com sucesso!"
    }
}

async delete(taskid: number, userId: number){
    const deletedTask = await this.TarefasRepository.findOne({where: {id: taskid, user: {id: userId}}})
    if(!deletedTask){
        throw new ForbiddenException("Você não pode deletar essa tarefa")
    }
    
    return this.TarefasRepository.remove(deletedTask)
    
}

async update(taskBody: TarefasDTO, taskid:number, userId: number){
    const gettingID = await this.TarefasRepository.findOne({where: {id: taskid, user: {id: userId}}})
    if(!gettingID){
        throw new ForbiddenException("Você não pode editar essa tarefa")
    }

    Object.assign(gettingID, taskBody)  
    await this.TarefasRepository.save(gettingID)
    return {
        message: "Tarefa atualizada com sucesso"
    }
}

async findByUser(userId: number){
    return this.TarefasRepository.find({where: {user: {id: userId}}});
}


}
