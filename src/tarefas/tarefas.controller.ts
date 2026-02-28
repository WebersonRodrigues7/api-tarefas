import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasDTO } from './dto/upsert-dto.tarefas';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';

@Controller('tarefas')
export class TarefasController {
    constructor(private readonly tarefasService: TarefasService){}

    
   @UseGuards(JwtAuthGuard)
    @Get('')
    findtasks(@Req() req) {
    return this.tarefasService.getAll(req.user.userId);
}

    @UseGuards(JwtAuthGuard)
    @Post('')
    createTasks(@Body() taskBody: TarefasDTO, @Req() req){
       return this.tarefasService.create(taskBody, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body()taskBody: TarefasDTO,){
        return this.tarefasService.update(taskBody, id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') taskid: number){
        return this.tarefasService.delete(taskid)
    }


}
