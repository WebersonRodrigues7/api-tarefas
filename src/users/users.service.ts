import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import {  Repository } from 'typeorm';
import { UsersDTO } from './dto/upsert-dto.users';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users)
    private UsersRepository: Repository<Users>)
{}


getAll(){
    return this.UsersRepository.find();
}

async createUser(userBody: UsersDTO){
    const gettingInfo = await this.UsersRepository.create(userBody);
    const userExists = await this.UsersRepository.findOne({
            where: { email: userBody.email }
        });

        if (userExists) {
            throw new ConflictException('Email já está em uso');
        }
    await this.UsersRepository.save(gettingInfo);
    return {
        message: "Usuário criado!"
    }
}

async deleteUser(id: number){ 
    const gettingID = await this.UsersRepository.findOne({where: {id}})
    if(!gettingID){
        throw new NotFoundException("Email não encontrado")
    }
    await this.UsersRepository.delete(id)
    return {
        message: "Usuário deletado!"
    }
}

async updateUser(id: number, userBody: UsersDTO) {

  const user = await this.UsersRepository.findOne({
    where: { id }
  });

  if (!user) {
    throw new NotFoundException("Usuário não encontrado");
  }

  // altera na entidade carregada
  if (userBody.email !== undefined) {
    user.email = userBody.email;
  }

  if (userBody.password !== undefined) {
    user.password = userBody.password;
  }

  // AGORA o hook roda
  await this.UsersRepository.save(user);

  return { message: "Usuário atualizado!" };
}


async findByEmail(email: string){
    const gettingEmail = await this.UsersRepository.findOne({where: {email}})
    if(!gettingEmail){
        throw new NotFoundException("Email não encontrado")
    }

    return gettingEmail;
}

}
