import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasDTO } from './dto/upsert-dto.tarefas';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';

@Controller('tarefas')
export class TarefasController {
    constructor(private readonly tarefasService: TarefasService){}

    
    @Get('')
    async findAllTasks(){
        const Tasks = await this.tarefasService.getAll()
        return Tasks
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    createTasks(@Body() taskBody: TarefasDTO){
       return this.tarefasService.create(taskBody)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body()taskBody: TarefasDTO){
        return this.tarefasService.update(taskBody, id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.tarefasService.delete(id)
    }


}
