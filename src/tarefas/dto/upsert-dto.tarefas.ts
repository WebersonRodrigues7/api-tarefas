import { IsNotEmpty } from "class-validator";

export class TarefasDTO{
    @IsNotEmpty()
    titulo: string;

    @IsNotEmpty()
    objetivo: string

    @IsNotEmpty()
    descricao: string;

}