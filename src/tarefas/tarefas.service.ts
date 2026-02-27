import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefas } from './entity/tarefas.entity';
import { TarefasDTO } from './dto/upsert-dto.tarefas';
import { Users} from 'src/users/entity/users.entity';


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

async create(taskBody: TarefasDTO, userId: number) {
    const user = await this.UsersRepository.findOne({where: {id: userId}})
    if(!user){
        throw new NotFoundException
    }

    const newtask = this.TarefasRepository.create({
        ...taskBody,
        user: user
    })
    await this.TarefasRepository.save(newtask);

    return {
    message: "Tarefa criada com sucesso!",
    }
}

async delete(id: number) {
  const task = await this.TarefasRepository.findOne({
    where: { id: Number(id) }
  });

  if (!task) {
    throw new NotFoundException('Tarefa não encontrada');
  }

  await this.TarefasRepository.remove(task);

  return { message: 'Tarefa deletada com sucesso' };
}

async update(taskBody: TarefasDTO, id:number){
    const gettingID = await this.TarefasRepository.findOne({where: {id}})
    if(!gettingID){
        throw new NotFoundException("Tarefa não encontrada")
    }

    await this.TarefasRepository.update(id, taskBody)
    return{
      message: "Tarefa Atualizada"
    }
}

}
